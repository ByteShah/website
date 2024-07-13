import React from "react";
import "./CollectionBox.css";
import Img1 from "../../../Assets/Collection/1.jpg";
import Img2 from "../../../Assets/Collection/2.jpg";
import Img3 from "../../../Assets/Collection/3.jpg";
import { Link } from "react-router-dom";

const CollectionBox = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="collection">
        <div
          className="collectionLeft text-white"
          style={{ backgroundImage: `url(${Img1})` }}
        >
          <p className="col-p">Top Picks</p>
          <h3 className="col-h3">
            <span>Tech Corp</span>
          </h3>
          <div className="col-link">
            <Link to="/workspace/tech-corp" onClick={scrollToTop}>
              <h5 className="text-white">Checkout Now</h5>
            </Link>
          </div>
        </div>
        <div className="collectionRight">
          <div
            className="collectionTop text-white"
            style={{ backgroundImage: `url(${Img2})` }}
          >
            <p className="col-p">Top Picks</p>
            <h3 className="col-h3">
              <span>Health Inc</span>
            </h3>
            <div className="col-link">
              <Link to="/workspace/health-inc" onClick={scrollToTop}>
                <h5 className="text-white">Checkout Now</h5>
              </Link>
            </div>
          </div>
          <div className="collectionBottom">
            <div
              className="box1 text-white"
              style={{ backgroundImage: `url(${Img3})` }}
            >
              <p className="col-p">Top Picks</p>
              <h3 className="col-h3">
                <span>Edu Labs</span>
              </h3>
              <div className="col-link">
                <Link to="/workspace/edu-labs" onClick={scrollToTop}>
                  <h5 className="text-white">Checkout Now</h5>
                </Link>
              </div>
            </div>
            <div className="box2">
              <h3 className="col-h3">
                <span>E-gift</span> Cards
              </h3>
              <p className="col-p">
                Surprise someone with the gift they really want.
              </p>
              <div className="col-link">
                <Link to="/shop" onClick={scrollToTop}>
                  <h5>Checkout Now</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionBox;
