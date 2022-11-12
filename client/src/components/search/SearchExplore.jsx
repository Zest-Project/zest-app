import React from "react";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import UserContext from "../../context/UserProvider";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
import LoadingContext from "../../context/LoadingProvider";
import { useRef } from "react";
import RecipePreview from "../RecipePreview";
import IngredientContext from "../../context/IngredientProvider";
import CuisineType from "../CuisineType";

const SearchExplore = ({searchComponent}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [allItems, setAllItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const ingredientId = "636d4da660b7bed4683fabf0"

  const [query, setQuery] = useState("");
  const [searchParam, setSearchParam] = useState([
    // "ingredients",
    // "tags",
    // "cuisineType",
    "dishName",
  ]);
  const [filterParam, setFilterParam] = useState(["All"]);

  const [selectedItem, setSelectedItem] = useState();

  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const ingredientContext = useContext(IngredientContext);
  const loadingContext = useContext(LoadingContext);
  const [cuisineTypes, setCuisineTypes] = useState();
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIngredients = async () => {
    await ingredientContext.getIngredients().then((response) => {
      if (response) {
        console.log("response in search explore: " + response.data.ingredients);
        setIngredients(response.data.ingredients);
      }
      else {
        console.log("error");
      }
    })
  }

  const getRecipes = async () => {
    await userContext.getRecipes(searchComponent).then((response) => {
      if (response) {
        console.log("response in search explore: " + response.data.recipes);
        setRecipes(response.data.recipes);
      }
      else {
        console.log("error");
      }
    })
  }

  const getCuisineTypes = () => {
    if (recipes) {
      let tempCuisineTypes = recipes.map((recipe) => {
        return recipe.cuisineType
      })
      setCuisineTypes([...new Set(tempCuisineTypes)]);
    }
  }

  useEffect(() => {
    loadingContext.setLoading(true);
    getRecipes();
    getIngredients();
    getCuisineTypes();
    loadingContext.setLoading(false);
  }, [authContext.token])

  useEffect(() => {
    getCuisineTypes();
  }, [recipes])

  useEffect(()=> {
    if (query.length >= 1 && searchParam.includes("ingredients")) {
      const newIngredients = ingredients.filter(ingredient => {
        console.log("filter ingredient: " + ingredient.ingredientName);
        return ingredient.ingredientName.includes(query);
      })
      setIngredients(newIngredients);
      search(query);
    }
    else if (query.length >= 1 && searchParam.includes("dishName")) {
      search(query);
    }
    else {
      getRecipes("allRecipes");
      getIngredients();
    }
  }, [query])

  let inputHandler = (e) => {
    //convert input text to lower case
    let lowerCase = e.target.value.toLowerCase();
    setQuery(lowerCase);
  };

  const handleSelection = (item) => {
    // const item = e.target.value;
    console.log("item: " + item);
    setSelectedItem(item);
  };

  const search = async (query) => {
    console.log("here in search:");
    if (searchParam.includes("ingredients")) {
      console.log("here in ingredients:");
  
      console.log("ingredient: " + JSON.stringify(ingredients) + query);
      
      if(ingredients.length >= 1) {
        await ingredientContext.getRecipeByIngredient(ingredients).then((response) => {
          if (response) {
            console.log("response in search explore: " + JSON.stringify(response.data.recipes));
            setRecipes(response.data.recipes);
          }
          else {
            console.log("error");
            getRecipes();
          }
        })
      }else {
        console.log("error");
        getRecipes("allRecipes");
      }
      return;
    }
    if (searchParam.includes("cuisineType")) {
      console.log("here in ingredients:");
      const newRecipes = recipes.filter((recipe) => {
        console.log("*****" + recipe.cuisineType + " " + query)
        return recipe.cuisineType.toLowerCase().includes(query);
      })
      if (newRecipes) {
        setRecipes(newRecipes);
      }
      else {
        getRecipes();
      }
      return;
    }
    if (searchParam.includes("tags")) {
      console.log("here in tags:");
      const newRecipes = recipes.filter((recipe) => {
        console.log("*****" + JSON.stringify(recipe.tags) + " " + query)
        return recipe.tags.find(element => {
          if (element.toLowerCase().includes(query)) {
            return true;
          }
        });
      })
      if (newRecipes) {
        setRecipes(newRecipes);
      }
      else {
        getRecipes();
      }
      return;
    }
    if (searchParam.includes("dishName")) {
      console.log("here in dishname:");
      const newRecipes = recipes.filter((recipe) => {
        console.log("*****" +recipe.recipeName + " " + query)
        return recipe.recipeName.toLowerCase().includes(query);
      })
      if (newRecipes) {
        setRecipes(newRecipes);
      }
      else {
        getRecipes();
      }
      return;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDropdownClick =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      const isButtonClick =
        buttonRef.current && buttonRef.current.contains(event.target);

      if (isDropdownClick || isButtonClick) {
        // If the ref is not defined or the user clicked on the menu, we don’t do anything.
        return;
      }
      // Otherwise we close the menu.
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside); // handle desktops
    document.addEventListener("touchstart", handleClickOutside); // handle touch devices

    // Event cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // handle desktops
      document.removeEventListener("touchstart", handleClickOutside); // handle touch devices
    };
  }, [dropdownRef, buttonRef]);

  const handleSelect = (e) => {
    const isSelected = searchParam.includes(e.target.value);
    console.log("is selected: " + isSelected);
    const newSelection = isSelected
      ? searchParam.filter((currentItem) => currentItem !== e.target.value)
      : [...searchParam, e.target.value];
    setSearchParam(newSelection);
    // search();
  };


    return (
      <div>
        <div className="filter">
          <input type="text" className="search_input" onChange={inputHandler} />
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="filter_button"
          >
            <SearchIcon />
            <p> Filter By </p>
          </button>
        </div>
        <div>
          {isOpen && (
            <div ref={dropdownRef} className="filter_dropdown">
              {/* <form onSubmit={handleApply}> */}
              <div className="checkbox_item">
                <input
                  type="checkbox"
                  id="ingredients"
                  className="checkmark"
                  name="ingredients"
                  checked={searchParam.includes("ingredients")}
                  value="ingredients"
                  onChange={handleSelect}
                />
                <label htmlFor="ingredients">ingredients</label>
              </div>
              <div className="checkbox_item">
                <input
                  type="checkbox"
                  id="tags"
                  className="checkmark"
                  name="tags"
                  checked={searchParam.includes("tags")}
                  value="tags"
                  onChange={handleSelect}
                />
                <label htmlFor="tags">tags</label>
              </div>
              <div className="checkbox_item">
                <input
                  type="checkbox"
                  id="cuisineType"
                  className="checkmark"
                  name="cuisineType"
                  checked={searchParam.includes("cuisineType")}
                  value="cuisineType"
                  onChange={handleSelect}
                />
                <label htmlFor="cuisineType">cuisineType</label>
              </div>
              {/* </form> */}
            </div>
          )}
        </div>
        <div>
          {/* <ul className="search_items_container"> */}
            {/* {recipes.map((item) => (
              <div
                key={item._id}
                className="search_items"
                onClick={() => handleSelection(item)}
              >
                <RecipePreview recipeName={item.recipeName} key={item._id} />
              </div>
            ))} */}
            { cuisineTypes && cuisineTypes.map((cuisineType) => {
              return <CuisineType recipes={recipes} cuisineType={cuisineType}/>
            })}
          {/* </ul> */}
        </div>
        {/* <div>
          <p>Item Added:</p>
          <div>
            <p>{selectedItem && selectedItem.dishName}</p>
          </div>
        </div> */}
      </div>
    );
};

export default SearchExplore;
