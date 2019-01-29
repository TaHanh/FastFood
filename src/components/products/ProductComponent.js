import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../routes/routes';
import LoadComponent from '../general/LoadComponent';
import ItemProductComponent from './ItemProductComponent';
import './products.scss';
@inject('store')
@observer
export default class ProductComponent extends React.Component {
  @observable isRender = false;

  constructor(props) {
    super(props);
    this.isRender = true;
  }

  render() {
    return (
      <div className="product w-100">
        {this.isRender ? (
          <div className="">
            <ul class="menu w-100 m-auto nav nav-pills nav-fill" style={{ zIndex: 1 }}>
              {this.props.store.dataCategory.map((e, i) => {
                return (
                  <Link route={e.directional}>
                    <li class="nav-item cursor">
                      <a key={i} className={e.active ? 'nav-link active' : 'nav-link'}>
                        {e.name}
                      </a>
                    </li>
                  </Link>
                );
              })}
            </ul>
            <div className="limit">
              <div className="row py-3">
                {['1', '2', '1', '2', '1', '2', '1', '2'].map((e, i) => {
                  return (
                    <div className="p-3" style={{ width: '20%' }}>
                      <ItemProductComponent />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <LoadComponent />
        )}
      </div>
    );
  }
}
