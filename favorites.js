document.addEventListener('DOMContentLoaded', () => {
   displayMeal()
});

function displayMeal(){
    const favoriteMealsList = document.getElementById('favoriteMealsList');
    const favoriteMeals = JSON.parse(localStorage.getItem('favoriteMeals')) || [];

    if (favoriteMeals.length === 0) {
        favoriteMealsList.innerHTML = '<div><img src="https://static.vecteezy.com/system/resources/previews/004/231/366/non_2x/street-food-cart-free-vector.jpg" alt="empty" width = "400px"/><p class="text-center fs-5 text-danger">No favorite meals added yet.</p></div>';
    } else {
        favoriteMeals.forEach(meal => {
            const mealElement = createMealElement(meal);
            favoriteMealsList.appendChild(mealElement);
        });
    }
}

function createMealElement(meal) {
    // Create a div to display the meal details
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('card');

    const mealImage = document.createElement('img');
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    mealImage.classList.add('card-img-top');

    const mealName = document.createElement('h5');
    mealName.textContent = meal.strMeal;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('btn', 'btn-danger');
    removeButton.addEventListener('click', () => {
        removeMealFromFavorites(meal);
        mealDiv.remove(); // Remove the card from the DOM
    });

    // Append elements to the meal div
    mealDiv.appendChild(mealImage);
    mealDiv.appendChild(mealName);
    mealDiv.appendChild(removeButton);

    return mealDiv;
}

function removeMealFromFavorites(mealToRemove) {
    const favoriteMeals = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
    const updatedFavoriteMeals = favoriteMeals.filter(meal => meal.idMeal !== mealToRemove.idMeal);
    localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavoriteMeals));
   displayMeal()
}


