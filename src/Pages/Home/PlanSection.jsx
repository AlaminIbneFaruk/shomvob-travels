import { useEffect, useState } from 'react';
import PackagePlan from '../../Components/PackagePlan';

const PlanSection = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/packages.json'); // Ensure this path is correct
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPackages(data.travelPackages); // Ensure your JSON structure matches this
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading packages...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error fetching packages: {error}</div>;
  }

  return (
    <div className=" mx-auto p-6 bg-sky-200">
      <h2 className="text-2xl font-bold text-center mb-6">Travel Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((packageplan) => (
          
            <PackagePlan packageplan={packageplan} key={packageplan.id} />
          
        ))}
      </div>
    </div>
  );
};

export default PlanSection;
