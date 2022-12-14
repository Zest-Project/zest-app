import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "../scss/styles";
import food from "../images/food.jpeg";
import { NavLink, Outlet } from "react-router-dom";

const RecipePreview = ({ recipeName, creator, diets, image, description }) => {
  useEffect(() => {
    console.log("****** Image: " + image);
  }, []);

  return (
    <>
      <NavLink
        style={{ textDecoration: "none", color: "#213634" }}
        to={recipeName}
      >
        <div className="recipe_preview container">
          <div className="top">
            <div className="user_icon">
              {" "}
              <AccountCircleIcon className="account_circle_icon" />{" "}
            </div>
            <div className="content">
              <div className="user_name"> {creator} </div>
              <div className="date"> Wednesday, 26th January at 6:26 PM </div>
            </div>
          </div>
          <div className="middle">
            <div> {recipeName} </div>
            <div className="image_container">
              <img src={image ? image : food} alt="food" />
            </div>
            <div className="tags_container">
              {diets &&
                diets.map((diet) => <div className="tag"> {diet} </div>)}
              {/* <div className='tag'> Lorem ipsum </div>
					<div className='tag'> Magna aliqu </div> */}
            </div>
            <div className="description">
              <p> {description} </p>
            </div>
          </div>
          <div className="bottom">
            <div>
              <ThumbUpIcon className="thumbs_up_icon" />
            </div>
            <div>126</div>
          </div>
        </div>
      </NavLink>

	  <Outlet/>
    </>
  );
};

RecipePreview.propTypes = {
  recipeName: PropTypes.string,
};

export default RecipePreview;
