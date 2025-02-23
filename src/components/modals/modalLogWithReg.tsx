import React, { useState } from "react";
import ButtonWithFunc from "../UI/ButtonWithFunc/ButtonWithFunc.tsx";

interface ModalLogWithRegProps {
  onClose: () => void;
  onOpenLogModal: () => void;
  onOpenRegModal: () => void;
  onLogOut: () => void;
}

const ModalLogWithReg: React.FC<ModalLogWithRegProps> = ({
  onClose,
  onOpenLogModal,
  onOpenRegModal,
  onLogOut,
}) => {
  const token = localStorage.getItem("token");
  return token == "" ? (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-slate-600 p-10 rounded-lg w-[600px] text-center flex flex-col gap-5 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-3xl font-serif">
          Создайте свой профиль или войдите уже в существующий
        </h2>
        <div className="flex flex-row gap-5">
          <ButtonWithFunc onClick={onOpenLogModal}>Войти</ButtonWithFunc>
          <ButtonWithFunc onClick={onOpenRegModal}>Регистрация</ButtonWithFunc>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-slate-600 p-10 rounded-lg w-[600px] text-center flex flex-col gap-5 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-3xl font-serif">
          Желаете выйти из аккаунта?
        </h2>
        <div className="flex flex-row gap-5">
          <ButtonWithFunc onClick={onLogOut}>Выйти</ButtonWithFunc>
        </div>
      </div>
    </div>
  );
};

export default ModalLogWithReg;
