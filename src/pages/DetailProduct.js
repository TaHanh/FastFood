import React from 'react';

import { observable } from 'mobx';

import { inject, observer } from 'mobx-react';

import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import HeaderProductComponent from '../components/header/HeaderProductComponent';
import ProductComponent from '../components/products/ProductComponent';
@inject('store')
@observer
export default class DetailProduct extends React.Component {
  @observable isRender = false;
  constructor(props) {
    super(props);
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
