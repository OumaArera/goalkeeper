import React, { useState } from "react";
import { createFormData } from "../services/apiServices";
import { Loader2 } from "lucide-react";
import { 
  validateImageFile,
  validatePlayerForm,
  clearForm,
  personalFields, 
  physicalFields, 
  contactFields, 
  footballFields, 
  nextOfKinFields
} from "../utils/playerFormValidation";

const NewPlayer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    middleNames: "",
    lastNames: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    phoneNumber: "",
    email: "",
    clubsPlayedFor: "",
    recentClub: "",
    yearsOfGoalkeeping: "",
    requestDetails: "",
    image: "",
    nextOfKinEmail: "",
    nextOfKinName: "",
    nextOfKinPhoneNumber: "",
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        setError(validation.error);
        setTimeout(() => setError(""), 5000);
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const validationErrors = validatePlayerForm(formData);
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      setTimeout(() => setError(""), 5000);
      setLoading(false);
      return;
    }
    
    // Create FormData object for file upload
    const payload = new FormData();
    
    // Add required fields
    payload.append('firstName', formData.firstName.trim());
    payload.append('lastNames', formData.lastNames.trim());
    payload.append('dateOfBirth', formData.dateOfBirth);
    payload.append('height', parseFloat(formData.height));
    payload.append('weight', parseFloat(formData.weight));
    payload.append('phoneNumber', formData.phoneNumber.trim());
    payload.append('clubsPlayedFor', parseInt(formData.clubsPlayedFor));
    payload.append('recentClub', formData.recentClub.trim());
    payload.append('yearsOfGoalkeeping', parseInt(formData.yearsOfGoalkeeping));
    payload.append('requestDetails', formData.requestDetails.trim());
    payload.append('image', formData.image); // This is the key fix - image file

    // Add optional fields only if they have values
    ['middleNames', 'email', 'nextOfKinName', 'nextOfKinPhoneNumber', 'nextOfKinEmail'].forEach(field => {
      if (formData[field]?.trim()) {
        payload.append(field, formData[field].trim());
      }
    });

    const endpoint = "new-requests";

    try {      
      const response = await createFormData(endpoint, payload);
      if (!response.error) {
        clearForm(setFormData);
        setMessage("Request sent successfully. Our team member will reach out to you.");
        setTimeout(() => setMessage(""), 5000);
      } else {
        console.log("Error: ", response);
        setError(JSON.stringify(response.error));
        setTimeout(() => setError(""), 5000);
      }
    } catch (error) {
      console.error("Submit error: ", error);
      const message =
        typeof error === 'string'
          ? error
          : error?.message || "An error occurred while submitting the request";
      setError(message);
      setTimeout(() => setError(""), 5000);

    } finally {
      setLoading(false);
    }
  };

  const renderFieldGroup = (fields, gridCols = "md:grid-cols-2") => (
    <div className={`grid grid-cols-1 ${gridCols} gap-3`}>
      {fields.map(field => (
        <div key={field.name} className={field.span || ''}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required={field.required}
            step={field.step}
            min={field.min}
            placeholder={field.placeholder}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white text-center">
              New Player Registration
            </h2>
          </div>

          {/* Scrollable Content */}
          <div className="max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Personal Information
                  </h3>
                  {renderFieldGroup(personalFields)}
                </div>

                {/* Physical Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Physical Details
                  </h3>
                  {renderFieldGroup(physicalFields, "md:grid-cols-3")}
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Contact Information
                  </h3>
                  {renderFieldGroup(contactFields)}
                </div>

                {/* Football Experience */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Football Experience
                  </h3>
                  {renderFieldGroup(footballFields)}
                </div>

                {/* Request Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    Request Details
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Request Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="requestDetails"
                      value={formData.requestDetails}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Describe your goals, experience, and what you're looking for..."
                      minLength={20}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                    Photo Upload
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Photo (JPEG, JPG, PNG - Max 5MB) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".jpeg,.jpg,.png"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Next of Kin Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    Next of Kin Information
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Required for players under 18 years old</p>
                  {renderFieldGroup(nextOfKinFields)}
                </div>
                {/* Status Messages */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-r">
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                
                {message && (
                  <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-400 text-green-700 rounded-r">
                    <p className="text-sm">{message}</p>
                  </div>
                )}
                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Registration"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPlayer;