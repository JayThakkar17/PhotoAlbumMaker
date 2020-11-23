import React, { Component } from 'react'
import { Button, Col } from 'react-bootstrap';
import Sidebar from '../cmp/Sidebar';
import { isLoggedIn, name } from "../services/Auth";
import { Redirect } from "react-router-dom";
import "../assets/css/album-detail.css";
import AddPhoto from './AddPhoto';
import { getPhotos } from '../services/Album'


export default class AlbumDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addPhoto: false,
            photos: [],
        };
    }

    // fileSelectHandler = event => {
    //     this.setState({
    //         selectedFiles: event.target.files[0]
    //     })
    // }
    // fileUploadHandler = () => {
    //     axios.post();
    // }

    closeAddPhoto = () => {
        this.setState({ addPhoto: false });
    };

    renderNewPhotos = createdPhotos => {
        var self = this;
        self.showAlbum()
    };

    componentWillMount() {
        this.showAlbum()
    }

    showAlbum() {
        var self = this;
        getPhotos(this.props.match.params.id)
            .then(function (response) {
                var data = response.data;
                var photo_url = [];
                if (response.status === 200) {
                    data.map((object, index) => {
                        var url = object.avatar.split(",")
                        url.map(new_url => {

                            photo_url.push("http://localhost:8000/" + new_url)
                        })
                    })
                    self.setState({ photos: photo_url });
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    render() {
        if (!isLoggedIn()) {
            return <Redirect push to="/login" />;
        }
        // {

        // }
        return (
            <div>
                {this.state.addPhoto && (
                    <AddPhoto
                        addPhoto={this.state.addPhoto}
                        closeOn={this.closeAddPhoto}
                        renderNewPhotos={this.renderNewPhotos}
                        albumId={this.props.match.params.id}
                    // deletePhotos={this.deletePhotos}
                    // albumId={album.id}
                    // photoCount={photos.length}
                    />
                )}
                <Sidebar></Sidebar>
                <div className="album-details-main-wrap">
                    <h1>AlbumListing </h1>
                    {/* <input type="file">Upload</input> */}

                    <Col xs={9} className="album-details-outer-wrap p-none">
                        <Button
                            className="add-photoes-btn btn btn-green"
                            onClick={event => {
                                this.setState({ addPhoto: true });
                                // this.checkboxCheckUncheck(false);
                            }}
                        >
                            Add photos
                </Button>
                        <br /> <br />
                        <Button
                            className="add-photoes-btn btn btn-green"
                        // onClick={event => {
                        //     this.setState({ addPhoto: true });
                        //     this.checkboxCheckUncheck(false);
                        // }}
                        >
                            Share Album
                </Button>
                        <Col
                            xs={3}
                            className={

                                'album-details-page-wrap p-none'
                            }
                        >
                            <Col
                                xs={3}

                                className="photo-selection-wrap"
                            >
                                {this.state.photos &&
                                    this.state.photos.map((photo, index) => (
                                        <Col
                                            xs={3}

                                            className={
                                                'album-image-wrap no-m-l-r album-photo-thumbs-wrap portfolio-album-thub-wrap'
                                            }
                                            key={index}
                                        >
                                            <Col xs={3} className="album-photo-thumbs p-none">
                                                <img
                                                    className="img-responsive album-image custom-album-image"
                                                    src={photo}
                                                    alt={photo}
                                                />
                                            </Col>
                                        </Col>
                                    ))}
                            </Col>
                        </Col>
                    </Col>
                </div>
            </div>
        );
    }
}



