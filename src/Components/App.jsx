import { useState } from 'react'
import './App.css'
import Navbar from './Navbar.jsx';
import Carousel from './Carousel.jsx';
import RecentPosts from './RecentPosts.jsx';
import JoinSection from './JoinSection.jsx';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Carousel />
        <RecentPosts />
        <JoinSection />
      </div>
    </>
  );
}

export default App;
