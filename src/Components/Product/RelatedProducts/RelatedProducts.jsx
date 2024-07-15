import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import StoreData from "../../../Data/StoreData";

import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RelatedProducts = () => {
  const navigate = useNavigate();
  const [wishList, setWishList] = useState({});

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

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="relatedProductSection">
        <div className="relatedProducts">
          <h2>
            RELATED <span>BOOKS</span>
          </h2>
        </div>
        <div className="relatedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          <Swiper
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
            }}
            modules={[Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 30,
              },
            }}
          >
            {bookData.slice(0, 8).map((book) => {
              return (
                <SwiperSlide key={book.id}>
                  <div className="rpContainer">
                    <div
                      className="rpImages"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                        navigate("/Product", {
                          state: book,
                        });
                      }}
                    >
                      <img src={book.image} alt="" className="rpFrontImg" />
                    </div>

                    <div className="relatedProductInfo">
                      <div className="rpCategoryWishlist">
                        <p>{book?.genre}</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(book.id)}
                          style={{
                            color: wishList[book.id] ? "red" : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="productNameInfo">
                        <h5 onClick={scrollToTop}>{book.title}</h5>
                        <p>{book.author}</p>
                        <div className="productRatingReviews">
                          <div className="productRatingStar">
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                          </div>
                          {/* <span>{book.productReviews}</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
