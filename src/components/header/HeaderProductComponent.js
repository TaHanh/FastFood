import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../routes/routes';
import '../general/style.scss';
import './header.scss';
@inject('store')
@observer
export default class HeaderProductComponent extends React.Component {
  @observable isRender = false;
  @observable dataMenu = [];
  constructor(props) {
    super(props);
    this.dataMenu = this.props.store.dataMenu;
    this.isRender = true;
  }

  render() {
    return (
      <div className="row justify-content-between headerProduct w-100">
        <div className="col-8">
          <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand">Logo</a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                {this.dataMenu.map((item, index) => {
                  return (
                    <Link route={item.directional}>
                      <a
                        key={index}
                        className={
                          item.active
                            ? 'nav-link cursor colorDefault'
                            : 'nav-link cursor colorBlack'
                        }
                      >
                        {item.name}
                      </a>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
        <div className="col-4" style={{ alignSelf: 'center' }}>
          <div className="float-left mr-3" style={{ position: 'relative', width: ' 80%' }}>
            <input
              className="w-100 input borderR p-1 my-2"
              type="text"
              placeholder="Bạn tìm gì ?"
              style={{ height: 30, border: '1px solid #b4b4b4' }}
            />
            <img
              className="cursor"
              style={{
                width: '20px',
                height: '20px',
                position: 'absolute',
                top: 14,
                right: 3,
                zIndex: 1
              }}
              src="../../static/images/icon-search.png"
            />
          </div>
          <div className="cart float-left" style={{ width: 30, position: 'relative' }}>
            <img
              src="../../static/images/shopping-cart-1.png"
              className="pt-2 cursor"
              style={{ width: '100%', filter: 'contrast(160%)' }}
            />
            <span
              class="badge rounded-circle"
              style={{
                backgroundColor: 'red',
                color: '#fff',
                position: 'absolute',
                right: -10,
                top: 5
              }}
            >
              <small>{this.props.store.myCart ? this.props.store.myCart.length : 0}</small>
            </span>
            <div className="myCart">
              <img
                style={{ width: 30, height: 30, position: 'absolute', right: '28px', top: '-20px' }}
                src="../../static/images/icons-sort-up.png"
              />
              <div
                style={{
                  maxHeight: '200px',
                  overflowY: 'scroll',
                  padding: '16px',
                  paddingBottom: 0
                }}
              >
                {['1', '3', '4', '3', '4'].map((item, index) => {
                  return (
                    <div className="row">
                      <div className="col-2 px-0 mb-2">
                        <img
                          className="cursor"
                          style={{ width: '100%' }}
                          src="https://datvietmedia.com/wp-content/uploads/2018/08/4-1.jpg"
                        />
                      </div>
                      <div className="col-7">
                        <span
                          className="cursor"
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%',
                            whiteSpace: 'nowrap',
                            display: 'inline-block'
                          }}
                        >
                          name name namename name
                        </span>
                        <br />
                        <small>Số lượng : 0</small>
                      </div>
                      <div className="col-3 px-0 mb-2">
                        <span>120000</span>
                        <button
                          className="cursor colorWhite mt-1"
                          style={{ backgroundColor: 'red' }}
                        >
                          <small>Xoá</small>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="row justify-content-between mx-3 my-2">
                <p className="mb-0">
                  <small className="mb-1 d-block">Tổng thành tiền</small>
                  <span style={{ color: 'red' }}>2.000.000đ</span>
                </p>

                <button
                  className="cursor colorWhite px-3  d-block bgDefault float-right"
                  style={{ height: '35px' }}
                >
                  Xem giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
