import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core styles
import "swiper/css/navigation"; // Navigation styles
import "swiper/css/pagination"; // Pagination styles
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Hero from "./Hero"; // Your existing Hero component


const Slider = () => {
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
  return (
    <div className="w-full min-h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={true}
        className="rounded-2xl shadow-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Hero {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
