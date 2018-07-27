import React, { Component } from 'react';

class EventListingScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventslist: []
        };
    }

    async componentDidMount() {
        try {
            let response = await fetch('/api/events');
            let data = await response.json();
            console.log(data);
            this.setState({ eventslist: data });
        } catch (e) {
            console.log(e);
        }


    }

    render() {
        let eventslist = this.state.eventslist.map((events) => {
            return (
    <div key={events.id}>
                <div className="card">
                    <img className="card-img-top" src=".../100px180/" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{events.name}</h5>
                        <p className="card-text">{events.start_time}
                    {events.end_time}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                    
                    
                    {events.locationid}
                    {events.thumbnail_image_link}
                    {events.tags}
                    {events.comments}
                </div>


            );
        });

        return (
            <div>
                {eventslist}
            </div>
        )

    }

}

export default EventListingScreen;