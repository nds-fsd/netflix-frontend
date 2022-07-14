import React from 'react'
import './Modal.css'
import FavButton from '../favButton/FavButton'


const Modal = ({ imgModal, title, closeModal, description, movieRuntime , movieRating, setMylist, stateFav, id}) => {


    const colorFilmRating = (movieRating) =>{
        switch(movieRating){
            case '12+':
                return <p className='yellowRating bold defaultRating'>{movieRating}</p>
                break;
            case '0+':
                return <p className='greenRating bold defaultRating'>{movieRating}</p>
                break;
            case '7+':
                return <p className='blueRating bold defaultRating'>{movieRating}</p>
                break;
            case '16+':
                return <div className='orangeRating bold defaultRating'>{movieRating}</div>
                break;
            case '18+':
                return <p className='redRating bold defaultRating'>{movieRating}</p>
                break;
            default:
                return <p>{movieRating}</p>
                break;
        }
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
                    <FavButton id={id} setFav={setMylist} favState={stateFav}/>
                    <button className='playFilm'>PLAY 🎥</button>
                    
                </div>
                
            </div>

          <p>{colorFilmRating(movieRating)}</p>
          <FavButton setFav={setMylist} favState={stateFav} />
          <button className='playFilm'>PLAY 🎥</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
