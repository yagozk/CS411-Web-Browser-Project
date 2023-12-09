import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BrowserToolbar from "./BrowserToolbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookmark1 from "./Bookmark1";
import Bookmark2 from "./Bookmark2";
import Bookmark3 from "./Bookmark3";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BrowserToolbar />
      <Routes>
        <Route index element={<App />} />
        <Route path="bookmark1" element={<Bookmark1 />} />
        <Route path="bookmark2" element={<Bookmark2 />} />
        <Route path="bookmark3" element={<Bookmark3 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
