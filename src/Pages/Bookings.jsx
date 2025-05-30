import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


// Configure axios instance
const api = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

const MyBookings = () => {

  const queryClient = useQueryClient();

  // Fetch bookings query
  const { data: bookings = [], isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await api.get("/bookings");
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

  const handlePayment = async (bookingId, price) => {
    try {
      const response = await api.post("/payment/create-checkout-session", { bookingId, price });
      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    }
  };  

  const handleCancel = (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (confirmCancel) {
      cancelBookingMutation.mutate(bookingId);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 my-20">
        <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
        <div>Loading bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 my-20">
        <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
        <div>Error loading bookings: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 my-20">
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
                <td className="border p-2">{booking.tourGuide}</td>
                <td className="border p-2">{new Date(booking.tourDate).toDateString()}</td>
                <td className="border p-2">${booking.price.toFixed(2)}</td>
                <td className="border p-2 capitalize">{booking.status}</td>
                <td className="border p-2">
                  {booking.status.toLowerCase() === "pending" && (
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
