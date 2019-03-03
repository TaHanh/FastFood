import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../../routes/routes';
import { ContentState, convertToRaw, EditorState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './product.scss';
import { Editor } from 'react-draft-wysiwyg';
import './react-draft-wysiwyg.scss';
import { upLoad } from '../../../api/upLoad';
@inject('store')
@observer
export default class DetailProductComponent extends React.Component {
  @observable typeProduct = [];
  @observable editorState = '';
  @observable data = {};
  @observable size = '';
  @observable image = '';
  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.addImg = React.createRef();
    // console.log('this.data' + JSON.stringify(this.data));
    // const contentBlock = htmlToDraft(this.data.description);
    // if (contentBlock) {
    //   const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    //   const editorState = EditorState.createWithContent(contentState);
    //   this.editorState = editorState;
    // }
    // this.data.description === ''
    //   ? (this.editorState = EditorState.createEmpty())
    //   : (this.editorState = EditorState.createWithContent(
    //       ContentState.createFromBlockArray(convertFromHTML(this.data.description))
    //     ));
  }
  componentDidMount() {
    // this.editorState = this.data.description;
  }
  changeInput = data => {
    const { value, name } = data.target;
    switch (name) {
      case 'highlight':
        this.data.highlight = !this.data.highlight;
        break;
      case 'status':
        if (value == 0) {
          this.data.status = 0;
        } else {
          this.data.status = 1;
        }
        break;
      case 'size':
        this.size = value;
        break;
      // case 'category':
      //   this.data.category = this.props.store.dataCategory.find(e => e.key == value);
      //   break;
      default:
        this.data[name] = value;
        break;
    }
  };
  onEditorStateChange = editorState => {
    // this.editorState = editorState;
    // this.data.description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  render() {
    const { callBack } = this.props;
    return (
      <div className="py-4 detail-product">
        <div className="px-4 font">
          {/* <button className="bgDefault  p-2 px-3 rounded cursor">
                <Link route="/admin/detail-product">
                  <a className="colorWhite" style={{ textDecoration: 'none' }}>
                    Thêm món
                  </a>
                </Link>
              </button> */}
          <div className="row align-items-center mb-3 ">
            <div className="col-2">
              <span className="font">Tên sản phẩm</span>
            </div>
            <div className="col-10">
              <input
                name="name"
                type="text"
                value={this.data.name}
                className="w-75 form-control font"
                style={{}}
                onChange={e => {
                  this.changeInput(e);
                }}
              />
            </div>
          </div>
          <div className="row  align-items-center mb-3">
            <div className="col-2">
              <span className="font">Giá sản phẩm</span>
            </div>
            <div className="col-10">
              <div className="row align-items-center">
                <div className="col-5 px-0">
                  <input
                    name="price"
                    type="text"
                    value={this.data.price}
                    onChange={e => {
                      this.changeInput(e);
                    }}
                    className="w-75 form-control font"
                    style={{}}
                  />
                </div>
                <div className="col-7">
                  <label className="check mr-2 ml-3">
                    <input
                      type="checkbox"
                      name="highlight"
                      checked={this.data.highlight}
                      onChange={e => {
                        this.changeInput(e);
                      }}
                    />
                    <div className="box" />
                  </label>
                  <span>Nổi bật</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row  align-items-center mb-3">
            <div className="col-2">
              <span className="font">Trạng thái</span>
            </div>
            <div className="col-10">
              <div className="row align-items-center">
                <div className="col-5 px-0">
                  <select
                    type="text"
                    className="w-75 custom-select font"
                    name="status"
                    onChange={e => {
                      this.changeInput(e);
                    }}
                  >
                    <option selected={this.data.status == 0 ? true : false} value="0">
                      Còn hàng
                    </option>
                    <option selected={this.data.status == 1 ? true : false} value="1">
                      Hết hàng
                    </option>
                  </select>
                </div>
                <div className="col-7">
                  <div className="row  align-items-center">
                    <div className="col-3">
                      <span className="font">Danh mục </span>
                    </div>
                    <div className="col-9">
                      <select
                        type="text"
                        name="category"
                        onChange={e => {
                          this.changeInput(e);
                        }}
                        className="w-75 custom-select font"
                      >
                        {this.props.store.dataCategory.map((item, index) => {
                          // if (this.data.category.key != undefined) {
                          //   return (
                          //     <option
                          //       selected={item.key == this.data.category.key ? true : false}
                          //       value={item.key}
                          //     >
                          //       {item.name}
                          //     </option>
                          //   );
                          // }
                          return <option value={item.key}>{item.name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row  mb-3">
            <div className="col-2">
              <span className="font">Phân loại hàng</span>
              <br />
              <small style={{ color: 'gray' }}>
                Phân loại sản phẩm lựa chọn: kích thước, màu sắc, ...
              </small>
            </div>
            <div className="col-10">
              <div className="d-inline-block mb-3">
                <input
                  type="text"
                  className="w-50 form-control font float-left mr-3"
                  style={{}}
                  value={this.size}
                  name="size"
                  onChange={e => {
                    this.changeInput(e);
                  }}
                />
                <button
                  onClick={() => {
                    this.data.type.push(this.size);
                    this.size = '';
                  }}
                  className="bgDefault colorWhite p-2 px-3 rounded cursor"
                >
                  Thêm
                </button>
              </div>

              <div>
                {this.data.type &&
                  this.data.type.map((item, index) => {
                    return (
                      <div
                        className="bgDefault colorWhite px-2 py-1 d-block float-left mr-3"
                        style={{ position: 'relative' }}
                      >
                        {item}
                        <img
                          onClick={() => {
                            this.data.type.splice(index, 1);
                          }}
                          className="cursor"
                          style={{
                            width: 20,
                            objectFit: 'cover',
                            position: 'absolute',
                            top: -7,
                            right: -7
                          }}
                          src="../../../static/images/cancel.png"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-2">
              <span className="font">Ảnh sản phẩm</span>
            </div>
            <div className="col-10">
              {this.data.image &&
                this.data.image.map((item, index) => {
                  return (
                    <div
                      className="border cursor mr-2 float-left img-product"
                      style={{ width: 100, height: 100, position: 'relative' }}
                    >
                      <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={
                          item ||
                          'https://chupanh.vn/wp-content/uploads/2017/04/nghe-thuat-chup-anh-thuc-pham-khong-chi-la-mon-an2.jpg'
                        }
                      />
                      <img
                        className="cursor img-cancel"
                        style={{
                          width: 20,
                          objectFit: 'cover',
                          position: 'absolute',
                          top: -7,
                          right: -7
                        }}
                        onClick={() => {
                          this.data.image.splice(index, 1);
                        }}
                        src="../../../static/images/cancel.png"
                      />
                    </div>
                  );
                })}

              {/* <img
                onClick={() => {
                  this.addImg.current.click();
                }}
                className="border cursor"
                style={{ width: 100, height: 100, objectFit: 'cover' }}
                src="../../../static/images/add-image.png"
              />
              <input
                style={{ display: 'none' }}
                type="file"
                name="upCover"
                ref={this.addImg}
                id="input-cover"
                onChange={event => {
                  console.log(event.target.files[0]);
                  upLoad(event).then(res => {
                    console.log(res, 'restimg');
                    // if (res.code == 1) {
                    //   this.data.company.avatar = 'https://local.aib.vn:280/uploads/' + res.data[0];
                    // }
                  });
                }}
              /> */}
              <p className="d-inline-block w-50">
                <input
                  type="text"
                  className="w-50 form-control font float-left mr-3"
                  style={{}}
                  value={this.image}
                  name="image"
                  onChange={e => {
                    this.image = e.target.value;
                  }}
                />
                <button
                  onClick={() => {
                    this.data.image.push(this.image);
                    this.image = '';
                  }}
                  className="bgDefault colorWhite p-2 px-3 rounded cursor"
                >
                  Thêm
                </button>
              </p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-2">
              <span className="font">Mô tả</span>
            </div>
            <div className="col-10">
              {/* <Editor
                editorState={this.editorState}
                toolbarClassName="toolbarClassName"
                toolbar={{
                  options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'emoji'],
                  inline: {
                    options: ['bold', 'italic', 'underline']
                  }
                }}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              /> */}
              <textarea
                name="description"
                value={this.data.description}
                onChange={e => {
                  this.changeInput(e);
                }}
                rows="5"
                type="text"
                className="w-100 form-control font"
                style={{}}
              />
            </div>
          </div>
          <div className="row justify-content-center mb-4 pr-5">
            {this.data.id != undefined && this.data.id != '' ? (
              <button
                onClick={() => {
                  callBack('UPDATE_PRODUCT', this.data);
                }}
                className="bgDefault colorWhite p-2 px-3 rounded cursor"
              >
                Chỉnh sửa
              </button>
            ) : (
              <button
                onClick={() => {
                  callBack('CREATE_PRODUCT', this.data);
                }}
                className="bgDefault colorWhite p-2 px-3 rounded cursor"
              >
                Lưu
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
