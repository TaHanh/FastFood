import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../routes/routes';
import { intentPageString } from '../../utils/RouterUtils';
import LoadComponent from '../general/LoadComponent';
import ItemProductComponent from './ItemProductComponent';
import ReactHtmlParser from 'react-html-parser';
import './products.scss';
@inject('store')
@observer
export default class DetailProductComponent extends React.Component {
  @observable isRender = false;
  @observable numberProduct = 1;
  @observable data = [];
  @observable checkSize = false;
  @observable typeSize = '';
  constructor(props) {
    super(props);
    this.data = this.props.data;
    if (this.data.type && this.data.type.length > 0) {
      this.typeSize = this.data.type.map(e => {
        return { name: e, status: false };
      });
    }

    this.isRender = true;
  }
  changeInput = data => {
    const { value, name } = data.target;

    switch (name) {
      case 'amount':
        this.numberProduct = value;
        break;

      default:
        break;
    }
  };
  render() {
    return (
      <div className="detail-product w-100">
        {this.isRender ? (
          <div className="limit">
            <div className="detail-product-content  py-5 px-3">
              <div className="row">
                <div className="col-lg-6">
                  <img
                    src={this.data.image[0] || '../../static/images/bannerHome.jpg'}
                    style={{ objectFit: 'contain', height: 200, maxWidth: '100%' }}
                  />
                </div>
                <div className="col-lg-6">
                  <h3 className="mb-4">{this.data.name}</h3>
                  <p>Tình trạng : {this.data.status == 0 ? 'Còn hàng' : 'Hết hàng'}</p>
                  {this.data.type.length > 0 ? (
                    <div className="">
                      <span className="float-left mr-33">Phân loại hàng</span>
                      <div className="">
                        {this.typeSize.map((item, index) => {
                          return (
                            <span className="mx-2" style={{ position: 'relative' }}>
                              <label
                                for={index}
                                className="cursor"
                                style={
                                  item.status
                                    ? {
                                        padding: '5px 10px',
                                        border: '2px solid green',
                                        background: '#fff'
                                      }
                                    : {
                                        padding: '5px 10px',
                                        border: '2px solid gray',
                                        background: '#fff'
                                      }
                                }
                                onClick={() => {
                                  this.checkSize = false;
                                }}
                              >
                                {item.name}
                              </label>
                              <input
                                style={
                                  {
                                    // position: 'absolute',
                                    // top: 0,
                                    // left: 0,
                                    // zIndex: -1
                                  }
                                }
                                onChange={e => {
                                  const { value, name } = e.target;
                                  this.typeSize.map((e1, i1) => {
                                    if (e1.name == value) {
                                      e1.status = true;
                                    } else {
                                      e1.status = false;
                                    }
                                  });
                                }}
                                type="radio"
                                name="type"
                                id={index}
                                value={item.name}
                              />
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {this.checkSize ? <p style={{ color: 'red' }}>Bạn chưa chọn loại hàng</p> : null}
                  <br />
                  <div className="d-inline-block align-items-center pt-2">
                    <span className="float-left mr-4" style={{ lineHeight: '30px' }}>
                      Số lượng
                    </span>
                    <input
                      type="number"
                      name="amount"
                      className="p-1"
                      min="0"
                      value={this.numberProduct}
                      onChange={e => {
                        this.changeInput(e);
                      }}
                      style={{
                        height: '30px',
                        width: 100,
                        border: '1px solid rgb(180, 180, 180)',
                        borderRadius: '5px'
                      }}
                    />
                  </div>
                  <div className="my-4">
                    <button
                      className="cursor px-3 py-2 float-left bgDefault mr-4"
                      onClick={() => {
                        if (this.typeSize == '') {
                          this.checkSize = false;
                          if (this.numberProduct != 0) {
                            this.props.callBack('ADD_CART', {
                              ...this.data,
                              amount: this.numberProduct
                            });
                          } else {
                            alert('Bạn chưa chọn số lượng !');
                          }
                        } else if (this.typeSize.find(e => e.status == true) !== undefined) {
                          this.checkSize = false;
                          if (this.numberProduct != 0) {
                            this.props.callBack('ADD_CART', {
                              ...this.data,
                              amount: this.numberProduct,
                              typeSize: this.typeSize
                            });
                            // this.typeSize = this.typeSize.map(e => {
                            //   e.status = false;
                            // });
                          } else {
                            alert('Bạn chưa chọn số lượng !');
                          }
                        } else {
                          this.checkSize = true;
                        }
                      }}
                    >
                      <span className="colorWhite">Thêm vào giỏ</span>
                    </button>

                    <button
                      className="cursor px-3 py-2  bgDefault"
                      onClick={() => {
                        this.props.callBack('ADD_CART', {
                          ...this.data,
                          amount: this.numberProduct,
                          typeSelect: this.typeSize
                        });
                        intentPageString('/order');
                      }}
                    >
                      <span className="colorWhite">Mua ngay</span>
                    </button>
                  </div>
                </div>
              </div>
              <p className="my-3">{ReactHtmlParser(this.data.description)}</p>
            </div>
            <div className="product-more">
              <div className="mx-4">
                <h4>Có thể bạn thích</h4>
                <hr className="my-1" />
              </div>

              <div className="row py-3">
                {this.props.dataLike.map((e, i) => {
                  return (
                    <div className="p-3" style={{ width: '20%' }}>
                      <ItemProductComponent item={e} index={i} callBack={this.props.callBack} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="product-more">
              <div className="mx-4">
                <h4>Sản phẩm tương tự</h4>
                <hr className="my-1" />
              </div>

              <div className="row py-3">
                {this.props.dataMore.map((e, i) => {
                  return (
                    <div className="p-3" style={{ width: '20%' }}>
                      <ItemProductComponent item={e} index={i} callBack={this.props.callBack} />
                    </div>
                  );
                })}
              </div>

              <div className="view-more mr-5 mb-4 text-right">
                <Link
                // route={item.query.pathname + '/' + item.query.name}
                // href={{ pathname: item.query.pathname, query: { name: item.query.name } }}
                >
                  <a>
                    <i className="colorDefault">Xem thêm</i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <LoadComponent />
        )}
      </div>
    );
  }
}
