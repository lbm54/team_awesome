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
            let response = await fetch(`/api/groups/${this.userId}`);
            let user = await response.json();

            if (!group.thumbnail_image_link)
                group.thumbnail_image_link = `/images/default_group_image.jpg`;
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
                    <h2> {username} </h2>
                </div>
                {/* //user bio display */}
                <div className="">
                    <h3> {userbio} </h3>
                </div>
                {/* //user avatar display */}
                <div className="">
                    <img />
                </div>
                {/* //RSVP'd to these meetups display */}
                {/* //meetups displayed as cards */}
            </Fragment>
        );

    };
