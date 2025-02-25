import { useEffect, useState } from 'react';
import PackagePlan from '../../Components/PackagePlan';

const Trip = () => {
  const [travelPackages, setTravelPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelPackages = async () => {
      try {
        const response = await fetch('/packages.json'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTravelPackages(data.travelPackages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelPackages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-24 bg-sky-200"> 
      <h1 className="text-3xl font-bold text-center mb-6">Travel Packages</h1> {/* Heading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {travelPackages.map((packageItem) => (
          <PackagePlan packageplan={packageItem} key={packageItem?.id} />
        ))}
      </div>
    </div>
  );
};

export default Trip;
