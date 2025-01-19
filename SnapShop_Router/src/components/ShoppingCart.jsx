import React, { useEffect, useState } from 'react'

function ShoppingCart({cartItems,onUpdateQuantity,removeCartItems}) {
    let [quantityObj,setQuantity]=useState({});
    let [totalPrice,setTotalPrice]=useState(0);
    let [discountPrice,setDiscountPrice]=useState(0);
    let [finalPrice,setFinalPrice]=useState(0);

    const addQuantity=(id)=>{
        quantityObj[id].quantity++;
        setQuantity(quantityObj);
        onUpdateQuantity(id,quantityObj[id].quantity)
        calTotalPrice();
    }
    const removeQuantity=(id)=>{
        quantityObj[id].quantity--;
       
        if(quantityObj[id].quantity==0){
            removeCartItems(id);
        }else{
            setQuantity(quantityObj)
            onUpdateQuantity(id,quantityObj[id].quantity)
        }
        calTotalPrice();
       
    }

    const calTotalPrice=()=>{
        let totalPrice=0;
        for(let i=0;i<cartItems.length;i++){
            totalPrice+=cartItems[i].quantity*cartItems[i].price
        }
        let discPrice=totalPrice*0.10
        setDiscountPrice(discPrice)
        setTotalPrice(totalPrice)
        setFinalPrice(totalPrice+discPrice)
    }
    useEffect(()=>{
        for(let i=0;i<cartItems.length;i++){
            quantityObj[cartItems[i].id]={quantity:cartItems[i].quantity}
        }
        setQuantity(quantityObj)
        calTotalPrice();
    },[])
  return <>
    <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Shopping Cart</h1>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="md:col-span-2 space-y-4">
                    {
                        cartItems.map((item)=>{
                            return <div key={item.id+1000} >
                                <div  className="grid grid-cols-3 items-start gap-4">
                                    <div className="col-span-2 flex items-start gap-4">
                                        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                                            <img src={item.image} className="w-full h-full object-contain" />
                                        </div>

                                        <div className="flex flex-col">
                                            <h3 className="text-base font-bold text-gray-800">{item.title}</h3>
                                            <p className="text-xs font-semibold text-gray-500 mt-0.5">{item.category}</p>

                                            <button type="button" className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0" onClick={()=>{removeCartItems(item.id);calTotalPrice()}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                                                    <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                                                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                                                </svg>
                                                REMOVE
                                            </button>
                                        </div>
                                    </div>

                                    <div className="ml-auto">
                                        <h4 className="text-lg max-sm:text-base font-bold text-gray-800">${item.price}</h4>

                                        <div className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                           
                                            <button onClick={()=>removeQuantity(item.id)}>-</button>
                                            <span className="mx-3 font-bold">{item.quantity}</span>
                                            <button onClick={()=>addQuantity(item.id)}>+</button>
                                        </div>
                                    </div>
                                   
                                        
                                    
                                </div>
                                <hr  className="border-gray-300 m-5" />
                            </div>
                                
                   
                        })
                    }

                </div>

                <div className="bg-gray-100 rounded-md p-4 h-max">
                    <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">Order Summary</h3>


                    <ul className="text-gray-800 mt-6 space-y-3">
                        <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-bold">${totalPrice.toFixed(2)}</span></li>
                        <li className="flex flex-wrap gap-4 text-sm">Discount 10% <span className="ml-auto font-bold">${discountPrice.toFixed(2)}</span></li>
                        <hr className="border-gray-300" />
                        <li className="flex flex-wrap gap-4 text-sm font-bold">Total <span className="ml-auto">${finalPrice.toFixed(2)}</span></li>
                    </ul>

                   
                </div>
            </div>
        </div>

  </>
}

export default ShoppingCart
