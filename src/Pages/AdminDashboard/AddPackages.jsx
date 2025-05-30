import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addPackage = async (packageDetails) => {
  const response = await axios.post("/packages", packageDetails);
  if (!response.data) {
    throw new Error("Failed to add package");
  }
  return response.data;
};

const AddPackages = () => {
  const [packageDetails, setPackageDetails] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    location: "",
    image: "",
    inclusions: "",
    destination: "",
    itinerary: "",
    stockImages: "",
    tourType: "",
    rating: "",
    tourGuideIds: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPackage,
    onSuccess: () => {
      queryClient.invalidateQueries(["travelPackages"]);
      setPackageDetails({
        name: "",
        description: "",
        price: "",
        duration: "",
        location: "",
        image: "",
        inclusions: "",
        destination: "",
        itinerary: "",
        stockImages: "",
        tourType: "",
        rating: "",
        tourGuideIds: "",
      });
      console.log("Package added successfully!");
    },
    onError: (error) => {
      console.error("Error adding package:", error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(packageDetails);
  };

  return (
    <div className="max-w-3xl h-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {Object.keys(packageDetails).map((key) => (
            <div key={key}>
              <label className="label">
                <span className="label-text">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </label>
              <input
                type="text"
                name={key}
                placeholder={key}
                value={packageDetails[key]}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-outline border border-b-4 bg-blue-500 w-full mt-4"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding Package..." : "Add Package"}
        </button>
        {mutation.isError && (
          <p className="text-red-500 mt-2">Error: {mutation.error.message}</p>
        )}
        {mutation.isSuccess && (
          <p className="text-green-500 mt-2">Package added successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AddPackages;
