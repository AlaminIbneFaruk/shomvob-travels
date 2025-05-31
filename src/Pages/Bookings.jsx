import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Axios instance
const api = axios.create({
  baseURL: "https://assignment-12-server-three-iota.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

const MyBookings = () => {
  const queryClient = useQueryClient();

  // Fetch bookings
  const { data: bookings = [], isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await api.get("/bookings");
      return response.data;
    },
  });

  // Cancel mutation
  const cancelBookingMutation = useMutation({
    mutationFn: (bookingId) => api.delete(`/bookings/${bookingId}`),
    onSuccess: (_, bookingId) => {
      queryClient.setQueryData(["bookings"], (oldData) =>
        oldData.filter((booking) => booking._id !== bookingId)
      );
      toast.success("Booking cancelled successfully.");
    },
    onError: (error) => {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking.");
    },
  });

  // Handle Stripe payment
  const handlePayment = async (bookingId, price) => {
    try {
      const response = await api.post("/payment/create-checkout-session", {
        bookingId,
        price,
      });
      toast.info("Redirecting to payment...");
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Try again.");
    }
  };

  // Handle cancel logic
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
    toast.error("Failed to load bookings.");
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
                        onClick={() => handlePayment(booking._id, booking.price)}
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
