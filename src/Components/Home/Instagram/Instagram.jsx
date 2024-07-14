import React, { useEffect, useState } from "react";
import "./Instagram.css";
import axios from "axios";

const Instagram = () => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get("http://192.168.1.217:8000/api/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          setBookData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <div>
      <div className="instagram">
        <h2>@UOMO</h2>
        <div className="instagramTiles">
          {bookData
            ?.map((book) => {
              return (
                <div key={book?.id} className="instagramtile">
                  <img src={book?.image} alt="" />
                </div>
              );
            })
            .slice(0, 12)}
        </div>
      </div>
    </div>
  );
};

export default Instagram;
