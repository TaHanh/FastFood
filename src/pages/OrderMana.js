import React from 'react';

import { observable } from 'mobx';

import { inject, observer } from 'mobx-react';
import { getPathName } from '../utils/RouterUtils';
import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import MenuLeftComponent from '../components/dashboard/MenuLeftComponent';
import OrderProductComponent from '../components/dashboard/order/OrderProductComponent';
@inject('store')
@observer
export default class OrderMana extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let pathName = getPathName();
    this.props.store.getOrdersAPI(res => {
      console.log('getOrdersAPI page' + JSON.stringify(res));
    });
    this.isRender = true;
  }
  callBack = (key, data) => {
    alert(key);
  };
  render() {
    return (
      <div className="row">
        <div className="col-lg-2 px-0">
          <MenuLeftComponent />
        </div>
        <div className="col-lg-10 px-0">
          <OrderProductComponent callBack={this.callBack} />
        </div>
      </div>
    );
  }
}
