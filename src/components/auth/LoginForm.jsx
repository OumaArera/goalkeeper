import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { createData } from '../../services/apiServices';
import encryptionService from '../../services/Encryption';


const LoginForm = ({ onToggleForm, onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = () => {
    const newErrors = {};
    const rawPhone = formData.phoneNumber.trim();

    if (!rawPhone || !/^\+\d{10,15}$/.test(rawPhone)) {
      newErrors.phoneNumber = 'Enter a valid international phone number';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setResponseMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      };
      const endpoint = 'customers/auth/signin';
      const isTokenRequired = false;

      const response = await createData(endpoint, payload, isTokenRequired);
      if (response.error) {
        setResponseMessage(response.error);
        setTimeout(() => setResponseMessage(''), 5000);
      } else {
        setResponseMessage('Login successful!');
        onLogin(true);
        setTimeout(() => {
          setResponseMessage('');
          onClose();
          // onLogin(true);
        }, 0);
        const encryptedToken = response?.token;
        const decrypted = await encryptionService.decrypt(encryptedToken);
        const decoded = jwtDecode(decrypted);
        localStorage.setItem("encryptedSpecialToken", encryptedToken);
        localStorage.setItem("customerId", decoded.customerId);
        localStorage.setItem("firstName", decoded.firstName);
        localStorage.setItem("lastName", decoded.lastName);
        localStorage.setItem("fullName", decoded.fullName);
        localStorage.setItem("phoneNumber", decoded.phoneNumber);
        localStorage.setItem("email", decoded.email);
        localStorage.setItem("lastActivity", Date.now());

      }
    } catch (err) {
      setResponseMessage(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
      setTimeout(() => setResponseMessage(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Phone Number*</label>
          <PhoneInput
            country={'ke'}
            value={formData.phoneNumber}
            onChange={(phone) => {
              setFormData((prev) => ({ ...prev, phoneNumber: `+${phone}` }));
              setErrors((prev) => ({ ...prev, phoneNumber: '' }));
              setResponseMessage('');
            }}
            inputStyle={{
              width: '100%',
              height: '48px',
              paddingLeft: '50px',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
            containerStyle={{ width: '100%' }}
            buttonStyle={{
              borderTopLeftRadius: '0.5rem',
              borderBottomLeftRadius: '0.5rem',
              borderRight: '1px solid #D1D5DB',
            }}
            dropdownStyle={{
              borderRadius: '0.5rem',
            }}
            specialLabel=""
            enableSearch={true}
            countryCodeEditable={false}
            placeholder="Enter phone number"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="relative">
          <label className="block font-semibold mb-2 text-gray-700">Password*</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>
        {responseMessage && (
          <div
            className={`text-center text-sm font-medium p-3 rounded-lg ${
              responseMessage.includes('successful')
                ? 'text-green-700 bg-green-50 border border-green-200'
                : 'text-red-700 bg-red-50 border border-red-200'
            }`}
          >
            {responseMessage}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all transform hover:scale-[1.02] ${
            loading
              ? 'bg-cyan-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Logging in...</span>
            </div>
          ) : (
            'Log In'
          )}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onToggleForm}
            className="text-cyan-600 hover:text-cyan-700 font-semibold hover:underline transition-colors"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
