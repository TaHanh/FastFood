import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../routes/routes';
import LoadComponent from '../general/LoadComponent';

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
        <div className="text-center px-1">
          <p className="my-2">5846u9jdfgj fdhgjkhdfkghk fdhgjkhdfkghk</p>
          <p className="mb-1" style={{ color: 'red' }}>
            20000đ
          </p>
        </div>
        <button className="cursor py-2 w-100">
          <small>Thêm vào giỏ</small>
        </button>
      </div>
    );
  }
}
