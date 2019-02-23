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
import './order.scss';
@inject('store')
@observer
export default class DetailOrderComponent extends React.Component {
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
          <div className="py-4 detail-product font">
            <div className="px-4 font">
              {/* <button className="bgDefault  p-2 px-3 rounded cursor">
                <Link route="/admin/detail-product">
                  <a className="colorWhite" style={{ textDecoration: 'none' }}>
                    Thêm món
                  </a>
                </Link>
              </button> */}
              <div className="row align-items-center mb-3 ">
                <div className="col-2">
                  <span className="font">Tên khách hàng</span>
                </div>
                <div className="col-6">
                  <input type="text" className="w-75 form-control font" style={{}} />
                </div>
              </div>
              <div className="row  align-items-center mb-3">
                <div className="col-2">
                  <span className="font">Số điện thoại</span>
                </div>
                <div className="col-10">
                  <div className="row align-items-center">
                    <div className="col-5 px-0">
                      <input type="text" className="w-75 form-control font" style={{}} />
                    </div>
                    <div className="col-7">
                      <div className="row align-items-center mb-3 ">
                        <div className="col-3">
                          <span className="font">Email</span>
                        </div>
                        <div className="col-9">
                          <input type="text" className="w-75 form-control font" style={{}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center mb-3 ">
                <div className="col-2">
                  <span className="font">Địa chỉ</span>
                </div>
                <div className="col-9">
                  <input type="text" className="w-100 form-control font" style={{}} />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <span className="font pt-2 d-block">Sản phẩm</span>
                </div>
                <div className="col-10">
                  <table className="table table-bordered table-sm">
                    <tbody>
                      <tr>
                        <th scope="row">name</th>
                        <td style={{ maxWidth: 50 }}> phân loại hàng</td>
                        <td style={{ maxWidth: 50 }}> đơn giá</td>
                        <td style={{ maxWidth: 30 }}>
                          {' '}
                          <input
                            type="number"
                            className="w-100 form-control font py-0 pr-0"
                            style={{}}
                          />
                        </td>
                        <td style={{ maxWidth: 20 }}>
                          <img
                            onClick={() => {
                              callBack('DEL_ITEM', { index, item });
                            }}
                            className="cursor"
                            style={{ width: 25 }}
                            src="../../../static/images/remove.png"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row  align-items-center mb-3">
                <div className="col-2">
                  <span className="font">Trạng thái</span>
                </div>
                <div className="col-10">
                  <div className="row align-items-center">
                    <div className="col-4 px-0">
                      <select type="text" className="w-75 custom-select font">
                        <option value="0">Đang chờ xử lý</option>
                        <option value="1">Xác nhận</option>
                        <option value="2">Hủy đơn</option>
                      </select>
                    </div>
                    <div className="col-8 px-0">
                      <div className="row  align-items-center">
                        <div className="col-5 px-0">
                          <span className="font float-left mr-2">Thời gian</span>
                          <span className="font">12/12/53</span>
                        </div>
                        <div className="col-7 px-0">
                          <input type="text" className="w-100 form-control font" style={{}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row  mb-3">
                <div className="col-2">
                  <span className="font  pt-2 d-block">Trạng thái giao hàng</span>
                </div>
                <div className="col-10">
                  <table className="table table-bordered table-sm">
                    <tbody>
                      <tr>
                        <th scope="row">hủy đơn</th>
                        <td>time</td>
                        <td>note</td>
                        <td style={{ maxWidth: 20 }}>
                          <img
                            onClick={() => {
                              callBack('DEL_ITEM', { index, item });
                            }}
                            className="cursor"
                            style={{ width: 25 }}
                            src="../../../static/images/remove.png"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="row align-items-center">
                    <div className="col-3 px-0">
                      <select type="text" className="w-75 custom-select font">
                        <option value="0">Đang giao</option>
                        <option value="1">Đã nhận</option>
                        <option value="2">Hủy đơn</option>
                      </select>
                    </div>
                    <div className="col-9 px-0">
                      <div className="row  align-items-center">
                        <div className="col-4 px-0">
                          <span className="font float-left mr-2">Thời gian</span>
                          <span className="font">12/12/53</span>
                        </div>
                        <div className="col-6 px-0">
                          <input type="text" className="w-100 form-control font" style={{}} />
                        </div>
                        <div className="col-2 pr-0">
                          <button className="bgDefault colorWhite p-2 px-3 rounded cursor w-100">
                            Thêm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-2">
                  <span className="font">Ghi chú của khách hàng</span>
                </div>
                <div className="col-10">
                  <input type="text" className="w-100 form-control font" style={{}} />
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
