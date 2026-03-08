import React, { useState, useEffect, useMemo } from 'react';
import { useBlog } from '../contexts/BlogContext';
import { BlogPostCard } from '../components/BlogPostCard';
import { Link } from 'react-router-dom';
import { generateSrcSet } from '../utils/helpers';

const HomePage: React.FC = () => {
  const { posts, categories, locations } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeState, setActiveState] = useState('All');
  const [citySearch, setCitySearch] = useState('');

  const publishedPosts = useMemo(() => posts.filter(p => !p.isDraft), [posts]);

  // Debounce the search query to avoid re-rendering on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms delay

    // Cleanup the timeout if the component unmounts or the query changes
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);


  const filteredPosts = useMemo(() => {
    let tempPosts = publishedPosts;

    if (activeCategory !== 'All') {
      tempPosts = tempPosts.filter(post => post.category === activeCategory);
    }

    if (activeState !== 'All') {
        tempPosts = tempPosts.filter(post => post.state === activeState);
    }
    
    if (citySearch.trim()) {
        const cityQuery = citySearch.toLowerCase().trim();
        tempPosts = tempPosts.filter(post => post.city?.toLowerCase().includes(cityQuery));
    }
    
    if (!debouncedQuery) {
      return tempPosts;
    }

    const query = debouncedQuery.toLowerCase();
    return tempPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const contentMatch = post.content.replace(/<[^>]+>/g, '').toLowerCase().includes(query);
      return titleMatch || contentMatch;
    });
  }, [publishedPosts, debouncedQuery, activeCategory, activeState, citySearch]);

  const postsWithImages = publishedPosts.filter(post => post.imageUrl);
  const allCategories = useMemo(() => ['All', ...categories], [categories]);
  const allStates = useMemo(() => ['All', ...Object.keys(locations).sort()], [locations]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    const siteTitle = "Hinglish Blogger - Tech, Programming, and More";
    const siteDescription = "Technology, programming, aur web development ke baare mein latest articles padhein Hinglish Blogger par.";
    const homeUrl = window.location.href;

    const originalTitle = document.title;
    document.title = siteTitle;

    const tagsToManage = [
      { tagName: 'meta', selector: `meta[name='description']`, attributes: { name: 'description', content: siteDescription } },
      { tagName: 'link', selector: `link[rel='canonical']`, attributes: { rel: 'canonical', href: homeUrl } },
      { tagName: 'meta', selector: `meta[property='og:type']`, attributes: { property: 'og:type', content: 'website' } },
      { tagName: 'meta', selector: `meta[property='og:title']`, attributes: { property: 'og:title', content: siteTitle } },
      { tagName: 'meta', selector: `meta[property='og:description']`, attributes: { property: 'og:description', content: siteDescription } },
      { tagName: 'meta', selector: `meta[property='og:url']`, attributes: { property: 'og:url', content: homeUrl } },
      { tagName: 'meta', selector: `meta[name='twitter:card']`, attributes: { name: 'twitter:card', content: 'summary' } },
      { tagName: 'meta', selector: `meta[name='twitter:title']`, attributes: { name: 'twitter:title', content: siteTitle } },
      { tagName: 'meta', selector: `meta[name='twitter:description']`, attributes: { name: 'twitter:description', content: siteDescription } },
    ];

    const addedElements: HTMLElement[] = [];
    tagsToManage.forEach(tagInfo => {
      let element = document.head.querySelector(tagInfo.selector);
      if (!element) {
        element = document.createElement(tagInfo.tagName);
        addedElements.push(element as HTMLElement);
        document.head.appendChild(element);
      }
      Object.entries(tagInfo.attributes).forEach(([key, value]) => {
        element!.setAttribute(key, value);
      });
    });
    
    return () => {
      document.title = originalTitle;
      addedElements.forEach(el => el.remove());
    };
  }, []);


  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
          Hinglish Blogger Mein Aapka Swagat Hai
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          Technology, programming, aur web development ke baare mein latest articles padhein.
        </p>
      </div>
      
      <div className="relative max-w-xl mx-auto">
        <input
          type="search"
          placeholder="Blog posts search karein..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-5 pr-12 py-3 text-lg border-2 border-gray-300 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
          aria-label="Search blog posts"
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>

      {/* Photo Gallery Section */}
      {postsWithImages.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Photo Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {postsWithImages.map(post => (
              <Link key={`gallery-${post.id}`} to={`/post/${post.id}`} className="group block overflow-hidden rounded-lg shadow-lg relative aspect-w-1 aspect-h-1">
                <img
                  src={post.imageUrl}
                  alt={`Photo gallery image for post titled: ${post.title}`}
                  className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  srcSet={generateSrcSet(post.imageUrl!)}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
                <p className="absolute bottom-2 left-3 p-1 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none drop-shadow-md bg-black/20 rounded">
                  {post.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              All Posts
            </h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Filter by Location</h3>
                <div className="flex justify-center flex-wrap gap-4">
                    <select
                        value={activeState}
                        onChange={(e) => setActiveState(e.target.value)}
                        className="px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                        aria-label="Filter by State"
                    >
                        {allStates.map(state => <option key={state} value={state}>{state}</option>)}
                    </select>
                     <input
                        type="search"
                        placeholder="City se search karein..."
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        className="px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                        aria-label="Search by City"
                    />
                </div>
            </div>
            <div className="flex justify-center flex-wrap gap-2">
                {allCategories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors ${
                            activeCategory === category 
                                ? 'bg-red-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-8">
            {posts.length > 0 ? `In filters ke liye koi post nahi mila.` : 'Abhi koi posts nahi hain.'}
          </p>
        )}
      </div>

    </div>
  );
};

export default HomePage;