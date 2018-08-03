import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        {/* START FOOTER */}
        <div className="navbar footer navbar-fixed-bottom text-white pb-0 mb-0">
          {/* <!-- Footer Links --> */}
          <div className="container text-center text-md-left">
            {/* <!-- Footer links --> */}
            <div className="row text-center text-md-left">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Groupr</h6>
                <p>
                  The final project of Team: Awesome Team. We hope you enjoyed
                  this demo. Signed: Lee, Kimani, and Warryn.
                </p>
              </div>
              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Useful links
                </h6>
                <p className="mb-0 pb-0 text-white">
                  <Link to="users/register" className="text-white">
                    Sign Up
                  </Link>
                </p>
                <p className="mb-0 pb-0 text-white">
                  <Link to="users/profile" className="text-white">
                    Your Account
                  </Link>
                </p>
                <p className="mb-0 pb-0 text-white">
                  <Link to="events/create" className="text-white">
                    Start a new Event
                  </Link>
                </p>
              </div>

              {/* <!-- Grid column --> */}
              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p className="mb-0 pb-0">Birmingham, Alabama 35216</p>
                <p className="mb-0 pb-0">teamawesome@gmail.com</p>
                <p className="mb-0 pb-0">205-888-8888</p>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Footer links --> */}

            {/* <!-- Grid row --> */}
            <div className="row mt-0 d-flex align-items-center">
              {/* <!--Copyright--> */}
              <p className="text-center text-md-left font-weight-bold">
                © 2018 Copyright: Team Awesome
              </p>
            </div>
            {/* <!-- Grid row --> */}
          </div>
          {/* <!-- Footer Links --> */}
        </div>
        {/* <!-- Footer --> */}
      </Fragment>
    );
  }
}
