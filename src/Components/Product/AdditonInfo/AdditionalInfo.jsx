import React, { useState } from "react";
import "./AdditionalInfo.css";

import user1 from "../../../Assets/Users/user1.jpeg";
import user2 from "../../../Assets/Users/user2.jpeg";

import { FaStar } from "react-icons/fa";
import Rating from "@mui/material/Rating";

const AdditionalInfo = () => {
  const [activeTab, setActiveTab] = useState("aiTab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="productAdditionalInfo">
      <div className="productAdditonalInfoContainer">
        <div className="productAdditionalInfoTabs">
          <div className="aiTabs">
            <p
              onClick={() => handleTabClick("aiTab1")}
              className={activeTab === "aiTab1" ? "aiActive" : ""}
            >
              Description
            </p>
            <p
              onClick={() => handleTabClick("aiTab3")}
              className={activeTab === "aiTab3" ? "aiActive" : ""}
            >
              Reviews (2)
            </p>
          </div>
        </div>
        <div className="productAdditionalInfoContent">
          {/* Tab1 */}

          {activeTab === "aiTab1" && (
            <div className="aiTabDescription">
              <div className="descriptionPara">
                <h3>The Plague</h3>
                <p>
                  The Plague by Albert Camus is a profound and gripping novel
                  set in the Algerian city of Oran, which is abruptly struck by
                  a deadly plague. Through the eyes of Dr. Rieux and other
                  townspeople, Camus explores themes of human suffering,
                  resilience, and solidarity in the face of existential crisis.
                  The story delves into the absurdity of life and the struggle
                  to find meaning amidst uncontrollable chaos. This timeless
                  classic remains a powerful reflection on human nature and
                  societal response to catastrophe.
                </p>
              </div>
              <div className="descriptionParaGrid">
                <div className="descriptionPara">
                  <h3>Why choose product?</h3>
                  <p>
                    <ul>
                      <li>Creat by cotton fibric with soft and smooth</li>
                      <li>
                        Simple, Configurable (e.g. size, color, etc.), bundled
                      </li>
                      <li>Downloadable/Digital Products, Virtual Products</li>
                    </ul>
                  </p>
                </div>
                <div className="descriptionPara">
                  <h3>Sample Number List</h3>
                  <p>
                    <ol>
                      <li>Creat by cotton fibric with soft and smooth</li>
                      <li>
                        Simple, Configurable (e.g. size, color, etc.), bundled
                      </li>
                      <li>Downloadable/Digital Products, Virtual Products</li>
                    </ol>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab3 */}

          {activeTab === "aiTab3" && (
            <div className="aiTabReview">
              <div className="aiTabReviewContainer">
                <h3>Reviews</h3>
                <div className="userReviews">
                  <div
                    className="userReview"
                    style={{ borderBottom: "1px solid #e4e4e4" }}
                  >
                    <div className="userReviewImg">
                      <img src={user1} alt="" />
                    </div>
                    <div className="userReviewContent">
                      <div className="userReviewTopContent">
                        <div className="userNameRating">
                          <h6>Janice Miller</h6>
                          <div className="userRating">
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                          </div>
                        </div>
                        <div className="userDate">
                          <p>April 06, 2023</p>
                        </div>
                      </div>
                      <div
                        className="userReviewBottomContent"
                        style={{ marginBottom: "30px" }}
                      >
                        <p>
                          Nam libero tempore, cum soluta nobis est eligendi
                          optio cumque nihil impedit quo minus id quod maxime
                          placeat facere possimus, omnis voluptas assumenda est…
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="userReview">
                    <div className="userReviewImg">
                      <img src={user2} alt="" />
                    </div>
                    <div className="userReviewContent">
                      <div className="userReviewTopContent">
                        <div className="userNameRating">
                          <h6>Benjam Porter</h6>
                          <div className="userRating">
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                          </div>
                        </div>
                        <div className="userDate">
                          <p>April 12, 2023</p>
                        </div>
                      </div>
                      <div className="userReviewBottomContent">
                        <p>
                          Nam libero tempore, cum soluta nobis est eligendi
                          optio cumque nihil impedit quo minus id quod maxime
                          placeat facere possimus, omnis voluptas assumenda est…
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="userNewReview">
                  <div className="userNewReviewMessage">
                    <h5>
                      Be the first to review “Lightweight Puffer Jacket With a
                      Hood”
                    </h5>
                    <p>
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                  </div>
                  <div className="userNewReviewRating">
                    <label>Your rating *</label>
                    <Rating name="simple-controlled" size="small" />
                  </div>
                  <div className="userNewReviewForm">
                    <form>
                      <textarea cols={30} rows={8} placeholder="Your Review" />
                      <input
                        type="text"
                        placeholder="Name *"
                        required
                        className="userNewReviewFormInput"
                      />
                      <input
                        type="email"
                        placeholder="Email address *"
                        required
                        className="userNewReviewFormInput"
                      />
                      <div className="userNewReviewFormCheck">
                        <label>
                          <input type="checkbox" placeholder="Subject" />
                          Save my name, email, and website in this browser for
                          the next time I comment.
                        </label>
                      </div>

                      <button type="submit">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
