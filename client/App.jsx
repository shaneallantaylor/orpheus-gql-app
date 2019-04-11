import React, { Component } from 'react';
import * as actions from "./actions/actions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import styles
import styles from './styles/App.scss';

import Header from './components/Header.jsx';
import QueryContainer from './containers/QueryContainer.jsx'
import ResultsContainer from './containers/ResultsContainer.jsx';
import ResultItemVis from './components/ResultItemVis.jsx';


const mapStateToProps = (store) => ({
  codeInput: store.app.codeInput,
  dataVis: store.app.dataVis,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const App = props => {
  return (
    <React.Fragment>
      <Header />
      <div id="content">
        <QueryContainer />
        <ResultItemVis
          dataVis={props.dataVis} />
        <ResultsContainer />
      </div>
    </React.Fragment>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
