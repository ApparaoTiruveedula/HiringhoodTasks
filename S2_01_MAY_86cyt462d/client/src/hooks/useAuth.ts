import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser(decodedToken);
    }
  }, []);

  return user;
};

export default useAuth;
