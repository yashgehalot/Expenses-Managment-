import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_URL from './constants';

import MyNavbar from './Components/MyNavbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Product from './Components/New Product';
import AddItem from "./Components/Add Item"; 
import About from './Components/About';
import Login from './Components/Login';

function App() {
  const [activePage, setActivePage] = useState(() => {
    // Load activePage from localStorage, default to "home"
    return localStorage.getItem('activePage') || "home";
  });
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Save activePage to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activePage', activePage);
  }, [activePage]);

  // Check for existing token on app load and fetch user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details
      fetch(`${API_URL}/api/auth/me`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => response.json())
      .then(userData => {
        if (userData && userData.name) {
          setUser(userData);
        } else {
          // Invalid token, remove it
          localStorage.removeItem('token');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
      });
    }
  }, []);

  // HELPER: Retrieves token for authentication headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); 
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '' 
    };
  };

  // ADD: Saves a new expense and updates UI state
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
      } else {
        console.error("Add failed");
      }
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  // FETCH: Loads expenses from backend when on the "Add Item" page
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/expenses`, {
          headers: getAuthHeaders()
        });
        
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else if (response.status === 401) {
          console.error("Not authorized. Please log in.");
        }
      } catch (err) {
        console.error("Backend connection failed", err);
      }
    };
    if (activePage === "project") fetchExpenses();
  }, [activePage]);

  // DELETE: Removes an expense and updates UI state
  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/expenses/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        setItems(prev => prev.filter(item => item._id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Defines which component to show based on activePage
  const renderSection = () => {
    switch (activePage) {
      case "home": return <Home onNavClick={setActivePage} />;
      case "product": return <Product onNavClick={setActivePage} onSelectProduct={setSelectedProduct} />;
      case "project": return <AddItem items={items} onAdd={handleAddItem} onDelete={handleDeleteItem} />;
      case "about": return <About />;
      case "login": return <Login onLogin={(userData) => { 
        setUser(userData); 
        const newPage = "home";
        setActivePage(newPage);
        localStorage.setItem('activePage', newPage);
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