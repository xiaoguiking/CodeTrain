import React, { Component, createContext } from 'react';
// import logo from './logo.svg';
import './App.css';

const BatteryContext = createContext();
const OnlineContext = createContext();

// 三级组件 消费者包裹一个函数
class Leaf extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {
          battery => (
            <OnlineContext.Consumer>
              {
                online => (<h1>Battery: {battery}, Online: {String(online)}</h1>)
              }
            </OnlineContext.Consumer>
          )
        }
      </BatteryContext.Consumer>
    );
  }
}

// 中间组件
class Middle extends Component {
  render() {
    return (
      <Leaf />
    );
  }
}

// 生产者
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battery: 60,
      online: false,
    }
  };
  render() {
    const { battery, online } = this.state;
    console.log(online, 'on');
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button onClick={() => this.setState({ battery: battery - 1 })}>
            Press
      </button>
          <button onClick={() => this.setState({ online: !online })}>
            Switch
      </button>
        <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    );
  }
}



export default App;
