import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
import {
  intentPageString,
  getPathName,
  intentPage
} from '../../utils/RouterUtils'
import '../general/style.scss'
import './header.scss'
@inject('store')
@observer
export default class HeaderComponent extends React.Component {
  @observable isRender = false
  @observable path = ''
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.path = getPathName()
    this.isRender = true
    if (localStorage.getItem('userFF')) {
      console.log(JSON.parse(localStorage.userFF))
      this.props.store.user = JSON.parse(localStorage.userFF)
    }
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
      <div className="row justify-content-between header w-100 font">
        <div className="col-10">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand colorWhite p-0" href="/">
              <img
                style={{ width: 100, height: 60, objectFit: 'contain' }}
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
                        <Link href={item.directional}>
                          <a
                            key={index}
                            className={
                              item.active
                                ? 'nav-link cursor colorDefault dropdown-toggle'
                                : 'nav-link cursor colorWhite dropdown-toggle'
                            }
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {item.name}
                          </a>
                        </Link>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          {item.children.map((e, i) => {
                            return (
                              <Link
                                href={{
                                  pathname: '/products/' + e.key
                                }}
                              >
                                <a className="dropdown-item">{e.name}</a>
                              </Link>
                            )
                          })}
                        </div>
                      </li>
                    )
                  }
                  return (
                    <Link href={item.directional}>
                      <a
                        key={index}
                        className={
                          item.active
                            ? 'nav-link cursor colorDefault '
                            : 'nav-link cursor colorWhite '
                        }
                      >
                        {item.name}
                      </a>
                    </Link>
                  )
                })}
              </ul>
            </div>
          </nav>
        </div>
        <div className="col-2" style={{ alignSelf: 'center' }}>
          {this.path == '/login' || this.path == '/signup' ? null : (
            <div className="row">
              <div className="col-4">
                <div
                  className="cart float-left"
                  style={{ width: 30, position: 'relative' }}
                >
                  <img
                    src="../../static/images/shopping-cart-2.png"
                    className="pt-2 cursor"
                    style={{ width: '100%' }}
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
                        <Link route="/order">
                          <button
                            className="cursor colorWhite px-3  d-block bgDefault float-right"
                            style={{ height: '35px' }}
                          >
                            Xem giỏ hàng
                          </button>
                        </Link>
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
              <div className="col-8" style={{ alignSelf: 'center' }}>
                {this.props.store.user ? (
                  <div
                    className="cart user float-left cursor rounded-circle mt-2"
                    style={{
                      width: 30,
                      position: 'relative',
                      background: '#fff'
                    }}
                  >
                    {this.props.store.user.avatar ? (
                      <img
                        src={this.props.store.user.avatar}
                        className="p-1"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      <img
                        src="../../static/images/ava.jpg"
                        className="p-1"
                        style={{ width: '100%' }}
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
                            <a class="nav-link">Hồ sơ</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link">Lịch sử giao dịch</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link">Đăng xuất</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    class="btn btn-outline-light"
                    onClick={() => {
                      intentPage('/login')
                    }}
                  >
                    Đăng nhập
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
