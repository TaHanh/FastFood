import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../../routes/routes';
import './order.scss';
import moment from 'moment';
import { unixToTime } from '../../../utils/convertTime';
@inject('store')
@observer
class Item extends React.Component {
  render() {
    const { index, item, callBack } = this.props;
    return (
      <tr>
        <td
          className=""
          // onClick={() => {
          //   callBack('CLICK_ITEM', { index, item });
          // }}
        >
          <Link href={{ pathname: '/admin/detail-order', query: { id: item.id } }}>
            <a className="colorDefault cursor" style={{ textDecoration: 'none' }}>
              {item.id}
            </a>
          </Link>
        </td>

        <td>@mdo</td>
        <td>@mdo</td>
        <td>@mdo</td>

        <td>
          {item.products.map((e, i) => {
            return (
              <p>
                {e.name} - {e.amount}
                {/* {e.size.length > 0 ? '-' : null} */}
                {/* {e.size.map(size => {
                  return { size };
                })} */}
                {JSON.stringify(e.size)}
              </p>
            );
          })}
        </td>
        <td>{item.message}</td>
        <td>
          {item.statusOrder.map(e => {
            if (e.status == 0) {
              return 'Đang chờ xử lý - ' + unixToTime(e.time);
            } else if (e.status == 1) {
              return 'Xác nhận - ' + unixToTime(e.time);
            } else {
              return 'Hủy đơn - ' + unixToTime(e.time);
            }
          })}
        </td>
        <td>
          {item.statusShip.map(e => {
            if (e.status == 0) {
              return 'Đang giao - ' + unixToTime(e.time);
            } else if (e.status == 1) {
              return 'Đã nhận - ' + unixToTime(e.time);
            } else {
              return 'Hủy đơn - ' + unixToTime(e.time);
            }
          })}
        </td>
        <td>{moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
        <td>
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
    );
  }
}

@inject('store')
@observer
export default class OrderProductComponent extends React.Component {
  @observable isRender = false;
  @observable data = [];
  constructor(props) {
    super(props);

    this.isRender = true;
  }
  componentDidMount() {}
  render() {
    const { callBack } = this.props;
    return (
      <div>
        {this.isRender ? (
          <div className="py-4 font">
            <div className="px-5">
              <div className="row pt-4">
                <div className="col-5 px-0">
                  <div className="row  align-items-center mb-3 ">
                    <div className="col-3 px-0">
                      <span className="font">Tên khách hàng</span>
                    </div>
                    <div className="col-9">
                      <input type="text" className="w-75 form-control font" style={{}} />
                    </div>
                  </div>
                  <div className="row  align-items-center mb-3 ">
                    <div className="col-3 px-0">
                      <span className="font">Số điện thoại khách hàng</span>
                    </div>
                    <div className="col-9">
                      <input type="text" className="w-75 form-control font" style={{}} />
                    </div>
                  </div>
                </div>
                <div className="col-7">
                  <div className="row align-items-center mb-3">
                    <div className="col-3 px-0">
                      <span className="font">Thời gian</span>
                    </div>
                    <div className="col-9 align-items-center">
                      <div className="float-left w-50" style={{}}>
                        <span style={{ lineHeight: '40px' }} className="float-left pr-2">
                          Từ
                        </span>{' '}
                        <input
                          type="date"
                          style={{ fontSize: 10 }}
                          className="w-75 form-control font pr-0"
                          style={{}}
                        />
                      </div>
                      <div className="float-left w-50">
                        <span style={{ lineHeight: '40px' }} className="float-left pr-2">
                          Đến
                        </span>{' '}
                        <input type="date" className="w-75 form-control font pr-0" style={{}} />
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center mb-3">
                    <div className="col-3 px-0">
                      <span className="font">Tình trạng</span>
                    </div>
                    <div className="col-8">
                      <select type="text" className="w-75 custom-select font">
                        <option value="0">Đang chờ xử lý</option>
                        <option value="1">Xác nhận</option>
                        <option value="2">Hủy đơn</option>
                      </select>
                    </div>
                  </div>
                  <div className="row  align-items-center">
                    <div className="col-3 px-0">
                      <span className="font">Tình trạng giao</span>
                    </div>
                    <div className="col-8">
                      <select type="text" className="w-75 custom-select font">
                        <option value="0">Đang giao</option>
                        <option value="1">Đã nhận</option>
                        <option value="2">Hủy đơn</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end mb-4 pr-5">
                <button className="bgDefault colorWhite p-2 px-3 rounded cursor">Tìm kiếm</button>
              </div>
            </div>
            <div className="w-100" style={{ overflowX: 'scroll' }}>
              <table className="table table-bordered text-center font" style={{ minWidth: 1500 }}>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Tên KH</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Lời nhắn</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Trạng thái giao hàng</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.store.dataOrdersDashboard.map((item, index) => {
                    return <Item item={item} index={index} callBack={callBack} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
