import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Plus } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/posts" className="flex items-center space-x-2">
            <Layout className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">Post Manager</span>
          </Link>
          
          {location.pathname === '/posts' && (
            <Link
              to="/posts/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;