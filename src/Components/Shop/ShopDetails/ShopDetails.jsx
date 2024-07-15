import React, { useEffect, useState } from "react";
import "./ShopDetails.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import Filter from "../Filters/Filter";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";

const ShopDetails = () => {
  const navigate = useNavigate();

  const [bookData, setBookData] = useState([]);
  const [filteredBookData, setFilteredBookData] = useState([]);
  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;

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
          setFilteredBookData(res?.data?.data); // Set filtered data initially to full data
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  useEffect(() => {
    const results = bookData.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookData(results);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, bookData]);

  const totalPages = Math.ceil(filteredBookData.length / itemsPerPage);
  const displayedBooks = filteredBookData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <div>
      <div className="shopDetails">
        <div className="shopDetailMain justify-content-center">
          {/* <div className="shopDetails__left">
            <Filter />
          </div> */}
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
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {displayedBooks.map((book) => (
                  <div key={book?.id} className="sdProductContainer">
                    <div className="sdProductImages">
                      <div
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
                          className="sdProduct_front"
                        />
                      </div>
                    </div>
                    <div className="sdProductInfo">
                      <div className="sdProductCategoryWishlist">
                        <p>{book?.genre}</p>
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="shopDetailsPagination">
              <div className="sdPaginationPrev">
                <p
                  onClick={() =>
                    handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                  }
                >
                  <FaAngleLeft />
                  Prev
                </p>
              </div>
              <div className="sdPaginationNumber">
                <div className="paginationNum">
                  {[...Array(totalPages).keys()].map((number) => (
                    <p
                      key={number + 1}
                      onClick={() => handlePageChange(number + 1)}
                      className={currentPage === number + 1 ? "active" : ""}
                    >
                      {number + 1}
                    </p>
                  ))}
                </div>
              </div>
              <div className="sdPaginationNext">
                <p
                  onClick={() =>
                    handlePageChange(
                      currentPage < totalPages ? currentPage + 1 : totalPages
                    )
                  }
                >
                  Next
                  <FaAngleRight />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
