import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../../routes/routes';
import {
  getQuery,
  getPathName,
  intentPageString,
  getAllUrlParams
} from '../../../utils/RouterUtils';
import './product.scss';
@inject('store')
@observer
export default class DetailProductComponent extends React.Component {
  @observable isRender = false;
  @observable imgProuct = [];
  @observable typeProduct = [];
  @observable getAllUrl = '';
  constructor(props) {
    super(props);
    this.isRender = true;
  }
  componentDidMount() {
    this.getAllUrl = getAllUrlParams(window.location.href).id || '';
    console.log(this.getAllUrl);
    if (this.getAllUrl != undefined && this.getAllUrl != '') {
    }
  }
  callBack = (key, data) => {
    switch (key) {
      case 'ADD_IMG':
        break;

      default:
        break;
    }
  };
  render() {
    const { callBack } = this.props;
    return (
      <div>
        {this.isRender ? (
          <div className="py-4 detail-product">
            <div className="px-4">
              {/* <button className="bgDefault  p-2 px-3 rounded cursor">
                <Link route="/admin/detail-product">
                  <a className="colorWhite" style={{ textDecoration: 'none' }}>
                    Thêm món
                  </a>
                </Link>
              </button> */}
              <div className="row align-items-center mb-3 ">
                <div className="col-2">
                  <span className="font">Tên sản phẩm</span>
                </div>
                <div className="col-10">
                  <input type="text" className="w-75 form-control font" style={{}} />
                </div>
              </div>
              <div className="row  align-items-center mb-3">
                <div className="col-2">
                  <span className="font">Giá sản phẩm</span>
                </div>
                <div className="col-10">
                  <div className="row align-items-center">
                    <div className="col-5 px-0">
                      <input type="text" className="w-75 form-control font" style={{}} />
                    </div>
                    <div className="col-7">
                      <label className="check mr-2 ml-3">
                        <input type="checkbox" />
                        <div className="box" />
                      </label>
                      <span>Nổi bật</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row  align-items-center mb-3">
                <div className="col-2">
                  <span className="font">Trạng thái</span>
                </div>
                <div className="col-10">
                  <div className="row align-items-center">
                    <div className="col-5 px-0">
                      <select type="text" className="w-75 custom-select font">
                        <option value="exist ">Còn hàng</option>
                        <option value="over ">Hết hàng</option>
                      </select>
                    </div>
                    <div className="col-7">
                      <div className="row  align-items-center">
                        <div className="col-3">
                          <span className="font">Danh mục </span>
                        </div>
                        <div className="col-9">
                          <select type="text" className="w-75 custom-select font">
                            {this.props.store.dataCategory.map((item, index) => {
                              return <option value={item.key}>{item.name}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row  mb-3">
                <div className="col-2">
                  <span className="font">Phân loại hàng</span>
                  <br />
                  <small style={{ color: 'gray' }}>
                    Phân loại sản phẩm lựa chọn: kích thước, màu sắc, ...
                  </small>
                </div>
                <div className="col-10">
                  <div className="d-inline-block mb-3">
                    <input
                      type="text"
                      className="w-50 form-control font float-left mr-3"
                      style={{}}
                    />
                    <button className="bgDefault colorWhite p-2 px-3 rounded cursor">Thêm</button>
                  </div>

                  <div>
                    {this.typeProduct.map((item, index) => {
                      return (
                        <div
                          className="bgDefault colorWhite px-2 py-1 d-block float-left mr-3"
                          style={{ position: 'relative' }}
                        >
                          {item}
                          <img
                            className="cursor"
                            style={{
                              width: 20,
                              objectFit: 'cover',
                              position: 'absolute',
                              top: -7,
                              right: -7
                            }}
                            src="../../../static/images/cancel.png"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-2">
                  <span className="font">Ảnh sản phẩm</span>
                </div>
                <div className="col-10">
                  {this.imgProuct.map((img, index) => {
                    return (
                      <div
                        className="border cursor mr-2 float-left img-product"
                        style={{ width: 100, height: 100, position: 'relative' }}
                      >
                        <img
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src="../../../static/images/add-image.png"
                        />
                        <img
                          className="cursor img-cancel"
                          style={{
                            width: 20,
                            objectFit: 'cover',
                            position: 'absolute',
                            top: -7,
                            right: -7
                          }}
                          src="../../../static/images/cancel.png"
                        />
                      </div>
                    );
                  })}
                  <img
                    onClick={() => {
                      this.callBack('ADD_IMG');
                    }}
                    className="border cursor"
                    style={{ width: 100, objectFit: 'cover' }}
                    src="../../../static/images/add-image.png"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-2">
                  <span className="font">Mô tả</span>
                </div>
                <div className="col-10">
                  <textarea rows="5" type="text" className="w-100 form-control font" style={{}} />
                </div>
              </div>
              <div className="row justify-content-center mb-4 pr-5">
                {this.getAllUrl != undefined && this.getAllUrl != '' ? (
                  <button className="bgDefault colorWhite p-2 px-3 rounded cursor">
                    Chỉnh sửa
                  </button>
                ) : (
                  <button className="bgDefault colorWhite p-2 px-3 rounded cursor">Lưu</button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
