import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import { Post } from '../types';
import ConfirmationModal from '../components/ConfirmationModal';

type SortKey = 'title' | 'date' | 'views' | 'category' | 'state' | 'author';
type SortDirection = 'asc' | 'desc';
type FilterStatus = 'all' | 'published' | 'drafts';

const POSTS_PER_PAGE = 10;

const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-600 rounded p-0 m-0">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const AdminDashboardPage: React.FC = () => {
  const { posts, deletePost, categories, addCategory, deleteCategory, locations, addCity, deleteCity } = useBlog();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // States for post deletion
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  // States for category management
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');

  // States for city management
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<{ state: string; city: string } | null>(null);
  const [selectedState, setSelectedState] = useState(Object.keys(locations)[0] || '');
  const [newCity, setNewCity] = useState('');

  // States for sorting and filtering posts
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const allCategories = useMemo(() => ['all', ...categories], [categories]);

  const filteredPosts = useMemo(() => {
    let tempPosts = posts;
    if (activeFilter === 'published') tempPosts = tempPosts.filter(p => !p.isDraft);
    if (activeFilter === 'drafts') tempPosts = tempPosts.filter(p => p.isDraft);
    if (categoryFilter !== 'all') tempPosts = tempPosts.filter(p => p.category === categoryFilter);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      tempPosts = tempPosts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    return tempPosts;
  }, [posts, activeFilter, categoryFilter, searchQuery]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      if (sortKey === 'title' || sortKey === 'category' || sortKey === 'state' || sortKey === 'author') {
          const valA = a[sortKey as 'title' | 'category' | 'state' | 'author'] || '';
          const valB = b[sortKey as 'title' | 'category' | 'state' | 'author'] || '';
          return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (sortKey === 'date') return sortDirection === 'asc' ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortKey === 'views') return sortDirection === 'asc' ? a.views - b.views : b.views - a.views;
      return 0;
    });
  }, [filteredPosts, sortKey, sortDirection]);
  
  useEffect(() => { setCurrentPage(1); }, [activeFilter, categoryFilter, sortKey, sortDirection, searchQuery]);

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => sortedPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE), [currentPage, sortedPosts]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDirection('asc'); }
  };
  
  // Post Deletion Handlers
  const handlePostDeleteClick = (post: Post) => { setPostToDelete(post); setIsPostModalOpen(true); };
  const handleConfirmPostDelete = () => {
    if (postToDelete) {
      if (paginatedPosts.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
      deletePost(postToDelete.id);
      handleClosePostModal();
    }
  };
  const handleClosePostModal = () => { setIsPostModalOpen(false); setPostToDelete(null); };

  // Category Management Handlers
  const handleCategoryDeleteClick = (category: string) => {
    if (category === 'Uncategorized') { alert('You cannot delete the "Uncategorized" category.'); return; }
    setCategoryToDelete(category); setIsCategoryModalOpen(true);
  };
  const handleConfirmCategoryDelete = () => { if (categoryToDelete) { deleteCategory(categoryToDelete); handleCloseCategoryModal(); } };
  const handleCloseCategoryModal = () => { setIsCategoryModalOpen(false); setCategoryToDelete(null); };
  const handleAddCategory = (e: React.FormEvent) => { e.preventDefault(); if (newCategory.trim()) { addCategory(newCategory); setNewCategory(''); } };

  // City Management Handlers
  const handleCityDeleteClick = (state: string, city: string) => { setCityToDelete({ state, city }); setIsCityModalOpen(true); };
  const handleConfirmCityDelete = () => { if (cityToDelete) { deleteCity(cityToDelete.state, cityToDelete.city); handleCloseCityModal(); } };
  const handleCloseCityModal = () => { setIsCityModalOpen(false); setCityToDelete(null); };
  const handleAddCity = (e: React.FormEvent) => { e.preventDefault(); if (selectedState && newCity.trim()) { addCity(selectedState, newCity); setNewCity(''); } };

  const getFilterButtonClasses = (filter: FilterStatus) => activeFilter === filter ? "px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 bg-red-600 text-white" : "px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600";
  const SortableHeader: React.FC<{ sortKeyName: SortKey; children: React.ReactNode; }> = ({ sortKeyName, children }) => (
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => handleSort(sortKeyName)}>
        <div className="flex items-center"><span>{children}</span><span className="ml-2 w-4">{sortKey === sortKeyName ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</span></div>
    </th>
  );
  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Link to="/admin/add-post" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Naya Post Banayein</Link>
              <button onClick={handleLogout} className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Logout</button>
            </div>
          </div>
          
          <div className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Manage Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Add New Category</h3>
                    <form onSubmit={handleAddCategory} className="flex items-center space-x-2">
                        <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New category name..." className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Add</button>
                    </form>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Existing Categories</h3>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                        {categories.map(cat => (
                            <div key={cat} className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                                <span>{cat}</span>
                                {cat !== 'Uncategorized' && (
                                    <button onClick={() => handleCategoryDeleteClick(cat)} className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 text-lg leading-none" aria-label={`Delete category ${cat}`}>&times;</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
          
          <div className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Manage Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Add New City</h3>
                    <form onSubmit={handleAddCity} className="space-y-2">
                        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {Object.keys(locations).sort().map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                        <div className="flex items-center space-x-2">
                            <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} placeholder="New city name..." className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Add</button>
                        </div>
                    </form>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Cities in {selectedState}</h3>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded-md dark:border-gray-600">
                        {locations[selectedState]?.length > 0 ? ( locations[selectedState].map(city => (
                                <div key={city} className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                                    <span>{city}</span>
                                    <button onClick={() => handleCityDeleteClick(selectedState, city)} className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 text-lg leading-none" aria-label={`Delete city ${city}`}>&times;</button>
                                </div>
                            ))
                        ) : ( <p className="text-sm text-gray-500 dark:text-gray-400">No cities added for this state yet.</p> )}
                    </div>
                </div>
            </div>
          </div>

           <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <button onClick={() => setActiveFilter('all')} className={getFilterButtonClasses('all')}>All</button>
                <button onClick={() => setActiveFilter('published')} className={getFilterButtonClasses('published')}>Published</button>
                <button onClick={() => setActiveFilter('drafts')} className={getFilterButtonClasses('drafts')}>Drafts</button>
              </div>
              <div className="flex items-center space-x-4 flex-wrap gap-4">
                <input
                    type="search"
                    placeholder="Search by title, author, tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    aria-label="Search posts"
                />
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" aria-label="Filter by category">
                    {allCategories.map(cat => (<option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>))}
                </select>
              </div>
               <div className="text-sm text-gray-600 dark:text-gray-400">Total Posts: <span className="font-semibold text-gray-800 dark:text-gray-200">{posts.length}</span></div>
            </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr><SortableHeader sortKeyName="title">Title</SortableHeader><SortableHeader sortKeyName="author">Author</SortableHeader><SortableHeader sortKeyName="category">Category</SortableHeader><SortableHeader sortKeyName="state">Location</SortableHeader><SortableHeader sortKeyName="date">Date</SortableHeader><SortableHeader sortKeyName="views">Views</SortableHeader><th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th></tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedPosts.length > 0 ? ( paginatedPosts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4 whitespace-normal align-top">
                          <div className="flex items-start">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                <Highlight text={post.title} highlight={searchQuery} />
                                {post.isDraft && <span className="ml-2 text-xs font-semibold bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full dark:bg-gray-600 dark:text-gray-200">Draft</span>}
                            </div>
                          </div>
                           {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1">
                                {post.tags.map(tag => (
                                <span key={tag} className="text-xs text-gray-500 dark:text-gray-400">
                                    #<Highlight text={tag} highlight={searchQuery} />
                                </span>
                                ))}
                            </div>
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap align-top"><span className="text-sm text-gray-500 dark:text-gray-400"><Highlight text={post.author} highlight={searchQuery} /></span></td>
                        <td className="px-6 py-4 whitespace-nowrap align-top"><span className="text-sm text-gray-500 dark:text-gray-400">{post.category}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap align-top"><span className="text-sm text-gray-500 dark:text-gray-400">{post.city && post.state ? `${post.city}, ${post.state}` : 'N/A'}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap align-top"><div className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.date).toLocaleDateString('hi-IN', {year: 'numeric', month: 'long', day: 'numeric'})}</div></td>
                        <td className="px-6 py-4 whitespace-nowrap align-top text-sm text-gray-500 dark:text-gray-400">{post.views.toLocaleString('en-IN')}</td>
                        <td className="px-6 py-4 whitespace-nowrap align-top text-right text-sm font-medium space-x-4"><Link to={`/admin/edit-post/${post.id}`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Edit</Link><button onClick={() => handlePostDeleteClick(post)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button></td>
                      </tr>
                    )) ) : ( <tr><td colSpan={7} className="text-center py-10 text-gray-500 dark:text-gray-400">Is filter ke liye koi posts nahi hain.</td></tr> )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                <div><p className="text-sm text-gray-700 dark:text-gray-300">Showing <span className="font-medium">{(currentPage - 1) * POSTS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * POSTS_PER_PAGE, sortedPosts.length)}</span> of <span className="font-medium">{sortedPosts.length}</span> results</p></div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">Previous</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (<button key={number} onClick={() => setCurrentPage(number)} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === number ? 'z-10 bg-red-50 border-red-500 text-red-600 dark:bg-red-900/50 dark:border-red-500 dark:text-red-300' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'}`}>{number}</button>))}
                  <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">Next</button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal isOpen={isPostModalOpen} onClose={handleClosePostModal} onConfirm={handleConfirmPostDelete} title="Post Delete Karein?" message={`Kya aap sach mein "${postToDelete?.title}" post ko delete karna chahte hain? Yeh action undo nahi kiya ja sakta.`} />
      <ConfirmationModal isOpen={isCategoryModalOpen} onClose={handleCloseCategoryModal} onConfirm={handleConfirmCategoryDelete} title="Category Delete Karein?" message={`Kya aap sach mein "${categoryToDelete}" category ko delete karna chahte hain? Is category ke sabhi posts "Uncategorized" mein chale jayenge.`} />
      <ConfirmationModal isOpen={isCityModalOpen} onClose={handleCloseCityModal} onConfirm={handleConfirmCityDelete} title="City Delete Karein?" message={`Kya aap sach mein "${cityToDelete?.city}" ko ${cityToDelete?.state} se delete karna chahte hain?`} />
    </>
  );
};

export default AdminDashboardPage;
