import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PackagePlan2 from "../Components/PackagePlan2";

const fetchTravelPackages = async () => {
  try {
    const response = await axios.get("http://localhost:9000/packages");
    if (response.status === 200) {
      return response.data; // Returns the data if the status is 200 (OK)
    } else {
      throw new Error(
        "Failed to fetch travel packages, unexpected response status"
      );
    }
  } catch (error) {
    // Catch errors such as network errors or bad responses
    console.error("Error fetching travel packages:", error.message);
    throw new Error("Failed to fetch travel packages");
  }
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
    return (
      <>
        <p className="text-red-500">Error loading travel packages.</p>
        {/* Log the error for debugging */}
        {console.error("Error loading travel packages")}
      </>
    );
  }

  // Dynamic title based on the number of packages
  const title =
    travelPackages.length === 0
      ? "No Packages Available"
      : `Travel Packages (${travelPackages.length})`;

  return (
    <div className="mt-24 lg:mt-0">
      <section
        className="bg-fixed bg-cover bg-center min-h-screen mt-24 mx-auto gap-8"
        style={{
          backgroundImage: "url('https://i.ibb.co/wFhzgbjX/heroimg1.jpg')",
        }}
      >
        <div className="lg:p-24 p-6 mx-auto backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white border-8 rounded-badge bg-black bg-opacity-70 backdrop-blur-md border-sky-200 mx-auto">
            {title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelPackages.map((packageItem) => (
              <PackagePlan2
                packageplan={packageItem}
                key={
                  packageItem?.id || `${packageItem?.name}-${packageItem?.slug}`
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Trip;
