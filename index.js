const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await
// Drop the unique index on the title field



const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    
    // Before adding any recipes to the database, let's remove all existing ones
    // Drop the unique index on the title field
    await Recipe.deleteMany({});
    await Recipe.collection.dropIndexes();


    const recipeDetail = {
      title: 'Butter Muffin',
      level: 'Easy Peasy',
      ingredients: ['250g self-rasing flour', '1 tsp bicarbonate of soda', '150g chocolate chips', '100g golden caster sugar', '2 eggs', '150ml natural yogurt', '100g unsalted butter'],
      cuisine: 'British',
      image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chocolate-chip-muffins-ccc8450.jpg?quality=90&webp=true&resize=440,400',
      duration: 25,
      creator: 'Lulu Grimes',
    }
    const recipeExample = await Recipe.create(recipeDetail);
    console.log('Recipe is:', recipeExample.title)
    // const dataRecipes = await Recipe.insertMany(data);
    // dataRecipes.forEach((items) => console.log(items.title));
    const uniqueData = Array.from(new Set(data.map((recipe) => recipe.title))).map((title) => data.find((recipe) => recipe.title === title));
    const dataRecipes = await Recipe.insertMany(uniqueData);
    dataRecipes.forEach((items) => console.log(items.title))

    const changeRecipeData = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
    if (changeRecipeData) {
      console.log('success')
    }else console.log('failed')

    

    const removeRecipeData = await Recipe.deleteOne({title: 'Carrot Cake'});
    if (removeRecipeData) {
      console.log('success')
    } else console.log('failed')
    
    const closedConnection = await mongoose.connection.close(MONGODB_URI);
    
    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */

   

