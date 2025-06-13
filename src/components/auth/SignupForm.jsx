import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { createData } from '../../services/apiServices';

const SignupForm = ({ onToggleForm, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
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

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    // if (!formData.phoneNumber.trim()) {
    //   newErrors.phoneNumber = 'Phone number is required';
    // } else if (!/^\+\d{10,15}$/.test(formData.phoneNumber)) {
    //   newErrors.phoneNumber = 'Invalid phone format. Use +254712345678';
    // }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        'Password must be at least 8 characters, include uppercase, lowercase, and number';
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
      const { email, ...rest } = formData;
      const payload = email ? { ...rest, email } : { ...rest };

      console.log("Payload: ", payload);
      const endpoint = "customers/auth/signup";
      const isTokenRequired = false;

      const response = await createData(endpoint, payload, isTokenRequired);
      console.log("Response: ", response.error);
      if (response.error) {
        setResponseMessage(response.error);
        setTimeout(() => setResponseMessage(""), 5000);
      } else {
        setFormData({ firstName: '', lastName: '', phoneNumber: '', email: '', password: '' });
        setResponseMessage('Account created successfully!');
        setTimeout(() => {
          setResponseMessage("");
          onToggleForm(); 
        }, 2000);
      }
      
    } catch (err) {
      setResponseMessage(
        err.response?.data?.message || 'Signup failed. Please try again.'
      );
      setTimeout(() => setResponseMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">First Name*</label>
            <input
              type="text"
              name="firstName"
              placeholder='Your first name...'
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              required
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Last Name*</label>
            <input
              type="text"
              name="lastName"
              placeholder='Your last name...'
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              required
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

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
              paddingLeft: '52px',
              paddingRight: '16px',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: 'none',
            }}
            containerStyle={{ width: '100%' }}
            buttonStyle={{
              borderTopLeftRadius: '0.5rem',
              borderBottomLeftRadius: '0.5rem',
              borderRight: '1px solid #D1D5DB',
              backgroundColor: '#ffffff',
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
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder='Your email address(Optional)'
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
          />
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
              responseMessage
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
              <span>Creating account...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onToggleForm}
            className="text-cyan-600 hover:text-cyan-700 font-semibold hover:underline transition-colors"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
