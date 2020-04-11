import React, {useCallback} from 'react';
import { renderRoutes } from "react-router-config";
import { connect } from 'react-redux';
import './index.css';
import Header from '../../components/Header';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';


function Home (props) {
  const { route } = props;

 // 子组件传函数
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div>
      <div>
        <div className="header-wrapper">
        <Header title="火车票" onBack={onBack}/>
        </div>
      <DepartDate />
      <HighSpeed />
      <Journey />
      <Submit />
      </div>
      { renderRoutes (route.routes) }
    </div>
  )
}

// export default React.memo (connect 
//   (mapStateToProps, mapDispatchToProps, mergeProps)
// (component)(Home));
export default React.memo(connect(
  function mapStateToProps(state) {
    return {}
  },
  function mapDispatchToProps(dispatch) {
    return {}
  }
)(Home));