import React from "react";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import data from "../recipeData.json";

const Search = () => {
  const [allItems, setAllItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [query, setQuery] = useState("");
  const [searchParam, setSearchParam] = useState([
    "ingredients",
    // "tags",
    // "cuisineType",
    "dishName",
  ]);
  const [filterParam, setFilterParam] = useState(["All"]);

  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    const recipesObj = data;
    // console.log(recipesObj["recipes"]["dishName"]);
    setIsLoaded(true);
    setAllItems(recipesObj);
  }, []);

  useEffect(() => {
    console.log(allItems);
  }, [allItems]);

  let inputHandler = (e) => {
    //convert input text to lower case
    let lowerCase = e.target.value.toLowerCase();
    setQuery(lowerCase);
  };

  const handleSelection = (e) => {
    const item = e.target.value;
    console.log("item: " + item);
    setSelectedItem(item);
  }

  const search = (items) => {
    console.log("here in search:");
    return items.filter((item) => {
      // return searchParams.some((newItem) => {
      //   return (
      //     item[newItem].toString().toLowerCase().indexOf(query.toLowerCase()) >
      //     -1
      //   );
      // });
      // console.log(item.ingredients);
      if (item.ingredients.includes(filterParam)) {
        console.log("Here item.ingredient == filterPAram" + item.ingredients);
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
          )
        });
      }
      else if (filterParam == "All") {
        return searchParam.some((newItem) => {
            return (
                item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) > -1
            );
        });
      }
    });
  };

  //   const itemFromSearchList = (item) => {
  //     setSelectedTopic(item);
  //   }
  if (!isLoaded) {
    return <div> Loading ... </div>;
  } else {
    return (
      <div>
        <div>
          <TextField onChange={inputHandler} />
          <SearchIcon />
        </div>
        {/* <div>
        <select
            onChange={(e) => {
              setSearchParam(e.target.value);
            }}
            className="custom_select"
            aria-label="Set Filter"
          >
            <option value="ingredients">Filter By Ingredients</option>
            <option value="tags">Filter By Tags</option>
            <option value="cuisine_type">Filter By Cuisine Type</option>
          </select>
        </div> */}
        <div>
          <select
            /*
            // here we create a basic select input
            // we set the value to the selected value
            // and update the setFilterParam() state every time onChange is called
            */
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            className="custom_select"
            aria-label="Filter Recipes By Ingredients"
          >
            <option value="All">Filter By Ingredients</option>
            <option value="potato">Potato</option>
            <option value="tomato">Tomato</option>
            <option value="onion">Onion</option>
            <option value="masalas">Masalas</option>
            <option value="chick pea">Chick Pea</option>
          </select>
          {/* <span className="focus"></span> */}
        </div>
        <div>
          <ul>
            {search(allItems.recipes).map((item, id) => (
              <div key={id} className="search_items" onClick={handleSelection}>
                {item.dishName}
              </div>
            ))}
          </ul>
        </div>
        {/* <SearchList input={inputText} data={allTopics}/> */}
        <div>
          <p>Topic Added:</p>

          <div>
            {/* <p>{selectedItem.dishName}</p> */}
          </div>
        </div>
      </div>
    );
  }
};

export default Search;
