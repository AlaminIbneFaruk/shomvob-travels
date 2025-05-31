import PropTypes from 'prop-types';

const ErrorF2F = ({error}) => {


  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="text-center p-8 bg-red-500 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg mb-6">{error}</p>
      </div>
    </div>
  );
};
ErrorF2F.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ])
};

export default ErrorF2F;

