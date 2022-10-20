import React from 'react'
import '../scss/styles'

const RecipePreview = () => {
  return (
    <div className='recipe_preview container'>
			<div className='top'>
				<div className="user_icon"> Icon</div>
				<div className='content'>
					<div className='user_name'> Username </div>
					<div className='date'> date </div>
				</div>
			</div>
			<div className='middle'>
				<div className='image_container'>
					Image
				</div>
				<div className='tags_container'>
					<div className='tag'> Tag </div>
					<div className='tag'> Tag </div>
				</div>
				<div className='description'> 
					Description
				</div>
			</div>
			<div className='bottom'>
				<div>
					icon
				</div>
				<div>
					number
				</div>
			</div>
    </div>
  )
}

export default RecipePreview