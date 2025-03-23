import { useEffect, useState } from "react";
import Gallery from "../Components/Gallery";
import { useParams } from "react-router-dom";
const Package = () => {
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/packages-details/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPackageData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching package data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-200 p-20">
        <div className="animate-pulse w-full max-w-6xl bg-gray-300 h-96 rounded-lg"></div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-200 p-20">
        <p className="text-xl text-red-600">Failed to load package details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200 p-20 hover:bg-blue-400 transition duration-300">
      <div className="card w-full max-w-6xl shadow-xl bg-base-100 hover:bg-blue-300 transition duration-300 p-6 rounded-xl">
        <div className="card-body text-sky-900 transition duration-300">
          {/* Package Title */}
          <h2 className="text-4xl font-bold text-center mb-6">
            {packageData.name || "Package Name"}
          </h2>

          {/* Image Gallery */}
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

          <div className="flex flex-wrap gap-6">
            {/* Tour Information */}
            <div className="space-y-4 flex-1 bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-3xl font-semibold">🏝️ Tour Information</h3>
              {[
                { label: "Description", value: packageData.description },
                { label: "Duration", value: packageData.duration },
                { label: "Destination", value: packageData.destination },
              ].map((item, index) => (
                <div key={index} className="p-4 border border-blue-500 rounded-md">
                  <h4 className="text-lg font-semibold">{item.label}</h4>
                  <p className="text-xl">{item.value || "Not available"}</p>
                </div>
              ))}
            </div>

            {/* Package Information */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-3xl font-semibold">💼 Package Information</h3>

              <div className="p-4 border border-blue-500 rounded-md mt-4">
                <h4 className="text-lg font-semibold">💰 Package Price</h4>
                <p className="text-2xl font-bold text-blue-600">৳{packageData.price}</p>
              </div>

              <div className="p-4 border border-blue-500 rounded-md mt-4">
                <h4 className="text-lg font-semibold">⭐ Rating</h4>
                <p className="text-xl">{packageData.rating || "Not rated yet"} ⭐</p>
              </div>

              <div className="p-4 border border-blue-500 rounded-md mt-4">
                <h4 className="text-lg font-semibold">📋 Inclusions</h4>
                <ul className="text-xl space-y-2">
                  {packageData.inclusions.map((inclusion, index) => (
                    <li key={index}>✅ {inclusion}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border border-blue-500 rounded-md mt-4">
                <h4 className="text-lg font-semibold">📅 Itinerary</h4>
                {packageData.itinerary?.length > 0 ? (
                  <div className="space-y-2">
                    {packageData.itinerary.map((day, index) => (
                      <div key={index}>
                        <h5 className="font-semibold">Day {day.day}: {day.title}</h5>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No itinerary available</p>
                )}
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 hover:bg-white hover:text-blue-600 hover:border-blue-600 border border-transparent"
          >
            🚀 Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Package;
