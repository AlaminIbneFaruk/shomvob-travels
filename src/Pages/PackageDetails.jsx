import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Gallery from "../Components/Gallery";

// Fetch package details
const fetchPackageDetails = async ({ queryKey }) => {
  const [, id] = queryKey;
  const response = await axios.get(`http://localhost:9000/packages/${id}`);
  return response.data;
};

// Fetch tour guide details based on tourGuideIds
const fetchTourGuideDetails = async ({ queryKey }) => {
  const [, tourGuideIds] = queryKey;
  const response = await axios.get(`http://localhost:9000/guides`, {
    params: { ids: tourGuideIds.join(",") }, // Send all tourGuideIds as a comma-separated string
  });
  return response.data;
};

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // First query: Fetch package details
  const {
    data: packageData,
    isLoading: packageLoading,
    error: packageError,
  } = useQuery({
    queryKey: ["package", id],
    queryFn: fetchPackageDetails,
  });

  // Use all tourGuideIds from packageData
  const tourGuideIds = packageData?.tourGuideIds || [];

  // Second query: Fetch tour guide details using all tourGuideIds
  const {
    data: tourGuideData,
    isLoading: tourGuideLoading,
    error: tourGuideError,
  } = useQuery({
    queryKey: ["tourGuides", tourGuideIds],
    queryFn: fetchTourGuideDetails,
    enabled: !!tourGuideIds.length, // Only fetch if tourGuideIds has length > 0
  });

  // Filter tourGuideIds to match fetched tourGuideData IDs
  const matchedTourGuideIds = tourGuideIds.filter((id) =>
    tourGuideData?.some((guide) => guide._id === id)
  );

  // Filter tourGuideData to include only matched IDs
  const matchedTourGuideData =
    tourGuideData?.filter((guide) => matchedTourGuideIds.includes(guide._id)) ||
    [];

  if (packageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-200 p-20">
        <div className="animate-pulse w-full max-w-6xl bg-gray-300 h-96 rounded-lg"></div>
      </div>
    );
  }

  if (packageError || !packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-200 p-20">
        <p className="text-xl text-red-600">
          {packageError
            ? `Error: ${packageError.message}`
            : "Failed to load package details."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-blue-200 p-8 mt-12">
      <div className="card w-full max-w-6xl shadow-xl bg-base-100 p-6 rounded-xl">
        <div className=" text-sky-900">
          <h2 className="text-4xl font-bold text-center mb-6">
            {packageData.name || "Package Name"}
          </h2>

          {packageData.stockImages?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {packageData.stockImages.map((image, index) => (
                <Gallery key={index} image={image} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4 text-center">
              No additional images available.
            </p>
          )}

          <div className="flex flex-wrap gap-6 shadow-lg hover:shadow-2xl">
            <div className="space-y-4 flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl">
              <h3 className="text-3xl font-semibold">🏝️ Tour Information</h3>
              {[{ 
                label: "Description", value: packageData.description
              },
              { 
                label: "Duration", value: packageData.duration  
              },{ 
                label: "Tour Type", value: packageData.tourType
              },{ 
                label: "Destination", value: packageData.destination
              }].map(
                (item, index) => (
                  <div
                    key={index}
                    className="card p-4 shadow-lg hover:shadow-2xl border border-blue-500 rounded-md"
                  >
                    <div className="">
                      <h4 className="text-2xl font-bold mb-5 card-title">
                        {item.label}
                      </h4>
                      <p className="text-lg">{item.value || "Not available"}</p>
                    </div>
                  </div>
                )
              )}
              {/* Tour Guides Section - Show details for matched tour guides */}
              {tourGuideLoading ? (
                <div className="mt-8 text-center">
                  <p>Loading tour guide details...</p>
                </div>
              ) : tourGuideError ? (
                <div className="mt-8 text-center">
                  <p className="text-red-600">
                    Error loading tour guide details: {tourGuideError.message}
                  </p>
                </div>
              ) : matchedTourGuideData.length > 0 ? (
                <div className="mt-8">
                  <h3 className="text-3xl font-semibold text-center">
                    👨‍💼 Matched Tour Guides
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {matchedTourGuideData.map((guide) => (
                      <div
                        key={guide._id}
                        className="p-4 border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl"
                      >
                        <Link to={`/guide/${guide?._id}`}>
                          <h1 className="font-bold mb-5">{guide?.name}</h1>
                          <p className="font-serif">{guide?.bio}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-8 text-center">
                  <p className="text-gray-500">
                    No matched tour guide details available.
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl">
              <h3 className="text-3xl font-semibold">💼 Package Information</h3>
              <div className="card shadow-lg hover:shadow-2xl p-4 border border-blue-500 rounded-md mt-4">
                <h4 className="card-title text-lg font-bold mb-4">💰 Package Price</h4>
                <p className="text-2xl font-bold text-blue-600">
                  ৳{packageData.price}
                </p>
              </div>
              <div className="card shadow-lg hover:shadow-2xl p-4 border border-blue-500 rounded-md mt-4">
                <h4 className="card-title text-xl font-bold mb-4">⭐ Rating</h4>
                <p className="font-bold text-lg">
                  {packageData.rating || "Not rated yet"} ⭐
                </p>
              </div>
              <div className="card shadow-lg hover:shadow-2xl p-4 border border-blue-500 rounded-md mt-4">
                <div className="card-body">
                  <h4 className="card-title text-xl font-bold mb-4">
                    📋 Inclusions
                  </h4>
                  <ul className="text-lg space-y-2">
                    {packageData.inclusions.map((inclusion, index) => (
                      <li key={index}>✅ {inclusion}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="card shadow-lg hover:shadow-2xl p-4 border border-blue-500 rounded-md mt-4">
                <div className="card-body">
                  <h4 className="card-title text-lg font-bold mb-4">
                    📅 Itinerary
                  </h4>
                  {packageData.itinerary?.length > 0 ? (
                    <div className="space-y-2">
                      {packageData.itinerary.map((day, index) => (
                        <div key={index}>
                          <h5 className="font-semibold">
                            Day {day.day}: {day.title}
                          </h5>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No itinerary available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              navigate(`/book-form/${id}`, {
                state: {
                  packageData: {
                    id: packageData._id,
                    name: packageData.name,
                    price: packageData.price,
                    description: packageData.description,
                    duration: packageData.duration,
                    tourType: packageData.tourType,
                    destination: packageData.destination,
                    // Add any other package fields you need
                  },
                  tourGuides: matchedTourGuideData.map((guide) => ({
                    name: guide.name,
                    _id: guide._id,
                  })),
                },
              })
            }
            className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg border border-transparent"
          >
            🚀 Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
