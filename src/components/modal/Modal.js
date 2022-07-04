import React from 'react'
import './Modal.css'

const Modal = ({ imgModal, title, closeModal, description, movieRuntime , movieRating}) => {

    const colorFilmRating = (movieRating) =>{
        switch(movieRating){
            case '12+':
                return <p className='yellowRating bold'>{movieRating}</p>
                break;
            case '0+':
                return <p className='greenRating bold'>{movieRating}</p>
                break;
            case '7+':
                return <p className='blueRating bold'>{movieRating}</p>
                break;
            case '16+':
                return <div className='orangeRating bold'>{movieRating}</div>
                break;
            case '18+':
                return <p className='redRating bold'>{movieRating}</p>
                break;
            default:
                return <p>{movieRating}</p>
                break;
        }
    }

    return (
        <div className='wrapperModalOverlay'>
            
            <div className='wrapperModal'>
                <img src={imgModal} alt={" "} />
                
                <div className='closeModal' onClick={closeModal}>❌</div>
                <h2>{title}</h2>
                <p>{description}</p>
                <p className='runtimeMovie'>{movieRuntime}</p>
                <div className='wrapperRating'>
                    <p>Rating: </p>
                    <p>{colorFilmRating(movieRating)}</p>
                    <button className='playFilm'>PLAY 🎥</button>
                </div>
                
            </div>

        </div>
    )
}

export default Modal