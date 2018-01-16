import React from 'react';
import ReactDOM from 'react-dom';
import StateAsyn from './demo/setstate_asyn';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <StateAsyn/>
      </div>
    );
  }
}

ReactDOM.render(
  <Root/>,
  document.getElementById('root')
);
