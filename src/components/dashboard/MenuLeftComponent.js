import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../routes/routes';
import '../general/style.scss';
import './dashboard.scss';
import $ from 'jquery';
@inject('store')
@observer
export default class MenuLeftComponent extends React.Component {
  @observable isRender = false;
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    $('#leftside-navigation .sub-menu > a').click(function(e) {
      $('#leftside-navigation ul ul').slideUp(),
        $(this)
          .next()
          .is(':visible') ||
          $(this)
            .next()
            .slideDown(),
        e.stopPropagation();
    });
    if (localStorage.getItem('adminFF')) {
      console.log(JSON.parse(localStorage.adminFF));
      this.props.store.admin = JSON.parse(localStorage.adminFF);
    }
    this.isRender = true;
  }
  render() {
    return (
      <aside className="sidebar" style={{position: 'fixed',     width: '16.666667%'}}>
        {this.isRender ? (
          <div id="leftside-navigation" className="nano">
            <ul className="nano-content">
              {this.props.store.dataMenuDashboard.map((item, index) => {
                return (
                  <li className={item.active ? 'sub-menu active' : 'sub-menu'}>
                    <Link route={item.directional}>
                      <a className="cursor">
                        <span>{item.name}</span>
                        {item.children && item.children.length > 0 ? (
                          <i className="arrow fa fa-angle-right pull-right" />
                        ) : null}
                      </a>
                    </Link>
                    {item.children && item.children.length > 0 ? (
                      <ul>
                        {item.children.map((e, i) => {
                          return (
                            <li>
                              <Link route={item.directional}>
                                <a>{e.name}</a>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <p style={{ textAlign: 'center', padding: ' 0 15px ', color: '#f08080', position: 'absolute', bottom: 30, left: 0 }}>
              {this.props.store.admin ? this.props.store.admin.email : 'NO'}
            </p>
          </div>
        ) : null}
      </aside>
    );
  }
}
