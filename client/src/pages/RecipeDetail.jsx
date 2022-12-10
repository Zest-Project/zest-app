import React from 'react'
import RecipeDetailComponent from '../components/RecipeDetailComponent'
import PageTitle from '../components/PageTitle'

const RecipeDetail = () => {
    return (
        <div>
            <PageTitle pageTitle="Recipe Detail"/>

            <RecipeDetailComponent />
        </div>
    )
}

export default RecipeDetail