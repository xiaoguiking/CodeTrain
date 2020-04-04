import React, { Component, lazy, Suspense } from 'react';



// 异步引入自定义webpack名字

const About = lazy(() => import(/*webpackChunkName:'about'*/'./About.jsx'));
// 手动捕获错误方式 ErrorBoundary + componentDidCatch

class App1 extends Component {
    state = { hasError: false };
  // 捕获错误第一种
  // componentDidCatch() {
  //   this.setState({
  //     hasError: true
  //   })
  // }

  // 第二种捕获静态方法
  static getDerivedStateFormError(error){
    return {
      hasError: true
    }
  };

  render() {
    if (this.state.hasError) {
      return (<div>error</div>)
    }
    return (
      <div>
        <Suspense fallback={<div>loading</div>}><About /></Suspense>
      </div>
    );
  }
}

export default App1;



