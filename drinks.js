class Drinks{

  constructor(callbacks){
    this.processDrinksFromServer = this.processDrinksFromServer.bind(this);
    this.renderDrinkDetails = this.renderDrinkDetails.bind(this);
    this.failedDrinksFromServer = this.failedDrinksFromServer.bind(this);
    this.randomDrinkData = [];
    this.callbacks = callbacks;
  }

  getDrinksFromServer() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://the-cocktail-db.p.rapidapi.com/random.php",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        "x-rapidapi-key": "507dc9b4b9mshe53c4518a66bb99p1db8cbjsn81dbe9890a0d"
      }
    }
    $.ajax(settings).done(this.processDrinksFromServer).fail(this.failedDrinksFromServer);
  }
  failedDrinksFromServer(){
    alert('error in retrieving data from server')
  }


  processDrinksFromServer(response){
    var drink = this.randomDrinkData = response.drinks[0];
    this.renderDrinkDetails(drink);
    this.callbacks.request(this);
  }

///left off here
  renderDrinkDetails(randomDrink){
    var drink = this.randomDrinkData;
    var drinkDetailsContainer = $('<div>', { class: 'drinkDetailsContainer'});
    var drinkRecommmendationHeader = $('<h1>', { class: 'drinkDetailsHeader', text: 'Bartender Recommendations: ' });
    var bartenderRecommendation = $('<div>', {class : 'bartender', text: 'Drink Type: ' + drink.strDrink});
    var drinkRecipe = $('<div>', { class: 'bartender', text: 'Drink Recipe: ' + drink.strInstructions });
    var ingredients = $('<div>', { class: 'bartender', text: 'Ingredients: ' + drink.strIngredient1 + ', ' + drink.strIngredient2});


    drinkDetailsContainer.append(drinkRecommmendationHeader, bartenderRecommendation, drinkRecipe, ingredients);
    return drinkDetailsContainer
  }
}
