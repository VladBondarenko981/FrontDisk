import React, { useState } from "react";
import ButtonWithFunc from "../UI/ButtonWithFunc/ButtonWithFunc.tsx";
import { useNavigate } from "react-router-dom";
import MyButton from "../UI/MyButton/MyButton.tsx";
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
    <aside className="flex flex-col hover:bg-slate-300 bg-slate-400 w-1/s6 p-5 h-screen items-center justify-start gap-10 pt-[100px]">
      <ButtonWithFunc onClick={handleFileUpload}>
        Добавить файл +
      </ButtonWithFunc>
      <ButtonWithFunc onClick={() => navigate("/mainFiles")}>
        Мой Диск
      </ButtonWithFunc>
      <ButtonWithFunc onClick={() => navigate("/favFiles")}>
        Избранное
      </ButtonWithFunc>
      <ButtonWithFunc onClick={() => navigate("/binFiles")}>
        Корзина
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
