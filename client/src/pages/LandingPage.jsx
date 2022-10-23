import React from 'react'
import PageTitle from '../components/PageTitle'
import RecipePreview from '../components/RecipePreview'

const LandingPage = () => {
  return (
    <div className='landing_page container'>
      <div>
        <PageTitle pageTitle="Welcome!"/>
        <p> Here at Zest you can....</p>
        <ul>
          <li> Browser Recipes by Cuisine and search by filter </li>
          <li> Log Meals for stats on eating patterns </li>
          <li> Suggestions on what to cook based on recipes created and saved </li>
        </ul>
        <div className='featured_recipe'> 
          <RecipePreview />
          <p> Featured Recipe of the Day</p>
        </div>
      </div>

    </div>
  )
}

export default LandingPage