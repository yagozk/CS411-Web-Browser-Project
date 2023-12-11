import React, { useEffect, useState } from "react";
import firePenguinImage from "../fire_penguin.png";
import { Link, useNavigate } from "react-router-dom";
import LinkInputField from "./LinkInputField";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const BrowserToolbar = ({ onBookmarkClick, setBookmarkName }) => {
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getBookmarks();
  }, []);

  const getBookmarks = async () => {
    const bookmarksRes = localStorage.getItem("bookmarks");
    const bookmarks = await JSON.parse(bookmarksRes); // [name: "Bookmark 1", url: "http://localhost:3000/bookmark1", folderID: 1]
    setFolders(bookmarks);
  };

  const [currentAddress, setCurrentAddress] = useState(
    "http://localhost:3000/"
  );
  const [isBookmarkPopupShowing, setBookmarkPopupShowing] = useState(false);

  const BookmarkPopup = () => {
    if (
      isBookmarkPopupShowing &&
      folders.length === 1 &&
      folders[0].bookmarks.length === 0
    )
      return (
        <div className={"bookmark-dropdown"} style={{ padding: 5 }}>
          No bookmarks yet!
        </div>
      );
    if (isBookmarkPopupShowing && folders.length > 0)
      return (
        <div className={"bookmark-dropdown"}>
            <div style={{borderBottom:'2px solid black'}}> 
          <input
            type="text"
            placeholder="Press enter to search"
            defaultValue={searchQuery}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchQuery(e.target.value);
              }
            }}
            style={{width: "85%", fontSize: '12.5px'}}
          />
          <IoIosSearch size={20}/>
          </div>
          {isBookmarkPopupShowing && folders.length > 0 ? <></> : <></>}
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {searchQuery === "" ? (
              <>
                {folders.map((folder, i) =>
                  folder.name === "Parent" ? (
                    <>
                      {folder.bookmarks.map((bookmark, j) => (
                        <TreeItem
                          nodeId={bookmark.name}
                          label={bookmark.name}
                          onClick={() => {
                            setCurrentAddress(bookmark.url);
                            navigate("/" + bookmark.name);
                            setBookmarkName(bookmark.name);
                            setBookmarkPopupShowing(false);
                          }}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      <TreeItem nodeId={i} label={folder.name}>
                        {folder.bookmarks.map((bookmark, j) => (
                          <TreeItem
                            nodeId={bookmark.name}
                            label={bookmark.name}
                            onClick={() => {
                              setCurrentAddress(bookmark.url);
                              navigate("/" + bookmark.name);
                              setBookmarkName(bookmark.name);
                              setBookmarkPopupShowing(false);
                            }}
                          />
                        ))}
                      </TreeItem>
                    </>
                  )
                )}{" "}
              </>
            ) : (
              <>
                {folders.map((folder, i) => (
                  <div>
                    {folder.bookmarks
                      .filter((bookmark) =>
                        bookmark.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((bookmark, j) => (
                        <TreeItem
                          key={j}
                          nodeId={bookmark.name}
                          label={bookmark.name}
                          onClick={() => {
                            setCurrentAddress(bookmark.url);
                            navigate("/" + bookmark.name);
                            setBookmarkName(bookmark.name);
                            setBookmarkPopupShowing(false);
                          }}
                        />
                      ))}
                  </div>
                ))}
              </>
            )}
          </TreeView>
        </div>
      );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white">
      <div className="container">
        <div
          className="navbar-brand text-white logoText"
          style={{ marginLeft: "-100px", marginRight: "100px" }}
          href="/"
        >
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
        <div>
          <Button
            type="submit"
            sx={{
              backgroundColor: "transparent",
              color: "white",
              marginRight: "-22px",
              "&:hover": {
                backgroundColor: "transparent",
                color: "white",
              },
            }}
          >
            <IoArrowBackCircle size={35} sx={{ color: "white" }} />
          </Button>
          <Button
            type="submit"
            sx={{
              backgroundColor: "transparent",
              color: "white",
              marginRight: "-10px",
              "&:hover": {
                backgroundColor: "transparent",
                color: "white",
              },
            }}
          >
            <IoArrowForwardCircle size={35} />
          </Button>
        </div>
        <div className="collapse navbar-collapse" id="basic-navbar-nav">
          <div className="input-group me-1">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{ borderRadius: "5px 0px 0px 5px" }}
              >
                Address:
              </span>
            </div>
            <LinkInputField
              value={currentAddress}
              onChange={(e) => setCurrentAddress(e.target.value)}
              setFolders={setFolders}
              folders={folders}
            />
          </div>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <div
              className="btn btn-outline-light me-2"
              style={{ fontSize: "18px" }}
              onClick={() => {
                setCurrentAddress("http://localhost:3000/");
                setBookmarkName("Homepage");
              }}
            >
              <i class="fa fa-home"></i>
            </div>{" "}
          </Link>

          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-warning dropdown-toggle hoverable"
              onClick={() => setBookmarkPopupShowing(!isBookmarkPopupShowing)}
            >
              <i className="fa fa-bookmark-o" style={{ fontSize: "24px" }}></i>
            </button>
            <BookmarkPopup />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BrowserToolbar;
