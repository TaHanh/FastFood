import React from 'react';
import './style.scss';
export default class LoadComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loading w-100">
        <div className="container">
          <div className="it item1" />
          <div className="it item2" />
          <div className="it item3" />
        </div>
      </div>
    );
  }
}
