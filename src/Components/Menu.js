import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import axios from 'axios'
function Menu({MenuList,setMenuList,setLoginStatus,LoginStatus}) {

    

    // const [AllCategory,setAllCategory] = useState(0)
    const [Dinner,setDinner] = useState(0)
    const [Lunch,setLunch] = useState(0)
    const [BreakFast,setBreakFast] = useState(0)
    const [Dessert,setDessert] = useState(0)
    const [Drink,setDrink] = useState(0)

    const [Cart,setCart] = useState([])
    
    
    
    const handleClick = (index) =>{

        
        if(index === 1){
            
            setBreakFast(1)
            setLunch(0)
            setDinner(0)
            setDessert(0)
            setDrink(0)
            
            var myCategory = {SelectedCategory:"Breakfast"}
            axios.post("http://localhost:9000/api/GetFoodItemsByCategory",myCategory)
            .then(response=>{

            
                console.log(response.data)
                setMenuList(response.data)
            })
        
        }
        else
        if(index === 2){
            
            setBreakFast(0)
            setLunch(1)
            setDinner(0)
            setDessert(0)
            setDrink(0)
            
            var myCategory = {SelectedCategory:"Both"}
            axios.post("http://localhost:9000/api/GetFoodItemsByCategory",myCategory)
            .then(response=>{

                
                console.log(response.data)
                setMenuList(response.data)
            })
        
        }
        else
        if(index === 3){
            
            setBreakFast(0)
            setLunch(0)
            setDinner(1)
            setDessert(0)
            setDrink(0)
        
            var myCategory = {SelectedCategory:"Both"}
            axios.post("http://localhost:9000/api/GetFoodItemsByCategory",myCategory)
            .then(response=>{

                console.log(response.data)
                setMenuList(response.data)
            })
        
        }
        else
        if(index === 4){
            
            setBreakFast(0)
            setLunch(0)
            setDinner(0)
            setDrink(1)
            setDessert(0)
            
        
            var myCategory = {SelectedCategory:"Drink"}
            axios.post("http://localhost:9000/api/GetFoodItemsByCategory",myCategory)
            .then(response=>{

                console.log(response.data)
                setMenuList(response.data)
            })
        }
        else
        if(index === 5){
            
            setBreakFast(0)
            setLunch(0)
            setDinner(0)
            setDrink(0)
            setDessert(1)
            
        
            var myCategory = {SelectedCategory:"Dessert"}
            axios.post("http://localhost:9000/api/GetFoodItemsByCategory",myCategory)
            .then(response=>{

                
                console.log(response.data)
                setMenuList(response.data)
            })
        
        }


    }

    const ChangeStatus = () =>{

        setLoginStatus(true)
    }

    const AddItem = (FoodName) =>{

        if(BreakFast === 0 && Lunch === 0 && Dinner === 0 && Dessert === 0 && Drink === 0)
            alert("Select the Food Category")

        else{
            var myFood = {FoodName:FoodName}
            axios.post("http://localhost:9000/api/Food/AddOnce",myFood)
            .then(response=>{

                setMenuList(response.data)

            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    
    const IncrementQty = (FoodName) =>{

        if(BreakFast === 0 && Lunch === 0 && Dinner === 0 && Dessert === 0 && Drink === 0)
            alert("Select the Food Category")

        else{
            var myFood = {FoodName:FoodName}
            axios.post("http://localhost:9000/api/Food/QtyIncrement",myFood)
            .then(response=>{

                setMenuList(response.data)

            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    const DecrementQty = (FoodName,Qty) =>{

        if(BreakFast === 0 && Lunch === 0 && Dinner === 0 && Dessert === 0 && Drink === 0)
            alert("Select the Food Category")

        if(Qty > 0){
            var myFood = {FoodName:FoodName}
            axios.post("http://localhost:9000/api/FoodtoBe/QtyDecrement",myFood)
            .then(response=>{

                setMenuList(response.data)

            })
            .catch(err=>{
                console.log(err)
            })
        }
        else
            alert("Qty value is 0")
    }


    
  return (
    <div className = 'bg-orange-50 min-h-screen flex flex-col gap-[100px]' >
         <div class = 'flex flex-row gap-[20px]' >
            <div class=' text-3xl font-medium ml-[200px] mt-[88px] bg-red-500 h-[60px] w-[60px] rounded-[30px]
             flex justify-center items-center text-white text-[2.5rem] rotate-[-30deg]' >F</div>

            <h1 className='mt-24 text-3xl font-bold' >Foodo<span className='text-red-600 text-3xl' >.</span></h1>
            <h1 className='mt-24 text-xl font-light hover:text-orange-500 cursor-pointer ml-[50px]  '  >Home</h1>
            <h1 className='mt-24 text-xl font-light hover:text-orange-500 cursor-pointer ' >Menu</h1>
            <h1 className='mt-24 text-xl font-light hover:text-orange-500 cursor-pointer' >About us</h1>
            <h1 className='mt-24 text-xl font-light hover:text-orange-500 cursor-pointer' >Order Online</h1>
            <h1 className='mt-24 text-xl font-light hover:text-orange-500 cursor-pointer' >Reservation</h1>
            <h1 className='mt-24 text-xl font-light hover:text-orange-500 cursor-pointer' >Contact Us</h1>

            <div class=' text-3xl font-medium ml-[100px] mt-[88px] bg-white h-[60px] w-[60px] rounded-[30px]
             flex justify-center items-center text-black text-[2.5rem] cursor-pointer' >

            <i><svg className=' mt-[200px] ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart3 " viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg></i>
             </div>

            <div onClick={ChangeStatus} className='h-[50px] w-[130px] rounded-2xl cursor-pointer mt-[96px]  text-white bg-red-500' ><h1 className='font-small text-lg mt-2 ' >Log in</h1></div>
         </div>

         <h1 className='text-5xl font-bold' >Our Popular Menu</h1>

        <div className='flex flex-row gap-[100px] ml-[100px]' >

            {/* <h1 onClick={()=>handleClick(0)} className={`block px-4 py-2 text-2xl cursor-pointer rounded border-2 transition-all duration-300  ${AllCategory ? 'bg-red-500 text-white border-red-500' : 'bg-transparent border-transparent'
            }`} >All category</h1> */}

            <h1 onClick={()=>handleClick(1)} className={`block ml-[100px] px-4 py-2 text-2xl cursor-pointer rounded border-2 transition-all duration-300  ${BreakFast ? 'bg-red-500 text-white border-red-500' : 'bg-transparent border-transparent'
            }`} >BreakFast</h1>
            <h1 onClick={()=>handleClick(2)} className={`block px-4 py-2 text-2xl cursor-pointer rounded border-2 transition-all duration-300  ${Lunch ? 'bg-red-500 text-white border-red-500' : 'bg-transparent border-transparent'
            }`} >Lunch</h1>
            <h1 onClick={()=>handleClick(3)} className={`block px-4 py-2 text-2xl cursor-pointer rounded border-2 transition-all duration-300  ${Dinner ? 'bg-red-500 text-white border-red-500' : 'bg-transparent border-transparent'
            }`} >Dinner</h1>
            <h1 onClick={()=>handleClick(4)} className={`block px-4 py-2 text-2xl cursor-pointer rounded border-2 transition-all duration-300  ${Drink ? 'bg-red-500 text-white border-red-500' : 'bg-transparent border-transparent'
            }`} >Drink</h1>
            <h1 onClick={()=>handleClick(5)} className={`block px-4 py-2 text-2xl cursor-pointer rounded border-2 transition-all duration-300  ${Dessert ? 'bg-red-500 text-white border-red-500' : 'bg-transparent border-transparent'
            }`} >Dessert</h1>
        </div>

        <div className='flex flex-wrap gap-1'>
            {MenuList.map(Item=>
            <div className='bg-white rounded-3xl  h-[630px] w-[400px] ml-20 mb-24' >
            
                    <div className='flex flex-col gap-10'>
                        <img className='h-[250px] w-[300px] ml-[50px] mt-[30px]'  src={Item.imgUrl}/>
                        <h1 className='text-3xl' >{Item.Name}</h1>
                        <span>{Item.Description}</span>
                        <div className='flex flex-row gap-1 ml-[150px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>

                        </div>
                        <div className='flex flex-row gap-10'>
                            <span className='ml-[70px] mt-[7px] font-medium text-3xl'>Rs.{Item.Price}</span>
                            
                            
                            <div className={`h-[50px] w-[130px] rounded-2xl cursor-pointer   text-white ${Item.Qty === 0? 'bg-red-500':<div></div>}`} >

                                {Item.Qty >= 1 ?<div  className='flex flex-row gap-2'><button className='h-[30px] w-[30px] mt-[10px] rounded-md font-extrabold bg-red-500 text-yellow-50' onClick={()=>IncrementQty(Item.Name)} >+</button>
                                <div className='text-black mt-[10px]' >{Item.Qty}</div><button onClick={()=>DecrementQty(Item.Name,Item.Qty)} className='h-[30px] w-[30px] mt-[10px] rounded-md font-extrabold bg-yellow-300 '>-</button></div> 
                                :<h1 onClick={()=>AddItem(Item.Name)} className='font-small text-lg mt-2 ' >Order Now</h1>}
                            </div>
                        </div>
                    </div>

        
            </div>
            )}
        </div>
    </div>
  )
}

//<span className=' mt-[7px] font-normal text-xl'>{Item.Qty}</span>
export default Menu