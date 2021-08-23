import { getElement, getStorageItem, removeFromStorage } from "../src/utils.js"
import { displayMovies } from "./displayMovies.js"


const favContainer = getElement('.favorites__list')

export const favoriteList = () => {
	const favorite = getStorageItem('favorite')

	favContainer.innerHTML = favorite.map(({ ID, name }) => {
		return `
		<li class="favorites__line" id=${ID}>
			<i class="favorites__icon fas fa-arrow-right"></i>
			<span class="favorites__name">${name}</span>
			<button class="favorites__delete" type="button">
				<i class="fas fa-times"></i>
			</button>
		</li>
  `
	}).join('')


	const btn = favContainer.querySelectorAll('.favorites__delete')

	btn.forEach((btn) => {
		const elementID = btn.parentElement.id
		const id = favorite.find(item => item.ID == elementID)

		btn.addEventListener('click', () => {
			removeFromStorage(id, favorite)
			localStorage.setItem('favorite', JSON.stringify(favorite))
			favoriteList()
			displayMovies()
		})
	})

}
