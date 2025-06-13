import { useEffect, useRef } from 'react';

const INACTIVITY_TIMEOUT = 600 * 1000;

const useAutoLogout = () => {
  const timerId = useRef(null);

  const logout = () => {
    console.log('User inactive. Logging out...');
    localStorage.removeItem('encryptedSpecialToken');
    localStorage.removeItem('customerId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('fullName');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('email');
    localStorage.removeItem('lastActivity');

  };

  const resetTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(logout, INACTIVITY_TIMEOUT);
    localStorage.setItem('lastActivity', Date.now());
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

    const handleUserActivity = () => {
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    // Initialize the timer
    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);
};

export default useAutoLogout;
