import React from 'react';


const Query = props => {
  return (
    <div id="query">
      <h1>Query</h1>
      <form id="enter-query">
        <div className="field">
          <label>enter your query:</label><br></br>
          <input onChange={e => props.updateCodeInput(e.target.value)} type="text" placeholder="your query" id="query-field"></input>
        </div>
        <button className="btn padding waves-effect waves-light" type="submit">run</button>
      </form>
      <input value={props.codeInput}></input>
    </div>
  )
};

export default Query;