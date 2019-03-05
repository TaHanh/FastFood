import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
import LoadComponent from '../general/LoadComponent'
import { intentPageString, intentPage } from '../../utils/RouterUtils'
@inject('store')
@observer
export default class ItemProductComponent extends React.Component {
  @observable isRender = false
  constructor(props) {
    super(props)
  }

  render() {
    const { item, index } = this.props
    return (
      <div className="product-item w-100 m-auto text-center">
        <div className="product-item-cover">
          <Link href={{ pathname: '/detail-products', query: { id: item.id } }}>
            <img src={item.image[0] || '../../static/images/logo.png'} />
          </Link>
        </div>
        <div className="text-center px-1">
          <Link href={{ pathname: '/detail-products', query: { id: item.id } }}>
            <p className="my-2">{item.name}</p>
          </Link>
          <p className="mb-1" style={{ color: 'red' }}>
            {item.price}
          </p>
        </div>
        <button
          className="cursor py-2 w-100"
          onClick={() => {
            if (item.type && item.type.length > 0) {
              intentPageString('/detail-products?id=' + item.id)
            } else {
              this.props.callBack('ADD_CART', { item, index })
            }
          }}
        >
          <small>Thêm vào giỏ</small>
        </button>
      </div>
    )
  }
}
