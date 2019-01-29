import React from 'react';
import './style.scss';
export default class LoadComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loading w-100">
        <div class="container">
          <div class="it item1" />
          <div class="it item2" />
          <div class="it item3" />
        </div>
      </div>
    );
  }
}
