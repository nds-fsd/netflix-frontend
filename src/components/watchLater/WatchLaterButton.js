import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './WatchLaterButton.css';

const WatchLaterButton = (props) => {
  const { setWatchLater, watchLaterState } = props;

  return (
    <>
      {watchLaterState ? (
        <div>
          <IconButton onClick={setWatchLater}>
            console.log('funciona')
            <AddCircleOutlineIcon color="primary" />
          </IconButton>
        </div>
      ) : (
        <div>
          <IconButton onClick={setWatchLater}>
            <AddCircleIcon color="primary" />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default WatchLaterButton;
