import { Link } from 'react-router-dom';
export default function HomeDesogn() {

    // You could move this to a separate component file
const ProductCard = ({ title, imageUrl, linkTo }) => (
  <div className='border-slate-700 border-4 border-double'>
    <Link to={linkTo}>
      <div className='relative w-fit'>
        <img className='p-0 m-0 shadow-xl/30 md:h-[355px]' src={imageUrl} alt={title} />
        <div className='w-full p-1.5 absolute bottom-[0px] text-white text-left'>
          <h3 className='text-2xl font-semibold uppercase text-white'>{title}</h3>
        </div>
      </div>
    </Link>
  </div>
);

const spotlight = [
    { title: 'Inhale', imageUrl: '/images/secound-section-1.jpg', linkTo: '/' },
    { title: 'Classics', imageUrl: '/images/secound-section-2.jpg', linkTo: '/' },
    { title: 'Puma X skepta', imageUrl: '/images/secound-section-3.jpg', linkTo: '/' },
    { title: 'Mostro', imageUrl: '/images/secound-section-4.jpg', linkTo: '/' },
];
const stepintostyle = [
    { title: 'Jersey Corner', imageUrl: '/images/third-section-1.jpg', linkTo: '/' },
    { title: 'Sneaker Spot', imageUrl: '/images/third-section-2.jpg', linkTo: '/' },
    { title: 'Training Store', imageUrl: '/images/third-section-3.jpg', linkTo: '/' },
    { title: 'Travel Store', imageUrl: '/images/third-section-4.jpg', linkTo: '/' },
];
const gearupforsports = [
    { title: 'Running', imageUrl: '/images/fourt-section-1.jpg', linkTo: '/' },
    { title: 'Football', imageUrl: '/images/fourt-section-2.jpg', linkTo: '/' },
    { title: 'Training', imageUrl: '/images/fourt-section-3.jpg', linkTo: '/' },
    { title: 'Studio', imageUrl: '/images/fourt-section-4.jpg', linkTo: '/' },
    // { title: 'Basketball', imageUrl: '/images/fourt-section-5.jpg', linkTo: '/' },
];
    return(
        <>
            <div className="w-full">
                
                <div className="w-fit md:relative">
                    <img src=".\images\shose-banner-1.webp" alt="SHOSE IMAGE" />
                    <div className="md:absolute top-0 right-0 md:p-30 md:text-white text-slate-700 text-center
                    ">
                        <h3 className="md:text-5xl text-3xl font-bold uppercase mb-2.5">FAST R-3</h3>
                        <p className="md:text-2xl text-base uppercase md:tracking-wider tracking-normal mb-2.5">TIME OF YOUR LIFE</p>
                        <button className="md:bg-white bg-black md:text-slate-900 text-white py-1.5 px-3 cursor-pointer inline-block mr-1.5 mb-5">For Him</button>
                        <button className="md:bg-white bg-black md:text-slate-900 text-white py-1.5 px-3 cursor-pointer inline-block mr-1.5 mb-5">For Her</button>
                    </div>
                </div>
                <div className='text-center md:mt-10'>
                    <h1 className='text-5xl font-extrabold mb-5'>STEP INTO THE SPOTLIGHT</h1>
                    <h5 className='text-2xl tracking-wide'>THE NEW DROP SHINES BRIGHT</h5>
                </div>
                <div className='container mx-auto'>
                    <div className='flex-wrap justify-center mx-4 md:mx-12 max-w-full grid grid-cols-1 md:grid-cols-4 my-12 gap-4'>
                    {spotlight.map((product, index) => (
                    <ProductCard
                        key={index}
                        title={product.title}
                        imageUrl={product.imageUrl}
                        linkTo={product.linkTo}
                    />
                    ))}
                </div>
                </div>
                <div className="w-fit md:relative">
                    <img src=".\images\shose-banner-2.webp" alt="SHOSE IMAGE" />
                    <div className="md:absolute top-0 left-0 md:pl-11 md:pt-45 md:text-white text-slate-700 text-center
                    ">
                        <h3 className="md:text-5xl text-3xl font-bold uppercase mb-2.5">Puma X Squid Game</h3>
                        <p className="md:text-2xl text-base uppercase md:tracking-wider tracking-normal mb-2.5">New IN: Styles get Glow</p>
                        <button className="md:bg-white bg-black md:text-slate-900 text-white py-1.5 px-3 cursor-pointer inline-block mr-1.5 mb-5">Shop Now</button>
                    </div>
                </div>
                <div className='text-left mt-10'>
                    <h1 className='text-3xl font-extrabold mb-0 pl-11'>STEP INTO STYLE</h1>
                </div>
                <div className='container md:mx-auto'>
                    <div className='flex-wrap justify-center mx-4 md:mx-12 max-w-full grid grid-cols-1 md:grid-cols-4 my-12 gap-4'>
                    {stepintostyle.map((product, index) => (
                    <ProductCard
                        key={index}
                        title={product.title}
                        imageUrl={product.imageUrl}
                        linkTo={product.linkTo}
                    />
                    ))}
                </div>
                </div>

                <div className='text-left mt-10'>
                    <h1 className='text-3xl font-extrabold mb-0 pl-11'>GEAR UP FOR SPORTS</h1>
                </div>
                <div className='container md:mx-auto'>
                    <div className='flex-wrap justify-center mx-4 md:mx-12 max-w-full grid grid-cols-1 md:grid-cols-4 my-12 gap-4'>
                    {gearupforsports.map((product, index) => (
                    <ProductCard
                        key={index}
                        title={product.title}
                        imageUrl={product.imageUrl}
                        linkTo={product.linkTo}
                    />
                    ))}
                </div>
                </div>
            </div>
        </>
    )
}