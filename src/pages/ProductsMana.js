import React from 'react';

import { observable } from 'mobx';

import { inject, observer } from 'mobx-react';
import { getPathName } from '../utils/RouterUtils';
import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import { deleteProduct } from '../api/Product';
import MenuLeftComponent from '../components/dashboard/MenuLeftComponent';
import ListProductComponent from '../components/dashboard/products/ListProductComponent';
@inject('store')
@observer
export default class ProductsMana extends React.Component {
  constructor(props) {
    super(props);
    this.props.store.getCategoriesAPI(res => {});
    this.props.store.getProductsAPI(res => {});
  }
  componentDidMount() {
    let pathName = getPathName();

    this.isRender = true;
  }
  callBack = (key, data) => {
    switch (key) {
      case 'DEL_ITEM':
        deleteProduct(data.item.id).then(res => {
          this.props.store.dataProducts.splice(data.index, 1);
        });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div className="row">
        <div className="col-lg-2 px-0">
          <MenuLeftComponent />
        </div>
        <div className="col-lg-10 px-0">
          <ListProductComponent callBack={this.callBack} />
        </div>
      </div>
    );
  }
}
