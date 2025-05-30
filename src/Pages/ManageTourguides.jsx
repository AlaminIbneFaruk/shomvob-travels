
import { QueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTourGuides = async () => {
  const response = await axios.get('https://assignment-12-server-three-iota.vercel.app/guides'); // Replace with your API endpoint
  return response.data;
};

const ManageTourguides = () => {
  const { data: tourGuides, isLoading, isError, error } = useQuery(['tourguides'], fetchTourGuides);

  const handleDelete = async (id) => {
    try {
      // Call the delete API to remove a tour guide (replace URL with your API)
      await axios.delete(`https://assignment-12-server-three-iota.vercel.app/guides/${id}`);
      // After deletion, refetch the data
      QueryClient.invalidateQueries(['tourguides']);
    } catch (error) {
      console.error('Error deleting tour guide:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="h-[80vh] overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Tour Guides</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tourGuides.map(guide => (
            <tr key={guide._id}>
              <td className="px-4 py-2">{guide.name}</td>
              <td className="px-4 py-2">{guide.email}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(guide._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTourguides;
