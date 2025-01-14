import React, { useEffect, useState } from 'react'

function Card({product,setCartData}) {

    const stars = Array.from({ length: 5 }, (_, index) => {
        if (index < Math.round(product.rating.rate)) {
        return <i key={index} className="fas fa-star"></i>; // Full star
        } else if (index < product.rating.rate) {
        return <i key={index} className="fas fa-star-half-alt"></i>; // Half star
        } else {
        return <i key={index} className="far fa-star"></i>; // Empty star
        }
  });

  return <>
  
    <div className="bg-white rounded-lg overflow-hidden shadow-2xl xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2">
      <img className="h-48 w-full object-cover object-end" src={product.image} alt="Home in Countryside" />
      <div className="p-2">
        <h4 className="mt-0 font-semibold text-lg leading-tight truncate">{product.title}</h4>
        <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide pb-">
            {product.category}
          </div>

        <div className="mt-1">
          <span>${product.price}</span>
          <span className="text-gray-600 text-sm">/ wk</span>
        </div>
        <div className="mt-2 flex items-center">
            <span className="text-teal-600 font-semibold">
                <span>
                    {stars}
                </span>
            </span>
            <span className="ml-2 text-gray-600 text-sm">{product.rating.count} reviews</span>
        </div>
        <div className="mt-2 flex items-center justify-center">
            <button
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                onClick={()=>{setCartData(product)}}
                >
                Add to Cart
            </button>
        </div>
      </div>
    </div>
 

  </>
}

export default Card
