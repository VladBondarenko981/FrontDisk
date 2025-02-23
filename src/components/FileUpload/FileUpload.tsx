import React, { useState } from "react";
import axios from "axios";
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
    addFile(file);
    onFileUploaded();
    setFile(null);
    setIsUploading(false);
    window.location.reload();
  };

  return (
    <div className="upload-modal flex flex-col justify-center gap-4 border-2 border-transparent rounded-full p-4 bg-yellow-500 text-white font-semibold hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 shadow-lg active:scale-95 pt-10">
      <input
        type="file"
        onChange={handleFileChange}
        className="border-2 h-[50px] w-[170px] border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-black bg-gray-50 shadow-md hover:bg-gray-100 transition-all duration-200 text-center"
      />
      <ButtonWithFunc onClick={handleUpload}>Загрузить</ButtonWithFunc>
    </div>
  );
};

export default FileUpload;
