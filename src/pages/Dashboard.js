import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../routes/routes';

import $ from 'jquery';
import { intentPage } from '../utils/RouterUtils';
import { getCustomersNew } from '../api/Customer';
import { unixToMonth, unitTimeNow, unixToDateMonthYear } from '../utils/convertTime';
import LoadComponent from '../components/general/LoadComponent';
import MenuLeftComponent from '../components/dashboard/MenuLeftComponent';
import DashboardComponent from '../components/dashboard/dashboardComponent/DashboardComponent';
@inject('store')
@observer
export default class Dashboard extends React.Component {
  @observable isRender = false;
  @observable order = {
    statusOrder: {
      wait: 0,
      success: 0,
      cancel: 0
    },
    statusShip: {
      wait: 0,
      success: 0,
      cancel: 0
    },
    totalIndex: 0,
    totalMoney: 0
  };
  @observable timeNow = '';
  @observable usersNew = [];
  @observable usersFriendly = [];
  @observable users = [];
  @observable usersFriendly = [];
  @observable custommer = 0;
  @observable employee = 0;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.timeNow = unixToMonth(unitTimeNow());
    this.props.store.getAllProductsAPI(() => {});
    this.props.store.getAllCustomerAPI(res => {
      console.log(res);
      this.usersNew = res.slice(0, 6);
      this.usersFriendly = res.sort(function(a, b) {
        return b.type - a.type;
      });
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        if (element.role !== 'customer') {
          this.employee++;
        } else {
          this.custommer++;
        }
      }
    });
    this.thongKeDonHang(this.timeNow);
  }
  thongKeDonHang = getTime => {
    this.props.store.getAllOrdersAPI(res => {
      if (res.length > 0) {
        res.map(e => {
          // if(res.createdAt)
          this.order.totalIndex++;
          if (e.statusOrder[e.statusOrder.length - 1].status == '0') {
            this.order.statusOrder.wait++;
          } else if (e.statusOrder[e.statusOrder.length - 1].status == '1') {
            this.order.statusOrder.success++;
          } else {
            this.order.statusOrder.cancel++;
          }
          if (
            e.statusShip[e.statusShip.length - 1].status == '0' ||
            e.statusShip[e.statusShip.length - 1].status == '3'
          ) {
            this.order.statusShip.wait++;
          } else if (e.statusOrder[e.statusOrder.length - 1].status == '1') {
            this.order.statusShip.success++;
          } else {
            this.order.statusShip.cancel++;
          }

          this.order.totalMoney = 0;
          e.products.map(p => {
            let obj = p.price * p.amount;
            this.order.totalMoney += obj;
          });
        });
      }
      this.isRender = true;
    });
  };
  render() {
    return (
      <div className="row">
        <div className="col-lg-2 px-0">
          <MenuLeftComponent />
        </div>
        <div className="col-lg-10 px-0">
          {this.isRender ? (
            <DashboardComponent
              timeNow={this.timeNow}
              order={this.order}
              usersNew={this.usersNew}
              usersFriendly={this.usersFriendly}
              custommer={this.custommer}
              employee={this.employee}
              callBack={this.callBack}
            />
          ) : (
            <div style={{ minHeight: '100vh' }}>
              <LoadComponent />
            </div>
          )}
        </div>
      </div>
    );
  }
}
