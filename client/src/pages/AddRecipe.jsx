import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import RecipeContext from "../context/RecipeProvider";
import IngredientContext from "../context/IngredientProvider";
import UnstyledSelectForm from "../components/UnstyledSelectForm";

import PageTitle from "../components/PageTitle";
import UserContext from "../context/UserProvider";

const defaultValues = {
  recipename: "",
  image: ""
};

const AddRecipe = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const recipeContext = useContext(RecipeContext);
  const ingredientContext = useContext(IngredientContext);
  const [selectedIngredient, setSelectedIngredient] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const userContext = useContext(UserContext);
  const [diets, setDiets] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState("NA");
  const [cuisineTypes, setCuisineTypes] = useState([]); // get cuisinetypes
  const [selectedCuisineTypes, setSelectedCuisineTypes] = useState([]);
  const [selectedCuisineType, setSelectedCuisineType] = useState("NA");

  const getCuisineTypes = async () => {
    await recipeContext.getCuisineTypes().then((response) => {
      if (response) {
        // console.log(
        //   "get cuisines response in search explore: " +
        //     JSON.stringify(response.data.cuisines)
        // );
        setCuisineTypes(response.data.cuisines);
      } else {
        console.log("error");
      }
    });
  };

  const getDiets = async () => {
    await recipeContext.getDiets().then((response) => {
      if (response) {
        // console.log(
        //   "get cuisines response in search explore: " +
        //     JSON.stringify(response.data.cuisines)
        // );
        setDiets(response.data.diets);
      } else {
        console.log("error");
      }
    });
  };


  const getIngredients = async () => {
    await ingredientContext.getIngredients().then((response) => {
      if (response) {
        console.log("response in search explore: " + response.data.ingredients);
        setIngredients(response.data.ingredients);
      } else {
        console.log("error");
      }
    });
  };

  useEffect(() => {
    getIngredients();
    getCuisineTypes();
    getDiets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `recipename: ${formValues.recipename} + cuisineType: ${formValues.cuisineType}`
    );
    recipeContext.addRecipe(
      formValues.recipename,
      formValues.image,
      selectedCuisineTypes,
      recipeIngredients,
      selectedDiets
    );
  };

  const handleIngredientSelect = (selectedIngredientFromDropdown) => {
    // event.preventDefault;
    // let tempIngredients = recipeIngredients;
    // tempIngredients.push(event.target.value);
    // const value = event.target.value
    // console.log("AAAAAAAAAAAAHHH **** " + JSON.stringify(selectedIngredientFromDropdown));
    setSelectedIngredient(selectedIngredientFromDropdown);
    setRecipeIngredients([
      ...recipeIngredients,
      selectedIngredientFromDropdown,
    ]);
  };

  const handleCuisineTypeSelected = (selectedCuisineTypeFromDropdown) => {

    setSelectedCuisineType(selectedCuisineTypeFromDropdown.name);

    if ( selectedCuisineTypeFromDropdown.name.toLowerCase() ) {
      setSelectedCuisineTypes([
        ...selectedCuisineTypes,
        selectedCuisineTypeFromDropdown.name,
      ]);
    }
  };

  const handleDietSelected = (selectedDietFromDropdown) => {

    setSelectedDiet(selectedDietFromDropdown.name);

    if ( selectedDietFromDropdown.name.toLowerCase() ) {
      setSelectedDiets([
        ...selectedDiets,
        selectedDietFromDropdown.name,
      ]);
    }
  };

  useEffect(() => {
    console.log(
      "formvalues: " +
        JSON.stringify(formValues) +
        " ***** " +
        JSON.stringify(recipeIngredients)
    );
  }, [recipeIngredients]);

  return (
    <div className="add_recipe container">
      <div className="header">
        <PageTitle pageTitle="Add Recipe" />
      </div>
      <form className="add-recipe-form" onSubmit={handleSubmit}>
        <label>
          <p> Recipe Name: </p>
          <input
            type="text"
            className="input"
            name="recipename"
            // placeholder='username'
            onChange={handleInputChange}
          />
        </label>


        <div className="custom_select">
          <p> Ingredients: </p>
          <UnstyledSelectForm
            values={ingredients}
            handleSelected={handleIngredientSelect}
            selected={selectedIngredient}
          />

          { recipeIngredients && recipeIngredients.map((ingredient) => (
            <div key={ingredient._id}> {ingredient.name} </div>
          ))}
        </div>

        <div className="custom_select">
          <p> CuisineType: </p>
          <UnstyledSelectForm
            values={cuisineTypes.map((cuisineType) => JSON.parse(`{"name": "${cuisineType}"}`))}
            handleSelected={handleCuisineTypeSelected}
            selected={selectedCuisineType}
          />

          { selectedCuisineTypes && selectedCuisineTypes.map((element, index) => (
            <div key={index}> {element} </div>
          ))}
        </div>

        <div className="custom_select">
          <p> Diet Options: </p>
          <UnstyledSelectForm
            values={diets.map((diet) => JSON.parse(`{"name": "${diet}"}`))}
            handleSelected={handleDietSelected}
            selected={selectedDiet}
          />

          { selectedDiets && selectedDiets.map((element, index) => (
            <div key={index}> {element} </div>
          ))}
        </div>

        <label>
          <p> Image: </p>
          <input
            type="text"
            className="input"
            name="image"
            // placeholder='username'
            onChange={handleInputChange}
          />
        </label>

        <button className="button" type="submit" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
