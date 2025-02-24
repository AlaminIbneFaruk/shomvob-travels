import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { Helmet } from "react-helmet";
const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const emailref = useRef(null);
  const { signInUser, signInGoogle, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log("You pressed Login!");
    console.log("Email:", email, "Password:", password);
    setErrorMessage("");
    setSuccess(false);
    // login code here
    signInUser(email, password)
      .then((userCredential) => {
        console.log("User:", userCredential.user);
        setSuccess(true);
        e.target.reset();
        navigate("/");
      })
      .catch((error) => {
        console.log("Error:", error.code);
        console.log("Error:", error.message);
        setErrorMessage(`Error:${error.message}`);
      });
  };

  const handleGoogle = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);
        // navigate('/')
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleReset=()=>{
    resetPassword()
  }
  return (
    <>
      <Helmet>
        <title>Login | Shomvob Travels</title>
      </Helmet>
      <div
        className="py-20 bg-gradient-to-r from-cyan-400  to-blue-500 text-white 
       flex justify-center items-center"
      >

        <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl z-20">
          <div
            className=" max-w-60 text-center font-serif font-extrabold text-3xl md:text-4xl text-sky-500 bg-clip-text text-transparent py-4 uppercase tracking-wider pt-5 mx-auto "
          >
            Login Now
          </div>
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl">Email</span>
              </label>
              <input
                name="email"
                ref={emailref}
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <button to="#" className="label-text-alt link link-hover" onClick={handleReset}>
                  Forgot password?
                </button>
              </label>
            </div>
            <div className="form-control mt-2 gap-5">
              <button
                className="btn bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-lg"
                type="submit"
              >
                Login
              </button>
              <Link
                to="/register"
                className="text-lg btn btn-warning bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
              >
                Register Now
              </Link>
            </div>
            <button
              className="btn bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleGoogle}
            >
              <FaGoogle className="text-2xl" />
              <span className="text-3xl">Google</span>
            </button>
            <div>
              <p
                className={errorMessage ? `text-red-500` : `text-green-600`}
              >
                {errorMessage
                  ? `${errorMessage}`
                  : `${success ? `Logged in Successfull` : ""}`}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
