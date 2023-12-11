import React, {useEffect, useState} from "react";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {Button, Select} from "@mui/joy";
import {Option} from '@mui/joy';
import Input from '@mui/joy/Input';
import {IoIosAddCircle} from "react-icons/io";
import {MdCancel} from "react-icons/md";
import Dropdown from '@mui/joy/Dropdown';

const LinkInputField = ({value, onChange, folders, setFolders, ...rest}) => {

    const [bookmarkPopupShowing, setBookmarkPopupShowing] = useState(false);

    const [bookmarkName, setBookmarkName] = useState("");
    const [bookmarkFolder, setBookmarkFolder] = useState("Parent");

    const [isAddingFolder, setIsAddingFolder] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        setIsAddingFolder(false)
    }, [bookmarkPopupShowing]);


    useEffect(() => {
        const res = localStorage.getItem("bookmarks")
        let folders = JSON.parse(res)
        if (!folders) {
            folders = [{name: "Parent", bookmarks: []}]
            setFolders(folders)
            localStorage.setItem("bookmarks", JSON.stringify(folders))
            return;
        }

        let isBookmarkFound = false
        for (let i = 0; i < folders?.length; i++) {
            for (let j = 0; j < folders[i].bookmarks.length; j++) {
                if (folders[i].bookmarks[j].url === value) {
                    setIsBookmarked(true)
                    setBookmarkName(folders[i].bookmarks[j].name)
                    setBookmarkFolder(folders[i].name)
                    isBookmarkFound = true
                    break
                }
            }
            if (isBookmarkFound) break;
        }

        if (!isBookmarkFound) {
            setIsBookmarked(false)
            setBookmarkName("")
            setBookmarkFolder("Parent")
        }
        
    }, [value]);


    useEffect(() => {
        localStorage.getItem("bookmarks") && setFolders(JSON.parse(localStorage.getItem("bookmarks")));
    }, []);
    const handleBookmark = () => {
        setBookmarkPopupShowing(!bookmarkPopupShowing);
        // onBookmark();
    }

    const handleNameChange = (e) => {
        setBookmarkName(e.target.value)
    }

    const handleFolderChange = (e, val) => {
        if (val === "+") {
            setIsAddingFolder(true);
        } else {
            setBookmarkFolder(val)
        }
    }


    const handleFolderNameChange = (e, val) => {
        if (e.target.value) {
            setBookmarkFolder(e.target.value)
        }

    }
    const handleAddBookmark = async () => {
        if (!bookmarkName || bookmarkName.trim() === "") return alert("Please enter a name for the bookmark")
        if (isAddingFolder) {
            if (!bookmarkFolder || bookmarkFolder.trim() === "") return alert("Please enter a name for the folder")
        }


        const res = localStorage.getItem("bookmarks")
        let folders = await JSON.parse(res)

        // if bookmark exists with same name, warn user and return
        for (let i = 0; i < folders.length; i++) {
            for (let j = 0; j < folders[i].bookmarks.length; j++) {
                if (folders[i].bookmarks[j].url !== value && folders[i].bookmarks[j].name === bookmarkName) {
                    alert("A bookmark with this name already exists")
                    return;
                }
            }
        }


        for (let i = 0; i < folders.length; i++) {
            for (let j = 0; j < folders[i].bookmarks.length; j++) {
                if (folders[i].bookmarks[j].url === value) {
                    folders[i].bookmarks.splice(j, 1)
                }
            }
        }


        let folderAlreadyExists = false;
        for (let i = 0; i < folders.length; i++) {
            if (folders[i].name === bookmarkFolder) {
                folders[i].bookmarks?.filter((bookmark) => bookmark.url !== value)
                folders[i].bookmarks.push({name: bookmarkName, url: value})
                folderAlreadyExists = true;
            }
        }
        if (!folderAlreadyExists) {
            folders.push({name: bookmarkFolder, bookmarks: [{name: bookmarkName, url: value}]})
            setFolders(folders)
        }
        localStorage.setItem("bookmarks", JSON.stringify(folders))
        setFolders(folders)
        setBookmarkPopupShowing(false)
        setIsBookmarked(true)
    }

    const handleRemoveBookmark = () => {
        const res = localStorage.getItem("bookmarks")
        let folders = JSON.parse(res)
        for (let i = 0; i < folders.length; i++) {
            for (let j = 0; j < folders[i].bookmarks.length; j++) {
                if (folders[i].bookmarks[j].url === value) {
                    folders[i].bookmarks.splice(j, 1)
                    if (folders[i].bookmarks.length === 0 && folders[i].name !== "Parent") {
                        console.log("deleting folder")
                        folders.splice(i, 1)
                        setIsBookmarked(false)
                        break
                    }
                    setIsBookmarked(false)
                }
            }
        }
        setFolders(folders)
        localStorage.setItem("bookmarks", JSON.stringify(folders))
        setBookmarkPopupShowing(false)
    }

    return (
        <div style={{width: "80%", display: "flex"}}>
            <input
                type="text"
                className="form-control"
                placeholder="Current Address"
                aria-label="Current Address"
                aria-describedby="basic-addon1"
                onChange={onChange}
                value={value}
                {...rest}
                style={{display: "flex", alignItems: "center", borderRadius: "0px 0px 0px 0px"}}
            />
            <button style={{}} className={"bookmark-button"} onClick={handleBookmark}>
                {isBookmarked ? <FaBookmark/> : <FaRegBookmark/>}
            </button>
            {
                bookmarkPopupShowing && (
                    <div className={"bookmark-popup"}>
                        Add to Bookmarks
                        <Input placeholder="Name" variant="outlined" onChange={handleNameChange} style={{marginTop: 10}}
                               value={bookmarkName}/>
                        {isAddingFolder ? (
                            <Input placeholder="Folder name" variant="outlined" onChange={handleFolderNameChange}
                                   style={{marginTop: 10}}
                                   endDecorator={<MdCancel size={20} onClick={() => setIsAddingFolder(false)}/>}
                            />

                        ) : <Select onChange={handleFolderChange} style={{marginTop: 10}} defaultValue={bookmarkFolder}
                                    placeholder="Choose Folder...">
                            <Option value={"+"}> <IoIosAddCircle/> Add Folder... </Option>
                            {
                                folders.map((folder) => {
                                    return <Option value={folder.name}>{folder.name}</Option>
                                })
                            }
                        </Select>}
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 10}}>
                            <Button variant="solid" style={{marginRight: 10}} onClick={handleAddBookmark}>Add</Button>
                            {isBookmarked && <Button variant="outlined" onClick={handleRemoveBookmark}>Remove</Button>}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default LinkInputField;