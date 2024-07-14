import React, { useEffect, useState } from "react";
import "./ShopDetails.css";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";

import Filter from "../Filters/Filter";
import { Link } from "react-router-dom";
import StoreData from "../../../Data/StoreData";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";

const ShopDetails = () => {
  const dispatch = useDispatch();

  const [bookData, setBookData] = useState([]);
  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
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
  }, []);

  return (
    <div>
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter />
          </div>
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  Home
                </Link>
                &nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp />
                <p>Filter</p>
              </div>
              <div className="shopDetailsSort">
                <select name="sort" id="sort">
                  <option value="default">Default Sorting</option>
                  <option value="Featured">Featured</option>
                  <option value="bestSelling">Best Selling</option>
                  <option value="a-z">Alphabetically, A-Z</option>
                  <option value="z-a">Alphabetically, Z-A</option>
                  <option value="lowToHigh">Price, Low to high</option>
                  <option value="highToLow">Price, high to low</option>
                  <option value="oldToNew">Date, old to new</option>
                  <option value="newToOld">Date, new to old</option>
                </select>
                <div className="filterRight" onClick={toggleDrawer}>
                  <div className="filterSeprator"></div>
                  <IoFilterSharp />
                  <p>Filter</p>
                </div>
              </div>
            </div>
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {bookData?.slice(0, 6).map((book) => (
                  <div key={book?.id} className="sdProductContainer">
                    <div className="sdProductImages">
                      <Link to="/Product" onClick={scrollToTop}>
                        <img
                          src={book.image}
                          alt=""
                          className="sdProduct_front"
                        />
                        {/* <img
                          src={product.backImg}
                          alt=""
                          className="sdProduct_back"
                        /> */}
                      </Link>
                      <h4 onClick={() => dispatch(addToCart(book))}>
                        Add to Cart
                      </h4>
                    </div>
                    <div
                      className="sdProductImagesCart"
                      onClick={() => dispatch(addToCart(book))}
                    >
                      <FaCartPlus />
                    </div>
                    <div className="sdProductInfo">
                      <div className="sdProductCategoryWishlist">
                        <p>Dresses</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(book.id)}
                          style={{
                            color: wishList[book.id] ? "red" : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="sdProductNameInfo">
                        <Link to="/product" onClick={scrollToTop}>
                          <h5>{book.title}</h5>
                        </Link>

                        <p>{book.author}</p>
                        <div className="sdProductRatingReviews">
                          <div className="sdProductRatingStar">
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
                ))}
              </div>
            </div>
            <div className="shopDetailsPagination">
              <div className="sdPaginationPrev">
                <p onClick={scrollToTop}>
                  <FaAngleLeft />
                  Prev
                </p>
              </div>
              <div className="sdPaginationNumber">
                <div className="paginationNum">
                  <p onClick={scrollToTop}>1</p>
                  <p onClick={scrollToTop}>2</p>
                  <p onClick={scrollToTop}>3</p>
                  <p onClick={scrollToTop}>4</p>
                </div>
              </div>
              <div className="sdPaginationNext">
                <p onClick={scrollToTop}>
                  Next
                  <FaAngleRight />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Drawer */}
      <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <p>Filter By</p>
          <IoClose onClick={closeDrawer} className="closeButton" size={26} />
        </div>
        <div className="drawerContent">
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
