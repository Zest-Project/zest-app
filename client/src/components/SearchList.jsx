import React, { useState } from 'react'
// import data from "./ListData.json"

function SearchList({input, data, itemFromSearchList}) {
    //create a new array by filtering the original array
    // const [selectedItem, setSelectedItem] = useState();

    // useState(() => {
    //     console.log(selectedItem);
    // }, [selectedItem])

    // const filteredData = data["recipes"].filter((el) => {
    //     //if no input the return the original
    //     if (input === '') {
    //         return el;
    //     }
    //     //return the item which contains the user input
    //     else {
    //         return el.toLowerCase().includes(input)
    //     }
    // })

    // const onItemClicked = (e) => {
    //     setSelectedItem(e.target.value);
    // }
    if (data) {
        return (
            <>
            {data.map((item, id) => (
                <div className="search_item" key={id}>{item}</div>
            ))}
            </>
            
    )
    }

    
}

export default SearchList