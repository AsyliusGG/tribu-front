import { getallEventos } from '../../api/api.js';
import { useEffect, useState } from 'react';

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadEventos() {
      const response = await getallEventos();
      console.log(response.data);
      setPosts(response.data);
    }

    loadEventos();
  }, []);

  return (
    <div className="my-8 mx-5">
      <h2 className="text-2xl font-bold text-center mb-6">POST RECIENTES</h2>
      
      <div className="grid grid-cols-2 gap-10">
      
      <div className="bg-transparent text-white p-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden" style={{margin: '5%'}}>
            <div className="p-4">
              <img src={post.foto} alt="Post" className="w-full h-48 object-cover" style={{margin: '5%'}} />
              {/* bg-white shadow-md rounded-lg overflow-hidden --- ¿object-cover o contain?*/}
            </div>
            <div className="p-4">
              <p className="text-black">{post.descripcion}</p>
            </div>
            </div>
        ))}
      </div>

      <div className="bg-transparent text-white p-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden" style={{margin: '5%'}}>
            <div className="p-4">
              <img src={post.foto} alt="Post" className="w-full h-48 object-cover" style={{margin: '5%'}} />
              {/* bg-white shadow-md rounded-lg overflow-hidden */}
            </div>
            <div className="p-4">
              <p className="text-black">{post.descripcion}</p>
            </div>
            </div>
        ))}
      </div>

      <div className="bg-transparent text-white p-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden" style={{margin: '5%'}}>
            <div className="p-4">
              <img src={post.foto} alt="Post" className="w-full h-48 object-cover" style={{margin: '5%'}} />
              {/* bg-white shadow-md rounded-lg overflow-hidden */}
            </div>
            <div className="p-4">
              <p className="text-black">{post.descripcion}</p>
            </div>
            </div>
        ))}
      </div>

      <div className="bg-transparent text-white p-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden" style={{margin: '5%'}}>
            <div className="p-4">
              <img src={post.foto} alt="Post" className="w-full h-48 object-cover" style={{margin: '5%'}} />
              {/* bg-white shadow-md rounded-lg overflow-hidden */}
            </div>
            <div className="p-4">
              <p className="text-black">{post.descripcion}</p>
            </div>
            </div>
        ))}
      </div>

      </div>   
    </div>
  );
};

export default RecentPosts;

