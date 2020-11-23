import React, { Component } from 'react';
import {
    Col,
    Button,
    Modal,
    FormGroup,
    FormControl
} from 'react-bootstrap';
import Select from 'react-select';

// Import icon
// import createTitle from '../../../assets/images/admin/category/add-category-icon.png';
// import editTitle from '../../../assets/images/admin/category/edit-category-icon.png';

// Import components
// import validationHandler from '../../common/ValidationHandler';

// Import services
import { createAlbum, updateAlbum } from '../services/Album';
import { getCategories } from '../services/Category'

// Import helper
import { str2bool, isObjectEmpty } from '../services/Auth';

// Import css
import '../assets/css/add-category.css';

// import '../../node_modules/react-select/dist/react-select-min.css';

export default class AlbumPopup extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        const initialState = {
            albumForm: {
                aname: '',
                catname: '',
                // category_id: '',
                category_option: '',
            },
            categories: [],
            errors: {}
        };

        return initialState;
    }

    handleChange(e) {
        const albumForm = this.state.albumForm;
        var key = e.target.name;
        albumForm[key] = str2bool(e.target.value);
        this.setState({
            albumForm
        });
    }

    handleSubmit(e) {
        var self = this;
        var callAlbumApi = () => { };
        if (isObjectEmpty(self.props.editObject)) {
            var createParams = { album: self.state.albumForm };
            delete createParams.album.category_option
            callAlbumApi = createAlbum(createParams);
        } else {
            var editParams = {
                id: self.props.editObject._id,
                albumForm: { album: self.state.albumForm }
            };
            // debugger
            delete editParams.albumForm.album.category_option
            callAlbumApi = updateAlbum(editParams);
        }

        callAlbumApi
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
            this.resetalbumForm();
            this.props.renderAlbum(
                isObjectEmpty(this.props.editObject) ? responseData.album : responseData,
                isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
            );
            this.props.closeOn();
        } else {
            console.log(responseData.errors);
        }
    }

    resetalbumForm() {
        this.setState({ albumForm: this.getInitialState().albumForm });
    }

    editAlbum(contact) {
        var self = this;
        const { aname, catname } = contact;

        self.setState({
            albumForm: {
                aname: aname,
                category_option: self.editcategoryOptions(catname)
            }
        });
    }

    componentWillMount() {
        var self = this;
        console.log(self);

        getCategories()
            .then(function (response) {
                var data = response.data;
                self.setState({ categories: data });
            })
            .catch(function (error) {
                console.log(error.response);
            });

        if (!isObjectEmpty(self.props.editObject)) {
            self.editAlbum(self.props.editObject);
        }
    }

    updateState(element) {
        this.setState({ value: element });
    }

    categoryOptions(categories = this.state.categories) {
        var options = [];
        categories.map(category => {
            return options.push({
                value: category._id,
                label: category.catname
            });
        });
        return options;
    }

    editcategoryOptions(category) {
        var options = {
            value: category._id,
            label: category.catname
        };
        return options;
    }

    handleSelectChange(value) {
        const albumForm = this.state.albumForm;
        albumForm['category_option'] = value;
        albumForm['catname'] = value.value;
        this.setState({
            albumForm
        });
    }

    render() {
        const { albumForm, errors } = this.state;
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
                                    Album name
                                 </label>
                                <FormControl
                                    className="custom-form-control"
                                    type="text"
                                    name="aname"
                                    placeholder="Album name"
                                    value={albumForm.aname}
                                    onChange={this.handleChange.bind(this)}
                                />
                                {errors['aname'] && (
                                    <span className="input-error text-red">
                                        {errors['aname']}
                                    </span>
                                )}
                            </FormGroup>
                            <FormGroup className="custom-form-group">
                                <label className="custom-form-control-label">
                                    Category name
                                 </label>
                                <Select
                                    className="custom-form-control cat-select"
                                    name="category_option"
                                    value={albumForm.category_option}
                                    options={this.categoryOptions()}
                                    // placeholder="Category"
                                    onChange={this.handleSelectChange.bind(this)}
                                />
                                <span className="custom-addon login-addon">*</span>
                                {errors['category_id'] && (
                                    <span className="input-error text-red">
                                        {errors['category_id']}
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
