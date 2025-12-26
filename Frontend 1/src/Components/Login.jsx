import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    const url = isRegister ? 'http://localhost:3000/api/auth/createuser' : 'http://localhost:3000/api/auth/login';
    const body = isRegister 
      ? { ...formData, name: formData.email.split('@')[0] } // simple name
      : formData;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.authToken);
        // Fetch user details
        const userResponse = await fetch('http://localhost:3000/api/auth/me', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${data.authToken}` }
        });
        const userData = await userResponse.json();
        setMessage('Success! Welcome back!');
        setTimeout(() => onLogin(userData), 1000);
      } else {
        setMessage(data.error || data.errors?.[0]?.msg || 'An error occurred');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ 
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
           position: 'relative',
           overflow: 'hidden'
         }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '60px',
        height: '60px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite'
      }}></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0" 
                 style={{ 
                   background: 'rgba(255,255,255,0.95)',
                   backdropFilter: 'blur(10px)',
                   borderRadius: '20px',
                   transform: 'translateY(0)',
                   transition: 'transform 0.3s ease',
                   boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                 }}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                    transform: 'translateY(-10px)'
                  }}>
                    <span style={{ fontSize: '2rem', color: 'white' }}>💼</span>
                  </div>
                  <h2 className="fw-bold text-dark mb-2" style={{ fontSize: '2rem' }}>
                    {isRegister ? 'Create Account' : 'Welcome Back'}
                  </h2>
                  <p className="text-muted">
                    {isRegister ? 'Join us to manage your expenses' : 'Sign in to your account'}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark">Email Address</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="email" 
                        className="form-control form-control-lg border-0 shadow-sm"
                        placeholder="Enter your email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required 
                        style={{
                          padding: '15px 20px',
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.8)',
                          fontSize: '1rem'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#667eea'
                      }}>📧</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark">Password</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="password" 
                        className="form-control form-control-lg border-0 shadow-sm"
                        placeholder="Enter your password" 
                        value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        required 
                        style={{
                          padding: '15px 20px',
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.8)',
                          fontSize: '1rem'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#667eea'
                      }}>🔒</div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 btn-lg fw-bold shadow-lg"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '15px',
                      fontSize: '1.1rem',
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        {isRegister ? 'Creating Account...' : 'Signing In...'}
                      </>
                    ) : (
                      isRegister ? 'Create Account' : 'Sign In'
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-2">
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}
                  </p>
                  <button 
                    className="btn btn-link p-0 fw-semibold"
                    onClick={() => { setIsRegister(!isRegister); setMessage(''); }}
                    style={{ 
                      color: '#667eea',
                      textDecoration: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    {isRegister ? 'Sign In Instead' : 'Create New Account'}
                  </button>
                </div>

                {message && (
                  <div className={`alert mt-4 border-0 ${message.includes('Success') ? 'alert-success' : 'alert-danger'}`} 
                       style={{ 
                         borderRadius: '12px',
                         background: message.includes('Success') ? 'rgba(25, 135, 84, 0.1)' : 'rgba(220, 53, 69, 0.1)',
                         color: message.includes('Success') ? '#198754' : '#dc3545'
                       }}>
                    <div className="d-flex align-items-center">
                      <span className="me-2">{message.includes('Success') ? '✅' : '❌'}</span>
                      {message}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Login;