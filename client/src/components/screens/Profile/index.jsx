import React, { Component } from 'react';

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.userId = props.match.params.id;
        this.eventId = props.match.params.id;

        this.state = {
            user: [],
            events: []
        };
    }

    async componentDidMount() {
        try {
            let response = await fetch(`/api/users/${this.userId}`);
            let user = await response.json();

            if (!user.profile_picture_link)
                user.profile_picture_link = `/images/default_user_image.jpg`;

            this.setState({ user });
            
            let eventRes = await fetch(`/api/events/${this.eventId}`); 
            // do I call event ID?
            let event = await eventRes.json();
            this.setState({ events });
            

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
                    <img src={this.state.user.profile_picture_link} />
                </div>

                {/* //RSVP'd to these meetups display */}
                {/* //meetups displayed as cards */}
                <div className="">
                    <h4> Your Events </h4>
                    <div> 
                    <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{this.state.event.title}</h5>
                    <h6 class="card-subtitle">{this.state.event.host}</h6>
                    <p class="card-text"> {this.state.event.description}</p>
                    <Link to="/events/:id">
                        <button class="btn btn-primary">Details</button>
                    </Link>
                </div>
            </div>
                    </div>
                        </div>
            </Fragment>
        );

    }
}
