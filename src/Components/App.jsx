import { useState } from 'react';
import './App.css';
import Navbar from './Navbar/Navbar.jsx';
import RecentPosts from './RecentPost/RecentPosts.jsx';
import JoinSection from './JoinSection/JoinSection.jsx';
import Footer from './Footer/Footer.jsx';
import SignIn from './SignIn/SignIn.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    setShowLogin(false);
  };

  return (
    <>
      <Navbar onLoginClick={handleLoginClick} />
      <div className="container mx-auto">
        {showLogin ? (
          <SignIn onLogin={handleLogin} />
        ) : (
          <>
            <RecentPosts />
            <JoinSection />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

export default App;