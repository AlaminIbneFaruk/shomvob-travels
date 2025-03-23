import { useContext, useState, useEffect } from 'react';
import EditProfileModal from '../EditProfileModal';
import { AuthContext } from '../../Contexts/AuthProvider';

const ManageProfileAdmin = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalPayment: 0,
    totalTourGuides: 0,
    totalPackages: 0,
    totalClients: 0,
    totalStories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/AdminStats.json'); // Adjust API endpoint as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStats({
          totalPayment: data.totalPayment || 0,
          totalTourGuides: data.totalTourGuides || 0,
          totalPackages: data.totalPackages || 0,
          totalClients: data.totalClients || 0,
          totalStories: data.totalStories || 0,
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleEditClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-200 p-4">
      <div className=" w-full bg-white shadow-xl p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome, {user?.displayName || 'Admin'}!
        </h1>
        <div className="flex flex-col items-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL || 'https://via.placeholder.com/150'} alt={`${user?.displayName || 'User'}'s profile`} />
            </div>
          </div>
          <p className="mt-4 text-lg font-medium">Role: {user?.role || 'Admin'}</p>
          <p className="text-gray-500">Email: {user?.email}</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading stats...</p>
        ) : (
          <div className="mt-6 stats shadow-lg gap-4 mx-auto">
            <div className="stat text-green-700">
              <div className="stat-title">Total Payment</div>
              <div className="stat-value">${stats.totalPayment.toLocaleString()}</div>
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
          <button onClick={handleEditClick} className="btn bg-blue-500 w-full btn-outline  border border-b-4">
            Edit Profile
          </button>
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal user={user} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default ManageProfileAdmin;
