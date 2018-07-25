import React, { Component } from 'react';

class EventCreateScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startTime: '', endTime: '', startDate: '',
            endDate: '', locationName: '', addressLineOne: '', addressLineTwo: '',
            city: '', state: '', zip: '', name: '', thumbnailImageLink: '', tags: []
        };
    }

    handleStartTime(value) {
        this.setState({ startTime: value });
    }

    handleEndTime(value) {
        this.setState({ endTime: value });
    }

    handleStartDate(value) {
        this.setState({ startDate: value });
    }

    handleEndDate(value) {
        this.setState({ endDate: value });
    }

    handleLocationName(value) {
        this.setState({ locationName: value });
    }

    handleAddressOne(value) {
        this.setState({ addressLineOne: value });
    }

    handleAddressTwo(value) {
        this.setState({ addressLineTwo: value });
    }

    handleCity(value) {
        this.setState({ city: value });
    }

    handleState(value) {
        this.setState({ state: value });
    }

    handleZip(value) {
        this.setState({ startTime: value });
    }

    handleName(value) {
        this.setState({ name: value });
    }

    handleThumbnailImageLink(value) {
        this.setState({ thumbnailImageLink: value });
    }

    handleTags(value) {
        this.setState({ tags: value });
    }
     
    handleSubmit(value) {
        fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: new Headers({ 'Content-Type': 'application/json' })
        })
    }

    render() {
        return (
        // return ()
        <div>
            <form>

                <input
                    value={this.state.startTime}
                    onChange={(event) => this.handleStartTime(event.target.value)}
                    placeholder="Start Time" />

                <input
                    value={this.state.endTime}
                    onChange={(event) => this.handleEndTime(event.target.value)}
                    placeholder="End Time" />

                <input
                    value={this.state.startDate}
                    onChange={(event) => this.handleStartDate(event.target.value)}
                    placeholder="Start Date" />

                <input
                    value={this.state.endDate}
                    onChange={(event) => this.handleEndDate(event.target.value)}
                    placeholder="End Date" />

                <input
                    value={this.state.locationName}
                    onChange={(event) => this.handleLocationName(event.target.value)}
                    placeholder="Location Name" />

                <input
                    value={this.state.addressLineOne}
                    onChange={(event) => this.handleAddressOne(event.target.value)}
                    placeholder="Address Line One" />
                
                <input
                    value={this.state.addressLineTwo}
                    onChange={(event) => this.handleAddressTwo(event.target.value)}
                    placeholder="Address Line Two" />

                <input
                    value={this.state.city}
                    onChange={(event) => this.handleCity(event.target.value)}
                    placeholder="City" />

                <input
                    value={this.state.state}
                    onChange={(event) => this.handleState(event.target.value)}
                    placeholder="State" />

                <input
                    value={this.state.zip}
                    onChange={(event) => this.handleZip(event.target.value)}
                    placeholder="Zip Code" />

                <input
                    value={this.state.name}
                    onChange={(event) => this.handleName(event.target.value)}
                    placeholder="Start Date" />

                <input
                    value={this.state.thumbnailImageLink}
                    onChange={(event) => this.handleThumbnailImageLink(event.target.value)}
                    placeholder="Start Date" />

                <input
                    value={this.state.tags}
                    onChange={(event) => this.handleTags(event.target.value)}
                    placeholder="Tags" />

                <button onClick={(event) => this.handleSubmit(this.state)}>Submit</button>
            </form>
        </div>
        )
    }
}

export default EventCreateScreen;