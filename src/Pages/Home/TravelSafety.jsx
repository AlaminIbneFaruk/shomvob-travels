import { useState } from "react";
import { FaShieldAlt, FaPhoneAlt, FaInfoCircle, FaHeartbeat, FaBell, FaLifeRing } from "react-icons/fa";

const TravelSafety = () => {
  const [activeTab, setActiveTab] = useState("insurance");

  const safetySections = [
    { title: "Emergency Contacts", icon: <FaPhoneAlt className="text-red-500" />, desc: "Keep a list of local emergency numbers and your country’s embassy contact information." },
    { title: "Stay Informed", icon: <FaInfoCircle className="text-blue-500" />, desc: "Research your destination for safety tips, travel advisories, and local laws before departure." },
    { title: "Health Precautions", icon: <FaHeartbeat className="text-green-500" />, desc: "Ensure you have necessary vaccinations and carry a first aid kit along with prescribed medications." },
    { title: "Travel Alerts", icon: <FaBell className="text-yellow-500" />, desc: "Register for government travel advisories to receive real-time updates on safety conditions." },
    { title: "Emergency Support Services", icon: <FaLifeRing className="text-purple-500" />, desc: "Choose an insurance plan with 24/7 legal and medical assistance for emergencies." },
  ];

  const TravelInsuranceSections = [
    { icon: "💰", title: "Trip Cancellation", desc: "Reimbursement for non-refundable trip expenses." },
    { icon: "🏥", title: "Medical Emergencies", desc: "Coverage for medical expenses while traveling." },
    { icon: "🛄", title: "Baggage Loss", desc: "Compensation for lost, stolen, or damaged luggage." },
    { icon: "⏳", title: "Travel Delays", desc: "Reimbursement for extra expenses due to travel delays." },
    { icon: "🆘", title: "Emergency Assistance", desc: "24/7 medical and travel emergency support." },
  ];

  return (
    <div className="p-6 bg-sky-100 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Travel Insurance & Safety</h2>
      
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`flex-1 py-2 text-lg font-semibold text-center ${activeTab === "insurance" ? "border-x-2 border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveTab("insurance")}
        >
          <FaShieldAlt className="inline mr-2" /> Travel Insurance
        </button>
        <button
          className={`flex-1 py-2 text-lg font-semibold text-center ${activeTab === "safety" ? "border-x-2 border-b-2 border-red-500 text-red-500" : "text-gray-600"}`}
          onClick={() => setActiveTab("safety")}
        >
          <FaShieldAlt className="inline mr-2" /> Travel Safety
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {activeTab === "insurance" ? (
          <div>
            <p className="mb-2">Travel insurance protects your trip investment and ensures peace of mind. Coverage typically includes:</p>
            <ul className="space-y-2">
              {TravelInsuranceSections.map((item, index) => (
                <li key={index} className="flex items-start gap-2 bg-gray-100 p-2 rounded-md">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <strong className="text-gray-900">{item.title}:</strong>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <p className="mb-2">Stay safe during your travels by following these key safety measures:</p>
            <ul className="space-y-2">
              {safetySections.map((item, index) => (
                <li key={index} className="flex items-start gap-2 bg-gray-100 p-2 rounded-md">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <strong className="text-gray-900">{item.title}:</strong>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelSafety;
