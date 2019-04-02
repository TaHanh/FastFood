import React from 'react'

import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { getPathName } from '../utils/RouterUtils'
import { Link, Router } from '../routes/routes'
import Config from '../config/env'
import { deleteProduct, queryProduct } from '../api/Product'
import MenuLeftComponent from '../components/dashboard/MenuLeftComponent'
import ListProductComponent from '../components/dashboard/products/ListProductComponent'
import LoadComponent from '../components/general/LoadComponent'
@inject('store')
@observer
export default class ProductsMana extends React.Component {
  @observable data = []
  @observable page = 1
  @observable limit = 5
  @observable totalPage = 0
  @observable isRender = false
  @observable isSearch = false
  @observable query = ''
  @observable search = {}
  constructor(props) {
    super(props)

    this.search = {
      name: '',
      status: '',
      category: ''
    }
  }
  componentDidMount() {
    let pathName = getPathName()
    this.props.store.checkUser('admin', () => {
      this.props.store.getCategoriesAPI(res => {})

      this.getProduct(this.page, this.limit)
    })
  }
  getProduct = (p, l, q) => {
    this.isRender = false
    queryProduct({ page: p, limit: l, query: q }).then(res => {
      if (res) {
        this.data = res
        this.totalPage = Math.ceil(this.data.count / this.limit)
        this.isRender = true
      } else {
      }
    })
  }
  search = (query, data) => {
    let text = query.toLowerCase()
    let arr = []
    data.map(function(item) {
      let nana = item.name.toLowerCase()
      if (nana.indexOf(text) != -1) {
        arr.push(item)
      }
    })
    return arr
  }
  callBack = (key, data) => {
    switch (key) {
      case 'DEL_ITEM':
        deleteProduct(data.item.id).then(res => {
          this.data.rows.splice(data.index, 1)
        })
        break
      case 'NEXT_PAGE':
        this.page = data
        console.log(JSON.stringify(this.page))
        if (this.isSearch) {
          this.getProduct(this.page, this.limit, this.query)
        } else {
          this.getProduct(this.page, this.limit)
        }

        break
      case 'SEARCH':
        this.isSearch = true
        this.page = 1
        this.query =
          `${data.name ? '&name=' + `${data.name}` : ''}` +
          `${data.status ? '&status=' + data.status : ''}` +
          `${data.category ? '&category=' + data.category : ''}`
        this.getProduct(this.page, this.limit, this.query)

        // console.log(JSON.stringify(q))
        // if (data.name != '') {
        //   this.data = this.search(data.name, this.props.store.dataProducts);
        // }

        // console.log(JSON.stringify(this.data));
        break
      case 'BACK_ALL':
        this.page = 1
        this.isSearch = false
        this.search = {
          name: '',
          status: '',
          category: ''
        }
        this.getProduct(this.page, this.limit)

        break
      default:
        break
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-2 px-0">
          <MenuLeftComponent />
        </div>
        <div className="col-lg-10 px-0">
          {this.isRender ? (
            <ListProductComponent
              data={this.data.rows}
              isSearch={this.isSearch}
              search={this.search}
              totalPage={this.totalPage}
              page={this.page}
              callBack={this.callBack}
            />
          ) : (
            <div style={{ minHeight: '100vh' }}>
              <LoadComponent />
            </div>
          )}
        </div>
      </div>
    )
  }
}
