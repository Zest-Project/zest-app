import React from "react";
import RecipePreview from "./RecipePreview";
import "../scss/styles";
import data from "../recipeListData.json";
import { useRef } from "react";
import LeftArrow from "./arrows/LeftArrow";
import RightArrow from "./arrows/RightArrow";
import { useEffect } from "react";
import { useState } from "react";
// import { useEffect } from "react";

const CuisineType = () => {
  const sliderRef = useRef(null)
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  // const handleLeft = () => {
  //   // var slider = document.getElementById('slider');
  //   // slider.scrollLeft = slider.scrollLeft - 500;
  //   document.getElementById('slider').scrollLeft += 20;
  // };

  // const handleRight = () => {
  //   // var slider = document.getElementById('slider');
  //   // slider.scrollLeft = slider.scrollLeft + 500;
  //   document.getElementById('slider').scrollLeft -= 20;
  // };
  const handleLeft =() =>  {
    setLeft(left + 1);
    console.log("left: " + left);
  }
  const handleRight =() => {
    setRight(right + 1);
    console.log("right: " + right);
  }
  
  useEffect(() => {
    sliderRef.current.scrollLeft -= 150;
    console.log("scrolling left: " + left);
  }, [left]);

  useEffect(() => {
    sliderRef.current.scrollLeft += 150;
    console.log("scrolling right: " + right);
  }, [right]);

  return (
    <div className="cuisine_type container ">
      <div className="cuisine_name ">CuisineType</div>

      <div className="cuisine_list" > 
        <div>
        <div  onClick={handleLeft}> <LeftArrow/> </div>
        </div>
        <div ref={sliderRef} id="slider" className="scroll_bar">
          {data.recipeNames.map((d, i) => (
            <RecipePreview recipeName={d} key={i} />
          ))}
        </div>
        <div>
        <div onClick={handleRight}> <RightArrow /> </div>
        </div>
      </div>
    </div>
  );
};

export default CuisineType;
