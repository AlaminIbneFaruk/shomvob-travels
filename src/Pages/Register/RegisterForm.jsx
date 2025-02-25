import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthProvider";

const RegisterForm = () => {
  const { createUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const e_mail = event.target.email.value;
    const name = event.target.name.value;
    const password = event.target.password.value;
    const cpassword = event.target.Cpassword.value;
    const photoURL = event.target.photoURL.value; // Taking URL as input
    const terms = event.target.terms.checked;

    if (!terms) {
      setErrorMessage("Please accept the terms and conditions");
      return;
    }

    setErrorMessage("");
    setSuccess(false);

    const regEX =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!regEX.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    if (cpassword !== password) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUser(e_mail, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL, // Setting profile picture from URL input
      });

      console.log("Profile updated successfully", user);
      setSuccess(true);
      navigate("/");
    } catch (error) {
      console.log("Error:", error.message);
      setErrorMessage(error.message);
    }
  };

  const showHidePassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="py-6">
      <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleRegister}>
          <div className="text-center font-sans font-bold text-sky-500 text-2xl">
            REGISTER NOW
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered text-black"
              required
            />
            <label className="label">
              <span className="label-text text-base">Profile Image URL</span>
            </label>
            <input
              name="photoURL"
              type="text"
              placeholder="Enter image URL"
              className="input input-bordered text-black"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered text-black"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-base">Password</span>
            </label>
            <input
              name="password"
              type={showPassword ? `text` : `password`}
              placeholder="Password"
              className="input input-bordered text-black"
              required
            />
            <button
              className="btn btn-xs absolute right-4 top-12"
              onClick={showHidePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-base">Confirm Password</span>
            </label>
            <input
              name="Cpassword"
              type={showPassword ? `text` : `password`}
              placeholder="Confirm Password"
              className="input input-bordered text-black"
              required
            />
            <button
              className="btn btn-xs absolute right-4 top-12"
              onClick={showHidePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                name="terms"
                type="checkbox"
                className="checkbox"
                value="Accepted"
              />
              <span className="label-text">
                Accept all the terms and conditions
              </span>
            </label>
          </div>
          <div className="form-control mt-2 gap-5">
            <button
              type="submit"
              className="btn btn-warning bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
            >
              Register
            </button>
            <Link
              to="/login"
              className="btn btn-warning bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
            >
              Already have an account? Login
            </Link>
          </div>
          <p className="text-red-700 p-2 rounded-lg">{errorMessage}</p>
          {success && <p className="text-sky-600">Sign Up is Successful</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
