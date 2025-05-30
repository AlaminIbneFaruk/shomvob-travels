import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create an axios instance (optional, for reusability)
const apiClient = axios.create({
  baseURL: "/", // Adjust baseURL if needed
});

const fetchAssignedTours = async () => {
  const response = await apiClient.get("/AssignedTours.json");
  return response.data;
};

const AssignedTours = () => {
  const {
    data: assignedTours = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["assignedTours"],
    queryFn: fetchAssignedTours,
    onError: (error) => {
      console.error("Error fetching assigned tours:", error);
      toast.error("Failed to load assigned tours.");
    },
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Assigned Tours</h2>
        <p className="text-gray-500">Loading tours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Assigned Tours</h2>
        <p className="text-red-500">Error loading tours</p>
      </div>
    );
  }

  return (
    <>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Assigned Tours</h2>

        {assignedTours.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th>Package Name</th>
                  <th>Tourist Name</th>
                  <th>Tour Date</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assignedTours.map((tour) => (
                  <tr key={tour._id} className="hover:bg-gray-50">
                    <td>{tour.packageName}</td>
                    <td>{tour.touristName}</td>
                    <td>{tour.tourDate}</td>
                    <td>${tour.price}</td>
                    <td className="font-medium">{tour.status}</td>
                    <td className="font-medium">
                      <button className="btn btn-info">Accept</button>
                      <button className="btn btn-error">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No assigned tours available.</p>
        )}
      </div>
    </>
  );
};

export default AssignedTours;
