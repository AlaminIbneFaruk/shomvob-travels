import { Helmet } from "react-helmet";

import Slider from "./Slider.jsx";
import OverviewSection from "./OverviewSection.jsx";
import Multimedia from "./Multimedia.jsx";
const Home = () => {
  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/svg+xml"
          href=""
        />
        <title>Home | Sompurno Travels</title>
      </Helmet>

      <Slider></Slider>
      <OverviewSection></OverviewSection>
      <Multimedia></Multimedia>
    </>
  );
};

export default Home;
