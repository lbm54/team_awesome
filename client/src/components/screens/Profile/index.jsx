import React, { Component } from 'react';


class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.userId = props.match.params.id;

        this.state = {
            user: []
        };
    }

    async componentDidMount() {
        try {
            let response = await fetch(`/api/users/${this.userId}`);
            let user = await response.json();

            if (!user.profile_picture_link)
                user.profile_picture_link = `/images/default_group_image.jpg`; 
                // ^^^ need to link up to profile img
            this.setState({ group });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <Fragment>
                {/* //username display */}
                <div className="">
                    <h2> {this.state.userID} </h2>
                </div>
                {/* //user bio display */}
                <div className="">
                    <h3> {this.state.userbio} </h3>
                </div>
                {/* //user avatar display */}
                <div className="">
                    <img src={this.state.user.profile_picture_link}/>
                </div>
                {/* //RSVP'd to these meetups display */}
                {/* //meetups displayed as cards */}
            </Fragment>
        );

    }
}
