import React from 'react';
import { BsWalletFill } from "react-icons/bs";

const MyNavbar = ({ onNavClick, user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
      <div className="container">
        {/* Brand Logo - Clicks go to Home */}
        <div 
          className="navbar-brand fw-bold text-primary d-flex align-items-center" 
          style={{ cursor: "pointer" }}
          onClick={() => onNavClick('home')}
        >
           <BsWalletFill className="me-2 pb-1" size={30} />
           Expenses Management
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link btn btn-link text-decoration-none" onClick={() => onNavClick('home')}>Home</button>
            </li>
            
              <li className="nav-item">
              <button className="nav-link btn btn-link text-decoration-none" onClick={() => onNavClick('product')}>New Product</button>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link text-decoration-none" onClick={() => onNavClick('project')}>Add Item</button>
            </li>
            
            <li className="nav-item">
              <button className="nav-link btn btn-link text-decoration-none" onClick={() => onNavClick('about')}>About</button>
            </li>
            <li className="nav-item">
              {user ? (
                <div className="d-flex align-items-center">
                  {/* User Avatar */}
                  <div 
                    className="d-flex align-items-center justify-content-center me-2"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
                      cursor: 'pointer'
                    }}
                    title={user.name}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  
                  {/* User Name */}
                  <span className="navbar-text me-3 d-none d-md-inline">
                    {user.name}
                  </span>
                  
                  {/* Logout Button */}
                  <button 
                    className="btn btn-outline-secondary btn-sm px-3"
                    onClick={() => { 
                      localStorage.removeItem('token'); 
                      localStorage.setItem('activePage', 'home');
                      window.location.reload(); 
                    }}
                    style={{
                      borderRadius: '20px',
                      fontSize: '0.9rem'
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-primary btn-sm px-4 fw-bold text-white" 
                  onClick={() => onNavClick('login')}
                  style={{
                    borderRadius: '20px'
                  }}
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;