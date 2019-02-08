import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../../routes/routes';
import './order.scss';
@inject('store')
@observer
class Item extends React.Component {
  render() {
    const { index, item, callBack } = this.props;
    return (
      <tr>
        <td>Mark</td>
        <td
          className=""
          // onClick={() => {
          //   callBack('CLICK_ITEM', { index, item });
          // }}
        >
          <Link href={{ pathname: '/admin/detail-product', query: { id: item.id } }}>
            <a className="colorDefault cursor" style={{ textDecoration: 'none' }}>
              Otto
            </a>
          </Link>
        </td>
        <td>@mdo</td>
        <td>@mdo</td>
        <td>@mdo</td>
        <td>@mdo</td>
        <td>@mdo</td>
        <td>@mdo</td>
        <td>@mdo</td>
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
          <div className="py-4">
            <div className="px-5">
              <div className="row pt-4">
                <div className="col-5 px-0">
                  <div className="row  align-items-center mb-3 ">
                    <div className="col-3 px-0">
                      <span className="font">Tên sản phẩm</span>
                    </div>
                    <div className="col-9">
                      <input type="text" className="w-75 form-control font" style={{}} />
                    </div>
                  </div>
                  <div className="row  align-items-center mb-3 ">
                    <div className="col-3 px-0">
                      <span className="font">Tên sản phẩm</span>
                    </div>
                    <div className="col-9">
                      <input type="text" className="w-75 form-control font" style={{}} />
                    </div>
                  </div>
                </div>
                <div className="col-7">
                  <div className="row  align-items-center">
                    <div className="col-4">
                      <span className="font">Loại hàng</span>
                    </div>
                    <div className="col-8">
                      <select type="text" className="w-75 custom-select font">
                        {this.props.store.dataCategory.map((item, index) => {
                          return <option value={item.key}>{item.name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row  align-items-center">
                    <div className="col-3 px-0">
                      <span className="font">Trạng thái</span>
                    </div>
                    <div className="col-9">
                      <select type="text" className="w-75 custom-select font">
                        <option value="exist ">Còn hàng</option>
                        <option value="over ">Hết hàng</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end mb-4 pr-5">
                <button className="bgDefault colorWhite p-2 px-3 rounded cursor">Tìm kiếm</button>
              </div>
            </div>
            <table class="table table-bordered text-center font">
              <thead class="thead-light">
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Tên SP</th>
                  <th scope="col">Hot</th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Phân loại hàng</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Mô tả</th>
                  <th scope="col">Danh mục</th>
                  <th scope="col">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {['3', '4'].map((item, index) => {
                  return <Item item={item} index={index} callBack={callBack} />;
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }
}
