import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { Post } from '../types';
import { fileToBase64 } from '../utils/helpers';
import Spinner from '../components/Spinner';

// FIX: Import GoogleGenAI from @google/genai
import { GoogleGenAI } from '@google/genai';

// FIX: Initialize Gemini AI. The API key is assumed to be in environment variables as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });


const PostEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addPost, updatePost, getPost, categories, locations } = useBlog();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Admin');
  const [category, setCategory] = useState(categories[0] || 'Uncategorized');
  const [tags, setTags] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDraft, setIsDraft] = useState(false);
  const [submittingAction, setSubmittingAction] = useState<'draft' | 'publish' | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isLinkEditorOpen, setIsLinkEditorOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [editorSearchQuery, setEditorSearchQuery] = useState('');
  const [matchCount, setMatchCount] = useState(0);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(id);
  const existingPost = isEditing && id ? getPost(id) : null;

  const indianStates = Object.keys(locations).sort();

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setExcerpt(existingPost.excerpt || '');
      setContent(existingPost.content);
      setAuthor(existingPost.author);
      setCategory(existingPost.category || categories[0] || 'Uncategorized');
      setState(existingPost.state || '');
      setCity(existingPost.city || '');
      if (existingPost.state && locations[existingPost.state]) {
        setAvailableCities([...locations[existingPost.state]].sort());
      } else {
        setAvailableCities([]);
      }
      setImageUrl(existingPost.imageUrl);
      setTags(existingPost.tags?.join(', ') || '');
      setIsDraft(existingPost.isDraft);
    }
  }, [id, isEditing, getPost, categories, locations]);
  
  // Syncs the content state to the contentEditable div's innerHTML.
  // This is crucial for loading initial post data and AI-generated content.
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  // Autofocus and select the link input when it opens
  useEffect(() => {
    if (isLinkEditorOpen && linkInputRef.current) {
      linkInputRef.current.focus();
      linkInputRef.current.select();
    }
  }, [isLinkEditorOpen]);
  
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setState(newState);
    setCity(''); // Always clear city when state changes to ensure consistency.

    if (newState && locations[newState]) {
        // Sort the cities alphabetically for the selected state.
        // Creating a new array with spread to ensure we don't mutate the context state.
        const citiesForState = [...locations[newState]].sort();
        setAvailableCities(citiesForState);
    } else {
        // If no state is selected or the selected state has no cities listed, clear available cities.
        setAvailableCities([]);
    }
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const file = e.target.files?.[0];
    const fileInput = e.target;

    if (!file) {
      return;
    }

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

    // Validate file type
    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      setImageError('Invalid file type. Kripya JPG, PNG, ya GIF file chunein.');
      setImageFile(null);
      setImageUrl(existingPost?.imageUrl); // Revert to original
      fileInput.value = ''; // Clear the input
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setImageError('File bahut badi hai. Maximum size 2MB hai.');
      setImageFile(null);
      setImageUrl(existingPost?.imageUrl); // Revert to original
      fileInput.value = ''; // Clear the input
      return;
    }
    
    // If validation passes
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = () => {
    setImageUrl(undefined);
    setImageFile(null);
    setImageError(null);
    if (imageInputRef.current) {
        imageInputRef.current.value = '';
    }
  };

  const handleGenerateContent = async () => {
    if (!title) {
      alert('Kripya AI se content generate karne ke liye pehle ek title daalein.');
      return;
    }
    setIsGenerating(true);
    setContent('AI aapke liye content generate kar raha hai, कृपया प्रतीक्षा करें...');
    try {
      const prompt = `Write a blog post in Hinglish (Hindi written in English script) about "${title}". The post should be engaging, informative, and around 300-400 words long. Use simple HTML for formatting, like <p>, <strong>, <em>, and <ul><li> for lists.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text;
      setContent(text.trim());
    } catch (error) {
      console.error('Error generating content with AI:', error);
      setContent('AI content generate karne mein error aa gaya. Kripya dobara try karein.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const applyFormat = (command: string) => {
    document.execCommand(command, false);
    if(editorRef.current) {
        setContent(editorRef.current.innerHTML);
        editorRef.current.focus();
    }
  };
  
  const handleLinkButtonClick = () => {
    setIsLinkEditorOpen(!isLinkEditorOpen);
    setLinkUrl('https://');
  };

  const handleConfirmLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if(editorRef.current) {
        editorRef.current.focus();
        if (linkUrl && linkUrl !== 'https://') {
            document.execCommand('createLink', false, linkUrl);
            setContent(editorRef.current.innerHTML);
        }
    }
    setIsLinkEditorOpen(false);
    setLinkUrl('');
  };

  const handleSave = async (asDraft: boolean) => {
    if (imageError) {
      alert('Kripya image error theek karein fir submit karein.');
      return;
    }
    setSubmittingAction(asDraft ? 'draft' : 'publish');
    
    let finalImageUrl = imageUrl;
    if (imageFile) {
      finalImageUrl = await fileToBase64(imageFile);
    }

    const postTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const postData = { title, excerpt, content, author, category, city, state, imageUrl: finalImageUrl, tags: postTags, isDraft: asDraft };

    if (isEditing && id) {
      const updatedPost: Post = { 
        ...existingPost,
        ...postData,
        id, 
        date: existingPost?.date || new Date().toISOString(),
        views: existingPost?.views || 0, // Preserve existing views
        comments: existingPost?.comments || [], // Preserve existing comments
      };
      updatePost(updatedPost);
    } else {
      addPost(postData);
    }

    setTimeout(() => {
        setSubmittingAction(null);
        navigate('/admin/dashboard');
    }, 500); // Simulate submission time
  };
  
  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  };

  const handleEditorSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setEditorSearchQuery(query);

    const editor = editorRef.current;
    if (!editor) return;

    // Unhighlight previous search
    const existingHighlights = editor.querySelectorAll('mark.editor-highlight');
    // FIX: Replaced 'replaceWith' with parentNode operations for broader compatibility and to resolve potential typing issues.
    existingHighlights.forEach(mark => {
      const parent = mark.parentNode;
      if (parent) {
        while (mark.firstChild) {
          parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
      }
    });
    editor.normalize(); // Merge text nodes

    if (query.trim() === '') {
      setMatchCount(0);
      return;
    }

    const regex = new RegExp(escapeRegExp(query.trim()), 'gi');
    let count = 0;

    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
    const textNodes: Node[] = [];
    while (walker.nextNode()) {
      if (walker.currentNode.parentElement?.tagName !== 'SCRIPT' && walker.currentNode.parentElement?.tagName !== 'STYLE') {
        textNodes.push(walker.currentNode);
      }
    }

    textNodes.forEach(node => {
      if (node.parentElement?.classList.contains('editor-highlight')) return;

      const text = node.textContent || '';
      const matches = [...text.matchAll(regex)];
      
      if (matches.length > 0) {
        count += matches.length;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        matches.forEach(match => {
          const offset = match.index!;
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
          
          const mark = document.createElement('mark');
          mark.className = 'editor-highlight bg-yellow-300 dark:bg-yellow-500 rounded px-0.5';
          mark.textContent = match[0];
          fragment.appendChild(mark);

          lastIndex = offset + match[0].length;
        });

        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        // FIX: Replaced 'replaceWith' with 'parentNode.replaceChild' as 'replaceWith' does not exist on the base 'Node' type.
        if (node.parentNode) {
          node.parentNode.replaceChild(fragment, node);
        }
      }
    });
    
    setMatchCount(count);
  };
  
  const handleContentInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    if (editorSearchQuery) {
        // Since the user is typing, the search is now invalid. Clear it.
        const editor = editorRef.current;
        if (editor) {
            const existingHighlights = editor.querySelectorAll('mark.editor-highlight');
            existingHighlights.forEach(mark => {
                const parent = mark.parentNode;
                if (parent) {
                    while (mark.firstChild) {
                        parent.insertBefore(mark.firstChild, mark);
                    }
                    parent.removeChild(mark);
                }
            });
            editor.normalize();
            setContent(editor.innerHTML);
        }
        setEditorSearchQuery('');
        setMatchCount(0);
    } else {
        setContent(e.currentTarget.innerHTML);
    }
  };

  const primaryButtonText = isEditing ? 'Update Post' : 'Publish Post';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {isEditing ? 'Post Edit Karein' : 'Naya Post Banayein'}
        </h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(false); }} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Excerpt (Optional)
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              placeholder="A short summary of the post for the homepage..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    State (Optional)
                </label>
                <select
                    id="state"
                    value={state}
                    onChange={handleStateChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    <option value="">Select a State</option>
                    {indianStates.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    City (Optional)
                </label>
                <input
                    type="text"
                    id="city"
                    list="cities-list"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!state}
                    placeholder={state ? "e.g., Mumbai, Delhi..." : "Pehle state chunein"}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 disabled:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:disabled:bg-gray-600"
                />
                <datalist id="cities-list">
                    {availableCities.map(c => <option key={c} value={c} />)}
                </datalist>
            </div>
          </div>


          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., react, javascript, webdev"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content
                </label>
                <button
                    type="button"
                    onClick={handleGenerateContent}
                    disabled={isGenerating || !title || submittingAction !== null}
                    className="flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400"
                >
                    {isGenerating ? (
                      <>
                        <Spinner className="w-5 h-5 mr-2" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      '✨ AI se Generate Karein'
                    )}
                </button>
            </div>
            
            <div className="mt-1 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-red-500 focus-within:border-red-500 dark:border-gray-600">
                <div className="flex items-center justify-between p-2 border-b bg-gray-50 rounded-t-md dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex items-center space-x-1">
                        <button type="button" onMouseDown={(e) => { e.preventDefault(); applyFormat('bold'); }} className="w-8 h-8 flex items-center justify-center rounded text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-600" title="Bold"><b className="font-bold">B</b></button>
                        <button type="button" onMouseDown={(e) => { e.preventDefault(); applyFormat('italic'); }} className="w-8 h-8 flex items-center justify-center rounded text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-600" title="Italic"><i className="italic">I</i></button>
                        <button type="button" onMouseDown={(e) => { e.preventDefault(); applyFormat('insertUnorderedList'); }} className="w-8 h-8 flex items-center justify-center rounded text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-600" title="Bulleted List">•</button>
                        <button type="button" onMouseDown={(e) => { e.preventDefault(); applyFormat('insertOrderedList'); }} className="w-8 h-8 flex items-center justify-center rounded text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-600" title="Numbered List">1.</button>
                        <button type="button" onClick={handleLinkButtonClick} className="w-8 h-8 flex items-center justify-center rounded text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-600" title="Create Link">🔗</button>
                    </div>
                    <div className="relative flex items-center">
                        <input
                            type="search"
                            placeholder="Find in post..."
                            value={editorSearchQuery}
                            onChange={handleEditorSearchChange}
                            className="w-48 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 dark:bg-gray-600 dark:border-gray-500"
                        />
                         {editorSearchQuery && (
                            <span className="absolute right-2 text-xs text-gray-500 dark:text-gray-400 pointer-events-none bg-white/50 dark:bg-gray-600/50 px-1 rounded">
                                {matchCount} found
                            </span>
                        )}
                    </div>
                </div>
                {isLinkEditorOpen && (
                    <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-600 border-b dark:border-gray-600">
                        <input 
                            ref={linkInputRef}
                            type="url" 
                            value={linkUrl} 
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="flex-grow px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-500"
                            onKeyDown={(e) => e.key === 'Enter' && handleConfirmLink(e as any)}
                        />
                        <button type="button" onClick={handleConfirmLink} className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700">Add</button>
                    </div>
                )}
                <div
                    id="content"
                    ref={editorRef}
                    contentEditable={true}
                    onInput={handleContentInput}
                    className="block w-full min-h-[250px] p-3 prose max-w-none focus:outline-none dark:prose-invert"
                />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
               Featured Image
            </label>
            <div className="mt-1 flex flex-col space-y-4">
              {imageUrl && (
                <div className="flex items-center space-x-4">
                  <img src={imageUrl} alt="Preview" className="h-20 w-20 object-cover rounded-md"/>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                  >
                    Remove
                  </button>
                </div>
              )}
              <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:text-gray-400 dark:file:bg-red-900/50 dark:file:text-red-300 dark:hover:file:bg-red-900"
              />
              {imageError && <p className="text-sm text-red-600 mt-2">{imageError}</p>}
            </div>
          </div>


          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
             <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              disabled={submittingAction !== null}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={submittingAction !== null}
              onClick={() => handleSave(true)}
              className="flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-400 min-w-[140px]"
            >
              {submittingAction === 'draft' ? (
                  <>
                      <Spinner className="w-5 h-5 mr-2" />
                      <span>Saving Draft...</span>
                  </>
              ) : 'Save Draft'}
            </button>
            <button
              type="submit"
              disabled={submittingAction !== null}
              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400 min-w-[140px]"
            >
              {submittingAction === 'publish' ? (
                <>
                    <Spinner className="w-5 h-5 mr-2" />
                    <span>{isEditing ? 'Updating...' : 'Publishing...'}</span>
                </>
              ) : primaryButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditorPage;