
import Slider from "./Slider.jsx";
import OverviewSection from "./OverviewSection.jsx";

import CustomTabs from "./CustomTabs.jsx";
import UserStories from "../../Components/UserStories";
import TravelSafety from "./TravelSafety.jsx";
import InteractiveMap from "./InteractiveMap.jsx";

const Home = () => {
  return (
    <>
      <Slider />
      <OverviewSection />
      
      <CustomTabs />
      <UserStories />
      <TravelSafety />
      <InteractiveMap />
    </>
  );
};

export default Home;
