import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../routes/routes';
import LoadComponent from '../general/LoadComponent';
import './products.scss';
@inject('store')
@observer
export default class ItemProductComponent extends React.Component {
  @observable isRender = false;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="product-item w-100 m-auto text-center">
        <div className="product-item-cover">
          <img src="../../static/images/bannerHome.jpg" />
        </div>
        <div className="text-center pt-3 px-1">
          <h5 className=" font-weight-bold">name</h5>
          <p>20000</p>
        </div>
        <button className="cursor p-2 px-3 mb-2">
          <small>Thêm vào giỏ</small>
        </button>
      </div>
    );
  }
}
