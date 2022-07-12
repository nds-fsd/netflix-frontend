import React, { useState } from 'react'
import './Card.css'
import Modal from '../modal/Modal'
import { getUserSession } from '../../utils/sesion';
import { movieToFav, removeMovieFromFav } from '../../utils/movies';







const Card = (props) => {
    const { urlImgMovieCard, title, urlImgModal, movieDescription, movieRating, movieRuntime, id } = props;
    const [modalOpen, setModalOpen] = useState(false)
    const [fav, setFav] = useState(false)

    const handleModal = () => {
        setModalOpen(!modalOpen)
    }
    


    const handleFavButton = () => {
        const userSession = getUserSession()
        const body = { id: id }
        const movie = body.id
        if (!fav) {
            movieToFav(userSession, body)
            setFav(!fav)
        } else {
            removeMovieFromFav(userSession, movie)
            setFav(!fav)
        }
    }


    return (
        <>
            {modalOpen && <Modal id={id} urlImg={urlImgMovieCard} title={title} imgModal={urlImgModal} description={movieDescription} closeModal={handleModal} movieRuntime={movieRuntime} movieRating={movieRating} setMylist={handleFavButton} stateFav={fav} />}
            <div className='wrapperCard' onClick={handleModal}>
                <div className='wrapperImg'>
                    <img src={urlImgMovieCard} alt={title} />
                </div>
            </div>
        </>
    )
}

export default Card