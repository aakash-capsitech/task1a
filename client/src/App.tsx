// import "./App.css"
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import { UserRolesModal3 } from './components/UserRole/Demo'
// import UserProfilePanel from './components/UserProfilePanel'

// const App = () => {
//   return (
//     <div>
//        <BrowserRouter>
//         <Routes>
//             <Route path='/' element={<Home />} />
//             <Route path='/md' element={<UserRolesModal3 />} />
//             <Route path='/user' element={<UserProfilePanel userId="68676f5aa67a2ff139bc2845" onClose={function (): void {
//             throw new Error('Function not implemented.')
//           } } />} />

//         </Routes>
//        </BrowserRouter>
//     </div>
//   )
// }

// export default App









// import "./App.css";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import { UserRolesModal3 } from "./components/UserRole/Demo";
// import UserProfilePanel from "./components/UserProfilePanel";

// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import { AuthProvider } from "./auth/AuthContext";
// import { useAuth } from "./auth/useAuth";
// import type { JSX } from "react";

// const Dashboard = () => {
//   const { logout } = useAuth();
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// };

// const PrivateRoute = ({ children }: { children: JSX.Element }) => {
//   const { isLoggedIn } = useAuth();
//   return isLoggedIn ? children : <Navigate to="/login" />;
// };

// const App = () => {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* Existing routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/md" element={<UserRolesModal3 />} />
//           <Route
//             path="/user"
//             element={
//               <UserProfilePanel
//                 userId="68676f5aa67a2ff139bc2845"
//                 onClose={() => {
//                   throw new Error("Function not implemented.");
//                 }}
//               />
//             }
//           />

//           {/* Auth routes */}
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// };

// export default App;




















import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { UserRolesModal3 } from "./components/UserRole/Demo";
import UserProfilePanel from "./components/UserProfilePanel";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./auth/AuthContext";
import { useAuth } from "./auth/useAuth";

// Dashboard example
const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

// 🔐 PrivateRoute: guards routes behind auth
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/md"
            element={
              <PrivateRoute>
                <UserRolesModal3 />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <UserProfilePanel
                  userId="68676f5aa67a2ff139bc2845"
                  onClose={() => {
                    throw new Error("Function not implemented.");
                  }}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
