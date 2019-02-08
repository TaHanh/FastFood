import React from 'react';

import { observable } from 'mobx';

import { inject, observer } from 'mobx-react';
import { getPathName, getQuery } from '../utils/RouterUtils';
import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import HeaderProductComponent from '../components/header/HeaderProductComponent';
import ProductComponent from '../components/products/ProductComponent';
@inject('store')
@observer
export default class Products extends React.Component {
  @observable isRender = false;
  constructor(props) {
    super(props);
    alert('1');
  }
  componentDidMount() {
    let pathName = getPathName();
    // if (pathName != '') {
    this.props.store.dataMenu.map((item, index) => {
      if (item.directional == pathName) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    // }
    this.isRender = true;
  }
  render() {
    return (
      <div>
        {this.isRender ? (
          <div>
            <HeaderProductComponent />
            <ProductComponent />
          </div>
        ) : null}
      </div>
    );
  }
}
