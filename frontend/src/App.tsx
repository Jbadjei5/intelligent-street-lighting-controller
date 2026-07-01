import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
              <Home />
            </div>
            <Footer />
          </div>
        } />
        
        {/* Private Dashboard Route (Full Screen, No Public Navbar/Footer) */}
        <Route path="/dashboard" element={
          <div className="min-h-screen bg-night-end">
            <Dashboard onLogout={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/';
            }} />
          </div>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
