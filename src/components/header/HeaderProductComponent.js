import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
import '../general/style.scss'
import './header.scss'
import { intentPage } from '../../utils/RouterUtils'
import { getCustomer } from '../../api/Customer'
@inject('store')
@observer
export default class HeaderProductComponent extends React.Component {
  @observable isRender = false
  @observable dataMenu = []
  @observable textSearch = ''
  constructor(props) {
    super(props)
    this.isRender = true
  }
  componentDidMount() {
    this.props.store.checkUser('customer', () => {})

    if (localStorage.getItem('myCartFF')) {
      this.props.store.myCart = JSON.parse(localStorage.myCartFF)
    }
  }
  delMyProduct = data => {
    this.props.store.myCart.splice(data.index, 1)
    localStorage['myCartFF'] = JSON.stringify(this.props.store.myCart)
  }
  render() {
    return (
      <div className="row justify-content-between headerProduct w-100">
        <div className="col-7">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a href="/" className="navbar-brand colorWhite p-0">
              <img
                style={{ width: 'auto', height: '35px', objectFit: 'contain' }}
                src="../../static/images/logo.png"
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {this.props.store.dataMenu.map((item, index) => {
                  if (item.children && item.children.length > 0) {
                    return (
                      <li className="menu" style={{ position: 'relative' }}>
                        <a
                          href={item.directional}
                          key={index}
                          className={
                            item.active
                              ? 'nav-link cursor colorDefault dropdown-toggle'
                              : 'nav-link cursor colorBlack dropdown-toggle'
                          }
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {item.name}
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          {item.children.map((e, i) => {
                            return (
                              <a
                                href={'/products/' + e.key}
                                className="dropdown-item"
                              >
                                {e.name}
                              </a>
                            )
                          })}
                        </div>
                      </li>
                    )
                  }
                  return (
                    <a
                      href={item.directional}
                      key={index}
                      className={
                        item.active
                          ? 'nav-link cursor colorDefault '
                          : 'nav-link cursor colorBlack '
                      }
                    >
                      {item.name}
                    </a>
                  )
                })}
              </ul>
            </div>
          </nav>
        </div>
        <div className="col-5" style={{ alignSelf: 'center' }}>
          <div className="row">
            <div className="col-7" style={{ alignSelf: 'center' }}>
              <div
                className="float-left mr-3 w-100"
                style={{ position: 'relative' }}
              >
                <input
                  className="w-100 input borderR p-1 my-2"
                  type="text"
                  placeholder="Bạn tìm gì ?"
                  style={{ height: 30, border: '1px solid #b4b4b4' }}
                  onChange={e => {
                    this.textSearch = e.target.value
                  }}
                  onKeyPress={({ charCode }) => {
                    if (charCode === 13) {
                      this.props.callBack('SEARCH', this.textSearch)
                    }
                  }}
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
                  onClick={() => {
                    this.props.callBack('SEARCH', this.textSearch)
                  }}
                />
              </div>
            </div>
            <div className="col-2" style={{ alignSelf: 'center' }}>
              <div
                className="cart float-left"
                style={{ width: 30, position: 'relative' }}
              >
                <img
                  src="../../static/images/shopping-cart-1.png"
                  className="pt-2 cursor"
                  style={{ width: '100%', filter: 'contrast(160%)' }}
                />
                <span
                  className="badge rounded-circle"
                  style={{
                    backgroundColor: 'red',
                    color: '#fff',
                    position: 'absolute',
                    right: -10,
                    top: 5
                  }}
                >
                  <small>
                    {this.props.store.myCart
                      ? this.props.store.myCart.length
                      : 0}
                  </small>
                </span>
                {this.props.store.myCart.length > 0 ? (
                  <div className="myCart font">
                    <img
                      style={{
                        width: 30,
                        height: 30,
                        position: 'absolute',
                        right: '28px',
                        top: '-20px'
                      }}
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
                      {this.props.store.myCart.map((item, index) => {
                        return (
                          <div className="row">
                            <div className="col-2 px-0 mb-2">
                              <img
                                className="cursor"
                                style={{
                                  width: '100%',
                                  height: '35px',
                                  objectFit: 'cover'
                                }}
                                src={
                                  item.image[0] ||
                                  '../../static/images/logo.png'
                                }
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
                                {item.name}
                              </span>
                              <br />
                              <small>
                                {item.typeSize
                                  ? item.typeSize.find(e => e.status == true)
                                      .name
                                  : null}
                              </small>
                            </div>
                            <div className="col-3 px-0 mb-2">
                              <p className="mb-0">
                                {item.price}đ{' '}
                                <small> x {item.amount || 1}</small>
                              </p>
                              <button
                                onClick={() => {
                                  this.delMyProduct({ item, index })
                                }}
                                className="cursor colorWhite mt-1"
                                style={{ backgroundColor: 'red' }}
                              >
                                <small>Xoá</small>
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="row justify-content-end mx-3 my-2">
                      <a href="/order">
                        <button
                          className="cursor colorWhite px-3  d-block bgDefault float-right"
                          style={{ height: '35px' }}
                        >
                          Xem giỏ hàng
                        </button>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="myCart">
                    <div
                      style={{
                        height: '150px',

                        border: '1px solid #b5b5b5'
                      }}
                    >
                      <img
                        className=""
                        style={{
                          width: 100,
                          height: 100,
                          marginTop: 10,
                          marginLeft: 150
                        }}
                        src="../../static/images/bag.png"
                      />
                      <p className="text-center my-2">Chưa có sản phẩm nào</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-3" style={{ alignSelf: 'center' }}>
              {this.props.store.user ? (
                <div
                  className="cart user float-left cursor rounded-circle mt-2"
                  style={
                    this.props.store.user.avatar
                      ? {
                          width: 40,
                          height: 40,
                          position: 'relative',
                          background: '#fff'
                          // backgroundImage: `url(${'../../static/images/ava.jpg'})`
                          // backgroundImage: `url(${
                          //   this.props.store.user.avatar
                          // })`
                        }
                      : {
                          width: 40,
                          height: 40,
                          position: 'relative'
                          // background: '#fff',
                          // backgroundImage: `url(${'../../static/images/ava.jpg'})`
                        }
                  }
                >
                  {this.props.store.user.avatar ? (
                    <img
                      src={this.props.store.user.avatar}
                      className="p-1 rounded-circle"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <img
                      src="../../static/images/ava.jpg"
                      className="p-1 rounded-circle"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  {/* <span
                className="badge rounded-circle"
                style={{
                  backgroundColor: 'red',
                  color: '#fff',
                  position: 'absolute',
                  right: -10,
                  top: 5
                }}
              >
                <small>{this.props.store.myCart ? this.props.store.myCart.length : 0}</small>
              </span> */}
                  <div
                    className="font userShow"
                    style={{
                      position: 'absolute',
                      top: '45px',
                      right: '0px',
                      width: '200px',
                      background: 'rgb(255, 255, 255)',
                      borderRadius: '5px',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'grey',
                      borderImage: 'initial'
                    }}
                  >
                    <img
                      style={{
                        width: 30,
                        height: 30,
                        position: 'absolute',
                        right: '-1px',
                        top: '-20px'
                      }}
                      src="../../static/images/icons-sort-up.png"
                    />
                    <div
                      style={{
                        padding: '8px 16px'
                      }}
                    >
                      <ul class="nav flex-column">
                        <li class="nav-item">
                          <a href="/user/profile" class="nav-link">
                            Hồ sơ
                          </a>
                        </li>
                        <li class="nav-item">
                          <a href="/user/purchase" class="nav-link">
                            Lịch sử giao dịch
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            href="/login"
                            class="nav-link"
                            onClick={() => {
                              this.props.store.logout('customer', () => {})
                            }}
                          >
                            Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  class="btn btn-outline-dark"
                  onClick={() => {
                    intentPage('/login')
                  }}
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
