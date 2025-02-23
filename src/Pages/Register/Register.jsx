import RegisterForm from "./RegisterForm";
import { Helmet } from "react-helmet";
const Register = () => {
  return (
    <>
      <Helmet>
        <title>Register | Shomvob Travels</title>
      </Helmet>
      <div className="py-20 lg:flex justify-center items-center bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white p-6">
        <RegisterForm></RegisterForm>
      </div>
    </>
  );
};

export default Register;
