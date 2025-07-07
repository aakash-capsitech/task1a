import UserDetailsCard from '../components/UserDetailsCard';

const UserDetailsDemo = () => {
  return (
    <div style={{ padding: 24 }}>
      <UserDetailsCard
        username="johndoe"
        email="johndoe@example.com"
        phone="+4423424242345"
        role="Admin"
        address="35 Bullescroft Road, HA88RN, United Kingdom"
        configs={['DarkMode: true', 'Notifications: enabled']}
        country="United Kingdom"
        nationality="British"
        contactPerson="Yatish Chandra"
      />
    </div>
  );
};

export default UserDetailsDemo;
