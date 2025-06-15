import React, { useState } from "react";
import { Loader2, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import handleLogout from "../auth/Lougout";
import { createData } from "../../services/apiServices";

const ChangePassword = ({ onclose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return {
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      isValid: minLength && hasUppercase && hasLowercase && hasNumber
    };
  };

  const passwordValidation = validatePassword(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setMessage(null);
    setError(null);

    // Validate inputs
    if (!oldPassword.trim()) {
      setError("Please enter your current password");
      setTimeout(() => setError(""), 5000);
      return;
    }

    if (!newPassword.trim()) {
      setError("Please enter a new password");
      setTimeout(() => setError(""), 5000);
      return;
    }

    if (!passwordValidation.isValid) {
      setError("New password does not meet the requirements");
      setTimeout(() => setError(""), 5000);
      return;
    }

    if (oldPassword === newPassword) {
      setError("New password must be different from current password");
      setTimeout(() => setError(""), 5000);
      return;
    }

    setLoading(true);
    const endpoint = "customers/auth/change-password";
    const payload = { oldPassword, newPassword };

    try {
      const response = await createData(endpoint, payload, true);

      if (!response.error) {
        setMessage("Password changed successfully! You will be logged out in 5 seconds.");
        setTimeout(() => {
          handleLogout(onclose);
          setMessage("");
        }, 5000);
      } else {
        setError(response.error);
        setTimeout(() => setError(""), 5000);
      }
    } catch (error) {
      setError(error.message || "An error occurred while changing password");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-2 sm:px-0">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Current Password */}
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              id="oldPassword"
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              placeholder="Enter your current password"
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              placeholder="Enter your new password"
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password Requirements */}
          {newPassword && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
              <div className="space-y-1">
                <div className={`flex items-center space-x-2 text-sm ${passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordValidation.minLength ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center space-x-2 text-sm ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordValidation.hasUppercase ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span>At least 1 uppercase letter</span>
                </div>
                <div className={`flex items-center space-x-2 text-sm ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordValidation.hasLowercase ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span>At least 1 lowercase letter</span>
                </div>
                <div className={`flex items-center space-x-2 text-sm ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordValidation.hasNumber ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span>At least 1 number</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        {message && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800">{message}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
          <button
            type="button"
            onClick={onclose}
            className="w-full sm:flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !passwordValidation.isValid || !oldPassword.trim()}
            className="w-full sm:flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Changing...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;