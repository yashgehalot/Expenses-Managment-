import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_URL from './constants'; // Ensure this is 'http://localhost:5000'

import MyNavbar from './Components/MyNavbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Product from './Components/New Product';
import AddItem from "./Components/Add Item"; 
import About from './Components/About';
import Login from './Components/Login';

function App() {
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem('activePage') || "home";
  });
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- NEW: CONNECTION TEST (Day 2) ---
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`${API_URL}/api/day1`);
        const data = await response.json();
        console.log("Backend Status:", data.message);
      } catch (err) {
        console.error("CORS or Connection Error:", err);
      }
    };
    checkConnection();
  }, []);

  useEffect(() => {
    localStorage.setItem('activePage', activePage);
  }, [activePage]);

  // Check for existing token and fetch user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_URL}/api/auth/me`, {
        method: 'GET', // Changed from POST to GET (Standard for fetching user info)
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) throw new Error("Session expired");
        return response.json();
      })
      .then(userData => {
        if (userData && userData.name) {
          setUser(userData);
        }
      })
      .catch(error => {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setUser(null);
      });
    }
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); 
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '' 
    };
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch(`${API_URL}/api/expenses`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        const data = await response.json();
        setItems(prev => [...prev, data]);
      }
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/expenses`, {
          headers: getAuthHeaders()
        });
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        }
      } catch (err) {
        console.error("Fetch expenses failed", err);
      }
    };
    if (activePage === "project") fetchExpenses();
  }, [activePage]);

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/expenses/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        setItems(prev => prev.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const renderSection = () => {
    switch (activePage) {
      case "home": return <Home onNavClick={setActivePage} />;
      case "product": return <Product onNavClick={setActivePage} onSelectProduct={setSelectedProduct} />;
      case "project": return <AddItem items={items} onAdd={handleAddItem} onDelete={handleDeleteItem} />;
      case "about": return <About />;
      case "login": return <Login onLogin={(userData) => { 
        setUser(userData); 
        setActivePage("home");
      }} />;
      default: return <Home />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <MyNavbar onNavClick={setActivePage} user={user} />
      <main className="flex-grow-1">
        {renderSection()}
      </main>
      <Footer />
    </div>
  );
}

export default App;