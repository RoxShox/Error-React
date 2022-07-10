import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';


const CharList = (props) => {
	
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [charEnded, setCharEnded] = useState(false);


	const {loading, error, getAllCharacters} = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, [])


	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true)
		getAllCharacters(offset)
			.then(onCharListLoaded)
	}

	

	const onCharListLoaded = (newCharList) => {
		let ended =  false;
		if(newCharList.length < 9) {
			ended = true;
		}
		setCharList(charList =>[...charList, ...newCharList]);
		setNewItemLoading (newItemLoading => false)
		setOffset(offset => offset + 9)
		setCharEnded(charEnded => ended);
	}
	 
	let myRef = null;

	const createRef = elem => {
		myRef = elem;
	}

	const onSelectChar = (e, id) => {
		if(myRef) {
			myRef.classList.remove('char__item_selected')
			
		}
		const target = e.target.closest('.char__item')
		createRef(target);

		myRef.classList.add('char__item_selected')
		
		props.onCharSelected(id)
	}


	function renderItems(arr) {

		const items = arr.map((item, i) => {
			let imgStyle = {'objectFit': 'cover'};
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
				imgStyle = {'objectFit': 'unset'};
			}

			return (
				<li 
					className="char__item"
					key={i}
					onClick={(e) => onSelectChar(e, item.id)}>
						<img src={item.thumbnail} alt="abyss" style={imgStyle}/>
						<div className="char__name">{item.name}</div>
				</li>
			)

		});
		return(
			<ul className="char__grid">
                {items}
            </ul>
		)
	}

	const items = renderItems(charList)

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading && !newItemLoading ? <Spinner/> : null;
	
	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{items}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{'display':charEnded ? 'none' : 'block'}}
				onClick={() => onRequest(offset)}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
	
}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
}

export default CharList;