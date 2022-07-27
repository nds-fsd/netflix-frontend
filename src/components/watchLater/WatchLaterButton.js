import React, { useState, useEffect } from 'react';
import './WatchLaterButton.css';

const WatchLaterButton = (props) => {
  const { setWatchLater, watchLaterState } = props;

  return (
    <>
      {watchLaterState ? (
        <div>
          <button className="watchLaterButton" onClick={setWatchLater} type="button">
            <title>Delete</title>
          </button>
        </div>
      ) : (
        <div>
          <button className="watchLaterButton" onClick={setWatchLater} type="button">
            <title>Add</title>
          </button>
        </div>
      )}
    </>
  );
};

export default WatchLaterButton;
