import React from 'react';

const QueryError = (props) => {
  return (
    <React.Fragment>
      <h2>There is something wrong with your query</h2>
      <h2 className="donger">¯\_(ツ)_/¯</h2>
      <h2>Please refactor your query and try again</h2>
    </React.Fragment>
  )
};

export default QueryError;