const searchBox=document.querySelector('.searchbox');
const searchBtn=document.querySelector('.searchbtn');
const recipeContainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.closebtn');

const fetchrecipes=async (qu)=>{
    recipeContainer.innerHTML="<h1>Fetching Recipes...</h1>";
    try {
        
   
     const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${qu}`);
     const response=await data.json();
     recipeContainer.innerHTML="";
       response.meals.forEach(meal => {

        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML=`
              <img src="${meal. strMealThumb}">
              <h3>${meal.strMeal}</h3>
              <p><span>${meal.strArea} Dish</span></p>
              <p>Belongs to <span>${meal.strCategory}</span> Category</p>`

        const button=document.createElement('button');
        button.textContent="View_Recipe" ;
        recipediv.appendChild(button);
       
        button.addEventListener('click',()=>{
           openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipediv);
    });
       console.log(response.meals[0]);
     

} catch (error) {
    recipeContainer.innerHTML="<h1>Error In Fetching Recipes Please Check Recipe Name...</h1>";
}
}
const fetcingredents=(meal)=>{
    let ingrilist="";
    for(let i=1;i<=20;i++)
    {
        const ingri=meal[`strIngredient${i}`];
         if(ingri){
             const measure=meal[`strMeasure${i}`];
             ingrilist+=`<li>${measure} ${ingri}</li>`
         }
         else{
            break;
         }
    }
    return ingrilist;
}
const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipename">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <hr>
    <ui class="ingredientlist">${fetcingredents(meal)}</ui>
    <br>
    <div class="instructions">
        <h3>Instructions:</h3>
        <hr>
       <p >${meal.strInstructions}</p>
    </div>
 `
    
    recipeDetailsContent.parentElement.style.display="block";
}
recipeCloseBtn.addEventListener('click',() =>{
    recipeDetailsContent.parentElement.style.display="none";
}); 
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchinput=searchBox.value.trim();
    if(!searchinput){
        recipeContainer.innerHTML="<h1>Type the meal in the search box...</h1>";
        return;
    }
   fetchrecipes(searchinput);
});

