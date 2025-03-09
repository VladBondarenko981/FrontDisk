import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar.tsx";
import MyLogo from "../UI/MyLogo/MyLogo.tsx";
import ModalLogWithReg from "../modals/modalLogWithReg.tsx";
import ModalLog from "../modals/modalLog.tsx";
import ModalReg from "../modals/modalReg.tsx";

interface HeaderProps {
  onSearch: (searchItem: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLogOpen, setIsModalLogOpen] = useState(false);
  const [isModalRegOpen, setIsModalRegOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenLogModal = () => {
    setIsModalOpen(false);
    setIsModalLogOpen(true);
  };
  const handleOpenRegModal = () => {
    setIsModalOpen(false);
    setIsModalRegOpen(true);
  };
  const handleCloseLogModal = () => {
    setIsModalLogOpen(false);
  };
  const handleCloseRegModal = () => {
    setIsModalRegOpen(false);
  };
  const onLogOut = () => {
    setIsModalRegOpen(false);
    setIsModalLogOpen(false);
    localStorage.setItem("token", "");
    window.location.reload();
  };
  return (
    <header className="bg-gradient-to-r from-blue-300 to-indigo-700 p-4 flex items-center justify-between shadow-lg">
      <MyLogo />
      <SearchBar onSearch={onSearch} />
      <div>
        <img
          src="https://surl.li/gslhmd"
          alt="User Avatar"
          className="w-[40px] h-[40px] transition-all duration-200 hover:scale-110 cursor-pointer"
          onClick={handleOpenModal}
        />
      </div>

      {isModalOpen && (
        <ModalLogWithReg
          onClose={handleCloseModal}
          onOpenLogModal={handleOpenLogModal}
          onOpenRegModal={handleOpenRegModal}
          onLogOut={onLogOut}
        />
      )}
      {isModalLogOpen && <ModalLog onClose={handleCloseLogModal} />}
      {isModalRegOpen && <ModalReg onClose={handleCloseRegModal} />}
    </header>
  );
};

export default Header;
