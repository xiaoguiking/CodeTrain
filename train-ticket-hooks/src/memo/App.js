import React, { Component,  memo } from 'react';

// 父组件
// class Foo extends PureComponent {
//   第一种优化
//   // shouldComponentUpdate(nextProps, nextState){
//   //   if(nextProps.name === this.props.name){
//   //       return false;
//   //       // 不会渲染
//   //   }
//   //   return true;
//   // }
//   render() {
//     console.log('Foo render');
//     return <div>{this.props.person.age}</div>;
//   }
// }

// Memo 无状态组件修改

const Foo = memo(
  function Foo(props){
    console.log('Foo render');
    return (
      <div>{props.person.age}</div>
    )
  }
)





// 儿组件
class App extends Component {
  state = {
    count: 0,
    person: {
      age: 1
    },
  };

  // 解决回调问题
  callback = () => {
    // this
  }
  render() {
    const person = this.state.person;
    return (
      <div>
        <button type="button"
          onClick={() => {
              person.age++;
              this.setState({count: this.state.count + 1});
          }}
        >
          Button
        </button>
        <Foo person={person} cb={this.callback} />
      </div>
    );
  }
}

export default App;





