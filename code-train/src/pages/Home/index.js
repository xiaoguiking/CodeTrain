import React, { useCallback, useMemo } from 'react';
import { renderRoutes } from "react-router-config";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.css';
import Header from '../../components/Header';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

import {
  exchangeFromTo,
  showCitySelector
} from '../../store/actions';

function Home(props) {
  const { route, from, to, dispatch } = props;

  console.log(props, 'props');
  // 子组件传函数
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(exchangeFromTo());
  // },[dispatch])

  // const doShowCitySelector = useCallback((m) => {
  //   dispatch(showCitySelector(m))
  // },[dispatch])

  /**
   * 合并回调cbs
   * 关键代码
   */
  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
  }, [dispatch])

  return (
    <div>
      <div>
        <div className="header-wrapper">
          <Header title="火车票" onBack={onBack} />
        </div>
        <form className="form">
          <Journey
            from={from}
            to={to}
            {...cbs}
          />
          <DepartDate />
          <HighSpeed />
          <Submit />
        </form>
      </div>
      {renderRoutes(route.routes)}
    </div>
  )
}


export default React.memo(connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(Home));