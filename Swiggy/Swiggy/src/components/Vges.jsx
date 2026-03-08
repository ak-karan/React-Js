// Vges.jsx
import { Link } from "react-router-dom";

function Vges() {
  const categoryList = [
    {
      id: 1,
      title: "Fresh Vegetables",
      imgUrl: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/43e3c412-4ca9-4894-82ba-24b69da80aa6_06c0d2a9-804c-4bf1-8725-7ebd234e144a",
      url: "/Product"
    },
    {
      id: 2,
      title: "Fresh Fruits",
      imgUrl: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/a1493d81-f21e-415f-9875-f78383590fc2_9f3f0f68-4fbe-40f6-8f5d-5472a03469bd",
      url: "/Product"
    },
    {
      id: 3,
      title: "Dairy, Bread and Eggs",
      imgUrl: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/6dea6676-ce07-45e6-b60c-a099c01c5462_6d33297a-5828-48ff-aa2a-c052ae97669e",
      url: "/Product"
    },
    {
      id: 4,
      title: "Rice, Atta and Dals",
      imgUrl: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/097900ca-5d2d-4bb0-8e54-aede1e58dfd8_eab3796c-ac17-48fd-bfc7-6356c6f89783",
      url: "/Product"
    },
    {
      id: 5,
      title: "Masalas and Dry Fruits",
      imgUrl: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/64714677-e6b6-41c1-b533-6644d43e55f7_76ef86af-0483-41a5-8387-37901bf4ca6a",
      url: "/Product"
    },
    {
      id: 6,
      title: "Oils and Ghee",
      imgUrl: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/8e48ee13-3b51-49ea-b765-5cf3e7a97c04_695caa8a-c2f6-4a1a-9672-53213fea21aa",
      url: "/Product"
    }
  ];

  return (
    <>
    <div className="Main-vages">
      <div className="Vages-title">
        <h1>Shop groceries on Instamart</h1>
      </div>
      <div className="Vages-images">
        {categoryList.map((category) => (
          <Link 
            to={category.url} 
            key={category.id}
            aria-label={`View ${category.title}`}
          >
            <img 
              src={category.imgUrl} 
              alt={category.title}
              loading="lazy"
            />
            <h3>{category.title}</h3>
          </Link>
        ))}
      </div>
    </div>
    <div className="home-banner-page">
      <img src=".\public\home-bg1.PNG" />
      <img src=".\public\home-bg2.png" />
    </div>
    </>
  );
}

export default Vges;