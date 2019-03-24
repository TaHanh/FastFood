import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { intentPageString } from '../../utils/RouterUtils'
import { Link, Router } from '../../routes/routes'
import LoadComponent from '../general/LoadComponent'
import ItemProductComponent from '../products/ItemProductComponent'
import '../products/products.scss'
import './home.scss'

@observer
class Item extends React.Component {
  @observable isRender = false
  constructor(props) {
    super(props)
  }

  render() {
    const { item, index } = this.props
    return (
      <div className="col-3 product-item-home mb-4" style={{ height: 200 }}>
        <div
          className="product-item-cover "
          style={{ height: '100%', width: '100%' }}
        >
          <Link href={{ pathname: '/detail-products', query: { id: item.id } }}>
            <img
              className="cursor"
              src={item.image[0] || '../../static/images/bannerHome.jpg'}
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </Link>
        </div>
        <div className="row product-item-txt w-100 pr-4">
          <div className="col-8">
            <h5 className="font-weight-bold  cursor">
              <Link
                href={{ pathname: '/detail-products', query: { id: item.id } }}
              >
                <a className="colorWhite" style={{ textDecoration: 'none' }}>
                  {item.name}
                </a>
              </Link>
            </h5>

            <p className="colorWhite">{item.price}đ</p>
          </div>
          <div className="col-4 align-self-center text-right">
            <button
              className="cursor"
              onClick={() => {
                if (item.type && item.type.length > 0) {
                  intentPageString('/detail-products?id=' + item.id)
                } else {
                  this.props.callBack('ADD_CART', { item, index })
                }
              }}
            >
              <img
                style={{ width: 25, height: 25 }}
                src="../../static/images/icons-add-shopping-cart.png"
                title="Thêm vào giỏ"
              />
              {/* <small className="">Thêm vào giỏ</small> */}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

@inject('store')
@observer
export default class HomeComponent extends React.Component {
  @observable isRender = false
  @observable data = []

  constructor(props) {
    super(props)
    this.isRender = true
    this.data = this.props.data
  }

  render() {
    return (
      <div className="product w-100">
        {this.isRender ? (
          <div className="">
            <div className="limit">
              <div className="mx-4 my-3">
                {this.props.dataFavourite.length > 0 ? (
                  <h4 style={{ color: 'red' }}>Sản phẩm được yêu thích</h4>
                ) : null}
              </div>
              <div className="row pb-3">
                {this.props.dataFavourite.map((e, i) => {
                  return (
                    <Item item={e} index={i} callBack={this.props.callBack} />
                  )
                })}
              </div>
            </div>

            <div className="limit">
              {this.data.map((item, index) => {
                if (item.data && item.data.length > 0)
                  return (
                    <div>
                      <div className="mx-4">
                        <h4>{item.title}</h4>
                        <hr className="my-1" />
                      </div>
                      <div className="row py-3">
                        {item.data.map((e, i) => {
                          if (i < 10)
                            return (
                              <div className="p-3" style={{ width: '20%' }}>
                                <ItemProductComponent
                                  item={e}
                                  index={i}
                                  callBack={this.props.callBack}
                                />
                              </div>
                            )
                          return null
                        })}
                      </div>
                      {item.data.length > 10 ? (
                        <div className="view-more mr-5 mb-4 text-right">
                          <Link
                            route={'/products/' + item.query}
                            // href={{ pathname: item.query.pathname, query: { name: item.query.name } }}
                          >
                            <a>
                              <i className="colorDefault">Xem thêm</i>
                            </a>
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  )
                return null
              })}
            </div>
          </div>
        ) : (
          <LoadComponent />
        )}
      </div>
    )
  }
}
