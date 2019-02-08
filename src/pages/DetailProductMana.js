import React from 'react';

import { observable } from 'mobx';

import { inject, observer } from 'mobx-react';
import { getPathName } from '../utils/RouterUtils';
import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import MenuLeftComponent from '../components/dashboard/MenuLeftComponent';
import DetailProductComponent from '../components/dashboard/products/DetailProductComponent';
@inject('store')
@observer
export default class DetailProductMana extends React.Component {
  @observable isRender = false;
  constructor(props) {
    super(props);
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
      <div className="row">
        <div className="col-lg-2 px-0">
          <MenuLeftComponent />
        </div>
        <div className="col-lg-10 px-0">
          <DetailProductComponent callBack={this.callBack} />
        </div>
      </div>
    );
  }
}
