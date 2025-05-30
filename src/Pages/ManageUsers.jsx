import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://assignment-12-server-three-iota.vercel.app/',
 });


const fetchUsers = async () => {
  const { data } = await axiosInstance.get('/users');
  return data;
};

const ManageUsers = () => {
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users</div>;

  return (
    <div className="h-[80vh] p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 border-r">ID</th>
              <th className="py-2 px-4 border-r">Name</th>
              <th className="py-2 px-4 border-r">Email</th>
              <th className="py-2 px-4 border-r">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 border-r text-center">{user.id}</td>
                <td className="py-2 px-4 border-r">{user.name}</td>
                <td className="py-2 px-4 border-r">{user.email}</td>
                <td className="py-2 px-4 border-r text-center">{user.role}</td>
                <td className="py-2 px-4 text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
