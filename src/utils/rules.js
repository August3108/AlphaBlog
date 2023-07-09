export default {
  required: (value) => {
    return !!value || 'This field is required';
  },
  select: (v) => {
    return Object.keys(v || {}).length > 0 || 'Please select an option';
  },
  minLength: (v) => {
    return v.length >= 2 || 'Minimum length should be 2 characters';
  },
  email: (v) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(v) || 'Please enter a valid email address';
  },
  
  name: (v) => {
    const re = /^[A-Za-z\s]*$/;
    return re.test(v) || 'Please enter a valid name';
  },
  alphaNumeric: (v) => {
    const re = /^[a-zA-Z0-9_]*$/;
    return re.test(v) || 'Only alphanumeric characters are allowed';
  },
  phone: (v) => {
    const re = /^(\+91)?[0]?(91)?[6789]\d{9}$/;
    return re.test(v) || 'Please enter a valid phone number';
  },
  pinCode: (v) => {
    return v.length === 6 || 'Please enter a valid PIN code';
  },
  ifsc: (v) => {
    const re = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return re.test(v) || 'Please enter a valid IFSC code';
  },
  adharNumber: (v) => {
    const re = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    return re.test(v) || 'Please enter a valid Aadhar number';
  },
  panNumber: (v) => {
    const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return (v === "") || re.test(v) || 'Please enter a valid PAN number';
  },
  accountNumber: (v) => {
    const re = /^\d{9,18}$/;
    return re.test(v) || 'Please enter a valid account number';
  },
  password: (v) => {
    const re = /^.*(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return re.test(v) || 'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long';
  },
  confirmPassword: (v, password) => {
    return v === password || 'Passwords do not match';
  },
  
};
