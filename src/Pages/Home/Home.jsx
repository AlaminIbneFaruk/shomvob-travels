import { Helmet } from "react-helmet";

import Slider from "./Slider.jsx";
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
    </>
  );
};

export default Home;
