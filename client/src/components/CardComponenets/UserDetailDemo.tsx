import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import UserDetailsCard from './UserDetailsCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDetailsDemo = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not logged in.');
          return;
        }

        const decoded: any = jwtDecode(token);
        const id = decoded?.nameid;

        if (!id) {
          setError('Invalid token: Missing user ID.');
          return;
        }

        setUserId(id);

        const res = await axios.get(`http://localhost:5153/api/users/${id}`, {
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

  const handleUserSave = async (updatedData: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !userId) {
        setError('Missing token or user ID.');
        return;
      }

      await axios.put(
        `http://localhost:5153/api/users/${userId}`,
        {
          name: updatedData.username,
          email: updatedData.email,
          phone: updatedData.phone,
          role: updatedData.role,
          address: updatedData.address,
          nationality: updatedData.nationality,
          configRoles: updatedData.configs,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state with new data
      setUserData((prev: any) => ({
        ...prev,
        name: updatedData.username,
        email: updatedData.email,
        phone: updatedData.phone,
        role: updatedData.role,
        address: updatedData.address,
        nationality: updatedData.nationality,
        configRoles: updatedData.configs,
      }));
      toast.success("user updated successfully")
    } catch (err) {
      toast.error("something went wrong")
      console.error('Failed to save user', err);
      // setError('Could not save user data.');
    }
  };

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
        onSave={handleUserSave}
      />
    </div>
  );
};

export default UserDetailsDemo;
