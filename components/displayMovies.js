import { changeView, findItem, toFavorite } from "../src/mainEvents.js";
import { getElement, MOVIES_URL, fetchData, getStorageItem } from "../src/utils.js";
import { displaySingleMovie } from "./displaySingleMovie.js";
import { favoriteList } from "./favoriteList.js";

const moviesContainer = getElement('.movies-container')

export const displayMovies = async () => {
	const movies = await fetchData(MOVIES_URL)

	moviesContainer.innerHTML = movies.map((movie) => {
		const { id, name, img, description, year, genres } = movie

		const newGenre = genres.map((genre) => {
			return `<div class="movie__genre modal-bottom__category">${genre}</div>`
		}).join(' ')

		return `
			<article class="movie" id=${id}>
				<button class="movie__favorite">
						<i class="movie__star fas fa-star"></i>
				</button>
				<img class="movie__img" src=${img}>
				<div class="movie__info">
						<span class="movie__name name">
							${name}
						</span>
						<span class="movie__name">
							${year}
						</span>
						<p class="movie__descr">
							${description}
						</p>
						<div class="genre-container modal-bottom__category-container">
							${newGenre}
						</div>
				</div>
			</article>
	`
	}).join('')

	// changing view from list to column

	const allMovies = moviesContainer.children
	const moviesArr = [...allMovies]
	changeView(moviesArr)

	// displaying movie info and passing id

	moviesArr.forEach((elem) => {
		const movieName = elem.querySelector('.name')
		const favoriteBtn = elem.querySelector('.movie__favorite')
		const favorite = getStorageItem('favorite')

		findItem(favoriteBtn,favorite)
		elem.addEventListener('click', (e) => {
			if (e.target.parentElement.classList.contains('movie__favorite')) {
				toFavorite(elem.id, movieName.innerText, favoriteBtn)
				favoriteList()
			} else {
				displaySingleMovie(elem.id)
			}
		})

	})

}