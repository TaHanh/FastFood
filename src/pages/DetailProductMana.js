import React from 'react';

import { observable } from 'mobx';

import { inject, observer } from 'mobx-react';
import { getProduct, createProduct, updateProduct } from '../api/Product';
import { getPathName, getQuery, getAllUrlParams } from '../utils/RouterUtils';
import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import MenuLeftComponent from '../components/dashboard/MenuLeftComponent';
import DetailProductComponent from '../components/dashboard/products/DetailProductComponent';
@inject('store')
@observer
export default class DetailProductMana extends React.Component {
  @observable isRender = false;
  @observable data = {
    name: '',
    highlight: false,
    image: [],
    price: '',
    status: 0,
    description: '',
    category: '',
    type: []
  };
  constructor(props) {
    super(props);
    if (this.props.store.dataCategory.length == 0) {
      this.props.store.getCategoriesAPI(() => {});
    }
  }
  componentDidMount() {
    let pathName = getPathName();
    let getParam = getAllUrlParams(window.location.href).id || '';
    console.log('getParam' + getParam);
    if (getParam != undefined && getParam != '') {
      // getProduct(getParam, res => {
      //   this.data = res;
      //   this.isRender = true;
      //   console.log('getProduct' + JSON.stringify(this.data));
      // });
      getProduct(getParam).then(res => {
        this.data = res;
        if (this.data.highlight == 0) {
          this.data.highlight = true;
        } else {
          this.data.highlight = false;
        }

        this.isRender = true;
        console.log('getProduct' + JSON.stringify(this.data));
      });
    } else {
      this.isRender = true;
    }
    if (this.props.store.dataCategory.length == 0) {
      this.props.store.getCategoriesAPI(() => {});
    }
  }
  callBack = (key, data) => {
    switch (key) {
      case 'ADD_IMG':
        break;
      case 'UPDATE_PRODUCT':
        if (data.name == '' || data.price == '' || data.category == '')
          return alert('Bạn phải nhập đầy đủ thông tin');
        if (data.highlight) {
          data.highlight = 0;
        } else {
          data.highlight = 1;
        }
        data.description = JSON.stringify(data.description);
        updateProduct(data).then(res => {
          if (res.code == 1) {
            alert('UPDATE thành công !');
          }
        });
        break;
      case 'CREATE_PRODUCT':
        if (data.name == '' || data.price == '' || data.category == {})
          return alert('Bạn phải nhập đầy đủ thông tin');
        if (data.highlight) {
          data.highlight = 0;
        } else {
          data.highlight = 1;
        }
        data.description = JSON.stringify(data.description);
        createProduct(data).then(res => {
          if (res) {
            this.data = res;
            if (this.data.highlight == 0) {
              this.data.highlight = true;
            } else {
              this.data.highlight = false;
            }
          }
          console.log(JSON.stringify(res));
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
          {this.isRender ? (
            <DetailProductComponent data={this.data} callBack={this.callBack} />
          ) : null}
        </div>
      </div>
    );
  }
}
