import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignedTours = () => {
  const [assignedTours, setAssignedTours] = useState([]);

  useEffect(() => {
    fetch("/AssignedTours.json")
      .then((res) => res.json())
      .then((data) => setAssignedTours(data))
      .catch((error) => {
        console.error("Error fetching assigned tours:", error);
        toast.error("Failed to load assigned tours.");
      });
  }, []);

  return (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No assigned tours available.</p>
      )}
    </div>
  );
};

export default AssignedTours;
