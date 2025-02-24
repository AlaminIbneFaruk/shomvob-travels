import { FaSign } from "react-icons/fa";

const OverviewSection = () => {
  const features = [
    "User Authentication (JWT, Firebase)",
    "Tour Booking System",
    "Tour Guides Directory",
    "User Story Sharing",
    "Admin Dashboard for Management",
    "Secure Stripe Payments",
    "Responsive & Modern UI",
    "Optimized Performance with TanStack Query",
  ];

  return (
    <section className="bg-sky-200 py-12 px-6 md:px-12 shadow-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Project Overview</h2>
        <p className="text-gray-600 mb-8">
          Explore the powerful features of our Tourism Management System, designed to enhance user experience and streamline operations.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow">
              <FaSign className="text-green-500 text-lg" />
              <span className="text-gray-700 text-lg">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OverviewSection;
