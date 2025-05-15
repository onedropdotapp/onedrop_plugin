import React, { useEffect, useState } from 'react';

const Onedrop: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const result = await chrome.storage.local.get("oneclick_auth_token");
        setIsAuthenticated(!!result.oneclick_auth_token);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <div style={{ 
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      fontSize: '20px',
      zIndex: 9999,
      color: 'white'
    }}>
      plugin login status : {isAuthenticated ? '🟢' : '⚪'}
    </div>
  );
};

export default Onedrop;
