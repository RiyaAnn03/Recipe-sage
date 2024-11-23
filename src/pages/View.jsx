import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'

const View = () => {
    const [recipe,setRecipe]=useState({})
 const {id}=   useParams()
console.log(id);
 
    useEffect(()=>{
        if(sessionStorage.getItem("allRecipes")){
            const allRecipes=JSON.parse(sessionStorage.getItem("allRecipes"))
            // console.log(allRecipes.find(item=>item.id==id));
            
            setRecipe(allRecipes.find(item=>item.id==id))
        }

    },[])
  return (
    <><Header/>
    <div  className='flex flex-col mx-5'> 
        <div className="grid grid-cols-2 items-center h-screen">
            <img width={'400px'} height={'350px'} className='m-5'  src={recipe?.image} alt="" />
          
      <div>
            <h2 className='font-bold'>Pid:{recipe?.id}</h2>
                <h4 className='font-bold text-5xl'>{recipe?.name}</h4>
                <h2 style={{fontFamily: '"Dancing Script", serif'}} className='font-semibold text-3xl'><span className='text-yellow-500'>Cusine: </span>{recipe?.cuisine}</h2>
                <h4 className="font-normal mt-2 "><span className='text-red-500'>Ingredients: </span>{recipe?.ingredients}.</h4> 
                <p className='mt-2'> <span className='font-normal '><span className='text-red-500'>Instructions:  </span> {recipe?.instructions}</span> </p>
                

               </div>  

             </div>
             </div>
    </>
  )
}

export default View
