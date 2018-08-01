import React, { Component } from "react";
import FileUpload from "../../fileupload";
import states from '../../../services/states';
import SelectMenu from '../../selectmenu';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: "",
            address_line_one: "",
            address_line_two: "",
            city: "",
            state: "",
            zip: "",
            first_name: "",
            middle_initial: "",
            last_name: "",
            profile_picture_link: "",
            telephone: "",
            bio: ""
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLocationName = this.handleLocationName.bind(this);
        this.handleAddressOne = this.handleAddressOne.bind(this);
        this.handleAddressTwo = this.handleAddressTwo.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleZip = this.handleZip.bind(this);
        this.handleNewLocationName = this.handleNewLocationName.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleMiddleInitial = this.handleMiddleInitial.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleProfilePictureLink = this.handleProfilePictureLink.bind(this);
        this.handleTelephone = this.handleTelephone.bind(this);
        this.handleBio = this.handleBio.bind(this);
    }
    handleEmail(value) {
        this.setState({ email: value });
    }

    handleUsername(value) {
        this.setState({ username: value });
    }

    handlePassword(value) {
        this.setState({ password: value });
    }
    handleLocationName(value) {
        this.setState({ location_name: value });
    }
    handleAddressOne(value) {
        this.setState({ address_line_one: value });
    }

    handleAddressTwo(value) {
        this.setState({ address_line_two: value });
    }

    handleCity(value) {
        this.setState({ city: value });
    }

    handleState(value) {
        this.setState({ state: value });
    }

    handleZip(value) {
        this.setState({ zip: value });
    }

    handleNewLocationName(value) {
        this.setState({ new_location_name: value });
    }

    handleFirstName(value) {
        this.setState({ first_name: value });
    }

    handleMiddleInitial(value) {
        this.setState({ middle_initial: value });
    }

    handleLastName(value) {
        this.setState({ last_name: value });
    }

    handleProfilePictureLink(value) {
        this.setState({ profile_picture_link: value });
        console.log(value);
    }

    handleTelephone(value) {
        this.setState({ telephone: value });
    }

    handleBio(value) {
        this.setState({ bio: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let object = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            profile_picture_link: this.state.profile_picture_link
        };
        if (this.state.location_id) {
            object["location_id"] = this.state.location_id;
        } else {
            object["address_line_one"] = this.state.address_line_one;
            object["address_line_two"] = this.state.address_line_two;
            object["city"] = this.state.city;
            object["zip"] = this.state.zip;
        }
        // Where do I need to fetch from?

        // fetch("/api/events", {
        //     method: "POST",
        //     body: JSON.stringify(object),
        //     headers: new Headers({ "Content-Type": "application/json" })
        // });
    }

    componentDidMount() {
        try {
            fetch("/api/locations")
                .then(response => response.json())
                .then(locations => {
                    this.setState({ locations });
                });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className="container">
                <form>
                    <h1>Start an account</h1>
                    <div className="form-group">
                        <label htmlFor="name">Username:</label>
                        <input
                            value={this.state.name}
                            onChange={event => this.handleUsername(event.target.value)}
                            className="form-control"
                            name="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Password:</label>
                        <input
                            value={this.state.blurb}
                            onChange={event => this.handlePassword(event.target.value)}
                            className="form-control"
                            name="password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Email:</label>
                        <textarea
                            value={this.state.details}
                            onChange={event => this.handleEmail(event.target.value)}
                            className="form-control"
                            name="email"
                        />
                    </div>

                    <div>
                        <label htmlFor="addressLineOne">Address Line One:</label>
                        <input
                            value={this.state.address_line_one}
                            onChange={event => this.handleAddressOne(event.target.value)}
                            className="form-control"
                            name="addressLineOne"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="addressLineTwo">Address Line Two:</label>
                        <input
                            value={this.state.address_line_two}
                            onChange={event => this.handleAddressTwo(event.target.value)}
                            className="form-control"
                            name="addressLineTwo"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input
                            value={this.state.city}
                            onChange={event => this.handleCity(event.target.value)}
                            className="form-control"
                            name="city"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="state" className="mr-2">State:</label>
                        <SelectMenu
                            value={this.state.state}
                            source={states.getStates()}
                            callback={event => this.handleState(event.target.value)}
                            className="form-control"
                            id="state"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="zip">Zip:</label>
                        <input
                            value={this.state.zip}
                            onChange={event => this.handleZip(event.target.value)}
                            className="form-control"
                            name="zip"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">First name</label>
                        <input
                            value={this.state.first_name}
                            onChange={event => this.handleFirstName(event.target.value)}
                            className="form-control"
                            name="first_name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Middle Initial:</label>
                        <input
                            value={this.state.blurb}
                            onChange={event => this.handleMiddleInitial(event.target.value)}
                            className="form-control"
                            name="middle_initial"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Last name:</label>
                        <input
                            value={this.state.blurb}
                            onChange={event => this.handleLastName(event.target.value)}
                            className="form-control"
                            name="last_name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Telephone:</label>
                        <input
                            value={this.state.blurb}
                            onChange={event => this.handleTelephone(event.target.value)}
                            className="form-control"
                            name="telephone"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Tell us about yourself:</label>
                        <input
                            value={this.state.blurb}
                            onChange={event => this.handlePassword(event.target.value)}
                            className="form-control"
                            name="password"
                        />
                    </div>



                    {/************** file upload ***************/}
                    <h5>Upload your profile image</h5>
                    <FileUpload label="Upload Event Thumbnail" callback={this.handleProfilePictureLink} />

                </form>
            </div>
        );
    }
}

export default RegisterScreen;