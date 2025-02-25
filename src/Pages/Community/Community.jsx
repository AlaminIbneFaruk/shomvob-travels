import Hero from "../../Components/Hero";
import UserStories from "../../Components/UserStories";

const Community = () => {
  return (
    <div>
      <Hero 
        image={"https://i.ibb.co/wFhzgbjX/heroimg1.jpg"} 
        title={"Explore Together: Join Our Travel Community"} 
        description={
          "Join our vibrant community of travel enthusiasts where you can share your adventures, seek advice, and connect with fellow explorers. Discover new destinations, share tips, and create unforgettable memories together!"
        } 
      />
      <UserStories/>
    </div>
  );
};

export default Community;
