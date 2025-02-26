import { Helmet } from "react-helmet";

import Slider from "./Slider.jsx";
import OverviewSection from "./OverviewSection.jsx";
import Multimedia from "./Multimedia.jsx";
import CustomTabs from "./CustomTabs.jsx";
import UserStories from "../../Components/UserStories";
import InteractiveMap from "./InteractiveMap.jsx";
import TravelSafety from "./TravelSafety.jsx";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Shomvob Travels</title>
      </Helmet>

      <Slider></Slider>
      <OverviewSection></OverviewSection>
      <Multimedia></Multimedia>
      <CustomTabs></CustomTabs>
      <UserStories></UserStories>
      <TravelSafety/>
      <InteractiveMap/>
    </>
);
};

export default Home;
