import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PackagePlan2 from "../Components/PackagePlan2";


const fetchTravelPackages = async () => {
  const response = await axios.get("http://localhost:9000/trip");
  if (!response.data) {
    throw new Error("Failed to fetch travel packages");
  }
  return response.data;
};

const Trip = () => {
  const {
    data: travelPackages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["travelPackages"],
    queryFn: fetchTravelPackages,
  });

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (isError) {
    return <p className="text-red-500">Error loading travel packages.</p>;
  }

  // Dynamic title based on the number of packages
 

  return (
    <>

      <section
        className="bg-fixed bg-cover bg-center min-h-screen"
        style={{
          backgroundImage: "url('https://i.ibb.co/wFhzgbjX/heroimg1.jpg')",
        }}
      >
        <div className="p-24 backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-center mb-6 text-white border-8 rounded-badge bg-black bg-opacity-70 backdrop-blur-md border-sky-200 max-w-96 mx-auto">
            Travel Packages
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelPackages.map((packageItem) => (
              <PackagePlan2
                packageplan={packageItem}
                key={packageItem?.id || Math.random()}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Trip;