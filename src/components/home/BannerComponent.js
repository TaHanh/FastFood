import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../routes/routes';
import './products.scss';
@inject('store')
@observer
export default class BannerComponent extends React.Component {
  @observable isRender = false;

  constructor(props) {
    super(props);
    this.isRender = true;
  }

  render() {
    return (
      <div className="banner w-100" style={{ position: 'relative' }}>
        <img
          style={{ width: '100%', height: 300, objectFit: 'cover' }}
          src="../../static/images/bannerHome.jpg"
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 300,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }}
        >
          <div
            className="row w-100 justify-content-center"
            style={{ position: 'absolute', top: '30%', left: 0 }}
          >
            <div className="col-12 text-center">
              <h3 className="colorWhite py-3">
                Logo - Đặt hàng nhanh chóng - Chất lượng tuyệt vời
              </h3>
            </div>
            <div className="col-6">
              <input className="w-100 input borderR p-2" type="text" placeholder="Bạn tìm gì ?" style={{ height: 40 }} />
            </div>
            <div className="col-2">
              <button
                className="btn-search borderR w-100 bgDefault colorWhite cursor"
                style={{ height: '40px', lineHeight: '40px', fontWeight: 'bold' }}
              >
                TÌM KIẾM
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
