import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import PropTypes from 'prop-types';


const EditProfileModal = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="modal">
      <h2>Edit Profile</h2>
      <form>
        {/* Add form fields for the user to edit their information */}
        <div>
          <label>Name:</label>
          <input type="text" defaultValue={user.name} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" defaultValue={user.location} />
        </div>
        <div>
          <label>Bio:</label>
          <textarea defaultValue={user.bio}></textarea>
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};
EditProfileModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EditProfileModal;

