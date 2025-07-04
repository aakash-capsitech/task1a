import Layout from './components/Layout'
import UserTable from './components/UserTable'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginForm from './pages/Login'
import { World } from './components/ui/Globe'
import { BackgroundLines } from './components/ui/background-lines'
import { Children } from 'react'
import { UserRolesModal3 } from './components/UserRole/Demo'
import UserProfilePanel from './components/UserProfilePanel'

const App = () => {
  return (
    <div>
       <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/md' element={<UserRolesModal3 />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/user' element={<UserProfilePanel userId ="68676f5aa67a2ff139bc2845" />} />
            {/* <Route
              path="/bg"
              element={
                <BackgroundLines className="bg-black h-screen flex items-center justify-center text-white">
                  <div className="text-center my-auto">
                    <h1 className="text-5xl font-bold text-red-500">Aakash</h1>
                  </div>
                </BackgroundLines>
              }
            /> */}
            <Route
              path="/bg"
              element={
                <BackgroundLines
                  className="h-screen flex items-center justify-center text-white bg-black"
                  children= {<div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", }}>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#00C951" }}>
                      Aakash
                    </h1>
                  </div>} />
              }
            />




            <Route
              path="/globe"
              element={
              <World
                globeConfig={{
                  pointSize: 1,
                  globeColor: "#0c1445",
                  showAtmosphere: true,
                  atmosphereColor: "#ffffff",
                  atmosphereAltitude: 0.1,
                  emissive: "#112233",
                  emissiveIntensity: 0.3,
                  shininess: 0.9,
                  polygonColor: "rgba(255,255,255,0.4)",
                  ambientLight: "#888888",
                  directionalLeftLight: "#ffffff",
                  directionalTopLight: "#ffffff",
                  pointLight: "#ffffff",
                  arcTime: 2000,
                  arcLength: 0.9,
                  rings: 1,
                  maxRings: 3,
                  initialPosition: { lat: 0, lng: 0 },
                  autoRotate: true,
                  autoRotateSpeed: 1.5,
                }}
                data={[
                  {
                    order: 1,
                    startLat: 28.6139,
                    startLng: 77.209,
                    endLat: 40.7128,
                    endLng: -74.006,
                    arcAlt: 0.2,
                    color: "#00ffff",
                  },
                  {
                    order: 2,
                    startLat: 28.6139,
                    startLng: 77.209,
                    endLat: 35.6895,
                    endLng: 139.6917,
                    arcAlt: 0.25,
                    color: "#ff00ff",
                  },
                ]}
              />
            }
          />

        </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App