import { CiStar } from 'react-icons/ci';
import Link from 'next/link';
import { fetchData } from '../../fetchData';

import MiniScroller from '@/app/Components/miniScroller/page';

async function GirlsTShirt() {  

  const data = await fetchData();
  const GTShirt = data && data.filter((item)=>item.category === "GTShirt"); 
  
  if(!data){
    return <MiniScroller/>
  }
  
  
  return (
    <div className="cards">
      {GTShirt.map((item ,i)=> {
             return ( <Link key={i} href={`/Components/AllPages/${item._id}`}>
                <div className={item.availableQty > 0 ? "card" : `qty0`}>
                <div className="img">
                  <img
                    src={item.thumbnail}
                   alt="Hoodie"
                 />
                 <span className='leftQty'>+{item.availableQty} more</span>
               </div>
               <p className="title">{item.title}</p>
               <h3 className="price">
                 <span>₹</span> {item.price} 
                   <span className='onwards'>onwards</span>
               </h3>
               <p className='delivery'>Free Delivery</p>
               <div className="rating">
                 <strong>{item.rating}</strong>
                 <span className="star">
                   <CiStar className='star'/>
                 </span>
               </div>
              </div>
              </Link>  
      )})}  
    </div>
  );
}

export default GirlsTShirt;
