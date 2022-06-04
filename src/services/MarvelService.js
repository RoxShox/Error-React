class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=154d59d29a60f8b8fd7e596cec4746f7';
	getResource = async (url) => {
		let res = await fetch(url);

		if(!res.ok) {
			throw new Error(`Could not fetch ${url}, status ${res.status}`);
		}

		return await res.json();
		
	}
	
	getAllCharacters = () =>{
		return this.getResource(`${this._apiBase}characters?limit=9&offset=350&${this._apiKey}`);
		
	}
	getCharacters = (id) =>{
		return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
	}

	
}


export default MarvelService;