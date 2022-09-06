import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player';
import Fullscreen from 'fullscreen-react';
import styles from './Player.module.css';

const Player = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnter, setIsEnter] = useState(false);

  useEffect(() => {
    setIsEnter(true);
  }, []);

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
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
