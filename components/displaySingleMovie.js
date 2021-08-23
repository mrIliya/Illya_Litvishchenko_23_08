import { findItem, toFavorite } from "../src/mainEvents.js"
import { getElement, MOVIES_URL, fetchData, getStorageItem, removeFromStorage } from "../src/utils.js"
import { displayMovies } from "./displayMovies.js"
import { favoriteList } from "./favoriteList.js"

const modalWindow = getElement('.modal')
const body = getElement('body')

export const displaySingleMovie = async (ID) => {
	const singleMovie = await fetchData(`${MOVIES_URL}/${ID}`)

	const { id, name, img, description, year, genres, director, starring, } = singleMovie

	const newGenre = genres.map((genre) => {
		return `<div class="movie__genre modal-bottom__category">${genre}</div>`
	}).join(' ')
	const stars = starring.map((star) => {
		return `<span class="modal-bottom__starring">${star}</span>`
	}).join(', ')

	modalWindow.innerHTML = `
	<div class="modal__container"id=${id}>
	<button class="modal__close" type="button">
		 <i class="fas fa-times"></i>
	</button>
	<button class="movie__favorite modal-bottom__favorite" type="button">
	<i class="movie__star fas fa-star"></i>
</button>
	<div class="modal-top">
		 <div class="modal-top__image">
			  <img class="modal-top__img" src=${img} alt="movie img">
		 </div>
		 <div class="modal-top__info">
			  <h2 class="modal-top__title">${name}</h2>
			  <p class="modal-top__text">
					${description}
			  </p>
		 </div>
	</div>
	<div class="modal-bottom">
		 <div class="modal-bottom__info">
			  <div class="modal-bottom__year">Year: ${year}</div>
			  <div class="modal-bottom__category-container">
					${newGenre}
			  </div>
		 </div>
		 <div class="modal-bottom__people">
			  <span class="modal-bottom__span">Director:
					<span class="modal-bottom__derector">${director}</span>
			  </span>
			  <span class="modal-bottom__span">Starring:
					${stars}
			  </span>
		 </div>
	</div>
</div>`

	// open and close modal window

	modalWindow.classList.add('show')
	body.classList.add('lock')
	modalWindow.addEventListener('click', (e) => {
		if (e.target.parentElement.classList.contains('modal__close')) {
			modalWindow.classList.remove('show')
			body.classList.remove('lock')
		}

	})

	// add movie to favorite

	if (modalWindow.classList.contains('show')) {
		const favorite = getStorageItem('favorite')
		const favoriteBtn = getElement('.modal-bottom__favorite')
		const movieName = getElement('.modal-top__title')

		findItem(favoriteBtn, favorite)
		favoriteBtn.addEventListener('click', (e) => {
		
			if (e.target.parentElement.classList.contains('modal-bottom__favorite')) {
				toFavorite(favoriteBtn.parentElement.id, movieName.innerText, favoriteBtn)
				favoriteList()
			} else {
				removeFromStorage(favoriteBtn.parentElement.id,favorite)
			}
			displayMovies()
		})

	}


}