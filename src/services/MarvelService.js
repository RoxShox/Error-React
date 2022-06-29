import{useHttp} from '../hooks/http.hook'
const useMarvelService = () => {

	const{loading, request, error, clearError} = useHttp();
	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=154d59d29a60f8b8fd7e596cec4746f7';
	const _baseOffset = 1;

	
	const getAllCharacters = async (offset = _baseOffset) =>{
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter)
		
	}
	const getCharacters = async (id) =>{
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	}

	const getAllComics = async (offset = _baseOffset) =>{
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics)
		
	}
	const getComics = async (id) =>{
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	}

	const _transformCharacter = (char) => {
		return{
			id: char.id,
			name:char.name,
			description:char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
			thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage:char.urls[0].url,
			wiki:char.urls[1].url,
			comics:char.comics.items,
		}
	}

	const _transformComics = (comics) => {
		return{
			id: comics.id,
			title:comics.title,
			description:comics.description || 'there is no description',
			pageCount: comics.pageCount ? `${comics.pageCount}` : 'No info',
			thumbnail:comics.thumbnail.path + '.' + comics.thumbnail.extension,
			price:comics.prices.price ? `${comics.prices.price}$` : 'not available',
			language: comics.textObjects.language || 'en-us'
		}
	}

	 return {loading, error, getAllCharacters, getCharacters, clearError, getComics, getAllComics}
	
}


export default useMarvelService;