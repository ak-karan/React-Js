import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { generateSrcSet } from '../utils/helpers';

interface BlogPostCardProps {
  post: Post;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const MAX_SNIPPET_LENGTH = 150;
  const cleanContent = post.content.replace(/<[^>]+>/g, '');
  
  // Refined snippet generation with a ternary operator for conciseness.
  // Appends '...' only if the content is actually truncated.
  const snippet = cleanContent.length > MAX_SNIPPET_LENGTH
    ? cleanContent.substring(0, MAX_SNIPPET_LENGTH) + '...'
    : cleanContent;
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 dark:bg-gray-800 flex flex-col">
      {post.imageUrl && (
        <img 
          className="h-56 w-full object-cover" 
          src={post.imageUrl} 
          alt={`Featured image for blog post: ${post.title}`}
          srcSet={generateSrcSet(post.imageUrl)}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
      )}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <div className="flex-grow">
              <span>By {post.author}</span>
              <span className="mx-2">&bull;</span>
              <span>
                {new Date(post.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <span className="font-semibold text-red-600 dark:text-red-500 flex-shrink-0">{post.category}</span>
        </div>
        
        {post.city && post.state && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium flex items-center" title="Location">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {post.city}, {post.state}
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          <Link to={`/post/${post.id}`} className="hover:text-red-600 transition-colors dark:hover:text-red-500">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="text-gray-600 italic dark:text-gray-400 mb-4">{post.excerpt}</p>
        )}
        <p className="text-gray-700 leading-relaxed mb-4 dark:text-gray-300 flex-grow">{snippet}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-red-900/50 dark:text-red-300">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <Link to={`/post/${post.id}`} className="font-semibold text-red-600 hover:text-red-800 transition-colors dark:text-red-500 dark:hover:text-red-400 mt-auto">
          Poora Padhien &rarr;
        </Link>
      </div>
    </div>
  );
};