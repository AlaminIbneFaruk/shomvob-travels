import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';

const ManageProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/user-dashboard/updateprofile/${user?.uid}`);
  };

  const handleApplyForTourGuide = () => {
    navigate(`/user-dashboard/tour-guide-application/${user?.uid}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-200 p-4">
      <div className="card w-full max-w-md bg-white shadow-xl p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome, {user?.displayName}!
        </h1>
        <div className="flex flex-col items-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={`${user.photoURL}?sz=150`} alt={`${user?.displayName}'s profile`} />
            </div>
          </div>
          <p className="mt-4 text-lg font-medium">Role: {user?.role || 'Tourist'}</p>
          <p className="text-gray-500">Location: {user?.location || 'Not specified'}</p>
          <p className="text-gray-600 text-sm mt-2 text-center">{user?.bio || 'No bio available.'}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button onClick={handleEditClick} className="btn btn-outline border border-b-4 btn-primary w-full">
            Edit Profile
          </button>
          <button onClick={handleApplyForTourGuide} className="btn btn-outline border border-b-4 w-full">
            Apply For Tour Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
