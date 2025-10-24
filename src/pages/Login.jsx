import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../store/slices/authSlice";
import { Button, Input, Alert } from "../components/ui";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    // Simulate API call with dummy credentials
    dispatch(loginStart());

    // Mock authentication
    setTimeout(() => {
      if (
        formData.email === "teacher@school.com" &&
        formData.password === "Vinay111"
      ) {
        const user = {
          id: 1,
          name: "Vinay Teacher",
          email: formData.email,
          role: "teacher",
        };
        dispatch(loginSuccess(user));
      } else {
        dispatch(loginFailure("Invalid email or password"));
        setFormData({email:"", password:""})
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your student attendance dashboard
          </p>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md border p-8 border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <Alert
                type="error"
                message={error}
                onClose={() => dispatch(clearError())}
              />
            )}

            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              Demo Credentials:
            </h4>
            <p className="text-sm text-blue-700">
              Email: teacher@school.com
              <br />
              Password: Vinay111
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;













