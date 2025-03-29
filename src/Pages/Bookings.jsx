import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Configure axios instance
const api = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const MyBookings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch bookings query
  const { data: bookings = [], isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await api.get("https:/localhost:9000/b");
      return response.data;
    },
  });

  // Cancel booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: (bookingId) => api.delete(`/bookings/${bookingId}`),
    onSuccess: (_, bookingId) => {
      // Update the bookings cache
      queryClient.setQueryData(["bookings"], (oldData) =>
        oldData.filter((booking) => booking._id !== bookingId)
      );
      alert("Booking cancelled successfully.");
    },
    onError: (error) => {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking.");
    },
  });

  const handlePayment = (bookingId) => {
    navigate(`/payment/${bookingId}`);
  };

  const handleCancel = (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (confirmCancel) {
      cancelBookingMutation.mutate(bookingId);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
        <div>Loading bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
        <div>Error loading bookings: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Package Name</th>
            <th className="border p-2">Tour Guide</th>
            <th className="border p-2">Tour Date</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking._id} className="border text-center">
                <td className="border p-2">{booking.packageName}</td>
                <td className="border p-2">{booking.tourGuideName}</td>
                <td className="border p-2">{booking.tourDate}</td>
                <td className="border p-2">${booking.price}</td>
                <td className="border p-2">{booking.status}</td>
                <td className="border p-2">
                  {booking.status === "Pending" && (
                    <>
                      <button
                        className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                        onClick={() => handlePayment(booking._id)}
                      >
                        Pay
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleCancel(booking._id)}
                        disabled={cancelBookingMutation.isLoading}
                      >
                        {cancelBookingMutation.isLoading ? "Cancelling..." : "Cancel"}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;