import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookForm = () => {
  const location = useLocation();
  const { packageData, tourGuides } = location.state || {};
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    packageName: packageData?.name || "",
    userInfo: user?.displayName || "",
    price: packageData?.price || "",
    tourDate: "",
    tourGuide: "",
    service: "", // New field for service
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (packageData) {
      setFormData((prev) => ({
        ...prev,
        packageName: packageData.name || prev.packageName,
        price: packageData.price || prev.price,
      }));
    }
  }, [packageData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.packageName ||
      !formData.price ||
      !formData.tourDate ||
      !formData.tourGuide ||
      !formData.service // Ensure service is selected
    ) {
      setError("Please fill in all required fields");
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const bookingData = {
        ...formData,
        packageId: packageData?.id,
        userId: user?.uid,
        status: "pending",
        createdAt: new Date(),
      };

      const response = await fetch("http://localhost:9000/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit booking");
      }

      toast.success("Booking successful!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!packageData) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-black">
        <p className="text-red-500">
          No package selected. Please select a package first.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-black">
      <h2 className="text-2xl font-semibold mb-4">
        {`Book Your Tour: ${packageData.name}`}
      </h2>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="packageName" className="block text-sm font-medium">
            Package Name *
          </label>
          <input
            type="text"
            id="packageName"
            className="input input-bordered w-full"
            value={formData.packageName}
            disabled
          />
        </div>

        <div>
          <label htmlFor="userInfo" className="block text-sm font-medium">
            Your Info
          </label>
          <input
            type="text"
            id="userInfo"
            className="input input-bordered w-full"
            value={formData.userInfo}
            disabled
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price (BDT) *
          </label>
          <input
            type="number"
            id="price"
            className="input input-bordered w-full"
            value={formData.price}
            disabled
          />
        </div>

        <div>
          <label htmlFor="tourDate" className="block text-sm font-medium">
            Tour Date *
          </label>
          <input
            type="date"
            id="tourDate"
            className="input input-bordered w-full"
            value={formData.tourDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="tourGuide" className="block text-sm font-medium">
            Select a Tour Guide *
          </label>
          <select
            id="tourGuide"
            className="select select-bordered w-full"
            value={formData.tourGuide}
            onChange={handleChange}
            required
            disabled={loading || !tourGuides?.length}
          >
            <option value="" disabled>
              Select a guide
            </option>
            {tourGuides?.map((guide) => (
              <option key={guide.id} value={guide.id}>
                {guide.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium">
            Select a Service *
          </label>
          <select
            id="service"
            className="select select-bordered w-full"
            value={formData.service}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="" disabled>
              Select a service
            </option>
            <option value="Standard">Standard Package</option>
            <option value="Premium">Premium Package</option>
            <option value="VIP">VIP Package</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading || !user}
          >
            {loading ? "Processing..." : "Book Now"}
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default BookForm;
