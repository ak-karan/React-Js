import { Link } from 'react-router-dom';
export default function OffersList(){
    const OfferBox = ({ title, imageUrl, linkTo }) => (
  <div className='w-full'>
    <div className='max-w-4xl mx-auto'>
    <Link to={linkTo}>
      <div className='w-1/4 inline'>
        <img className='border-2 rounded-full p-1 border-amber-300' src={imageUrl} alt={title} />
      </div>
    </Link>
  </div>
  </div>
);

const OfferList = [
    { 
      id: 1, // Added unique ID for key
      title: 'Offre 1', 
      imageUrl: '../images/offer-1.jpeg', 
      linkTo: '/' 
    },
    { 
      id: 2, 
      title: 'Offre 2', 
      imageUrl: '/images/offer-2.jpeg', // Consider using different images
      linkTo: '/' 
    },
    { 
      id: 3, 
      title: 'Offre 3', 
      imageUrl: '/images/offer-3.jpeg', 
      linkTo: '/' 
    },
    { 
      id: 4, 
      title: 'Offre 4', 
      imageUrl: '/images/offer-4.jpeg', 
      linkTo: '/' 
    },
  ];

    return(
        <>
            <div className='w-full bg-white pt-12'>
        <div className='bg-gradient-to-bl bg-gray-300 text-gray-700 py-4 text-center mb-6'>
          <p className='text-base text-black font-semibold mb-0.5'>EXTRA 10% ON ORDERS ABOVE ₹4499*</p>
          <p className='text-xs '>Discount auto-applied at checkout | *Exclusions Apply</p>
        </div>
        <div className='container mx-auto px-4'>
        <h1 className='text-2xl font-bold text-center lg:text-left text-gray-800 mb-3 pl-10'>EXPLORE THE SEASON'S NEW STYLES</h1>
        <div className='max-w-lg mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
          {OfferList.map((offer) => (
            <OfferBox
              key={offer.id}
              title={offer.title}
              imageUrl={offer.imageUrl}
              linkTo={offer.linkTo}
            />
          ))}
        </div>
        </div>
      </div>
      </div>
        </>
    )
}

  