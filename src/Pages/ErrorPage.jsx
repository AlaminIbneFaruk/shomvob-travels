import { useNavigate } from 'react-router-dom'; 

const ErrorPage = () => {
  const navigate = useNavigate(); 

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="text-center p-8 bg-red-500 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg mb-6">We could not find the page you are looking for.</p>
        <button
          onClick={handleGoHome}
          className="btn btn-primary"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
