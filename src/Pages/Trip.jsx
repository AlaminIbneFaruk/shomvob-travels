import { useEffect, useState } from "react";
import PackagePlan from "../Components/PackagePlan";

const Trip = () => {
  const [travelPackages, setTravelPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelPackages = async () => {
      try {
        const response = await fetch("https://assignment-12-server-lely8d3w9.vercel.app/trip");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
  
        // Ensure data is correctly structured before setting state
        if (Array.isArray(data)) {
          setTravelPackages(data); // API returns an array directly
        } else if (Array.isArray(data.travelPackages)) {
          setTravelPackages(data.travelPackages); // If wrapped inside travelPackages
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTravelPackages();
  }, []);
  

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 font-semibold">Error: {error}</div>;
  }

  return (
    <section
      className="bg-fixed bg-cover bg-center min-h-screen"
      style={{ backgroundImage: "url('https://i.ibb.co/wFhzgbjX/heroimg1.jpg')" }}
    >
      <div className="p-24 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-center mb-6">Travel Packages</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {travelPackages.map((packageItem) => (
            <PackagePlan packageplan={packageItem} key={packageItem?.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trip;
