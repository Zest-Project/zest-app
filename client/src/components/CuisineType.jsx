import React from "react";
import RecipePreview from "./RecipePreview";
import "../scss/styles";

const CuisineType = () => {
  return (
    <div className="cuisine_type container ">
      <div className="cuisine_name ">CuisineType</div>
      <div className="cuisine_list">
        <RecipePreview />
        <RecipePreview />
        <RecipePreview />
      </div>
    </div>
  );
};

export default CuisineType;
