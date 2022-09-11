import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player';
import Fullscreen from 'fullscreen-react';
import styles from './Player.module.css';

const Player = ({ state }) => {
  const navigate = useNavigate();
  const data = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnter, setIsEnter] = useState(false);

  useEffect(() => {
    setIsEnter(true);
  }, []);
  console.log(data.state.movie.urlTrailer);
  // la url tiene que llamar al backend para traerse la direcion del video en cuestion.

  const handleClosePlayer = () => {
    setIsPlaying(!isPlaying);
    setIsEnter(false);
    navigate('/home');
  };
  return (
    <Fullscreen isEnter={isEnter}>
      <div className={styles.playerWrapper}>
        <IconButton
          className={styles.closeButton}
          onClick={handleClosePlayer}
          aria-label="Close Player"
          color="warning"
          size="medium">
          <CloseIcon />
        </IconButton>
        <ReactPlayer
          url={data.state.movie.urlTrailer}
          playing
          controls
          loop
          width="100%"
          height="100%"
          className={styles.reactPlayer}
        />
      </div>
    </Fullscreen>
  );
};

export default Player;
