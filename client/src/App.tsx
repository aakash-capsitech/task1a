import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './auth/AuthContext';
import { useAuth } from './auth/useAuth';
import type { JSX } from 'react';
import RegisterPage from './pages/RegisterPage';
import PracticeProfile from './components/TemplatePages/PracticeProfile';
import Profile from './components/TemplatePages/Profile';
import Automation from './components/TemplatePages/Automation';
import CallFlow from './components/TemplatePages/CallFlow';
import Addons from './components/TemplatePages/Addons';
import CannedEmails from './components/TemplatePages/CannedEmails';
import MainUserTablePage from './components/TemplatePages/Users';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { D1 } from './components/Demos/D1';
import { CToastProvider } from './components/toast/CToastProvider';
import Clients from './components/DashboardComponents/Clients';
import Tasks from './components/DashboardComponents/Tasks';
import ESignatures from './components/DashboardComponents/ESignatures';
import Deadlines from './components/DashboardComponents/Deadlines';
import Leads from './components/DashboardComponents/Leads';
import Quotes from './components/DashboardComponents/Quotes';
import Letters from './components/DashboardComponents/Letters';
import Chats from './components/DashboardComponents/Chats';
import Timesheet from './components/DashboardComponents/Timesheet';
import Documents from './components/DashboardComponents/Documents';
import AccabotChat from './components/DashboardComponents/AccabotChat';
import LeadSources from './components/DashboardComponents/LeadSources';
import ManualTimesheet from './components/DashboardComponents/ManualTimesheet';
import Teams from './components/DashboardComponents/Teams';
import Reports from './components/DashboardComponents/Reports';
import Resources from './components/DashboardComponents/Resources';
import Dashboard from './components/DashboardComponents/Dashboard';
import Emails from './components/DashboardComponents/Emails';
import AllUsers from './components/ListComponents/AllUsers';
import All from './components/TemplatePages/All';
// import MainUserTablePage from "./components/ListComponents/UserTable";
// import Users from "./components/TemplatePages/Users";

// PrivateRoute: guards routes behind auth
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <CToastProvider>
      <BrowserRouter>
       {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/d1' element={<D1 />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                {/* <Users /> */}
                <MainUserTablePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <PrivateRoute>
                <PracticeProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/automation"
            element={
              <PrivateRoute>
                <Automation />
              </PrivateRoute>
            }
          />
          <Route
            path="/callflow"
            element={
              <PrivateRoute>
                <CallFlow />
              </PrivateRoute>
            }
          />
          <Route
            path="/addons"
            element={
              <PrivateRoute>
                <Addons />
              </PrivateRoute>
            }
          />
          <Route
            path="/cannedemails"
            element={
              <PrivateRoute>
                <CannedEmails />
              </PrivateRoute>
            }
          />
          <Route path='/clients' element={<Clients />} />
          <Route path='/invoice' element={<Tasks />} />
          <Route path='/esignatures' element={<ESignatures />} />
          <Route path='/deadlines' element={<Deadlines />} />
          <Route path='/leads' element={<Leads />} />
          <Route path='/quotes' element={<Quotes />} />
          <Route path='/letters' element={<Letters />} />
          <Route path='/chats' element={<Chats />} />
          <Route path='/timesheet' element={<Timesheet />} />
          <Route path='/documents' element={<Documents />} />
          <Route path='/accabotchat' element={<AccabotChat />} />
          <Route path='/leadsources' element={<LeadSources />} />
          <Route path='/manualtimesheet' element={<ManualTimesheet />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/emails' element={<Emails />} />

          <Route path='/all' element={<All />} />
        </Routes>
      </BrowserRouter>
      </CToastProvider>
    </AuthProvider>
  );
};

export default App;
