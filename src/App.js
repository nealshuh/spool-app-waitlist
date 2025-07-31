import { useState } from 'react';
import SpoolLogo from './SpoolLogo.png'; // Import the image
import { supabase } from './lib/supabase'; // Uncommented this line

export default function SpoolWaitlist() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      setError('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Uncommented and fixed the Supabase insertion
      const { data, error: supabaseError } = await supabase
        .from('waitlist')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            created_at: new Date().toISOString() // Adding timestamp
          }
        ]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        
        if (supabaseError.code === '23505') {
          // Duplicate email error
          setError('This email is already on the waitlist!');
        } else if (supabaseError.code === '42P01') {
          // Table doesn't exist
          setError('Database table not found. Please check your setup.');
        } else {
          setError(`Database error: ${supabaseError.message}`);
        }
        return;
      }

      // Success
      console.log('Successfully added to waitlist:', data);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '' });
      }, 3000);

    } catch (err) {
      console.error('Network error:', err);
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
      font-weight: 700;
    }

    .spool-container {
      font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
      font-weight: 700;
      background: linear-gradient(135deg, #5DADE2 0%, #48C9E8 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      max-width: 900px;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .content {
      color: white;
    }

    .logo {
      width: 180px;
      height: 180px;
      margin-bottom: 30px;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
    }

    .app-icon {
      border-radius: 22% !important;
      object-fit: cover;
      background: white;
      padding: 2px;
    }
    
    .logo.app-icon {
      border-radius: 18px;
    }
    
    .app-logo-screen.app-icon {
      border-radius: 1000px;
    }

    .app-name {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: -0.02em;
    }

    .tagline {
      font-size: 1.3rem;
      font-weight: 400;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 40px;
      opacity: 0.85;
    }

    .waitlist-form {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .form-title {
      color: #2C3E50;
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 30px;
      text-align: center;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      color: #34495E;
      font-weight: 500;
      margin-bottom: 8px;
      font-size: 0.95rem;
    }

    input[type="email"], input[type="text"] {
      width: 100%;
      padding: 16px 20px;
      border: 2px solid #E8F4FD;
      border-radius: 12px;
      font-size: 1rem;
      background: #FAFBFC;
      transition: all 0.3s ease;
      outline: none;
    }

    input[type="email"]:focus, input[type="text"]:focus {
      border-color: #5DADE2;
      background: white;
      box-shadow: 0 0 0 3px rgba(93, 173, 226, 0.1);
    }

    .submit-btn {
      width: 100%;
      background: linear-gradient(135deg, #5DADE2 0%, #48C9E8 100%);
      color: white;
      border: none;
      padding: 18px;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 10px;
    }

    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(93, 173, 226, 0.3);
    }

    .submit-btn:active {
      transform: translateY(0);
    }

    .submit-btn.submitted {
      background: #27AE60;
    }

    .submit-btn.loading {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .phone-mockup {
      position: relative;
      width: 280px;
      height: 500px;
      background: #2C3E50;
      border-radius: 40px;
      padding: 20px;
      margin: 0 auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .screen {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%);
      border-radius: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .app-logo-screen {
      width: 120px;
      height: 120px;
      margin-bottom: 30px;
    }

    .app-preview {
      color: #6C757D;
      font-size: 0.9rem;
      text-align: center;
      padding: 0 20px;
    }

    .coming-soon {
      position: absolute;
      bottom: 30px;
      color: #5DADE2;
      font-weight: 600;
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
      }
      
      .app-name {
        font-size: 2.8rem;
      }
      
      .phone-mockup {
        width: 240px;
        height: 420px;
      }
      
      .waitlist-form {
        padding: 30px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="spool-container">
        <div className="container">
          <div className="content">
            {/* Spool Logo using imported image */}
            <img 
              src={SpoolLogo}
              alt="Spool App Icon" 
              className="logo app-icon"
            />
            
            <h1 className="app-name">Spool</h1>
            <p className="tagline">Your thread's running out.</p>
            <p className="description">
              Spend more time living and less time unravelling.
              Reduce your screentime.
            </p>
          </div>

          <div className="right-side">
            <div className="waitlist-form">
              <h2 className="form-title">Join the Waitlist</h2>
              <div>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`submit-btn ${isSubmitted ? 'submitted' : ''} ${isLoading ? 'loading' : ''}`}
                >
                  {isLoading ? 'Signing Up...' : isSubmitted ? 'Added to Waitlist!' : 'Get Early Access'}
                </button>
                
                {error && (
                  <div style={{
                    color: '#e74c3c',
                    fontSize: '0.9rem',
                    marginTop: '10px',
                    textAlign: 'center',
                    background: '#ffeaea',
                    padding: '10px',
                    borderRadius: '8px'
                  }}>
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}