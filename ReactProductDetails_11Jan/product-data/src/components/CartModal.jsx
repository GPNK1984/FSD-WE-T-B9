import React, { useState } from "react";

const CartModal = ({cartItems,isOpen, toggleModal, removeCartItems}) => {
  return (
    <div >
      {/* Button to open modal */}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-auto p-6 relative">
            <h2 className="text-lg font-bold mb-4">Cart Items</h2>
            {cartItems.length>0 &&
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Item</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Category</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {cartItems.map((product)=>{
                      return <>
                        <tr key={product.id}>
                          <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                          <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                          <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                          <td className="border border-gray-300 px-4 py-2">
                          <button
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                            onClick={()=>{removeCartItems(product.id)}}
                            >
                          Remove from Cart
                          </button>
                          </td>
                        
                        </tr>
                      </>
                    })}
                    
                    
                  
                </tbody>
              </table>
            }
            {cartItems.length==0 &&  <div>Cart is Empty! Please add the Products</div>}
           

            <button
              className="mt-6 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
