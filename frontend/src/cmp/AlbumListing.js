import React, { Component } from 'react'
import Sidebar from '../cmp/Sidebar';
import { Link } from 'react-router-dom';
import { isLoggedIn, isObjectEmpty } from "../services/Auth";
import { Redirect } from "react-router-dom";
import { Col, Table, Button } from 'react-bootstrap';
import { getAlbums, deleteAlbum } from '../services/Album';
import AlbumPopup from './AlbumPopup';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import "../assets/css/Category.css"

export default class AlbumListing extends Component {

    state = {
        albums: [],
        CreateShow: false,
        editObject: {},
        alert: {
            objectId: '',
            show: false,
            cancelBtn: true,
            confirmAction: () => { },
            title: '',
            text: '',
            btnText: '',
            type: ''
        }
    }
    componentWillMount() {
        var self = this;

        getAlbums()
            .then(function (response) {
                var data = response.data;
                self.setState({ albums: data });
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    showDialogueBox(id) {
        this.setState({
            alert: {
                objectId: id,
                show: true,
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                btnText: 'Yes, delete it!',
                type: 'warning',
                confirmAction: () => this.deleteAlbum(),
                cancelBtn: true
            }
        });
    }
    CreateClose = () => this.setState({ CreateShow: false, editObject: {} });

    renderAlbum = (album, action) => {
        const newalbums = this.state.albums.slice();
        if (action === 'insert') {
            newalbums.splice(0, 0, album);
        } else if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
            newalbums.splice(
                newalbums.indexOf(this.state.editObject),
                1,
                album
            );
        }

        this.setState({
            albums: newalbums
        });
    };

    deleteAlbum() {
        var self = this;
        deleteAlbum(self.state.alert.objectId)
            .then(function (response) {
                if (response.status === 200) {
                    self.handleDeleteSuccessResponse(response);
                } else {
                    self.handleDeleteErrorResponse(response);
                }
            })
            .catch(function (error) {
                self.handleDeleteErrorResponse(error.response);
            });
    }
    handleDeleteSuccessResponse(response) {
        var self = this;
        const albums = self.state.albums.filter(
            album => album._id !== self.state.alert.objectId
        );

        self.setState({
            albums: albums,

            alert: {
                show: true,
                title: 'Success',
                text: response.data.message,
                type: 'success',
                confirmAction: () => self.hideDialogueBox()
            }
        });
    }

    handleDeleteErrorResponse(response) {
        var self = this;

        self.setState({
            alert: {
                show: true,
                title: response.data.message,
                text: response.data.errors[0].detail,
                type: 'warning',
                confirmAction: () => self.hideDialogueBox()
            }
        });
    }
    hideDialogueBox() {
        this.setState({ alert: { show: false } });
    }
    render() {
        const { albums, alert } = this.state
        if (!isLoggedIn()) {
            return <Redirect push to="/login" />;
        }
        return (
            <div>
                <SweetAlert
                    show={alert.show || false}
                    title={alert.title || ''}
                    text={alert.text || ''}
                    type={alert.type || 'success'}
                    showCancelButton={alert.cancelBtn}
                    confirmButtonText={alert.btnText}
                    onConfirm={alert.confirmAction}
                    onCancel={() => this.hideDialogueBox()}
                />
                {this.state.CreateShow && (
                    <AlbumPopup
                        showCreate={this.state.CreateShow}
                        closeOn={this.CreateClose}
                        editObject={this.state.editObject}
                        renderAlbum={this.renderAlbum}
                    />
                )}
                <Sidebar></Sidebar>
                <div className="page-wrap">
                    <h1>Album </h1>
                    <Col xs={12} className="categories-page-wrap">


                        <Col xs={12} className="filter-wrap p-none">
                            <Col xs={12} className="p-none pull-right">
                                <Button className="btn pull-right btn-orange add-new-btn" onClick={() => this.setState({ CreateShow: true })}>
                                    Add New
                </Button>
                            </Col>
                        </Col>
                        <Col xs={12} className="p-none">
                            <div className="categories-table-wrap">
                                <Table responsive className="categories-table">
                                    <thead>
                                        <tr>
                                            <th>Album Name</th>
                                            <th>Category Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {albums.map(album => (
                                            <tr key={album._id}>
                                                <td> <Link to={'/albums/' + album._id}>{album.aname}</Link></td>
                                                <td>{album.catname.catname}</td>
                                                <td>
                                                    <a
                                                        className="edit-icon"
                                                        onClick={() =>
                                                            this.setState({
                                                                CreateShow: true,
                                                                editObject: album
                                                            })}
                                                    >
                                                        <img
                                                            src={require('../assets/img/edit-icon.png')}
                                                            alt=""
                                                        />
                                                    </a>

                                                    <a
                                                        className="del_butn margin-2"
                                                        onClick={event => this.showDialogueBox(album._id)}
                                                    >
                                                        <img
                                                            src={require('../assets/img/delete-icon.png')}
                                                            alt=""
                                                        />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Col>
                </div>
            </div>
        );
    }
}



