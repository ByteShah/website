import React, { useEffect, useState } from "react";
import "./Trendy.css";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";

import { Link, useNavigate } from "react-router-dom";

import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";

const Trendy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [bookData, setBookData] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSeller, setBetSeller] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [wishList, setWishList] = useState({});

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

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

    // New Arrivals
    axios
      .get("http://192.168.1.217:8000/api/latestbooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          setNewArrivals(res?.data?.data);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    // Best Seller
    axios
      .get("http://192.168.1.217:8000/api/bestseller", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          setBetSeller(res?.data?.data);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    // Top Rated
    axios
      .get("http://192.168.1.217:8000/api/toprated", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          setTopRated(res?.data?.data);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <div>
      <div className="trendyProducts">
        <h2>
          Our Trendy <span>Books</span>
        </h2>
        <div className="trendyTabs">
          <div className="tabs">
            <p
              onClick={() => handleTabClick("tab1")}
              className={activeTab === "tab1" ? "active" : ""}
            >
              All
            </p>
            <p
              onClick={() => handleTabClick("tab2")}
              className={activeTab === "tab2" ? "active" : ""}
            >
              New Arrivals
            </p>
            <p
              onClick={() => handleTabClick("tab3")}
              className={activeTab === "tab3" ? "active" : ""}
            >
              Best Seller
            </p>
            <p
              onClick={() => handleTabClick("tab4")}
              className={activeTab === "tab4" ? "active" : ""}
            >
              Top Rated
            </p>
          </div>
          <div className="trendyTabContent">
            {/* Tab 1 */}

            {activeTab === "tab1" && (
              <div className="trendyMainContainer">
                {bookData.slice(0, 8).map((book) => {
                  return (
                    <div className="trendyProductContainer" key={book.id}>
                      <div className="trendyProductImages">
                        <div
                          to="/Product"
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
                          <img
                            src={book.image}
                            alt=""
                            className="trendyProduct_front"
                          />
                        </div>
                      </div>

                      <div className="trendyProductInfo">
                        <div className="trendyProductCategoryWishlist">
                          <p>{book?.genre}</p>
                          <FiHeart
                            onClick={() => handleWishlistClick(book.id)}
                            style={{
                              color: wishList[book.id] ? "red" : "#767676",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="trendyProductNameInfo">
                          <Link to="product" onClick={scrollToTop}>
                            <h5>{book.title}</h5>
                          </Link>

                          <p>{book.author}</p>
                          <div className="trendyProductRatingReviews">
                            <div className="trendyProductRatingStar">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                            {/* <span>{product.productReviews}</span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 2 */}

            {activeTab === "tab2" && (
              <div className="trendyMainContainer">
                {newArrivals.slice(0, 8).map((book) => {
                  return (
                    <div key={book?.id} className="trendyProductContainer">
                      <div className="trendyProductImages">
                        <Link to="/Product" onClick={scrollToTop}>
                          <img
                            src={book.image}
                            alt=""
                            className="trendyProduct_front"
                          />
                        </Link>
                      </div>
                      <div className="trendyProductInfo">
                        <div className="trendyProductCategoryWishlist">
                          <p>{book?.genre}</p>
                          <FiHeart
                            onClick={() => handleWishlistClick(book.id)}
                            style={{
                              color: wishList[book.id] ? "red" : "#767676",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="trendyProductNameInfo">
                          <Link to="product" onClick={scrollToTop}>
                            <h5>{book.title}</h5>
                          </Link>

                          <p>{book.author}</p>
                          <div className="trendyProductRatingReviews">
                            <div className="trendyProductRatingStar">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                            {/* <span>{product.productReviews}</span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 3 */}

            {activeTab === "tab3" && (
              <div className="trendyMainContainer">
                {bestSeller.slice(0, 8).map((book) => {
                  return (
                    <div key={book?.id} className="trendyProductContainer">
                      <div className="trendyProductImages">
                        <Link to="/Product" onClick={scrollToTop}>
                          <img
                            src={book.image}
                            alt=""
                            className="trendyProduct_front"
                          />
                        </Link>
                      </div>
                      <div className="trendyProductInfo">
                        <div className="trendyProductCategoryWishlist">
                          <p>{book?.genre}</p>
                          <FiHeart
                            onClick={() => handleWishlistClick(book.id)}
                            style={{
                              color: wishList[book.id] ? "red" : "#767676",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="trendyProductNameInfo">
                          <Link to="product" onClick={scrollToTop}>
                            <h5>{book.title}</h5>
                          </Link>

                          <p>{book.author}</p>
                          <div className="trendyProductRatingReviews">
                            <div className="trendyProductRatingStar">
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
                  );
                })}
              </div>
            )}

            {/* Tab 4 */}

            {activeTab === "tab4" && (
              <div className="trendyMainContainer">
                {topRated.slice(0, 8).map((book) => {
                  return (
                    <div key={book?.id} className="trendyProductContainer">
                      <div className="trendyProductImages">
                        <Link to="/Product">
                          <img
                            src={book.image}
                            alt=""
                            className="trendyProduct_front"
                          />
                        </Link>
                      </div>
                      <div className="trendyProductInfo">
                        <div className="trendyProductCategoryWishlist">
                          <p>{book?.genre}</p>
                          <FiHeart
                            onClick={() => handleWishlistClick(book.id)}
                            style={{
                              color: wishList[book.id] ? "red" : "#767676",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="trendyProductNameInfo">
                          <Link to="/product" onClick={scrollToTop}>
                            <h5>{book.title}</h5>
                          </Link>

                          <p>{book.author}</p>
                          <div className="trendyProductRatingReviews">
                            <div className="trendyProductRatingStar">
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
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="discoverMore">
          <Link to="/shop" onClick={scrollToTop}>
            <p>Discover More</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Trendy;
