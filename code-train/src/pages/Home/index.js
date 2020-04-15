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
import CitySelector from '../../components/CitySelector'; // 城市选择浮层
import DateSelector from '../../components/DateSelector'; // 日期选择浮层

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectorCity,
  showDateSelector, // 日期选择浮层
  hideDateSelector,
} from '../../store/actions';

function Home(props) {
  const { 
    route, from, to, 
    dispatch, 
    cityData, isLoadingCityData, 
    isCitySelectorVisible,
    isDateSelectorVisible,
    departDate,
} = props;
  // console.log(props, 'props');

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

  /**
   * 跳转到CitySelector回退功能
   * 请求城市数据
   * 选择回填
   */
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
        {
            onBack: hideCitySelector,
            fetchCityData,
            onSelect: setSelectorCity
        }, dispatch);
}, [dispatch]);

/**
 * 日期选择浮层
 */
  const departDateCbs = useMemo(() => {
    return bindActionCreators({
      onClick: showDateSelector
    }, dispatch)
  }, [dispatch])

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideDateSelector,
    },dispatch)
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
          <DepartDate 
            time={departDate}
            {...departDateCbs}
          />
          <HighSpeed />
          <Submit />
        </form>
        <CitySelector 
          show={isCitySelectorVisible}
          isLoading={isLoadingCityData}
          cityData={cityData}
          {...citySelectorCbs}
        />
        <DateSelector 
          show={isDateSelectorVisible}
          {...dateSelectorCbs}
        />
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