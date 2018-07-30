import React, { Component, Fragment } from 'react';

// The footer code was found here: https://mdbootstrap.com/components/bootstrap-footer/

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <Fragment>
            {/* START FOOTER */}
            <footer className="page-footer font-small mdb-color pt-4 FooterContainer">

                {/* <!-- Footer Links --> */}
                <div className="container text-center text-md-left FooterLinks">

                    {/* <!-- Footer links --> */}
                    <div className="row text-center text-md-left mt-3 pb-3">

                        {/* <!-- Grid column --> */}
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3 aboutUsContainer">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Groupr</h6>
                            <p>The final project of Team: Awesome Team. We hope you enjoyed this demo. Signed: Lee, Kimani, and Warryn.</p>
                        </div>
                        {/* <!-- Grid column --> */}

                        <hr className="w-100 clearfix d-md-none" />

                        {/* <!-- Grid column --> */}

                        <hr className="w-100 clearfix d-md-none" />

                        {/* <!-- Grid column --> */}

                        <hr className="w-100 clearfix d-md-none" />

                        {/* <!-- Grid column --> */}
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
                            <p>
                                <a href="/users/register">Sign Up</a>
                            </p>
                            <p>
                                <a href="/users/profile">Your Account</a>
                            </p>
                            <p>
                                <a href="events/create">Start a new Event</a>
                            </p>
                        </div>

                        {/* <!-- Grid column --> */}
                        <hr className="w-100 clearfix d-md-none" />

                        {/* <!-- Grid column --> */}
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold contactUsContainer">Contact</h6>
                            <p>
                                <i className="fa fa-home mr-3 ourCity"></i> New York, NY 10012, US</p>
                            <p>
                                <i className="fa fa-envelope mr-3 ourEmail"></i> info@gmail.com</p>
                            <p>
                                <i className="fa fa-phone mr-3 ourNumber"></i> + 01 234 567 88</p>
                        </div>
                        {/* <!-- Grid column --> */}

                    </div>
                    {/* <!-- Footer links --> */}

                    <hr />

                    {/* <!-- Grid row --> */}
                    <div className="row d-flex align-items-center copyrightContainer">

                        {/* <!-- Grid column --> */}
                        <div className="col-md-7 col-lg-8">

                            {/* <!--Copyright--> */}
                            <p className="text-center text-md-left">© 2018 Copyright:
                                    <a href="https://mdbootstrap.com/bootstrap-tutorial/">
                                    <strong> MDBootstrap.com</strong>
                                </a>
                            </p>

                        </div>
                        {/* <!-- Grid column --> */}

                        {/* <!-- Grid column --> */}
                        <div className="col-md-5 col-lg-4 ml-lg-0 socialContainers">

                            {/* <!-- Social buttons --> */}
                            <div className="text-center text-md-right">
                                <ul className="list-unstyled list-inline">
                                    <li className="list-inline-item">
                                        <a className="btn-floating btn-sm rgba-white-slight mx-1">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="btn-floating btn-sm rgba-white-slight mx-1">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="btn-floating btn-sm rgba-white-slight mx-1">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="btn-floating btn-sm rgba-white-slight mx-1">
                                            <i className="fa fa-linkedin"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        {/* <!-- Grid column --> */}

                    </div>
                    {/* <!-- Grid row --> */}

                </div>
                {/* <!-- Footer Links --> */}

            </footer>
            {/* <!-- Footer --> */}
        </Fragment>
         )
    }
};