import React from 'react'
import CartModal from './CartModal'
function Nav({cartItems, totalCart, toggleModal, isOpen, removeCartItems}) {
  return <>
  {/* <!-- component --> */}
<nav className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
    {/* <!-- logo --> */}
    <h1 className="w-3/12 flex items-center">
      <span className="flex items-center">
        <img
          className="w-10 h-10 mr-2"
          src="https://img.icons8.com/?size=100&id=hXS1pDkqSH4H&format=png&color=000000"
          alt="Logo"
        />
        SnapShop
      </span>
    </h1>

    {/* <!-- navigation --> */}
    <nav className="nav font-semibold text-lg">
        <ul className="flex items-center">
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
             Products
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
             Services
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
             Collections
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
             Contact
            </li>
        </ul>
    </nav>

    {/* <!-- buttons ---> */}
    <div className="w-3/12 flex justify-end">
       
         <button onClick={()=>{toggleModal()}} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 flex items-center space-x-2">
         <i className="fa-solid fa-cart-shopping"></i>
    <span className="top-2">{totalCart}</span>
    
  </button>
  
    </div>

    <CartModal cartItems={cartItems} isOpen={isOpen} toggleModal={toggleModal} removeCartItems={removeCartItems}/>
</nav>
  </>
}

export default Nav
