import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { PiShareNetworkLight } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const location = useLocation();
  const product = location?.state;

  // Product WishList
  const [clicked, setClicked] = useState(false);

  const handleWishClick = () => {
    setClicked(!clicked);
  };

  // Product Detail to Redux
  const dispatch = useDispatch();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleAddToCart = () => {
    const productDetails = {
      productID: product?.id,
      productName: product?.title,
      productPrice: 1,
      frontImg: product?.image,
      fromDate: fromDate,
      toDate: toDate,
    };
    dispatch(addToCart(productDetails));
  };

  return (
    <div>
      <div className="productSection">
        <div className="productShowCase">
          <div className="productGallery">
            <div className="productFullImg">
              <img src={product?.image} alt="" />
            </div>
          </div>
          <div className="productDetails">
            <div className="productBreadcrumb">
              <div className="breadcrumbLink">
                <Link to="/">Home</Link>&nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
            </div>
            <div className="productName">
              <h1>{product?.title}</h1>
            </div>
            <div className="productRating">
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              {/* <p>8k+ reviews</p> */}
            </div>
            <div className="productPrice">
              <h3>{product?.author}</h3>

              <div className="d-flex gap-5 justify-content-between">
                <div>
                  <label className="form-label" htmlFor="from">
                    From
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="from"
                    id="from"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="to">
                    To
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="to"
                    id="to"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="fw-bold mt-3">Price: $1</div>
            </div>
            <div className="productDescription">
              <p>
                The Plague by Albert Camus is a profound and gripping novel set
                in the Algerian city of Oran, which is abruptly struck by a
                deadly plague. Through the eyes of Dr. Rieux and other
                townspeople, Camus explores themes of human suffering,
                resilience, and solidarity in the face of existential crisis.
              </p>
            </div>

            <div className="productCartQuantity">
              <div className="productCartBtn">
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
            <div className="productWishShare">
              <div className="productWishList">
                <button onClick={handleWishClick}>
                  <FiHeart color={clicked ? "red" : ""} size={17} />
                  <p className="mb-0">Add to Wishlist</p>
                </button>
              </div>
              <div className="productShare">
                <PiShareNetworkLight size={22} />
                <p className="mb-0">Share</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
