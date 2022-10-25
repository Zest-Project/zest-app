import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const LogMealComponent = () => {

  return (
    <div className="log_meal_component container">
      <div className="meals_logged">
        <table>
          <thead className="table_header">
            <tr>
              <th scope="col"> meal </th>
              <th scope="col"> cals </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody className="table_body">
            <tr>
              <td> meal1 </td>
              <td> num cals </td>
              <td>
                {" "}
                <DeleteIcon className="icon" />
              </td>
            </tr>
            <tr>
              <td> meal2 </td>
              <td> num cals </td>
              <td>
                {" "}
                <DeleteIcon className="icon" />
              </td>
            </tr>
            <tr>
              <td> meal1 </td>
              <td> num cals </td>
              <td>
                {" "}
                <DeleteIcon className="icon" />
              </td>
            </tr>
            <tr>
              <td> total </td>
              <td> num cals </td>
              <td>
                {" "}
                <RestaurantIcon className="icon" />{" "}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="entry">
          <p> Add Food to Meal </p>
          <div className="entry_item">
            <label htmlFor="search_food">
              <p> Search Food </p>
              <p> {"(Tags, cuisine type or ingredients)"} </p>
            </label>
            <input
              type="text"
              id="search_food"
              className="search_food"
              name="search_food"
            />
          </div>
          <div className="entry_item">
            <label htmlFor="search_food_mr">
              <p> Search Food </p>
              <p> {"(My Recipes)"} </p>
            </label>
            <input
              type="text"
              id="search_food_mr"
              className="search_food_mr"
              name="search_food_mr"
            />
          </div>
          <div className="entry_item">
            <label htmlFor="serving_size">
              <p> Serving Size </p>
            </label>
            <input
              type="text"
              id="serving_size"
              className="serving_size"
              name="serving_size"
            />
          </div>
          <div className="entry_item">
            <label >
              <p> number_of_servings </p>
            </label>
            <div className="dropdown">
            <div className="custom-select">
              <select>
                <option value="hide"> Full </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              </div>
              <div className="custom-select">
              <select>
                <option value="hide"> Part </option>
                <option value="1/4">1/4</option>
                <option value="1/3">1/3</option>
                <option value="1/2">1/2</option>
                <option value="3/4">3/4</option>
              </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogMealComponent;
