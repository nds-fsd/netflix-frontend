import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player';
import styles from './Player.module.css';

const Player = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClosePlayer = () => {
    setIsPlaying(!isPlaying);
    navigate('/home');
  };
  return (
    <div>
      <div className={styles.playerWrapper}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          playing
          controls
          loop
          width="100%"
          height="100%"
          className={styles.reactPlayer}
        />
        <IconButton
          className={styles.closeButton}
          onClick={handleClosePlayer}
          aria-label="Close Player"
          color="warning"
          size="medium">
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Player;
