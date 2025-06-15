// utils/playerFormValidation.js

/**
 * Calculate age from date of birth
 * @param {string} dateOfBirth - Date string in YYYY-MM-DD format
 * @returns {number} Age in years
 */
export const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  return monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
};

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (international format)
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} True if valid international phone format
 */
export const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+\d{10,15}$/;
  return phoneRegex.test(phoneNumber);
};

/**
 * Validate file for image upload
 * @param {File} file - File object to validate
 * @returns {object} Object with isValid boolean and error message if invalid
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { isValid: false, error: "No file selected" };
  }

  // Check file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    return { isValid: false, error: "Image size must be below 5MB" };
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: "Image must be in JPEG, JPG, or PNG format" };
  }

  return { isValid: true, error: null };
};

/**
 * Validate player registration form data
 * @param {object} formData - Form data object
 * @returns {string[]} Array of error messages (empty if valid)
 */
export const validatePlayerForm = (formData) => {
  const errors = [];
  
  // Required fields validation
  if (!formData.firstName?.trim()) errors.push("First name is required");
  if (!formData.lastNames?.trim()) errors.push("Last names are required");
  if (!formData.dateOfBirth) {
    errors.push("Date of birth is required");
  } else {
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
      age -= 1;
    }

    if (age < 12 || age > 45) {
      errors.push("Age must be between 12 and 45 years");
    }
  }

  if (!formData.height) errors.push("Height is required");
  if (!formData.weight) errors.push("Weight is required");
  if (!formData.phoneNumber?.trim()) errors.push("Phone number is required");
  if (!formData.clubsPlayedFor) errors.push("Clubs played for is required");
  if (!formData.recentClub?.trim()) errors.push("Recent club is required");
  if (!formData.yearsOfGoalkeeping) errors.push("Years of goalkeeping is required");
  if (!formData.requestDetails?.trim()) errors.push("Request details are required");
  if (
    formData.requestDetails.length < 20 ||
    formData.requestDetails.length > 1000
  ) {
    errors.push("Request details must be between 20 and 1000 characters");
  }
  if (!formData.image) errors.push("Image is required");

  // Phone number format validation
  if (formData.phoneNumber && !isValidPhoneNumber(formData.phoneNumber)) {
    errors.push("Phone number must be in international format (e.g., +254712345678)");
  }

  // Email format validation if provided
  if (formData.email && !isValidEmail(formData.email)) {
    errors.push("Please enter a valid email address");
  }

  // Next of kin phone number format validation if provided
  if (formData.nextOfKinPhoneNumber && !isValidPhoneNumber(formData.nextOfKinPhoneNumber)) {
    errors.push("Next of kin phone number must be in international format");
  }

  // Age-based next of kin validation
  if (formData.dateOfBirth) {
    const age = calculateAge(formData.dateOfBirth);
    
    if (age < 18) {
      if (!formData.nextOfKinName?.trim()) {
        errors.push("Next of kin name is required for players under 18");
      }
      if (!formData.nextOfKinPhoneNumber?.trim()) {
        errors.push("Next of kin phone number is required for players under 18");
      }
      if (!formData.nextOfKinEmail?.trim()) {
        errors.push("Next of kin email is required for players under 18");
      }
    }
  }

  // Next of kin email format validation if provided
  if (formData.nextOfKinEmail && !isValidEmail(formData.nextOfKinEmail)) {
    errors.push("Please enter a valid next of kin email address");
  }

  return errors;
};


export const clearForm = (setFormData) => {
    setFormData({
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
  };


export const personalFields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true, span: 'md:col-span-1' },
    { name: 'middleNames', label: 'Middle Names', type: 'text', required: false, span: 'md:col-span-1' },
    { name: 'lastNames', label: 'Last Names', type: 'text', required: true, span: 'md:col-span-2' },
  ];

export const physicalFields = [
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
    { name: 'height', label: 'Height (feet.inches)', type: 'number', required: true, step: '0.1', placeholder: 'e.g., 5.4', min: '0' },
    { name: 'weight', label: 'Weight (Kg)', type: 'number', required: true, step: '0.1', min: '0' },
  ];

export const contactFields = [
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true, placeholder: '+254712345678' },
    { name: 'email', label: 'Email', type: 'email', required: false },
  ];

export const footballFields = [
    { name: 'clubsPlayedFor', label: 'Clubs Played For', type: 'number', required: true, min: '0' },
    { name: 'yearsOfGoalkeeping', label: 'Years of Goalkeeping', type: 'number', required: true, min: '0' },
    { name: 'recentClub', label: 'Recent Club', type: 'text', required: true, span: 'md:col-span-2' },
  ];

export const nextOfKinFields = [
    { name: 'nextOfKinName', label: 'Next of Kin Name', type: 'text', required: false, span: 'md:col-span-2' },
    { name: 'nextOfKinPhoneNumber', label: 'Next of Kin Phone', type: 'tel', required: false, placeholder: '+254712345678' },
    { name: 'nextOfKinEmail', label: 'Next of Kin Email', type: 'email', required: false },
  ];

