import React, {useEffect, useState} from "react";

function BookmarkName({bookmarkName}) {
    const [name, setName] = useState("Homepage");
    useEffect(() => {
        window.onLocationChange = () => {
            setName(window.location.href.split("/")[3])
        }
    }, []);
  return (
    <div>
      <h1>{bookmarkName}</h1>
    </div>
  );
}

export default BookmarkName;
