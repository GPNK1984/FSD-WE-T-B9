import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/Nav'
import Card from './components/Card'
import toast, { Toaster } from 'react-hot-toast';


function App() {
  
  //States used for this application
  let [products,setProducts]=useState([]); // store all the api product data
  let [cartItems,setCartItems]=useState([]); // add to cart stored items
  let [totalCart,setTotalCart]=useState(0); // total add to cart item count
  let [isOpen, setIsOpen] = useState(false); // boolean to handle cart modal
  //

  //Method used to fetch API product data from fakestore api
  const getProductData=async()=>{
    try {
      let res=await fetch('https://fakestoreapi.com/products');
      let data=await res.json();
      if (res.status==200){
        setProducts(data)
        console.log(data)
      }
    } catch (error) {
      console.log(error.message || "Error in Fetching Data" )
    }
  }
 
  //Used to toggle the modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  //Used to add the product to the cart items
  const setCartData=(productItem)=>{
    if(!cartItems.includes(productItem)){
      setCartItems([...cartItems,productItem])
      
    }else{
      toast.error("Product added already in cart")
    }
    
   
  }
  //Used to remove the cart items when we tap from CartModal popup remove cart button
  const removeCartItems=(id)=>{
    for(let i=0;i<cartItems.length;i++){
      if(cartItems[i].id==id){
        cartItems.splice(i,1)
      }
    }
    setCartItems(cartItems);
    setTotalCart(cartItems.length)
  }

  //Update CartItems when data changes happening in cartItems array
  useEffect(()=>{
    setTotalCart(cartItems.length)
  },[cartItems])

  //Fetch API data when component loads
  useEffect(()=>{
    getProductData();
   },[])

  return (
    <>
    
    <Nav totalCart={totalCart} cartItems={cartItems} toggleModal={toggleModal} isOpen={isOpen} removeCartItems={removeCartItems}></Nav>
    <div className="antialiased text-gray-900 ">
     <div className="bg-gray-200 min-h-screen p-8 flex flex-wrap gap-3 justify-center">
      {
       
        products.map((product,id)=>{
          return <>
          <Card key={id} product={product} setCartData={setCartData} />
          </>
        })
      }
      
      </div>
    </div>
    <Toaster/>
  
    </>
  )
}

export default App
