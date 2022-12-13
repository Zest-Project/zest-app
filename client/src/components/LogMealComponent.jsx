import * as React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import UnstyledSelectForm from './UnstyledSelectForm';

// import { useState } from "react";

const LogMealComponent = () => {
  // const [fullServing, setFullServing] = useState();
  const values1 = [{ "name": 1 } , { "name": 2} , { "name": 3 },{ "name": 4}, { "name": 5},{ "name": 6},{ "name": 7},{ "name": 8}, { "name": 9}];
  const values2 = [{ "name": "1/4"}, { "name": "1/2" }, { "name": "1/3"}, { "name": "2/3"}, { "name": "3/4"}]

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
            <label>
              <p> Number of Servings </p>
            </label>
            <div className="dropdown">
              <div className="custom_select">
                <UnstyledSelectForm values={values1} />
              </div>
              <div className="custom_select">
                <UnstyledSelectForm values={values2} />   
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogMealComponent;
