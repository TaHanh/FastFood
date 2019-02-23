import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../../routes/routes';
import ReactHtmlParser from 'react-html-parser';
@inject('store')
@observer
class Item extends React.Component {
  render() {
    const { index, item, callBack } = this.props;
    return (
      <tr>
        <td>
          <span
            className="d-block"
            style={{
              maxWidth: '100px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              height: '16px',
              lineHeight: '16px'
            }}
            title={item.id || ''}
          >
            {item.id || ''}
          </span>
        </td>
        <td
          className=""
          // onClick={() => {
          //   callBack('CLICK_ITEM', { index, item });
          // }}
        >
          <Link href={{ pathname: '/admin/detail-product', query: { id: item.id } }}>
            <a className="colorDefault cursor" style={{ textDecoration: 'none' }}>
              {item.name || ''}
            </a>
          </Link>
        </td>
        <td> {item.highlight == 0 ? 'true' : 'false'} </td>
        <td style={{}}>
          {item.image.map(e => {
            return (
              <p
                className="mb-1"
                style={{
                  maxWidth: '200px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  height: '16px',
                  lineHeight: '16px'
                }}
              >
                {e}
              </p>
            );
          })}
        </td>
        <td>{item.price}</td>
        <td style={{}}>
          {item.type.map(e => {
            return (
              <p className="mb-1" style={{}}>
                {' '}
                {e}{' '}
              </p>
            );
          })}
        </td>
        <td>{item.status == 0 ? 'Còn hàng' : 'Hết hàng'}</td>
        <td>
          <p
            className="mb-0"
            style={{
              maxWidth: '200px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              height: '40px',
              lineHeight: '16px'
            }}
          >
            {ReactHtmlParser(item.description)}
          </p>
        </td>
        <td>
          {this.props.store.dataCategory.map((e, i) => {
            if (e.key == item.category) return e.name;
          })}
        </td>
        <td>
          <img
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={() => {
              this.props.clickItem({ item, index });
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
export default class ListProductComponent extends React.Component {
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
          <div className="py-4 font">
            <div className="px-5">
              <button className="bgDefault  p-2 px-3 rounded cursor">
                <Link route="/admin/detail-product">
                  <a className="colorWhite" style={{ textDecoration: 'none' }}>
                    Thêm món
                  </a>
                </Link>
              </button>
              <div className="row pt-4">
                <div className="col-6 px-0">
                  <div className="row  align-items-center mb-3 ">
                    <div className="col-3 px-0">
                      <span className="font">Tên sản phẩm</span>
                    </div>
                    <div className="col-9">
                      <input type="text" className="w-75 form-control font" style={{}} />
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
                <div className="col-6">
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
                </div>
              </div>
              <div className="row justify-content-end mb-4 pr-5">
                <button className="bgDefault colorWhite p-2 px-3 rounded cursor">Tìm kiếm</button>
              </div>
            </div>
            <table className="table table-bordered text-center font">
              <thead className="thead-light">
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
                {this.props.store.dataProducts.map((item, index) => {
                  return (
                    <Item
                      item={item}
                      index={index}
                      callBack={callBack}
                      clickItem={({ item, index }) => {
                        this.clickItem = { item: item, index: index };
                      }}
                    />
                  );
                })}
                {this.props.store.dataProducts.length == 0 ? (
                  <td colspan="10">Không có dữ liệu</td>
                ) : null}
              </tbody>
            </table>

            {/* <!-- Modal --> */}
            <div
              ref="myModal"
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      Modal title
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">Bạn có chắc chắn muốn xóa sản phẩm này !</div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                      Close
                    </button>
                    <button
                      onClick={() => {
                        this.props.callBack('DEL_ITEM', this.clickItem);
                      }}
                      data-dismiss="modal"
                      type="button"
                      class="btn btn-primary"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
