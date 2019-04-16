import React, { Component } from 'react';
import styles from '../styles/HistoryButton.scss'

const HistoryButton = props => {


  return (
    <button className="history" onClick={props.toggleCodeHistory}>History</button>
  )
}

export default HistoryButton;