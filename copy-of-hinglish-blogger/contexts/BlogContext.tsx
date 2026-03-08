import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Post, Comment } from '../types';
import { MOCK_POSTS } from '../data/mockPosts';
import { STATE_CITY_MAP } from '../constants/locations';

interface BlogContextType {
  posts: Post[];
  getPost: (id: string) => Post | undefined;
  addPost: (post: Omit<Post, 'id' | 'date' | 'views' | 'comments'>) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
  incrementViewCount: (id: string) => void;
  addComment: (postId: string, comment: { author: string; content: string; }) => void;
  categories: string[];
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  locations: { [key: string]: string[] };
  addCity: (state: string, city: string) => void;
  deleteCity: (state: string, city: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const DEFAULT_CATEGORIES = [
  'Technology',
  'Tutorials',
  'Web Development',
  'Lifestyle',
  'Uncategorized',
];

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const localData = localStorage.getItem('blogPosts');
      if (localData) {
        const parsedData: Post[] = JSON.parse(localData);
        // Ensure all posts have a comments and category array for backward compatibility
        return parsedData.map(post => ({ 
          ...post, 
          comments: post.comments || [],
          category: post.category || 'Uncategorized',
          city: post.city || '',
          state: post.state || '',
        }));
      }
      return MOCK_POSTS;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return MOCK_POSTS;
    }
  });

  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const localData = localStorage.getItem('blogCategories');
      if (localData) {
        const parsedData: string[] = JSON.parse(localData);
        // Ensure 'Uncategorized' always exists
        if (!parsedData.includes('Uncategorized')) {
          return [...parsedData, 'Uncategorized'].sort();
        }
        return parsedData;
      }
      return DEFAULT_CATEGORIES;
    } catch (error) {
      console.error('Error reading categories from localStorage', error);
      return DEFAULT_CATEGORIES;
    }
  });

  const [locations, setLocations] = useState<{ [key: string]: string[] }>(() => {
    try {
      const localData = localStorage.getItem('blogLocations');
      return localData ? JSON.parse(localData) : STATE_CITY_MAP;
    } catch (error) {
      console.error('Error reading locations from localStorage', error);
      return STATE_CITY_MAP;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('blogPosts', JSON.stringify(posts));
    } catch (error)
    {
      console.error('Error writing to localStorage', error);
    }
  }, [posts]);
  
  useEffect(() => {
    try {
      localStorage.setItem('blogCategories', JSON.stringify(categories));
    } catch (error) {
      console.error('Error writing categories to localStorage', error);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('blogLocations', JSON.stringify(locations));
    } catch (error) {
      console.error('Error writing locations to localStorage', error);
    }
  }, [locations]);

  const getPost = (id: string): Post | undefined => {
    return posts.find(post => post.id === id);
  };

  const addPost = (post: Omit<Post, 'id' | 'date' | 'views' | 'comments'>) => {
    const newPost: Post = {
      ...post,
      id: new Date().getTime().toString(),
      // FIX: Removed extra 'new' keyword.
      date: new Date().toISOString(),
      views: 0,
      comments: [],
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(prevPosts =>
      prevPosts.map(post => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const deletePost = (id: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };
  
  const incrementViewCount = (id: string) => {
    setPosts(prevPosts => 
        prevPosts.map(post => 
            post.id === id ? { ...post, views: post.views + 1, isDraft: post.isDraft } : post
        )
    );
  };

  const addComment = (postId: string, commentData: { author: string; content: string }) => {
    const newComment: Comment = {
      id: new Date().getTime().toString(),
      postId: postId,
      author: commentData.author,
      content: commentData.content,
      date: new Date().toISOString(),
    };

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) }
          : post
      )
    );
  };

  const addCategory = (category: string) => {
    const newCategory = category.trim();
    if (newCategory && !categories.some(c => c.toLowerCase() === newCategory.toLowerCase())) {
      setCategories(prevCategories => [...prevCategories, newCategory].sort());
    } else {
      alert(`Category "${newCategory}" already exists.`);
    }
  };

  const deleteCategory = (categoryToDelete: string) => {
    if (categoryToDelete === 'Uncategorized') {
      alert("'Uncategorized' category cannot be deleted.");
      return;
    }
    // Re-categorize posts before deleting the category
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.category === categoryToDelete
          ? { ...post, category: 'Uncategorized' }
          : post
      )
    );
    setCategories(prevCategories =>
      prevCategories.filter(c => c !== categoryToDelete)
    );
  };
  
  const addCity = (state: string, city: string) => {
    const newCity = city.trim();
    if (!state || !newCity) {
      alert("State and city cannot be empty.");
      return;
    }
    setLocations(prevLocations => {
      const stateCities = prevLocations[state] || [];
      if (stateCities.some(c => c.toLowerCase() === newCity.toLowerCase())) {
        alert(`City "${newCity}" already exists in ${state}.`);
        return prevLocations;
      }
      const updatedCities = [...stateCities, newCity].sort();
      return { ...prevLocations, [state]: updatedCities };
    });
  };

  const deleteCity = (state: string, cityToDelete: string) => {
    if (!state || !cityToDelete) return;
    setLocations(prevLocations => {
      const stateCities = prevLocations[state] || [];
      const updatedCities = stateCities.filter(c => c !== cityToDelete);
      return { ...prevLocations, [state]: updatedCities };
    });
  };


  return (
    <BlogContext.Provider value={{ posts, getPost, addPost, updatePost, deletePost, incrementViewCount, addComment, categories, addCategory, deleteCategory, locations, addCity, deleteCity }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};