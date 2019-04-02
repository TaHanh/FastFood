import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
import LoadComponent from '../general/LoadComponent'
import ItemProductComponent from '../products/ItemProductComponent'
import './order.scss'

@inject('store')
@observer
export default class PurchaseComponent extends React.Component {
  @observable isRender = false
  @observable data = []
  @observable list = [
    {
      name: 'Chờ lấy hàng',
      key: 'waiting'
    },
    {
      name: 'Đang giao',
      key: 'ordering'
    },{
      name: 'Đã nhận',
      key: 'receive'
    },{
      name: 'Đã hủy',
      key: 'cancel'
    },
  ]
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
  changeData = (key) => {
  
  }
  render() {
    return (
      <div className="purchase w-100">
      <div>
        <ul className="nav">
          {this.list.map(l => {
            return <li onClick={()=>{
this.changeData(item.key)
            }}>{l.name}</li>
          })}
         
          </ul>
      </div>
        {this.isRender ? this.data && this.data.length > 0 ? (
         <div>
           {this.data.map(e =>{
             return <div>name</div>
           })}
           </div>
        ) : <div style={{}}>
          <img src="../../static/pen.png" style={{width: '100px', height: '100px',     objectFit: 'contain'}} />
        </div> : (
          <LoadComponent />
        )}
      </div>
    )
  }
}
