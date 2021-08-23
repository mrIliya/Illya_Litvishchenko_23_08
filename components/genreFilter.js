import { fetchData, getElement, MOVIES_URL } from "../src/utils.js"

const genreSelect = getElement('.movies-filter__select')
const moviesContainer = getElement('.movies-container')

export const genreFilter = async () => {
	const movies = await fetchData(MOVIES_URL)
	const arr = []

	movies.map((elem) => {
		const { genres } = elem

		genres.map((elem) => {
			const newElem = elem.charAt(0).toUpperCase() + elem.slice(1)
			arr.push(newElem)
		})
	})

	const genre = [...new Set(arr)]

	genreSelect.innerHTML = genre.map((elem) => {
		return `<option value=${elem}>${elem}</option>`
	}).join('')

	genreSelect.addEventListener('change', () => {

		const index = genreSelect.options.selectedIndex
		const currentGenre = genreSelect.options[index].value

		moviesContainer.innerHTML = movies.map((movie) => {
			const { id, name, img, description, year, genres } = movie
			const genre = genres.find(item => item == currentGenre)

			const newGenre = genres.map((genre) => {
				return `<div class="movie__genre modal-bottom__category">${genre}</div>`
			}).join(' ')

			if (genre) {
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
			}

		}).join('')

	})

}