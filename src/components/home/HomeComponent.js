import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../routes/routes';
import LoadComponent from '../general/LoadComponent';
import ItemProductComponent from '../products/ItemProductComponent';
import '../products/products.scss';
import './home.scss';

@observer
class Item extends React.Component {
  @observable isRender = false;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-3 product-item-home mb-4">
        <div className="product-item-cover">
          <img src="../../static/images/bannerHome.jpg" />
        </div>
        <div className="row product-item-txt w-100 pr-4">
          <div className="col-8">
            <Link>
              <a>
                <h5 className="font-weight-bold colorWhite cursor">name</h5>
              </a>
            </Link>

            <p className="colorWhite">20000</p>
          </div>
          <div className="col-4 align-self-center text-right">
            <button className="cursor">
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
    );
  }
}

@inject('store')
@observer
export default class HomeComponent extends React.Component {
  @observable isRender = false;
  @observable dataHome = [
    {
      title: this.props.store.dataCategory[0].name,
      data: ['1', '2', '1', '2', '1', '2', '1', '2'],
      query: {
        pathname: this.props.store.dataCategory[0].directional,
        name: this.props.store.dataCategory[0].key
      }
    },
    {
      title: this.props.store.dataCategory[1].name,
      data: ['1', '2', '1', '2', '1', '2', '1', '2'],
      query: {
        pathname: this.props.store.dataCategory[1].directional,
        name: this.props.store.dataCategory[1].key
      }
    },
    {
      title: this.props.store.dataCategory[2].name,
      data: ['1', '2', '1', '2', '1', '2', '1', '2'],
      query: {
        pathname: this.props.store.dataCategory[2].directional,
        name: this.props.store.dataCategory[2].key
      }
    }
  ];

  constructor(props) {
    super(props);
    this.isRender = true;
  }

  render() {
    return (
      <div className="product w-100">
        {this.isRender ? (
          <div className="">
            <div className="limit">
              <div className="mx-4 my-3">
                <h4 style={{ color: 'red' }}>Sản phẩm được yêu thích</h4>
              </div>
              <div className="row pb-3">
                {['1', '2', '1', '2', '1', '2'].map((e, i) => {
                  return <Item />;
                })}
              </div>
            </div>
            <div className="limit">
              {this.dataHome.map((item, index) => {
                return (
                  <div>
                    <div className="mx-4">
                      <h4>{item.title}</h4>
                      <hr className="my-1" />
                    </div>
                    <div className="row py-3">
                      {item.data.map((e, i) => {
                        return (
                          <div className="p-3" style={{ width: '20%' }}>
                            <ItemProductComponent />
                          </div>
                        );
                      })}
                    </div>
                    <div className="view-more mr-5 mb-4 text-right">
                      <Link
                        route={item.query.pathname + '/' + item.query.name}
                        // href={{ pathname: item.query.pathname, query: { name: item.query.name } }}
                      >
                        <a>
                          <i className="colorDefault">Xem thêm</i>
                        </a>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <LoadComponent />
        )}
      </div>
    );
  }
}
