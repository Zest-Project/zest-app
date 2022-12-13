import React from "react";
import RecipePreview from "./RecipePreview";
import PropTypes from 'prop-types'
import "../scss/styles";
// import data from "../recipeListData.json";
import { useRef } from "react";
import LeftArrow from "./arrows/LeftArrow";
import RightArrow from "./arrows/RightArrow";
import { useEffect } from "react";
import { useState } from "react";
// import { useEffect } from "react";

const CuisineType = ({recipes, cuisineType}) => {
  const sliderRef = useRef(null)
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const handleLeft =() =>  {
    setLeft(left + 1);
    // console.log("left: " + left);
  }
  const handleRight =() => {
    setRight(right + 1);
    // console.log("right: " + right);
  }
  
  useEffect(() => {
    sliderRef.current.scrollLeft -= 150;
    // console.log("scrolling left: " + left);
  }, [left]);

  useEffect(() => {
    sliderRef.current.scrollLeft += 150;
    // console.log("scrolling right: " + right);
  }, [right]);

  console.log("cuisinetype: " +  cuisineType + " recipes: " + JSON.stringify(recipes));

  return (
    <div className="cuisine_type container ">
      <div className="cuisine_name "> CuisineType: {cuisineType} </div>

      <div className="cuisine_list" > 
        <div>
        <div  onClick={handleLeft}> <LeftArrow/> </div>
        </div>
        <div ref={sliderRef} id="slider" className="scroll_bar">
          {recipes.map((d) => {
            if (d.cuisines[0].toLowerCase() === cuisineType.toLowerCase()) {
              
              return <RecipePreview recipeName={d.name} key={d._id} />
            }
          }
          )}
        </div>
        <div>
        <div onClick={handleRight}> <RightArrow /> </div>
        </div>
      </div>
    </div>
  );
};

CuisineType.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  cuisineType: PropTypes.string
}

export default CuisineType;
