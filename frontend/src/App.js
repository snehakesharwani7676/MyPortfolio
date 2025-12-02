import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Portfolio from './pages/Portfolio/Portfolio';
import MakeupPortfolio from './pages/Portfolio/MakeupPortfolio';
import HairPortfolio from './pages/Portfolio/HairPortfolio';
import SkinNailsPortfolio from './pages/Portfolio/SkinNailsPortfolio';
import Services from './pages/Services/Services';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';
import Contact from './pages/Contact/Contact';
import Booking from './pages/Booking/Booking';
import ClientWorkHistory from './pages/ClientWorkHistory/ClientWorkHistory';
import VirtualMakeupRoom from './pages/VirtualMakeupRoom/VirtualMakeupRoom';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

// Configure future flags for React Router v7
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <Router future={routerConfig.future}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/makeup" element={<MakeupPortfolio />} />
          <Route path="/portfolio/hair" element={<HairPortfolio />} />
          <Route path="/portfolio/skin-nails" element={<SkinNailsPortfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/client-work" element={<ClientWorkHistory />} />
          <Route path="/virtual-makeup" element={<VirtualMakeupRoom />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
