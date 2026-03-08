import React, { useState } from 'react';
import { useBlog } from '../contexts/BlogContext';
import { Comment } from '../types';
import Spinner from './Spinner';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments }) => {
  const { addComment } = useBlog();
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) {
      alert('Naam aur comment dono zaroori hain.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
        addComment(postId, { author, content });
        setAuthor('');
        setContent('');
        setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Comments ({comments.length})
      </h3>

      <div className="space-y-6 mb-8">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700/50">
              <div className="flex items-center mb-2">
                <p className="font-semibold text-gray-800 dark:text-gray-200 mr-3">{comment.author}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(comment.date).toLocaleDateString('hi-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Abhi tak koi comment nahi hai. Aap pehle ho sakte hain!</p>
        )}
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Apna Comment Chhodein</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Aapka Naam
            </label>
            <input
              id="authorName"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Naam..."
              aria-label="Aapka Naam"
            />
          </div>
          <div>
            <label htmlFor="commentContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Comment
            </label>
            <textarea
              id="commentContent"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Aapke vichar..."
              aria-label="Comment"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400"
            >
              {isSubmitting ? <Spinner className="w-5 h-5" /> : 'Comment Submit Karein'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
