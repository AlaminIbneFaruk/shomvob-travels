import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Hero from "./Hero";

const slides = [
  {
    image: "https://i.ibb.co.com/twnYDdGg/bg-3.jpg",
    title: "Discover Your Next Adventure",
    description: "Explore breathtaking destinations and create unforgettable memories.",
    buttonText: "Explore Now",
  },
  {
    image: "https://i.ibb.co.com/NdhDpPM6/bg2.webp",
    title: "Experience Luxury Travel",
    description: "Indulge in world-class accommodations and premium services.",
    buttonText: "Book a Trip",
  },
  {
    image: "https://i.ibb.co.com/wFhzgbjX/heroimg1.jpg",
    title: "Travel Beyond Limits",
    description: "Unleash your wanderlust and explore hidden gems around the world.",
    buttonText: "Start Your Journey",
  },
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute w-full h-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Hero 
            image={slides[index].image} 
            title={slides[index].title} 
            description={slides[index].description} 
            buttonText={slides[index].buttonText} 
          />
        </motion.div>
      </AnimatePresence>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
