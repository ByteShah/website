import React from "react";
import CollectionBox from "../Components/Home/Collection/CollectionBox";
import Services from "../Components/Home/Services/Services";
import Instagram from "../Components/Home/Instagram/Instagram";
import Trendy from "../Components/Home/Trendy/Trendy";
import DealTimer from "../Components/Home/Deal/DealTimer";

const Home = () => {
  return (
    <div>
      <CollectionBox />
      <Trendy />
      <DealTimer />
      <Instagram />
      <Services />
    </div>
  );
};

export default Home;
