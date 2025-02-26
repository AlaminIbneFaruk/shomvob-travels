
const TravelSafety = () => {
  return (
    <div className="p-6 bg-sky-200 rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold text-center mb-4">Travel Insurance & Safety</h2>

      {/* Travel Insurance Section */}
      <div className="collapse collapse-plus bg-base-100 shadow mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-semibold">Travel Insurance</div>
        <div className="collapse-content">
          <p className="mb-2">
            Travel insurance protects your trip investment and ensures peace of mind. Coverage typically includes:
          </p>
          <ul className="list-disc list-inside">
            <li><strong>Trip Cancellation:</strong> Reimbursement for non-refundable trip expenses.</li>
            <li><strong>Medical Emergencies:</strong> Coverage for medical expenses while traveling.</li>
            <li><strong>Baggage Loss:</strong> Compensation for lost, stolen, or damaged luggage.</li>
            <li><strong>Travel Delays:</strong> Reimbursement for extra expenses due to travel delays.</li>
            <li><strong>Emergency Assistance:</strong> 24/7 medical and travel emergency support.</li>
          </ul>
        </div>
      </div>

      {/* Safety Measures Section */}
      <div className="collapse collapse-plus bg-base-100 shadow mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-semibold">Emergency Contacts</div>
        <div className="collapse-content">
          <p>Keep a list of local emergency numbers and your country’s embassy contact information.</p>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-100 shadow mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-semibold">Stay Informed</div>
        <div className="collapse-content">
          <p>Research your destination for safety tips, travel advisories, and local laws before departure.</p>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-100 shadow mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-semibold">Health Precautions</div>
        <div className="collapse-content">
          <p>Ensure you have necessary vaccinations and carry a first aid kit along with prescribed medications.</p>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-100 shadow mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-semibold">Travel Alerts</div>
        <div className="collapse-content">
          <p>Register for government travel advisories to receive real-time updates on safety conditions.</p>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-100 shadow">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-semibold">Emergency Support Services</div>
        <div className="collapse-content">
          <p>Choose an insurance plan with 24/7 legal and medical assistance for emergencies.</p>
        </div>
      </div>
    </div>
  );
};

export default TravelSafety;
