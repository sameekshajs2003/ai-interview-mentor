const DeleteAlertContent = ({ content, onDelete, onCancel }) => {
  return (
    <div className="p-5">
      <p className="text-[14px]">{content}</p>
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          className="text-sm font-medium text-gray-700 bg-gray-100 px-5 py-2 rounded-lg hover:bg-gray-200"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="button" className="btn-small" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default DeleteAlertContent;
