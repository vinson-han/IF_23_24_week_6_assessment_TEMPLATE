console.log("connected to main.js")

// array used to track all the food categories
// TASK 1
    // Add more categories to the CATEGORY array
    // Test that each works with the fetch request
const CATEGORY = [
  "Starter",
  "Beef",
  "Chicken",
  "Lamb",
  "Pasta",
  "Pork",
  "Seafood",
  "Vegetarian",
  "Vegan",
  "Side",
  "Dessert"
]

// select element that will store our category options
let categories = document.getElementById("category");

// how our category options are stored
for (let i = 0; i < CATEGORY.length; i++) {
  let option = document.createElement("option");
  option.text = CATEGORY[i];
  categories.appendChild(option);
}

let mealsList = document.getElementById("mealsList");

function getFetch() {


  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories.value}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      // the line below clears the HTML each time a new category is requested, so that the items don't stack each time
      mealsList.innerHTML = "";
      console.log(data)
      // per category that is received in the data object,
      // there is a meals array
      // we will use the meals array to access individual meals
      for (let i = 0; i < data.meals.length; i++) {
        
        let container = document.createElement("div");
        container.classList.add("mealContainer");
        mealsList.appendChild(container);
        
        let insideContainer = document.createElement("div")
        let h2 = document.createElement("h2")
        h2.textContent = data.meals[i].strMeal
        let img = document.createElement("img")
        img.src= data.meals[i].strMealThumb

        insideContainer.appendChild(h2)
        insideContainer.appendChild(img)
        container.append(insideContainer)

      }

      return data;
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}