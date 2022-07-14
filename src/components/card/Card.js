import React, { useState } from 'react'
import './Card.css'
import Modal from '../modal/Modal'

const Card = (props) => {
  const {
    urlImgMovieCard,
    title,
    urlImgModal,
    movieDescription,
    movieRating,
    movieRuntime,
  } = props
  const [modalOpen, setModalOpen] = useState(false)
  const [fav, setFav] = useState(false)

  const handleModal = () => {
    setModalOpen(!modalOpen)
  }
  const handleFavButton = () => {
    setFav(!fav)
  }

  return (
    <>
      {modalOpen && (
        <Modal
          urlImg={urlImgMovieCard}
          title={title}
          imgModal={urlImgModal}
          description={movieDescription}
          closeModal={handleModal}
          movieRuntime={movieRuntime}
          movieRating={movieRating}
          setMylist={handleFavButton}
          stateFav={fav}
        />
      )}
      <div className='wrapperCard' onClick={handleModal}>
        <div className='wrapperImg'>
          <img src={urlImgMovieCard} alt={title} />
        </div>
      </div>
    </>
  )
}

export default Card
