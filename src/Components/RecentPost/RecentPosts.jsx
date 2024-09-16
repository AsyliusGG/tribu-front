const RecentPosts = () => {
  const posts = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      description: 'Qui consequuntur expedita.',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      description: 'At recusandae expedita.',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      description: 'Officia omnis qui.',
    },
  ];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-6">POST RECIENTES</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={post.image} alt="Post" className="w-full h-48 object-cover" />
            <div className="p-4">
              <p>{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;