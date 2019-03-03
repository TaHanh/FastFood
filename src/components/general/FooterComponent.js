import React from 'react'
import './style.scss'
export default class FooterComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="footer w-100 limit">
        <hr className="my-1" />
        <div className="row align-items-center mb-2">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2017 All Rights Reserved by
              <a href="#">Scanfcode</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li>
                <a className="facebook" href="#">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>{' '}
              {/* <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li> */}
              <li>
                <a className="dribbble" href="#">
                  <i className="fas fa-envelope" />
                </a>
              </li>
              {/* <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>   */}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
