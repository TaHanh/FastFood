import React from "react";

import { observable } from "mobx";

import { inject, observer } from "mobx-react";
import { getPathName, intentPageString } from "../utils/RouterUtils";
import { Link, Router } from "../routes/routes";
import Config from "../config/env";
import { queryOrder, deleteOrder } from "../api/Order";
import { getCustomer } from "../api/Customer";
import MenuLeftComponent from "../components/dashboard/MenuLeftComponent";
import OrderProductComponent from "../components/dashboard/order/OrderProductComponent";
import LoadComponent from "../components/general/LoadComponent";
import { unixToTime, unitTime} from "../utils/convertTime";

@inject("store")
@observer
export default class OrderMana extends React.Component {
  @observable data = [];
  @observable page = 1;
  @observable limit = 5;
  @observable totalPage = 0;
  @observable isRender = false;
  @observable isSearch = false;
  @observable isAdmin = false;
  @observable query = "";
  @observable search = {};
  @observable user = {};
  @observable orderItem = {};

  constructor(props) {
    super(props);

    // this.props.store.getOrdersAPI()
    this.getOrder(this.page, this.limit);
    this.search = {
      name: "",
      phone: "",
      timeStart: "",
      timeEnd: "",
      statusOrder: "",
      statusShip: ""
    };
  }
  componentDidMount() {
    this.props.store.checkUser("admin", () => {
      this.isAdmin = true;
    });
    // let pathName = getPathName();
  }

  getOrder = async (p, l, q) => {
    this.data = [];
    this.isRender = false;
    const dataOrder = await queryOrder({ page: p, limit: l, query: q });
    this.totalPage = Math.ceil(dataOrder.count / this.limit);
    Promise.all(
      dataOrder.rows.map(async order => {
        //   const user = await getCustomer(order.idUser)
        //   order = { ...order, customer: user }
        this.data.push(order);
        this.isRender = true;
      })
    ).then(res => {
      this.isRender = true;
    });
  };
  callBack = (key, data) => {
    switch (key) {
      case "DEL_ITEM": 
      this.orderItem = data;
      $('#myModal').modal('show')
        
        break;
      case 'DEL' :
      console.log(JSON.stringify(this.orderItem))
      $('#myModal').modal('hide')
      deleteOrder(this.orderItem.item.id).then(res => {
          this.data.splice(this.orderItem.index, 1);
        });
      break
      case "NEXT_PAGE":
        this.page = data;
        this.isRender = false;
        this.getOrder(this.page, this.limit);
        break;
      case "SEARCH":
        this.isSearch = true;
        this.page = 1;
        console.log(data);
        this.query =
          `${data.statusShip ? "&statusShip=" + `${data.statusShip}` : ""}` +
          `${data.statusOrder ? "&statusOrder=" + data.statusOrder : ""}`;
        // if (data.name != '' || data.phone != '') {
        //   this.query =
        //     `${data.name ? '&name=' + `${data.name}` : ''}` +
        //     `${data.phone ? '&phone=' + data.phone : ''}`;
        // }
        //  else {

        // }
        this.getOrder(this.page, this.limit, this.query);
        break;
      case "BACK_ALL":
        this.page = 1;
        this.isSearch = false;
        this.search = {
          name: "",
          phone: "",
          timeStart: "",
          timeEnd: "",
          statusOrder: "",
          statusShip: ""
        };
        this.getOrder(this.page, this.limit);

        break;
        case 'VIEW_USER':
    getCustomer(data)
        .then(res => {
          this.user = res;
          $('#exampleModalCenter').modal('show')
        })
        .catch(err => {
          alert("Người dùng không tồn tại. Có thể tài khoản đã bị xóa !");
        });
    
    break
    case 'EDIT_USER' :
      $('#exampleModalCenter').modal('hide')
      intentPageString('/admin/detail-user?id=' + data)
    break
      default:
        break;
    }
  };
  render() {
    return this.isAdmin ? (
      <div>

     
      <div className="row">
        <div className="col-lg-2 px-0">
          <MenuLeftComponent />
        </div>
        <div className="col-lg-10 px-0">
          {this.isRender ? (
            <OrderProductComponent
              data={this.data}
              search={this.search}
              isSearch={this.isSearch}
              totalPage={this.totalPage}
              page={this.page}
              callBack={this.callBack}
            />
          ) : (
            <div style={{ minHeight: "100vh" }}>
              <LoadComponent />
            </div>
          )}
        </div>
        </div>
        <div class="modal fade modal-lg m-auto" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">{this.user.name || ''}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div className="row ">
      <div className="col-4">
              <div className="text-center">
                <img
                  src={
                    this.user.avatar
                      ? this.user.avatar
                      : "../../static/images/ava.jpg"
                  }
                  className="rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover"
                  }}
                />

               
              </div>
            </div>
            <div className="col-8">
              
              <div className="row align-items-center mb-3 ">
                {/* <div className="col-3 px-0">
                  <span className="font">Email</span>
                </div> */}
                <div className="col-8">
                <p>{this.user.email || ''}</p>
                <p>{this.user.phone || ''}</p>
                <p>{this.user.role == "customer" ? 'Khách hàng' : this.user.role == "employee" ? 'Nhân viên' : this.user.role == "admin" ? 'Quản trị' : ''}</p>
                <p>{this.user.address || ''}</p>
                  {/* <input
                    name="email"
                    type="text"
                    value={this.user.email}
                    className="w-75 form-control font"
                    style={{}}
                  
                  /> */}
                </div>
              </div>

            
            
              
            </div>
            
          </div>
          <div>
                    <div className="row align-items-center my-4">
                      <div className="col-4 px-0">
                        <span className="font">Số lần mua hàng</span>
                      </div>
                      <div className="col-8">
                        <span>{this.user.type}</span>
                      </div>
                    </div>
                    <div className="row align-items-center mb-3">
                      <div className="col-4 px-0">
                        <span className="font">Ngày tạo tài khoản</span>
                      </div>
                      <div className="col-8">
                        <span>{unixToTime(unitTime(this.user.createdAt))}</span>
                      </div>
                    </div>{" "}
                  </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
        <button type="button" class="btn btn-primary" onClick={()=>this.callBack('EDIT_USER', this.user.id)}>Chỉnh sửa</button>
      </div>
    </div>
  </div>
  </div>


  <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
     
      <div class="modal-body">
        <p className="my-4 text-center">Bạn có chắc chắn muốn xóa không ?</p>
      </div>
      <div class="modal-footer">  
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
        <button type="button" class="btn btn-primary" onClick={()=>{this.callBack('DEL')}}>Xóa</button>
      </div>
    </div>
  </div>
</div>
      </div>
    ) : (
      <div style={{ minHeight: "100vh" }}>
        <LoadComponent />
      </div>
    );
  }
}
