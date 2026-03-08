import React from 'react';
import { Link } from 'react-router-dom';
import HomeDesogn from './HomeDesign';
import OffersList from '../component/OfferList';

// You could move this to a separate component file
const ProductCard = ({ title, imageUrl, linkTo }) => (
  <div className='border-slate-700 border-4 border-double'>
    <div className=''>
      <Link to={linkTo}>
      <div className='relative w-fit'>
        <img className='p-0 m-0 shadow-xl/30 mix-blend-multiply md:h-[355px]' src={imageUrl} alt={title} />
        <div className='w-full p-1.5 absolute bottom-[0px] text-white text-left'>
          <h3 className='text-2xl font-semibold uppercase text-white'>{title}</h3>
        </div>
      </div>
    </Link>
    </div>
  </div>
);


export default function Home() {
  const products = [
    { title: 'Palermo', imageUrl: '/images/first.webp', linkTo: '/' },
    { title: 'Nitro', imageUrl: '/images/second.webp', linkTo: '/' },
    { title: 'Puma X Hyrox', imageUrl: '/images/third.webp', linkTo: '/' },
    { title: 'Puma x BMW M Motersport', imageUrl: '/images/fourth.webp', linkTo: '/' },
  ];
    
  return (
    <>
      
      <div className='w-full'>
        <div className="w-fit md:relative">
            <img src="./images/Homebanner.webp" alt="SHOSE IMAGE" />
            <div className="md:text-right md:absolute md:pr-10 top-0 right-0 md:p-30 md:text-white text-slate-700 text-center
            ">
                <h3 className="md:text-5xl text-3xl font-bold uppercase mb-2.5">THE FUTURE JUST LANDED</h3>
                <p className="md:text-2xl text-base uppercase md:tracking-wider tracking-normal mb-2.5">OWN THE NEW SEASON</p>
                <button className="md:bg-white bg-black md:text-slate-900 text-white py-1.5 px-3 cursor-pointer inline-block mr-1.5 mb-5">For Him</button>
                <button className="md:bg-white bg-black md:text-slate-900 text-white py-1.5 px-3 cursor-pointer inline-block mr-1.5 mb-5">For Her</button>
            </div>
        </div>
      </div>
      <OffersList />
      <div className='text-center mt-10'>
        <h1 className='text-5xl font-extrabold mb-5'>ICONS, REINVENTED</h1>
        <h5 className='text-2xl tracking-wide'>SHOP THE LATEST & GREATEST</h5>
      </div>
      <div className='container md:mx-auto'>
        <div className='flex-wrap justify-center mx-4 md:mx-12 max-w-full grid grid-cols-1 md:grid-cols-4 my-12 gap-4'>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            imageUrl={product.imageUrl}
            linkTo={product.linkTo}
          />
        ))}
      </div>
      </div>
      <HomeDesogn />
      
    </>
  );
}