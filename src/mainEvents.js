import { getElement, getStorageItem, removeFromStorage } from "./utils.js"

const listBtn = getElement('#list')
const columnBtn = getElement('#columns')
const moviesContainer = getElement('.movies-container')

// changing view from list to column

const changeView = (movies) => {

	listBtn.addEventListener('click', () => {
		moviesContainer.classList.add('list-view')
		movies.forEach((movie) => {
			movie.className += ' list-view'
		})
		listBtn.classList.add('active')
		columnBtn.classList.remove('active')
	})

	columnBtn.addEventListener('click', () => {
		moviesContainer.classList.remove('list-view')
		movies.forEach((movie) => {
			movie.className = 'movie'
		})
		listBtn.classList.remove('active')
		columnBtn.classList.add('active')
	})
}

// add movies id and name to local storage

const toFavorite = (ID, name, btn) => {
	let favorite = getStorageItem('favorite')
	const id = favorite.find(item => item.ID == ID)

	if (!id) {
		favorite.push({ ID, name })
		btn.classList.add('active')
	} else {
		removeFromStorage(id, favorite)
		btn.classList.remove('active')
	}

	localStorage.setItem('favorite', JSON.stringify(favorite))
}

// cheking if item already in storage

const findItem = (btn,array) => {
	const favorite = array
	const id = favorite.find(item => item.ID == btn.parentElement.id)

	if (id) {
		btn.classList.add('active')
	} else {
		btn.classList.remove('active')
	
	}
}

export {
	changeView,
	toFavorite,
	findItem
}
