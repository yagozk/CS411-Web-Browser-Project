import {BrowserRouter, Route, Routes} from "react-router-dom";
import BrowserToolbar from "./BrowserToolbar";
import BookmarkName from "./Bookmark3";
import React, {useState} from "react";

function App() {
    const [bookmarkName, setBookmarkName] = useState("Homepage");

    return (
        <BrowserRouter >
            <BrowserToolbar setBookmarkName={setBookmarkName}/>
            <Routes>
                <Route path="*" element={<BookmarkName bookmarkName={bookmarkName}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
