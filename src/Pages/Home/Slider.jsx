import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Hero from "../../Components/Hero";

const slides = [
  {
    image: "https://i.ibb.co/twnYDdGg/bg-3.jpg",
    title: "Discover Your Next Adventure",
    description: "Explore breathtaking destinations and create unforgettable memories.",
    buttonText: "Explore Now",
  },
  {
    image: "https://i.ibb.co/NdhDpPM6/bg2.webp",
    title: "Experience Luxury Travel",
    description: "Indulge in world-class accommodations and premium services.",
    buttonText: "Book a Trip",
  },
  {
    image: "https://i.ibb.co/wFhzgbjX/heroimg1.jpg",
    title: "Travel Beyond Limits",
    description: "Unleash your wanderlust and explore hidden gems around the world.",
    buttonText: "Start Your Journey",
  },
];

const Slider = () => {
  return (
    <div className="w-full min-h-[20vh] bg-sky-200">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={5000}
        transitionTime={800}
        emulateTouch
        className="z-0"
      >
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Hero {...slide} />
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
