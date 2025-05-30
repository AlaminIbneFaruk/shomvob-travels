import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const fetchAdminStats = async () => {
  const currentYear = new Date().getFullYear();
  const response = await axios.get(
    `https://assignment-12-server-three-iota.vercel.app/admin-stats/${currentYear}`
  );

  if (!response.data) {
    throw new Error("Failed to fetch admin stats");
  }
  return response.data;
};

const ManageProfileAdmin = () => {
  const { user } = useContext(AuthContext);
  const navigate=useNavigate();
  const {
    data: stats = {
      totalPayment: 0,
      totalTourGuides: 0,
      totalPackages: 0,
      totalClients: 0,
      totalStories: 0,
    },
    isLoading,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: fetchAdminStats,
    onError: (error) => {
      console.error("Error fetching admin stats:", error);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-200 p-4">
      <div className="w-full bg-white shadow-xl p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome, {user?.displayName || "Admin"}!
        </h1>
        <div className="flex flex-col items-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL
                    ? `${user.photoURL}?sz=150`
                    : "https://via.placeholder.com/150"
                }
                alt={`${user?.displayName || "User"}'s profile`}
              />
            </div>
          </div>
          <p className="mt-4 text-lg font-medium">
            Role: {user?.role || "Admin"}
          </p>
          <p className="text-gray-500">Email: {user?.email}</p>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading stats...</p>
        ) : (
          <div className="mt-6 stats shadow-lg gap-4 mx-auto">
            <div className="stat text-green-700">
              <div className="stat-title">Total Payment</div>
              <div className="stat-value">
                ${stats.totalPayment.toLocaleString()}
              </div>
            </div>
            <div className="stat text-green-700">
              <div className="stat-title">Tour Guides</div>
              <div className="stat-value">{stats.totalTourGuides}</div>
            </div>
            <div className="stat text-green-700">
              <div className="stat-title">Total Packages</div>
              <div className="stat-value">{stats.totalPackages}</div>
            </div>
            <div className="stat text-green-700">
              <div className="stat-title">Total Clients</div>
              <div className="stat-value">{stats.totalClients}</div>
            </div>
            <div className="stat text-green-700">
              <div className="stat-title">Total Stories</div>
              <div className="stat-value">{stats.totalStories}</div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button className="btn bg-blue-500 w-full btn-outline border border-b-4" onClick={()=>{navigate(`/admin-dashboard/updateprofile/${user?.uid}`)}}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProfileAdmin;
