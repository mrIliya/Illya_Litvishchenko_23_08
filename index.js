import { displayMovies } from "./components/displayMovies.js";
import { favoriteList } from "./components/favoriteList.js";
import { genreFilter } from "./components/genreFilter.js";



const init = async() => {
	// render movies
	await displayMovies()

	// render favorite list
	favoriteList()

	// render genre filter
	genreFilter()

}


window.addEventListener('DOMContentLoaded', init)