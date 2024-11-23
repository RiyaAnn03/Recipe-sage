import React, { useEffect,useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes } from '../redux/Slices/recipeSlice'
const Home = () => {
    const dispatch=useDispatch()
 
      
 const {allRecipes,loading,errorMsg}=   useSelector(state=>state.recipeReducer)
//  console.log(allRecipes,loading,errorMsg);
const [currentPage,setCurrentPage]=useState(1)
const recipesPerPage=8
  const totalPages=Math.ceil(allRecipes?.length/recipesPerPage)
  const currentPageRecipeLastIndex=currentPage*recipesPerPage
  const currentPageRecipeFirstIndex=currentPageRecipeLastIndex-recipesPerPage
  const visibleAllRecipes=allRecipes?.slice(currentPageRecipeFirstIndex,currentPageRecipeLastIndex)
  

 
useEffect (()=>{
    dispatch(fetchRecipes())

},[])
const navigateToNextPage=()=>{
    if(currentPage!=totalPages){
      setCurrentPage(currentPage+1)
    }
   }
   const navigateToPrevPage=()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
   }
 return (
    <>
    <Header/>
<div style={{paddingTop:'100px'}} className='container px-4 mx-auto'>
  { 
  loading?
  <div className="flex justify-center items-center my-5 text-lg">
    <img width={'70px'} height={'70px'} src="https://th.bing.com/th/id/OIP.5LYyPhnlf2dhsc5Ht9Mp4AHaHa?w=1181&h=1181&rs=1&pid=ImgDetMain" alt="" />
Loading
  </div>
  :
     <>
     <div className='grid grid-cols-4 gap-4'>
      {
        allRecipes?.length>0?
          visibleAllRecipes?.map(recipe=>(
            <div key={recipe?.id} className="rounded border p-2 shadow">
            <img  width={'100%'} height={'200px'} src={recipe?.image} alt="" />
            <div className="text-center">
                <h3 className="text-xl font-bold">{recipe?.name}</h3>
                <h4 className='font-semibold text-1xl'>Cusine: {recipe?.cuisine}</h4>

                <Link to={`/${recipe?.id}/view`} className='bg-red-500 rounded p-1 mt-3 text-white inline-block'>View More..</Link>
            </div>
        </div>
          ))
       :
       <div className="flex justify-center items-center my-5 text-lg">
        Recipe not found!!
        </div>

      }
     </div>
</>
  }
</div>  
<div className="text-2xl text-center font-bold mt-20">
                <span onClick={navigateToPrevPage} className="cursor-pointer"><i className="fa-solid fa-backward me-5"></i></span>
                <span>{currentPage} of {totalPages}</span>
                <span onClick={navigateToNextPage} className="cursor-pointer"><i className="fa-solid fa-forward ms-5"></i></span>

               </div>  </>
  )
}

export default Home
