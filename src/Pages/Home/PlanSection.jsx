import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PackagePlan from '../../Components/PackagePlan';

const fetchPackages = async () => {
  const response = await axios.get('http://localhost:9000/packages/random');
  const data = response.data;
  
  if (Array.isArray(data)) {
    return data; // If API returns an array directly
  } else if (Array.isArray(data.travelPackages)) {
    return data.travelPackages; // If wrapped inside travelPackages key
  } else {
    throw new Error('Invalid data format received');
  }
};

const PlanSection = () => {
  const { 
    data: packages = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['packages'],
    queryFn: fetchPackages,
    onError: (err) => {
      console.error('Error fetching packages:', err);
    },
  });

  if (isLoading) {
    return <div className="text-center text-lg font-semibold">Loading packages...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error fetching packages: {error.message}</div>;
  }

  return (
    <div className="mx-auto p-6 bg-sky-200">
      <h2 className="text-2xl font-bold text-center mb-6">Travel Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((packageplan) => (
          <PackagePlan 
            packageplan={packageplan} 
            key={packageplan._id || packageplan.id} 
          />
        ))}
      </div>
    </div>
  );
};

export default PlanSection;