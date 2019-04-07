import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
import LoadComponent from '../general/LoadComponent'
import ItemProductComponent from '../products/ItemProductComponent'
import './order.scss'

@inject('store')
@observer
export default class OrderComponent extends React.Component {
  @observable isRender = false
  @observable data = []
  @observable user = {}
  @observable total = 0

  constructor(props) {
    super(props)
    this.isRender = true
    this.data = this.props.data
    this.user = this.props.user
  }
  componentDidMount() {}
  totalPrice = () => {
    let total = 0
    this.data.map((item, index) => {
      total += item.price * item.amount
    })
    return total
  }
  changeInput = data => {
    const { value, name } = data.target
    // alert(JSON.stringify(this.data));
    this.user[name] = value
  }
  render() {
    return (
      <div className="product w-100">
        {this.isRender ? (
          <div className="limit px-lg-5">
            <div className="py-3">
              <h5>Thông tin sản phẩm</h5>
              <hr className="my-1" />
            </div>
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Phân loại hàng</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Thành tiền</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {this.data.map((item, index) => {
                  return (
                    <tr>
                      <th scope="row">
                        <div className="row">
                          <a
                            href={{
                              pathname: '/detail-products',
                              query: { id: item.id }
                            }}
                          >
                            <img
                              className="float-left mr-3 cursor"
                              src=""
                              style={{
                                width: '100%',
                                maxWidth: 60,
                                height: 45,
                                objectFit: 'contain'
                              }}
                              src={
                                item.image[0] || '../../static/images/logo.png'
                              }
                            />
                          </a>
                          <div className="">
                           
                              <a href={{
                                pathname: '/detail-products',
                                query: { id: item.id }
                              }}
                                className="cursor colorDefault"
                                style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  maxWidth: '100%',
                                  whiteSpace: 'nowrap',
                                  display: 'inline-block',
                                  textDecoration: 'none'
                                }}
                              >
                                {item.name}
                              </a>
                            <br />
                            <small>Đơn gía : {item.price}đ</small>
                          </div>
                        </div>
                      </th>
                      <td className="text-center">
                        {item.typeSize ? (
                          <select
                            type="text"
                            className="w-75  font"
                            name="status"
                            onChange={e => {
                              const { value, name } = e.target
                              item.typeSize.forEach(element => {
                                if (value == element.name) {
                                  element.status = true
                                } else {
                                  element.status = false
                                }
                              })
                            }}
                          >
                            {item.typeSize.map(e => {
                              return (
                                <option
                                  selected={e.status ? true : false}
                                  value={e.name}
                                >
                                  {e.name}
                                </option>
                              )
                            })}
                          </select>
                        ) : null}{' '}
                      </td>
                      <td className="text-center">
                        <input
                          type="number"
                          min={0}
                          value={item.amount}
                          className="p-1"
                          onChange={data => {
                            // this.changeInput(e);
                            const { value, name } = data.target
                            this.data[index].amount = value
                            this.totalPrice()
                          }}
                          style={{
                            width: '100px',
                            border: '1px solid rgb(180, 180, 180)'
                          }}
                        />
                      </td>
                      <td className="text-center">
                        <span style={{ color: 'red' }}>
                          {item.price * item.amount}đ
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="cursor colorWhite mt-1"
                          style={{ backgroundColor: 'red' }}
                          onClick={() => {
                            this.props.callBack('DEL_CART', { item, index })
                          }}
                        >
                          <small>Xoá</small>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <h5>
              <b>
                Tổng thành tiền:{' '}
                <span style={{ color: 'red' }}>{this.totalPrice()}đ</span>
              </b>
            </h5>
            <div className=" pt-5">
              <div>
                <h5>Thông tin thanh toán</h5>
                <hr className="my-1" />
              </div>
              <div className="row py-3">
                <div className="col-8 px-0">
                  <div className="row mb-2">
                    <div className="col-lg-2 px-0">Họ và tên</div>
                    <div className="col-lg-10">
                      <input
                        name="name"
                        value={this.user.name}
                        onChange={e => {
                          this.changeInput(e)
                        }}
                        type="text"
                        className="w-75 p-1"
                        style={{
                          borderRadius: 5,
                          border: '1px solid rgb(180, 180, 180)'
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-lg-2 px-0">Số điện thoại</div>
                    <div className="col-lg-10">
                      <input
                        name="phone"
                        value={this.user.phone}
                        onChange={e => {
                          this.changeInput(e)
                        }}
                        type="text"
                        className="w-75 p-1"
                        style={{
                          borderRadius: 5,
                          border: '1px solid rgb(180, 180, 180)'
                        }}
                      />
                    </div>
                  </div>{' '}
                  <div className="row mb-2">
                    <div className="col-lg-2 px-0">Địa chỉ</div>
                    <div className="col-lg-10">
                      <input
                        name="address"
                        value={this.user.address}
                        onChange={e => {
                          this.changeInput(e)
                        }}
                        type="text"
                        className="w-100 p-1"
                        style={{
                          borderRadius: 5,
                          border: '1px solid rgb(180, 180, 180)'
                        }}
                      />
                    </div>
                  </div>{' '}
                  <div className="row mb-2">
                    <div className="col-lg-2 px-0">Email</div>
                    <div className="col-lg-10">
                      <input
                        name="email"
                        value={this.user.email}
                        onChange={e => {
                          this.changeInput(e)
                        }}
                        type="text"
                        className="w-75 p-1"
                        style={{
                          borderRadius: 5,
                          border: '1px solid rgb(180, 180, 180)'
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2 px-0">Lời nhắn</div>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        name="message"
                        value={this.user.message}
                        onChange={e => {
                          this.changeInput(e)
                        }}
                        className="w-100 p-1"
                        style={{
                          borderRadius: 5,
                          border: '1px solid rgb(180, 180, 180)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              {/* <Link route="/order"> */}
              <button
                className="cursor py-2 px-4 bgDefault rounded"
                onClick={() => {
                  this.props.callBack('BUY_PRODUCTS', {
                    user: this.user,
                    product: this.data
                  })
                }}
              >
                <span className="colorWhite">Mua ngay</span>
              </button>
              {/* </Link> */}
            </div>
          </div>
        ) : (
          <LoadComponent />
        )}
      </div>
    )
  }
}
