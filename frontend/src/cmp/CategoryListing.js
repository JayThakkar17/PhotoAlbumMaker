import React, { Component } from 'react'
import Sidebar from '../cmp/Sidebar';
import { isLoggedIn, isObjectEmpty } from "../services/Auth";
import { Redirect } from "react-router-dom";
import { Col, Table, Button } from 'react-bootstrap';
import { getCategories, deleteCategory } from '../services/Category';
import CategoryPopup from './CategoryPopup';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import "../assets/css/Category.css"

export default class CategoryListing extends Component {

    state = {
        categories: [],
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

        getCategories()
            .then(function (response) {
                var data = response.data;
                self.setState({ categories: data });
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
                confirmAction: () => this.deleteCategory(),
                cancelBtn: true
            }
        });
    }
    CreateClose = () => this.setState({ CreateShow: false, editObject: {} });

    renderCategory = (category, action) => {
        const newcategories = this.state.categories.slice();
        if (action === 'insert') {
            newcategories.splice(0, 0, category);
        } else if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
            newcategories.splice(
                newcategories.indexOf(this.state.editObject),
                1,
                category
            );
        }

        this.setState({
            categories: newcategories
        });
    };

    deleteCategory() {
        var self = this;
        deleteCategory(self.state.alert.objectId)
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
        const categories = self.state.categories.filter(
            category => category._id !== self.state.alert.objectId
        );

        self.setState({
            categories: categories,

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
        debugger
        self.setState({
            alert: {
                show: true,
                title: response.data,
                text: response.data.error,
                type: 'warning',
                confirmAction: () => self.hideDialogueBox()
            }
        });
    }
    hideDialogueBox() {
        this.setState({ alert: { show: false } });
    }
    render() {
        const { categories, alert } = this.state
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
                    <CategoryPopup
                        showCreate={this.state.CreateShow}
                        closeOn={this.CreateClose}
                        editObject={this.state.editObject}
                        renderCategory={this.renderCategory}
                    />
                )}
                <Sidebar></Sidebar>
                <div className="page-wrap">
                    <h1>Category </h1>
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
                                            <th>Category Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(category => (
                                            <tr key={category._id}>
                                                <td>{category.catname}</td>
                                                <td>
                                                    <a
                                                        className="edit-icon"
                                                        onClick={() =>
                                                            this.setState({
                                                                CreateShow: true,
                                                                editObject: category
                                                            })}
                                                    >
                                                        <img
                                                            src={require('../assets/img/edit-icon.png')}
                                                            alt=""
                                                        />
                                                    </a>

                                                    <a
                                                        className="del_butn margin-2"
                                                        onClick={event => this.showDialogueBox(category._id)}
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



