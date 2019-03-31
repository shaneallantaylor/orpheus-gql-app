import React, { Component } from 'react';
import * as actions from "./actions/actions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import styles
import styles from './styles/main.scss';

// import main container
import DataItemVis from './components/DataItemVis.jsx';
import DataItemVisLegend from './components/DataItemVisLegend.jsx';
import SecondContainer from './containers/SecondContainer.jsx'

const mapStateToProps = (store) => ({
  visData: store.app.visData
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const App = props => (
  <div>
    <DataItemVis visData={props.visData} updateVisData={props.updateVisData} />
    <DataItemVisLegend />
    <SecondContainer />
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
