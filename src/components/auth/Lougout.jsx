const handleLogout = (onLogout) => {
    onLogout(false);
    localStorage.removeItem('encryptedSpecialToken');
    localStorage.removeItem('customerId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('fullName');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('email');
    localStorage.removeItem('lastActivity');
  };
  
  export default handleLogout;