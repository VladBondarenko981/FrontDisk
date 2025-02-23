import React from "react";
import Header from "../components/Header/Header.tsx";
import Aside from "../components/ASide/Aside.tsx";
import BinFiles from "../components/BinFiles/BinFiles.tsx";
import { useState } from "react";

const BinPage = () => {
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchItem: string) => {
    setSearchTerm(searchItem);
  };
  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="flex flex-row h-screen">
        <Aside />
        {token ? (
          <BinFiles searchTerm={searchTerm} />
        ) : (
          <div className="flex items-center justify-center font-bold w-screen font-serif text-xl">
            Что бы увидеть ваши файлы, то вам нужно Зарегистрироваться или Войти
            в свой аккаунт
          </div>
        )}
      </div>
    </div>
  );
};

export default BinPage;
