import React, { useState } from "react";
import MyInput from "../UI/MyInput/MyInput.tsx";
import ButtonWithFunc from "../UI/ButtonWithFunc/ButtonWithFunc.tsx";
import { handleLogin } from "../../api/authApi.ts";

const ModalLog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const login = async () => {
    try {
      const token = await handleLogin({ email, password });
      localStorage.setItem("token", token);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        setMessageType("error");
      } else {
        setMessage("Failed to contact the server.");
        setMessageType("error");
      }
    }
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-r from-blue-300 to-indigo-700 p-10 rounded-lg w-[600px] text-center flex flex-col gap-5 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-3xl font-serif">Войти</h2>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl font-serif">Email:</label>
          <MyInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="font-bold text-2xl font-serif">Password:</label>
          <MyInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonWithFunc onClick={login}>LogIn</ButtonWithFunc>
          {messageType === "error" ? message : ""}
        </div>
      </div>
    </div>
  );
};

export default ModalLog;
