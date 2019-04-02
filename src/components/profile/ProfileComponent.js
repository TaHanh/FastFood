import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
import LoadComponent from '../general/LoadComponent'
import ItemProductComponent from '../products/ItemProductComponent'
import './order.scss'

@inject('store')
@observer
export default class ProfileComponent extends React.Component {
  @observable isRender = false
  @observable data = []
  @observable user = {}
  @observable total = 0

  constructor(props) {
    super(props)
    this.isRender = true
    this.user = this.props.store.user
  }
  componentDidMount() {}

  changeInput = data => {
    const { value, name } = data.target
    let newState = this.user

    // alert(JSON.stringify(this.data));
    newState[name] = value
    this.user = newState
  }
  render() {
    return (
      <div className="profile w-100">
        <div className="">
          <div className="py-3">
            <h5>Hồ sơ của tôi</h5>
            <hr className="my-1" />
          </div>
          {this.isRender ? (
            <div className="row mb-5">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-3">Email</div>
                  <div className="col-9">
                    <input
                      name="email"
                      type="text"
                      value={this.user.email}
                      onChange={this.changeInput}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">Số điện thoại</div>
                  <div className="col-9">
                    <input
                      name="phone"
                      type="text"
                      value={this.user.phone}
                      onChange={this.changeInput}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">Tên</div>
                  <div className="col-9">
                    <input
                      name="name"
                      type="text"
                      value={this.user.name}
                      onChange={this.changeInput}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4" >
              <div className="w-50">
              <img src={this.user.avatar ? this.user.avatar : "../../static/images/ava.jpg"} className="rounded-circle" style={{width: '100px', height: '100px', objectFit: 'cover'}} /></div>
              </div>
              <input type="file" style={{ visibility: 'hidden'}} ref="upAva" />
              <button type="button" class="btn btn-outline-info" onClick={()=>{this.ref.upAva.open()}}>Thay ảnh</button>
              <button
                className="cursor py-2 px-4 bgDefault rounded"
                onClick={() => {
                  this.props.callBack('SAVE_PROFILE', this.user)
                }}
              >
                <span className="colorWhite">Lưu thay đổi</span>
              </button>
            </div>
          ) : (
            <LoadComponent />
          )}
        </div>
      </div>
    )
  }
}
