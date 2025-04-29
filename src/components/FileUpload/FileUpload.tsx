import React, { useState } from "react";
import ButtonWithFunc from "../UI/ButtonWithFunc/ButtonWithFunc.tsx";
import { addFile } from "../../api/filesApi.ts";

const FileUpload = ({
  onFileUploaded,
  setIsUploading,
}: {
  onFileUploaded: () => void;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      addFile(file);
      onFileUploaded();
      setFile(null);
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-modal flex flex-col items-center justify-center gap-4 p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <input
        type="file"
        onChange={handleFileChange}
        className="file-input mb-4 w-[300px] p-4 border-2 border-gray-300 rounded-lg bg-white text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      />
      <ButtonWithFunc onClick={handleUpload}>Загрузить</ButtonWithFunc>
    </div>
  );
};

export default FileUpload;
