import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bookings from backend API
    fetch("/bookings.json", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token if needed
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handlePayment = (bookingId) => {
    navigate(`/payment/${bookingId}`); // Redirect to Stripe payment page
  };

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(`https://your-api.com/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
        alert("Booking cancelled successfully.");
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

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
                      >
                        Cancel
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
