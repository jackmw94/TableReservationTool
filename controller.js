var data = "{  \"name\":\"Kunwar's Grill\",  \"rating\":5,  \"price\":2,  \"distance\":4.2}~{  \"name\":\"Cloud App Deli\",  \"rating\":2,  \"price\":1,  \"distance\":1.6}~{  \"name\":\"JS Palace\",  \"rating\":4,  \"price\":3,  \"distance\":2.5}~{  \"name\":\"The Golden Dennis\",  \"rating\":5,  \"price\":1,  \"distance\":6.0}~{  \"name\":\"Python Pizza\",  \"rating\":3,  \"price\":2,  \"distance\":0.9}~{  \"name\":\"Altay's Cafe\",  \"rating\":5,  \"price\":3,  \"distance\":5.7}~{  \"name\":\"Victor's Carvery\",  \"rating\":5,  \"price\":1,  \"distance\":0.1}~{  \"name\":\"Jack's Barbeque\",  \"rating\":1,  \"price\":4,  \"distance\":2.3}~{  \"name\":\"Ed's Burgers\",  \"rating\":3,  \"price\":1,  \"distance\":1.8}~{  \"name\":\"Andrei's Curry\",  \"rating\":4,  \"price\":4,  \"distance\":3.5}~{  \"name\":\"Dennis's Kebab\",  \"rating\":2,  \"price\":3,  \"distance\":1.4}"
var restaurantsJSON = data.split("~");
var restaurants = [];
var searchedRestaurants = [];
var sortBy = 'alphabetical';
for (i = 0; i < restaurantsJSON.length; i++){
	//console.log("JSON.parse(restaurantsJSON[i=" + i + "]).name = " + JSON.parse(restaurantsJSON[i]).name);
	restaurants.push(JSON.parse(restaurantsJSON[i]));
}

function searchName(search){
	var result = [];
	for (i = 0; i < restaurants.length; i++){
		if (restaurants[i].name.toLowerCase().match(search)){
			result.push(restaurants[i]);
		}
	}
	searchedRestaurants = result;
	return result;
}

function filterDistance(distance){
	distance = parseInt(distance);
	var result = [];
	for (i = 0; i < searchedRestaurants.length; i++){
		if (searchedRestaurants[i].distance <= distance){
			result.push(searchedRestaurants[i]);
		}
	}
	return result;
}

function filterPrice(min,max){
	var result = [];
	for (i = 0; i < searchedRestaurants.length; i++){
		if (searchedRestaurants[i].price <= max && searchedRestaurants[i].price >= min){
			result.push(searchedRestaurants[i]);
		}
	}
	return result;
}

function filterRating(min){
	var result = [];
	for (i = 0; i < searchedRestaurants.length; i++){
		if (searchedRestaurants[i].rating >= min){
			result.push(searchedRestaurants[i]);
		}
	}
	return result;
}

function generateSearchItem(restaurant){
	var rating = '✮';
	var price = "£";
	rating = rating.repeat(restaurant.rating);
	price = price.repeat(restaurant.price);

	var result = '<div class="SearchItem">';
	result = result + '<div class="SearchItemTitle">';
	result = result + restaurant.name;
	result = result + '</div>';
	result = result + '<div class="SearchItemInfo">';
	result = result + '<pre>' + price + '     -     ' + rating + '     -     ' + restaurant.distance + ' miles away</pre>';
	result = result + '</div>';
	result = result + '</div>';
	return result;
}

function generateMultipleSearchItems(restaurants){
	var result = "";
	for (i = 0; i < restaurants.length; i++){
		result = result + generateSearchItem(restaurants[i]);
	}
	return result;
}

function restaurantsToNames(restaurants){
	var result = "";
	if (restaurants.length > 0) result = restaurants[0].name;
	for (i = 1; i < restaurants.length; i++){
		result = result + ', ';
		result = result + restaurants[i].name;
	}
	return result;
}

function setSearchResults(restaurants){
	if (sortBy === 'alphabetical'){
		restaurants = sortByAlphabetical(restaurants);
	}else if (sortBy === 'closest'){
		restaurants = sortByDistance(restaurants);
	}else if (sortBy === 'rating'){
		restaurants = sortByRating(restaurants);
	}else{
		alert("can't sort by that!");
	}
	filteredRestaurants = restaurants;
	document.getElementById("searchResults").innerHTML = generateMultipleSearchItems(restaurants);
}

function changeSort(type){
	sortBy = type;
	if (type === 'alphabetical'){
		setSearchResults(sortByAlphabetical(searchedRestaurants));
	}else if (type === 'closest'){
		setSearchResults(sortByDistance(searchedRestaurants));
	}else if (type === 'rating'){
		setSearchResults(sortByRating(searchedRestaurants));
	}else{
		alert("can't sort by that!");
	}
}

function keepSort(){
	changeSort(sortBy);
}

function sortByAlphabetical(restaurants){
	if (restaurants.length === 0) return;
	var byName = restaurants.slice(0);
	byName.sort(function(a,b) {
		var x = a.name.toLowerCase();
    	var y = b.name.toLowerCase();
    	return x < y ? -1 : x > y ? 1 : 0;
	});
	return byName;
}

function sortByDistance(restaurants){
	if (restaurants.length === 0) return;
	var byDistance = restaurants.slice(0);
	byDistance.sort(function(a,b) {
		return a.distance - b.distance;
	});
	return byDistance;
}

function sortByRating(restaurants){
	if (restaurants.length === 0) return;
	var byRating = restaurants.slice(0);
	byRating.sort(function(a,b) {
		return b.rating - a.rating;
	});
	return byRating;
}