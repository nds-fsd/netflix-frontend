import React, { useState } from 'react';
import './Card.css';
import Modal from '../modal/Modal';

const Card = ({ movie }) => {
  const { urlImgMovie, title, id } = movie || {};
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = async () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      {modalOpen && <Modal id={id} movie={movie} closeModal={handleModal} />}
      <div className="wrapperCard" onClick={handleModal}>
        <div className="wrapperImg">
          <img src={urlImgMovie} alt={title} />
        </div>
      </div>
    </>
  );
};

export default Card;
