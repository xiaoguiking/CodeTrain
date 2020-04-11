import React from 'react';
import { renderRoutes } from 'react-router-config';
import {connect} from 'react-redux';
import routes from './routes/index';
import {HashRouter} from 'react-router-dom';
import './App.css';

function App () {
  return (
    <HashRouter>
      { renderRoutes (routes) }
    </HashRouter>
  )
}

export default connect(
   function mapStateToProps (state, ownProps) {
    return {
    }
  },
  function  mapDispatchToProps (dispatch, ownProps)  {
    return {
     
    }
  }
)(App);
