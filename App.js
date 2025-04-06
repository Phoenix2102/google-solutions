import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Savings from './pages/Savings';
import Bill from './pages/Bill';
import Sidebar from './components/common/Sidebar';
import BottomBar from './components/common/BottomBar';
import Colab from './pages/Colab';
import Profile from './pages/Profile';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/bills" element={<Bill />} />
            <Route path="/colabs" element={<Colab />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
