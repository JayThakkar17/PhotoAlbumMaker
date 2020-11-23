import React, { Component } from 'react';
import {
    Col,
    Button,
    Modal,
    // Label,
    FormGroup,
    FormControl
} from 'react-bootstrap';

// Import icon
// import createTitle from '../../../assets/images/admin/category/add-category-icon.png';
// import editTitle from '../../../assets/images/admin/category/edit-category-icon.png';

// Import components
// import validationHandler from '../../common/ValidationHandler';

// Import services
import { createCategory, updateCategory } from '../services/Category';

// Import helper
import { str2bool, isObjectEmpty } from '../services/Auth';

// Import css
import '../assets/css/add-category.css';

export default class CategoryPopup extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        const initialState = {
            categoryForm: {
                catname: ''
            },
            errors: {}
        };

        return initialState;
    }

    handleChange(e) {
        const categoryForm = this.state.categoryForm;
        var key = e.target.name;
        categoryForm[key] = str2bool(e.target.value);
        this.setState({
            categoryForm
        });
    }

    handleSubmit(e) {
        var self = this;
        var callCategoryApi = () => { };
        if (isObjectEmpty(self.props.editObject)) {
            var createParams = { category: self.state.categoryForm };
            callCategoryApi = createCategory(createParams);
        } else {
            var editParams = {
                id: self.props.editObject._id,
                categoryForm: { category: self.state.categoryForm }
            };
            callCategoryApi = updateCategory(editParams);
        }

        callCategoryApi
            .then(function (response) {
                self.handelResponse(response);
            })
            .catch(function (error) {
                const errors = error;
                if (errors.length > 0) {
                    // self.setState({ errors: validationHandler(errors) });
                } else {
                    console.log(error.response);
                }
            });
    }

    handelResponse(response) {
        var responseData = response.data;
        console.log(responseData);
        if (response.status === 200) {
            this.resetcategoryForm();
            this.props.renderCategory(
                isObjectEmpty(this.props.editObject) ? responseData.category : responseData,
                isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
            );
            this.props.closeOn();
        } else {
            console.log(responseData.errors);
        }
    }

    resetcategoryForm() {
        this.setState({ categoryForm: this.getInitialState().categoryForm });
    }

    editCategory(contact) {
        var self = this;
        const { catname } = contact;

        self.setState({
            categoryForm: {
                catname: catname,
            }
        });
    }

    componentWillMount() {
        var self = this;
        console.log(self);

        if (!isObjectEmpty(self.props.editObject)) {
            self.editCategory(self.props.editObject);
        }
    }

    updateState(element) {
        this.setState({ value: element });
    }

    render() {
        const { categoryForm, errors } = this.state;

        return (
            <Modal
                show={this.props.showCreate}
                className="add-category-modal"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Body className="add-category-body p-none">
                    <span className="close-modal-icon" onClick={this.props.closeOn}>
                        <img
                            src={require('../assets/img/close-icon.png')}
                            className="hidden-xs"
                            alt=""
                        />
                        <img
                            src={require('../assets/img/close-icon-white.png')}
                            className="visible-xs"
                            alt=""
                        />
                    </span>

                    <Col className="add-content-wrap" sm={12}>
                        <form className="admin-side create-album-form custom-form">
                            <FormGroup className="custom-form-group required">
                                <label className="custom-form-control-label">
                                    Category name
                </label>
                                <FormControl
                                    className="custom-form-control"
                                    type="text"
                                    name="catname"
                                    placeholder="category name"
                                    value={categoryForm.catname}
                                    onChange={this.handleChange.bind(this)}
                                />
                                {errors['catname'] && (
                                    <span className="input-error text-red">
                                        {errors['catname']}
                                    </span>
                                )}
                            </FormGroup>

                            <Button
                                className="btn btn-orange add-category-submit"
                                onClick={event => this.handleSubmit(event)}
                            >
                                Save
              </Button>
                            <Button
                                type="button"
                                onClick={this.props.closeOn}
                                className="btn btn-grey add-category-cancel"
                            >
                                Cancel
              </Button>
                        </form>
                    </Col>
                </Modal.Body>
            </Modal>
        );
    }
}
