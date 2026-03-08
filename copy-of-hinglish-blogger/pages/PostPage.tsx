import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import CommentSection from '../components/CommentSection';
import { generateSrcSet } from '../utils/helpers';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost, incrementViewCount } = useBlog();
  const post = id ? getPost(id) : undefined;
  
  useEffect(() => {
    if (id) {
      const currentPost = getPost(id);
      if (currentPost && !currentPost.isDraft) {
        const timer = setTimeout(() => {
          incrementViewCount(id);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [id, getPost, incrementViewCount]);
  
  useEffect(() => {
    if (!post) return;

    const originalTitle = document.title;
    const locationSuffix = post.city && post.state ? ` in ${post.city}, ${post.state}` : '';
    const pageTitle = `${post.title}${locationSuffix} - Hinglish Blogger`;
    document.title = pageTitle;

    const metaDescription = `${post.content.replace(/<[^>]+>/g, '').substring(0, 150)}... Read more about ${post.title}${locationSuffix}.`;
    const postUrl = window.location.href;

    const tagsToManage: {
        tagName: 'meta' | 'link' | 'script';
        selector: string;
        attributes: Record<string, string>;
        innerHTML?: string;
    }[] = [
        { tagName: 'meta', selector: `meta[name='description']`, attributes: { name: 'description', content: metaDescription } },
        { tagName: 'link', selector: `link[rel='canonical']`, attributes: { rel: 'canonical', href: postUrl } },
        { tagName: 'meta', selector: `meta[property='og:type']`, attributes: { property: 'og:type', content: 'article' } },
        { tagName: 'meta', selector: `meta[property='og:title']`, attributes: { property: 'og:title', content: pageTitle } },
        { tagName: 'meta', selector: `meta[property='og:description']`, attributes: { property: 'og:description', content: metaDescription } },
        { tagName: 'meta', selector: `meta[property='og:url']`, attributes: { property: 'og:url', content: postUrl } },
        { tagName: 'meta', selector: `meta[name='twitter:card']`, attributes: { name: 'twitter:card', content: 'summary_large_image' } },
        { tagName: 'meta', selector: `meta[name='twitter:title']`, attributes: { name: 'twitter:title', content: pageTitle } },
        { tagName: 'meta', selector: `meta[name='twitter:description']`, attributes: { name: 'twitter:description', content: metaDescription } },
    ];

    if (post.imageUrl) {
        tagsToManage.push({ tagName: 'meta', selector: `meta[property='og:image']`, attributes: { property: 'og:image', content: post.imageUrl } });
        tagsToManage.push({ tagName: 'meta', selector: `meta[name='twitter:image']`, attributes: { name: 'twitter:image', content: post.imageUrl } });
    }
    
    const structuredData: any = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
        headline: post.title,
        description: metaDescription,
        image: post.imageUrl || '',
        author: { '@type': 'Person', name: post.author },
        publisher: {
            '@type': 'Organization',
            name: 'Hinglish Blogger',
            logo: { '@type': 'ImageObject', url: `${window.location.origin}/favicon.svg` },
        },
        datePublished: post.date,
        dateModified: post.date,
    };
    
    if (post.city && post.state) {
        structuredData.contentLocation = {
            '@type': 'Place',
            name: `${post.city}, ${post.state}`,
        };
    }

    tagsToManage.push({ 
        tagName: 'script', 
        selector: `script[type='application/ld+json']`, 
        attributes: { type: 'application/ld+json' }, 
        innerHTML: JSON.stringify(structuredData, null, 2)
    });

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
        if (tagInfo.innerHTML && element) {
            element.innerHTML = tagInfo.innerHTML;
        }
    });

    return () => {
        document.title = originalTitle;
        addedElements.forEach(el => el.remove());
    };
  }, [post]);


  if (!post || post.isDraft) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 lg:p-12 rounded-lg shadow-xl dark:bg-gray-800">
      {post.imageUrl && (
        <img 
          className="h-auto w-full object-cover rounded-lg mb-8" 
          src={post.imageUrl} 
          alt={post.title} 
          srcSet={generateSrcSet(post.imageUrl)}
          sizes="(max-width: 896px) 100vw, 896px"
        />
      )}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">{post.title}</h1>
      <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 mb-4">
        <span>By {post.author}</span>
        <span className="mx-2">&bull;</span>
        <span>{new Date(post.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <span className="mx-2">&bull;</span>
        <span>{post.views.toLocaleString('en-IN')} views</span>
        {post.city && post.state && (
            <>
                <span className="mx-2">&bull;</span>
                 <span className="font-medium flex items-center" title="Location">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {post.city}, {post.state}
                </span>
            </>
        )}
      </div>
       {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="inline-block bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div 
        className="prose prose-lg max-w-none text-gray-800 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <CommentSection postId={post.id} comments={post.comments || []} />

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link to="/" className="text-red-600 hover:text-red-800 font-semibold transition-colors dark:text-red-500 dark:hover:text-red-400">
          &larr; Wapas Home Par
        </Link>
      </div>
    </div>
  );
};

export default PostPage;
