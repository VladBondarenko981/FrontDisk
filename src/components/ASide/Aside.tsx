import React, { useState } from "react";
import ButtonWithFunc from "../UI/ButtonWithFunc/ButtonWithFunc.tsx";
import { useNavigate } from "react-router-dom";
import FileUpload from "../FileUpload/FileUpload.tsx";

const Aside = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileUpload = () => {
    setIsUploading(true);
  };

  const handleFileUploaded = () => {
    setIsUploading(false);
  };
  return (
    <aside className="flex flex-col bg-gradient-to-r from-blue-300 to-indigo-700 w-1/s6 p-5 h-screen items-center justify-start gap-10 pt-[100px]">
      <ButtonWithFunc onClick={handleFileUpload}>Add file +</ButtonWithFunc>
      <ButtonWithFunc onClick={() => navigate("/main-files")}>
        My Disk
      </ButtonWithFunc>
      <ButtonWithFunc onClick={() => navigate("/fav-files")}>
        Favorites
      </ButtonWithFunc>
      <ButtonWithFunc onClick={() => navigate("/bin-files")}>
        Basket
      </ButtonWithFunc>
      {isUploading && (
        <FileUpload
          onFileUploaded={handleFileUploaded}
          setIsUploading={setIsUploading}
        />
      )}
    </aside>
  );
};

export default Aside;
