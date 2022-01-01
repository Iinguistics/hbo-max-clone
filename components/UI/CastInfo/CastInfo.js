import { useState, useEffect } from 'react';
import axios from 'axios';

const CastInfo = (props) => {
	const [loadingData, setLoadingData] = useState(true);
	const [credits, setCredits] = useState([]);
	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/${
					props.mediaType === 'movie' ? 'movie' : 'tv'
				}/${props.mediaId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
			)
			.then(function (response) {
				setCredits(response.data);
				setLoadingData(false);
				// handle success
				console.log('Success Response For cast and crew ');
				console.log(response);
			})
			.catch(function (error) {
				// handle error
				console.log('Error Response For error for cast and crew');
				console.log(error);
			});
	}, [props.updateData]);

	const showCast = () => {
		if (loadingData !== true) {
			return credits.cast.map((item, index) => {
				return (
					<ul className='cast-info__crew' key={index}>
						<li>{item.character}</li>
						<li>{item.name}</li>
					</ul>
				);
			});
		} else {
			return <div>Loading Cast</div>;
		}
	};

	const showCrew = () => {
		if (loadingData !== true) {
			return credits.crew.map((item, index) => {
				return (
					<ul className='cast-info__crew' key={index}>
						<li>{item.job}</li>
						<li>{item.name}</li>
					</ul>
				);
			});
		} else {
			return <div>Loading Crew</div>;
		}
	};

	return (
		<div className='cast-info'>
			<div className='cast-info__group-title'>Cast</div>
			<div className='cast-info__list'>{showCast()}</div>
			<div className='cast-info__group-title'>Crew</div>
			<div className='cast-info__list'>{showCrew()}</div>
		</div>
	);
};

export default CastInfo;
