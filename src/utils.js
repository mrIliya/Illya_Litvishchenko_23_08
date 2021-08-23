
const MOVIES_URL = 'https://my-json-server.typicode.com/moviedb-tech/movies/list'


const getElement = (selection) => {
	const element = document.querySelector(`${selection}`)
	if (element) return element
	throw new Error(`No such ${selection} exist`)
}

const getElements = (selection) => {
	const element = document.querySelectorAll(`${selection}`)
	if (element) return element
	throw new Error(`No such ${selection} exist`)
}

const getStorageItem = (item) => {
	let storageItem = localStorage.getItem(item)

	if (storageItem) {
		storageItem = JSON.parse(storageItem)
	} else {
		storageItem = []
	}
	return storageItem
}

const fetchData = async (url) => {
	const response = await fetch(url)
		.catch((err) => console.log(err));
	if (response) {
		return response.json();
	}
	return response;
}

const removeFromStorage = (id, array) => {
	const index = array.indexOf(id)
	if (index > -1) {
		array.splice(index, 1)
	}	
}

export {
	MOVIES_URL,
	getElement,
	getElements,
	getStorageItem,
	fetchData,
	removeFromStorage
}