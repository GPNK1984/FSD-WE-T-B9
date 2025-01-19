import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router';
import './App.css'
import Nav from './components/Nav'
import toast, { Toaster } from 'react-hot-toast';
import ShoppingCart from './components/ShoppingCart'
import CardList from './components/CardList';


function App() {
  
  //States used for this application
  let [products,setProducts]=useState([]); // store all the api product data
  let [cartItems,setCartItems]=useState([]); // add to cart stored items
  let [totalCart,setTotalCart]=useState(0); // total add to cart item count
  let [isOpen, setIsOpen] = useState(false); // boolean to handle cart modal
  //

  let navigate=useNavigate();

  //Method used to fetch API product data from fakestore api
  const getProductData=async()=>{
    try {
      let res=await fetch('https://fakestoreapi.com/products');
      let data=await res.json();
      if (res.status==200){
        for(let product of data){
          product["quantity"]=1; //adding this at run time to handle quantity logic
        }
        setProducts(data)
      }
    } catch (error) {
      toast.error(error.message || "Error in Fetching Data" )
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
      removeCartItems(productItem.id)
    }
  }
  
  //Used to remove the cart items when we tap remove cart button
  const removeCartItems=(id)=>{
    for(let i=0;i<cartItems.length;i++){
      if(cartItems[i].id==id){
        cartItems.splice(i,1)
      }
    }
    setCartItems(cartItems);
    setTotalCart(cartItems.length)
  }

  //Update quantity when we tap '+' or '-' button
  const onUpdateQuantity=(id,value)=>{
    for(let i=0;i<cartItems.length;i++){
      if(cartItems[i].id==id){
        cartItems[i].quantity=value;
      }
    }
    const deepCopyOfCartItems = (cartItems) => JSON.parse(JSON.stringify(cartItems)); // Deep cloning of cart items object
    setCartItems(deepCopyOfCartItems);
    setTotalCart(deepCopyOfCartItems.length)
  }
 

  //Update CartItems when data changes happening in cartItems array
  useEffect(()=>{
    setTotalCart(cartItems.length)
  },[cartItems])

  //Update CartItems when data changes happening in cartItems array
  useEffect(()=>{
    if(isOpen){
      navigate("/shopping-cart")
    }else{
      navigate("/card-list")
    }
  },[isOpen])

  //Fetch API data when component loads
  useEffect(()=>{
    getProductData();
   },[])

  return (
    <>
    
    <Nav totalCart={totalCart} toggleModal={toggleModal}></Nav>
    <Routes>
      <Route path="/shopping-cart" element={<ShoppingCart cartItems={cartItems} onUpdateQuantity={onUpdateQuantity} removeCartItems={removeCartItems}/>}/>
      <Route path="/card-list" element={<CardList products={products} cartItems={cartItems} setCartData={setCartData}/>}/>
      <Route path="*" element={<Navigate to='/card-list'/>}/>
    </Routes>
    <Toaster/>
  
    </>
  )
}

export default App
