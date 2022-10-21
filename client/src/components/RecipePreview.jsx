import React from 'react'
import PropTypes from 'prop-types'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import '../scss/styles'
import food from '../images/food.jpeg'


const RecipePreview = ({recipeName}) => {
  return (
    <div className='recipe_preview container'>
			<div className='top'>
				<div className="user_icon"> <AccountCircleIcon className='account_circle_icon'/> </div>
				<div className='content'>
					<div className='user_name'> Username </div>
					<div className='date'> Wednesday, 26th January at 6:26 PM </div>
				</div>
			</div>
			<div className='middle'>
				<div> {recipeName} </div>
				<div className='image_container'>
					<img src={food} alt="food"/>
				</div>
				<div className='tags_container'>
					<div className='tag'> Lorem ipsum </div>
					<div className='tag'> Magna aliqu </div>
				</div>
				<div className='description'> 
					<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
				</div>
			</div>
			<div className='bottom'>
				<div>
					<ThumbUpIcon className='thumbs_up_icon' />
				</div>
				<div>
					126
				</div>
			</div>
    </div>
  )
}

RecipePreview.propTypes = {
    recipeName: PropTypes.string
}


export default RecipePreview