import React from 'react'
import PageTitle from '../components/PageTitle'
import SearchExplore from '../components/search/SearchExplore'

const MyRecipes = () => {
  return (
    <div className='my_recipes container'>
        <div className="header"> 
          <PageTitle pageTitle="MyRecipes"/> 
        </div>
        
        <div>
            <SearchExplore searchComponent="createdRecipes"/>
        </div>
        
    </div>
  )
}

export default MyRecipes