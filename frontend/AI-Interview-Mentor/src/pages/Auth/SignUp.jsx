import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import { validateEmail } from "../../utils/helper";
import uploadImage from "../../utils/uploadImage";

const SignUp = ({setCurrentPage}) => {
  const [profilePic,setProfilePic] = useState(null);
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate=useNavigate();

  const handleSignUp=async(e)=>{
    e.preventDefault();
    let profileImageUrl="";
    if(!fullName){
      setError("Please enter your full name.");
      return;
    }
    if (!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }
    if(!password || password.length < 8){
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError("");
    try {
      if (profilePic){
        const imgUploadRes=await uploadImage(profilePic);
        profileImageUrl=imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,
        {
          name: fullName,
          email,
          password,
          profileImageUrl
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      updateUser(response.data);
      navigate("/dashboard");
    }
      catch(error) {
        if (error.response && error.response.data.message)
        {
          setError(error.response.data.message);
        }
        else{
          setError("An error occurred during signup. Please try again.");
        }
    }
  }

  return <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
    <h3 className="text-2xl font-semibold text-black">Create an Account</h3>
    <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details below.</p>
    <form onSubmit={handleSignUp}>
      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
      <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
      <Input type="text" placeholder="Sam" value={fullName} onChange={({target}) => setFullName(target.value)} label="Full Name" />
      <Input type="text" placeholder="sam@example.com" value={email} onChange={({target}) => setEmail(target.value)} label="Email Address" />
      <Input type="password" placeholder="Min 8 Characters" value={password} onChange={({target}) => setPassword(target.value)} label="Password" />
      </div>   
      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
      <button type="submit" className="btn-primary">Sign Up</button>
      <p className="text-[13px] text-slate-800 mt-3">
        Already have an account?{" "}
        <button
          className="font-medium text-primary underline cursor-pointer"
          onClick={() => setCurrentPage("login")}
        >
          Login
        </button>
      </p>
    </form>
  </div>
};

export default SignUp;
