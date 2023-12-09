import React, { useEffect, useState } from "react";
import firePenguinImage from "./fire_penguin.png";
import { Link } from "react-router-dom";

const BrowserToolbar = ({ onBookmarkClick }) => {
  const [bookmarks, setBookmarks] = useState([
    { title: "Bookmark 1", path: "bookmark1" },
    { title: "Bookmark 2", path: "bookmark2" },
    { title: "Bookmark 3", path: "bookmark3" },
  ]);

  const [currentAddress, setCurrentAddress] = useState(
    "http://localhost:3000/"
  );
  const [pageChange, setPageChange] = useState(0);
  useEffect(() => {
    setCurrentAddress(window.location.href);
    console.log("currentAddress", window.location.href);
  }, [pageChange]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white">
      <div className="container">
        <div className="navbar-brand text-white logoText" href="/">
          <img
            alt=""
            src={firePenguinImage}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {"FirePenguin"}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#basic-navbar-nav"
          aria-controls="basic-navbar-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basic-navbar-nav">
          <div className="input-group me-4">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Address:
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Current Address"
              aria-label="Current Address"
              aria-describedby="basic-addon1"
              value={currentAddress}
              readOnly
            />
          </div>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <div
              className="btn btn-outline-light me-2"
              style={{ fontSize: "18px" }}
              onClick={() => setPageChange(pageChange + 1)}
            >
              <i class="fa fa-home"></i>
            </div>{" "}
          </Link>

          <div class="btn-group">
            <button
              type="button"
              class="btn btn-warning dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-bookmark-o" style={{ fontSize: "24px" }}></i>
            </button>
            <ul class="dropdown-menu">
              {bookmarks.map((bookmark, index) => (
                <div
                  className="dropdown-item"
                  key={index}
                  onClick={() => setPageChange(pageChange + 1)}
                >
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={bookmark.path}
                  >
                    {bookmark.title}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BrowserToolbar;
