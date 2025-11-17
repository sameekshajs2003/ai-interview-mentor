const {GoogleGenAI} = require("@google/genai");
const {conceptExplainPrompt, questionAnswerPrompt} = require( "../utils/prompts");

const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

// Small helper to retry transient provider errors (exponential backoff)
const callModelWithRetries = async (opts, attempts = 3, baseDelay = 500) => {
    let lastErr;
    for (let i = 0; i < attempts; i++) {
        try {
            return await ai.models.generateContent(opts);
        } catch (err) {
            lastErr = err;
            // if last attempt, break and throw below
            if (i === attempts - 1) break;
            const delay = baseDelay * Math.pow(2, i);
            await new Promise((r) => setTimeout(r, delay));
        }
    }
    throw lastErr;
};

const generateInterviewQuestions=async(req,res)=>{
    try {
        const {role,experience,topicsToFocus,numberOfQuestions}=req.body;
        if(!role||!experience||!topicsToFocus||!numberOfQuestions){
            return res.status(400).json({message:"Missing required fields: role, experience, topicsToFocus, numberOfQuestions."});
        }
        const prompt=questionAnswerPrompt(role,experience,topicsToFocus,numberOfQuestions);
        const response = await callModelWithRetries({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response?.text || "";
        // tolerant cleaning: strip ```json wrappers if present
        const cleanedText = rawText.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch (parseErr) {
            console.error("Failed to parse model response as JSON:", parseErr, "raw:", rawText);
            return res.status(502).json({ message: "AI provider returned an unexpected response format." });
        }
        return res.status(200).json(data);
    }
    catch (error) {
        console.error("AI generateInterviewQuestions error:", error);
        const msg = (error && error.message) || String(error);
        // Map provider rate/quota errors to 429 for the client
        if (/quota|rate limit|rate_limit|429/i.test(msg)) {
            return res.status(429).json({ message: "AI provider rate limit or quota exhausted. Please try again later." });
        }
        return res.status(500).json({ message: "Failed to generate interview questions.", error: msg });
    }
};

const generateConceptExplanation=async(req,res)=>{
    try {
        const {question}=req.body;
        if(!question){
            return res.status(400).json({message:"Missing required field: question."});
        }
        const prompt=conceptExplainPrompt(question);
        const response = await callModelWithRetries({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response?.text || "";
        const cleanedText = rawText.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch (parseErr) {
            console.error("Failed to parse model response as JSON:", parseErr, "raw:", rawText);
            return res.status(502).json({ message: "AI provider returned an unexpected response format." });
        }
        return res.status(200).json(data);

    }
    catch (error) {
        console.error("AI generateConceptExplanation error:", error);
        const msg = (error && error.message) || String(error);
        if (/quota|rate limit|rate_limit|429/i.test(msg)) {
            return res.status(429).json({ message: "AI provider rate limit or quota exhausted. Please try again later." });
        }
        return res.status(500).json({ message: "Failed to generate concept explanation.", error: msg });
    }
};

module.exports={generateInterviewQuestions,generateConceptExplanation};