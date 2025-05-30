
import Hero from "../Components/Hero.jsx";
import UserStories2 from "../Components/UserStories2.jsx";

const Community = () => {
  return (
    <div className="bg-sky-200">
      <Hero 
        image={"https://i.ibb.co/wFhzgbjX/heroimg1.jpg"} 
        title={"Explore Together: Join Our Travel Community"} 
        description={
          "Join our vibrant community of travel enthusiasts where you can share your adventures, seek advice, and connect with fellow explorers. Discover new destinations, share tips, and create unforgettable memories together!"
        } 
      />
      <UserStories2/>
    </div>
  );
};

export default Community;
