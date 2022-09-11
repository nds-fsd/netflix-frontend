import React from 'react';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './WatchLaterButton.css';

const WatchLaterButton = (props) => {
  const { setWatch, watchState } = props;

  return (
    <>
      {watchState ? (
        <div>
          <IconButton onClick={setWatch}>
            <AddCircleIcon color="primary" />
          </IconButton>
        </div>
      ) : (
        <div>
          <IconButton onClick={setWatch}>
            <AddCircleOutlineIcon color="primary" />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default WatchLaterButton;
