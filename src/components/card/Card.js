import React from 'react'
import './Card.css'
import { useState } from 'react'
import Modal from '../modal/Modal'

const Card = ({ urlImgMovieCard, title, urlImgModal, movieDescription , movieRating, movieRuntime}) => {
    const  [modalOpen, setModalOpen] = useState(false)

    const handleModal = () =>{
        setModalOpen(!modalOpen);
    }

    

    return (
        <>
        {modalOpen && <Modal urlImg={urlImgMovieCard} title={title} imgModal={urlImgModal} description={movieDescription} closeModal={handleModal} movieRuntime={movieRuntime} movieRating={movieRating}/>}
            <div className='wrapperCard' onClick={handleModal}>
                <div className='wrapperImg'>
                    <img src={urlImgMovieCard} alt={title} />
                    <p className='textInsideimg'>{title}</p>
                </div>
            </div>
        </>
    )
}

export default Card