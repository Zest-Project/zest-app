import React from "react";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
// import { TextField } from "@mui/material";
import data from "../../recipeData.json";
import LoadingComponent from "../LoadingComponent";
import { useRef } from "react";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [allItems, setAllItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [query, setQuery] = useState("");
  const [searchParam, setSearchParam] = useState([
    // "ingredients",
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

  const handleSelection = (item) => {
    // const item = e.target.value;
    console.log("item: " + item);
    setSelectedItem(item);
  };

  const search = (items) => {
    console.log("here in search:");
    if (searchParam.includes("ingredients")) {
      console.log("here in ingredients:");
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
              item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            );
          });
        } else if (filterParam == "All") {
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
    } else if (searchParam.includes("dishName")) {
      console.log("here in dishname:");
      return items.filter((item) => {
        if (item.dishName.includes(filterParam)) {
          console.log("Here item.ingredient == filterPAram" + item.dishName);
          return searchParam.some((newItem) => {
            return (
              item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            );
          });
        } else if (filterParam == "All") {
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
    } else if (searchParam.includes("cuisineType")) {
      console.log("here in cuisinetype:");
      return items.filter((item) => {
        if (item.cuisineType.includes(filterParam)) {
          console.log("Here item.ingredient == filterPAram" + item.cuisineType);
          return searchParam.some((newItem) => {
            return (
              item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            );
          });
        } else if (filterParam == "All") {
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
  };

  if (!isLoaded) {
    return <LoadingComponent />;
  } else {
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
        {searchParam == "ingredients" && (
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
        )}
        <div>
          <ul className="search_items_container">
            {search(allItems.recipes).map((item, id) => (
              <div key={id} className="search_items" onClick={() => handleSelection(item)}>
                {item.dishName}
              </div>
            ))}
          </ul>
        </div>
        {/* <SearchList input={inputText} data={allTopics}/> */}
        <div>
          <p>Item Added:</p>
          <div><p>{selectedItem && selectedItem.dishName}</p></div>
        </div>
      </div>
    );
  }
};

export default Search;
