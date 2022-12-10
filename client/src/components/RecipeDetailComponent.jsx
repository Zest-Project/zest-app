import * as React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import UnstyledSelectForm from './UnstyledSelectForm';


const RecipeDetailComponent = () => {
    // const [fullServing, setFullServing] = useState();
    const values1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const values2 = ["1/4", "1/2", "1/3", "2/3", "3/4"]
  
    return (
      <div className="recipe_detail_component container">
        
        <div className="recipe_detail">
         
          <div className="entry">
            <p> Prep Time: 15 min</p>
            <p> Cook Time: 15 min</p>
            <p> Total Time: 45 min</p>
            <p> Yield: 12 muffins</p>
            <p> Recipe </p>
              <table>
                
                <thead className="table_header">
                  
                  <tr>
                    <th scope="col">Ingredients</th>
                    <th scope="col">Nutrition</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Cost</th>
                  </tr>
                </thead>
                <tbody className="table_body">
                  <tr>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                  </tr>
                  <tr>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                  </tr>
                  <tr>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                  </tr>
                  <tr>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                    <td>Lorem Ipsum</td>
                  </tr>
                </tbody>
              </table>
              <p className="Instructions">Instructions</p>
              <ol type="1">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna augue, mollis eget nunc sit amet, pretium scelerisque diam.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna augue, mollis eget nunc sit amet, pretium scelerisque diam.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna augue, mollis eget nunc sit amet, pretium scelerisque diam.</li>
              </ol>
          </div>
        </div>
      </div>
    );
  };

  export default RecipeDetailComponent;