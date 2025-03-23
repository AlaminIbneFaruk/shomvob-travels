import { useState } from 'react';

const TourGuideApplication = () => {
  const [formData, setFormData] = useState({
    title: '',
    reason: '',
    cvLink: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your submission logic, e.g., API call
    setIsModalOpen(true); // Show the modal on successful submission
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset the form if needed
    setFormData({
      title: '',
      reason: '',
      cvLink: ''
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Join as Tour Guide</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Application Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Why do you want to be a Tour Guide:
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">
            CV Link:
            <input
              type="url"
              name="cvLink"
              value={formData.cvLink}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-lg font-bold">Application Submitted Successfully!</h2>
            <div className="modal-action">
              <button onClick={handleCloseModal} className="btn btn-outline  border border-b-4">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourGuideApplication;
