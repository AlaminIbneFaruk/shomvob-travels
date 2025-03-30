import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const addPackage = async (packageDetails) => {
  const response = await axios.post('/packages', packageDetails);
  if (!response.data) {
    throw new Error('Failed to add package');
  }
  return response.data;
};

const AddPackages = () => {
  const [packageDetails, setPackageDetails] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    location: '',
    image: '',
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPackage,
    onSuccess: () => {
      // Invalidate and refetch packages query if it exists
      queryClient.invalidateQueries(['travelPackages']);
      // Reset form
      setPackageDetails({
        name: '',
        description: '',
        price: '',
        duration: '',
        location: '',
        image: '',
      });
      console.log('Package added successfully!');
    },
    onError: (error) => {
      console.error('Error adding package:', error.message);
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Package Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Package Name"
            value={packageDetails.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Package Description</span>
          </label>
          <textarea
            name="description"
            placeholder="Package Description"
            value={packageDetails.description}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={packageDetails.price}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Duration</span>
          </label>
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={packageDetails.duration}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={packageDetails.location}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={packageDetails.image}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-outline border border-b-4 bg-blue-500 w-full mt-4"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Adding Package...' : 'Add Package'}
        </button>
        {mutation.isError && (
          <p className="text-red-500 mt-2">
            Error: {mutation.error.message}
          </p>
        )}
        {mutation.isSuccess && (
          <p className="text-green-500 mt-2">
            Package added successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default AddPackages;