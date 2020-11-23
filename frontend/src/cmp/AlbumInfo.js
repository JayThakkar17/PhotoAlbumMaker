import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../assets/css/AlbumInfo.css";
import { albumCategory } from "./AlbumCategory";
// import Select from 'react-select';
// import 'react-select/dist/react-select.min.css';

export default class AlbumInfo extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        const initialstate = {
            albumForm: {
                albumname: '',
                category: ''
            },
            redirectToReferrer: false
        };
        return initialstate;

        function handleDone(event) {
            event.preventDefault();
            // done();
        }
    }

    render() {
        return (
            <div className="div-main txt-center">
                <form>
                    <h2>Create Album Here</h2>
                    <hr />
                    <div className="txt-center">
                        <div className="col-sm-3">
                            <label>Album Name</label>

                            <input type="text" className="form-control" id="name"
                                placeholder="Album Name" />
                        </div>
                    </div>
                    <br />
                    <div className="col-sm-3">
                        <label>Album Category</label>
                        <input type="text" className="form-control" id="category" placeholder="Category of Album" />
                        {/* <Select
                            className="custom-form-control"
                            name="category_options"
                            value={albumForm.category_options}
                            options={this.categoryOptions()}
                            placeholder="Select categories"
                            onChange={this.handleSelectChange.bind(this)}
                        /> */}
                    </div>
                    <br />
                    <button className="button">
                        Create
                    </button>
                </form>
            </div>
        )
    }
}
