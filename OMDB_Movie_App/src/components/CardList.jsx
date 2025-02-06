import React, { useEffect, useState } from 'react'
import Card from './Card'

function CardList({cartItems, products,setCartData}) {

  return <>
     <div className="antialiased text-gray-900 ">
     <div className="bg-gray-200 min-h-screen p-8 flex flex-wrap gap-3 justify-center">
      {
        products.map((product,index)=>{
          return <Card key={product.id || index} product={product} cartItems={cartItems} setCartData={setCartData} />
        })
      }
      
      </div>
    </div>
  </>
}

export default CardList
