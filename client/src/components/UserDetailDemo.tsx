import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDetailsCard from '../components/UserDetailsCard';

const UserDetailsDemo = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not logged in.');
          return;
        }

        const res = await axios.get('http://localhost:5153/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data);
      } catch (err) {
        console.error('Failed to fetch user data', err);
        setError('Could not load user data.');
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div style={{ padding: 24, color: 'red' }}>{error}</div>;
  }

  if (!userData) {
    return <div style={{ padding: 24 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <UserDetailsCard
        username={userData.name}
        email={userData.email}
        phone={userData.phone || ''}
        role={userData.role}
        address={userData.address || ''}
        nationality={userData.nationality || ''}
        configs={userData.configRoles || []}
      />
    </div>
  );
};

export default UserDetailsDemo;
