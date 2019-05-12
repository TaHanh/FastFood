import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../../routes/routes'
import {
  getQuery,
  getPathName,
  intentPageString,
  getAllUrlParams
} from '../../../utils/RouterUtils'
import { getTimeNow, unixToTime, unitTimeNow } from '../../../utils/convertTime'
import './order.scss'
@inject('store')
@observer
export default class DetailOrderComponent extends React.Component {
  @observable isRender = false
  @observable imgProuct = []
  @observable typeProduct = []
  @observable getAllUrl = ''
  @observable data = []
  @observable statusNowOrder = {
    name: '',
    status: 0,
    time: ''
  }
  @observable statusNowShip = {
    name: '',
    status: 0,
    time: getTimeNow()
  }
  constructor(props) {
    super(props)
    this.isRender = true
    this.data = this.props.data
    let medi = this.props.data.statusOrder[this.data.statusOrder.length - 1]
    this.statusNowOrder = medi
  }
  componentDidMount() {
    this.getAllUrl = getAllUrlParams(window.location.href).id || ''
    // console.log(this.getAllUrl);
    if (this.getAllUrl != undefined && this.getAllUrl != '') {
    }
  }
  totalPrice = () => {
    let total = 0
    this.data.products.map((item, index) => {
      total += item.price * item.amount
    })
    return total
  }
  callBack = (key, data) => {
    switch (key) {
      case 'ADD_IMG':
        break

      default:
        break
    }
  }
  render() {
    const { callBack } = this.props
    return (
      <div>
        {this.isRender ? (
          <div className="py-4 detail-order font">
            <div className="px-4 font">
              {/* <button className="bgDefault  p-2 px-3 rounded cursor">
                <Link route="/admin/detail-product">
                  <a className="colorWhite" style={{ textDecoration: 'none' }}>
                    Thêm món
                  </a>
                </Link>
              </button> */}
              <h4 className="text-center pb-3 colorDefault">
                Chi tiết đơn hàng
              </h4>
              <div style={{boxShadow: 'rgb(199, 199, 199) 0px 0px 5px', background: '#fff'}}>
                <h5 className="bgDefault colorWhite p-3">Thông tin khách hàng</h5>
                <div className="row align-items-center my-3 ">
                <div className="col-2">
                  <span className="font">Người nhận hàng</span>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="w-75 form-control font"
                    style={{}}
                    value={this.data.user.name}
                    onChange={e => {
                      this.data.user.name = e.target.value
                    }}
                  />
                </div>
                <div className="col-4">
                 {this.data.user.id ? (
                  <a
                    href={"/admin/detail-user?id=" + this.data.user.id}
                    title={this.data.user.id ? this.data.user.id : ""}
                  >
                    Khách hàng đã có tài khoản
                  </a>
                ) : (
                  "Khách hàng chưa có tài khoản"
                )}
                </div>
              </div>
              <div className="row  align-items-center mb-3">
                <div className="col-2">
                  <span className="font">Số điện thoại</span>
                </div>
                <div className="col-6">
                <input
                        type="text"
                        className="w-75 form-control font"
                        style={{}}
                        value={this.data.user.phone}
                        onChange={e => {
                          this.data.user.phone = e.target.value
                        }}
                      />
                
                     
                
                </div>
              </div>
              <div className="row align-items-center mb-3 ">
                        <div className="col-2">
                          <span className="font">Email</span>
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            className="w-75 form-control font"
                            style={{}}
                            value={this.data.user.email}
                            onChange={e => {
                              this.data.user.email = e.target.value
                            }}
                          />
                        </div>
                      </div>
              <div className="row align-items-center pb-3 ">
                <div className="col-2">
                  <span className="font">Địa chỉ</span>
                </div>
                <div className="col-9">
                  <input
                    type="text"
                    className="w-100 form-control font"
                    style={{}}
                    value={this.data.user.address}
                    onChange={e => {
                      this.data.user.address = e.target.value
                    }}
                  />
                </div>
              </div>
              
              </div>
              <div style={{boxShadow: 'rgb(199, 199, 199) 0px 0px 5px', background: '#fff'}}>
                <h5 className="bgDefault colorWhite p-3 mb-0">Thông tin Sản phẩm</h5>
 {/* <div className="row"> */}

                {/* <div className="col-12 px-0 py-2"> */}
                  <table className="table table-bordered table-sm mb-0">
                    <tbody>
                      {this.data.products.map((item, index) => {
                        return (
                          <tr className="py-2" style={{lineHeight: "35px"}}>
                            <th scope="row">{item.name}</th>
                            <td style={{ maxWidth: 100,  }}>
                              {item.typeSize ? (
                                <span>
                                  Phân loại:{' '}
                                  {
                                    item.typeSize.find(e => e.status == true)
                                      .name
                                  }
                                </span>
                              ) : (
                                ''
                              )}
                            </td>
                            <td style={{ maxWidth: 100 }}>
                              {item.amount} x {item.price}đ
                            </td>
                            {/* <td style={{ maxWidth: 30 }}>

                              <input
                                type="number"
                                className="w-100 form-control font py-0 pr-0"
                                style={{}}
                                value={item.amount}
                                onChange={e=>{
                                  item.amount = e.target.value
                                }}
                              />
                            </td> */}
                            {/* <td style={{ maxWidth: 20 }}>
                              <img
                                onClick={() => {
                                  callBack('DEL_ITEM', { index, item })
                                }}
                                className="cursor"
                                style={{ width: 25 }}
                                src="../../../static/images/remove.png"
                              />
                            </td> */}
                          </tr>
                        )
                      })}
                      <tr  style={{lineHeight: "35px"}}>
                        <td colspan="2">Tổng thành tiền</td>

                        <th style={{ maxWidth: 50 }}>
                          <h5 style={{ color: 'red', lineHeight: "35px" }} className="mb-0">
                            {this.totalPrice()}đ
                          </h5>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                {/* </div> */}
              {/* </div> */}
              </div>

              <div style={{boxShadow: 'rgb(199, 199, 199) 0px 0px 5px', background: '#fff'}}>
                <h5 className="bgDefault colorWhite p-3 mb-0">Trạng thái đơn hàng</h5>
              <div className="row justify-content-between align-items-center mb-3 p-2">
                {/* <div className="col-2">
                  <span className="font">Trạng thái</span>
                </div> */}
                {/* <div className="col-10"> */}
                  {/* <div className="row align-items-center"> */}
                    <div className="col-4 px-0">
                      <select
                        type="text"
                        className="w-75 custom-select font  border-success"
                        onChange={e => {
                          this.statusNowOrder.time = unitTimeNow()
                          this.statusNowOrder.status = e.target.value
                        }}
                      >
                        <option
                          value="0"
                          selected={
                            this.statusNowOrder.status == 0 ? true : false
                          }
                        >
                          Đơn đang chờ xử lý
                        </option>
                        <option
                          value="1"
                          selected={
                            this.statusNowOrder.status == 1 ? true : false
                          }
                        >
                          Xác nhận đơn
                        </option>
                        <option
                          value="2"
                          selected={
                            this.statusNowOrder.status == 2 ? true : false
                          }
                        >
                          Hủy đơn
                        </option>
                      </select>
                    </div>
                    <div className="col-4 px-0">
                    <span className="font float-left mr-2">
                            Thời gian
                          </span>
                          <span className="font">
                            {unixToTime(this.statusNowOrder.time)}
                          </span>
                     {/*  <div className="row  align-items-center">
                        <div className="col-6 px-0">
                          <span className="font float-left mr-2">
                            Thời gian
                          </span>
                          <span className="font">
                            {unixToTime(this.statusNowOrder.time)}
                          </span>
                        </div>
                        <div className="col-6 px-0">
                          <input
                            type="text"
                            className="w-100 form-control font"
                            style={{}}
                            placeholder="ghi chú"
                            value={this.statusNowOrder.name}
                            onChange={e => {
                              this.statusNowOrder.name = e.target.value
                            }}
                          />
                        </div> 
                      </div>
                   </div> 
                  </div>*/}
                </div>
              </div>
              {this.statusNowOrder.status == 1 ? (
                <div className="row  pb-3">
                  <div className="col-2">
                    <span className="font  pt-2 d-block">
                      Giao hàng
                    </span>
                  </div>
                  <div className="col-10">
                    <table className="table table-bordered table-sm">
                      <tbody>
                        {this.data.statusShip.map((item, index) => {
                          return (
                            <tr style={{lineHeight: "35px"}}>
                              <th scope="row">
                                {item.status == 0
                                  ? 'Đang giao hàng'
                                  : item.status == 1
                                  ? 'Đã nhận'
                                  : item.status == 2
                                  ? 'Hủy đơn'
                                  : item.status == 3
                                  ? 'Đang chờ xử lý'
                                  : null}
                              </th>
                              <td>{unixToTime(item.time)}</td>
                              <td>{item.name}</td>
                              <td style={{ maxWidth: 20 }}>
                                <img
                                  onClick={() => {
                                    // callBack('DEL_ITEM', { index, item })
                                    this.data.statusShip.splice(index, 1)
                                  }}
                                  className="cursor"
                                  style={{ width: 25 }}
                                  src="../../../static/images/remove.png"
                                />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>

                    <div className="row align-items-center">
                      <div className="col-3 px-0">
                        <select
                          type="text"
                          className="w-75 custom-select font"
                          onChange={e => {
                            this.statusNowShip.time = getTimeNow()
                            this.statusNowShip.status = e.target.value
                          }}
                        >
                          <option value="3">Đang chờ xử lý</option>
                          <option value="0">Đang giao</option>
                          <option value="1">Đã nhận</option>
                          <option value="2">Hủy đơn</option>
                        </select>
                      </div>
                      <div className="col-9 px-0">
                        <div className="row  align-items-center">
                          <div className="col-5 px-0">
                            <span className="font float-left mr-2">
                              Thời gian
                            </span>
                            <span className="font">
                              {this.statusNowShip.time}
                            </span>
                          </div>
                          <div className="col-5 px-0">
                            <input
                              type="text"
                              className="w-100 form-control font"
                              style={{}}
                              placeholder="ghi chú"
                              value={this.statusNowShip.name}
                              onChange={e => {
                                this.statusNowShip.name = e.target.value
                              }}
                            />
                          </div>
                          <div className="col-2 pr-0">
                            <button
                              onClick={() => {
                                this.data.statusShip.push({
                                  name: this.statusNowShip.name,
                                  time: unitTimeNow(),
                                  status: this.statusNowShip.status
                                })
                              }}
                              className="bgDefault colorWhite p-2 px-3 rounded cursor w-100"
                            >
                              Thêm
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
               </div>
               {this.data.message && this.data.message !== '' ? (
               <div style={{boxShadow: 'rgb(199, 199, 199) 0px 0px 5px', background: '#fff'}}>
                <h5 className="bgDefault colorWhite p-3 mb-0">Ghi chú của khách hàng</h5>
                  <input
                    type="text"
                    className="w-100 form-control font"
                    style={{height: 50}}
                    value={this.data.message}
                    onChange={e => {
                      this.data.message = e.target.value
                    }}
                  />
               
              </div>)
              : null}
              <div className="row justify-content-center my-4">
                {this.getAllUrl != undefined && this.getAllUrl != '' ? (
                  <button
                    className="bgDefault colorWhite py-3 px-4 rounded cursor"
                    onClick={() => {
                      console.log(
                        this.statusNowOrder.status +
                          '-----' +
                          this.props.data.statusOrder[
                            this.data.statusOrder.length - 1
                          ].status
                      )
                      if (
                        this.statusNowOrder.status !==
                        this.data.statusOrder[this.data.statusOrder.length - 1]
                          .status
                      ) {
                        this.data.statusOrder.push({
                          name: this.statusNowOrder.name,
                          time: unitTimeNow(),
                          status: this.statusNowOrder.status
                        })
                      }

                      callBack('UPDATE', this.data)
                    }}
                  >
                    Chỉnh sửa
                  </button>
                ) : (
                  <button className="bgDefault colorWhite py-3 px-4 rounded cursor">
                    Lưu
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
