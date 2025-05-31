import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PackagePlan from '../../Components/PackagePlan';
import { ClipLoader } from 'react-spinners';
import ErrorPage from "../ErrorPage";
const fetchPackages = async () => {
  const response = await axios.get('https://assignment-12-server-three-iota.vercel.app/packages/random');
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
    return <div className="text-center text-lg font-semibold"><ClipLoader
        color="#36d7b7"
        loading={isLoading}
        size={500}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500">
      <ErrorPage/>
    </div>;
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