import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyDisk from "./pages/MyDisk.tsx";
import FavoriteFiles from "./pages/FavoriteFiles.tsx";
import BinPage from "./pages/BinPage.tsx";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main-files" element={<MyDisk />} />
        <Route path="/fav-files" element={<FavoriteFiles />} />
        <Route path="/bin-files" element={<BinPage />} />
        <Route path="" element={<MyDisk />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
//
