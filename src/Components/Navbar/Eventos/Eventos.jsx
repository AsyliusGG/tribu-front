import { getallEventos } from '../../../api/api.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Eventos = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEventos() {
      const response = await getallEventos();
      console.log(response.data);
      setPosts(response.data);
    }

    loadEventos();
  }, []); 

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-6">Nuestros eventos</h2>
      <div className="grid grid-cols-2 gap-4">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handlePostClick(post.id)}
          >
            <img src={post.foto} alt="Post" className="w-full h-48 object-cover" />
            <div className="p-4">
              <p>{post.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;