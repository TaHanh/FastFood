import React from 'react';

import { observable } from 'mobx';

import { inject, observer } from 'mobx-react';

import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import HeaderComponent from '../components/header/HeaderComponent';
import BannerComponent from '../components/home/BannerComponent';
import HomeComponent from '../components/home/HomeComponent';
@inject('store')
@observer
export default class Index extends React.Component {
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
            <HeaderComponent />
            <BannerComponent />
            <HomeComponent />
          </div>
        ) : null}
      </div>
    );
  }
}
