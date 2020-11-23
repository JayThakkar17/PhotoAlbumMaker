import React, { Component } from 'react';
import { Col, Modal, Button } from 'react-bootstrap';
import DropzoneComponent from 'react-dropzone-component';
import SweetAlert from 'sweetalert-react';
import { UploadPhoto } from '../services/Album';
import '../../node_modules/dropzone/dist/min/dropzone.min.css'
export default class AddPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            albumId: props.albumId,
            photos: [],
            id: '',
            isDisplay: false,
            maxWidth: 1500,
            maxHeight: 600,
            cancelUpload: false,
            fileCount: 0,
        };
        this.dropzone = null;
        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.jpeg'],
            showFiletypeIcon: true,
            postUrl: 'no-url'
        };
        this.djsConfig = {
            addRemoveLinks: true,
            allowedFiletypes: ['.jpg', '.png', '.jpeg'],
            autoProcessQueue: false,
            params: {
                id: this.state.id
            }
        };
    }

    base64ToFile(dataURI, origFile) {
        var byteString, mimestring;
        if (dataURI.split(',')[0].indexOf('base64') !== -1) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = decodeURI(dataURI.split(',')[1]);
        }
        mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var content = [];
        for (var i = 0; i < byteString.length; i++) {
            content[i] = byteString.charCodeAt(i);
        }
        var newFile = new File(
            [new Uint8Array(content)], origFile.name, { type: mimestring }
        );

        var origProps = [
            "upload", "status", "previewElement", "previewTemplate", "accepted"
        ];
        origProps.map((object, index) => {
            newFile[object] = origFile[object]
            return newFile
        })
        var fileSize = this.formatBytes(newFile.size)
        newFile.previewElement.getElementsByClassName('dz-size')[0].textContent = fileSize
        return newFile;
    }

    resizeImage(event, file) {
        var self = this;
        var width = event.target.width;
        var height = event.target.height;
        if (width > 1500) {
            if (width > height) {
                if (width > self.state.maxWidth) {
                    height *= self.state.maxWidth / width;
                    width = self.state.maxWidth;
                }
            } else {
                if (height > self.state.maxHeight) {
                    width *= self.state.maxHeight / height;
                    height = self.state.maxHeight;
                }
            }
        }
        return { width: width, height: height }
    }

    handleUploadFile(file) {
        var self = this
        var reader = new FileReader();
        reader.addEventListener("load", function (event) {
            var origImg = new Image();
            origImg.src = event.target.result;
            origImg.addEventListener("load", function (event) {
                var newImage = self.resizeImage(event, file)
                // Resize
                var canvas = document.createElement('canvas');
                canvas.width = newImage.width;
                canvas.height = newImage.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(origImg, 0, 0, newImage.width, newImage.height);
                var resizedFile = self.base64ToFile(canvas.toDataURL(), file);

                // Replace original with resized
                var origFileIndex = self.dropzone.files.indexOf(file);
                self.dropzone.files[origFileIndex] = resizedFile;
                self.setState({ isDisplay: true })
                if (self.state.isDisplay === true) {
                    self.uploadNewImage(resizedFile)
                }
            });
        });
        reader.readAsDataURL(file);
    }
    formatBytes(bytes, decimals) {
        if (0 === bytes) return "0 Bytes";
        var c = 1024, d = decimals || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(bytes) / Math.log(c));
        return parseFloat((bytes / Math.pow(c, f)).toFixed(d)) + " " + e[f]
    }

    uploadNewImage(file) {
        var self = this;
        let data = new FormData();
        var dropzoneOptions = this.dropzone.options;
        data.append('avatar[]', file);
        data.append('aname', self.state.albumId)
        if (this.state.cancelUpload === false) {
            UploadPhoto(data, self.state.albumId)
                .then(function (response) {
                    self.handleSuccessResponse(response, file);
                })
                .catch(function (error) {
                    const response = error.response;
                    if (response && response.data.errors.length > 0) {
                        file.previewElement.classList.add('dz-complete');
                        dropzoneOptions.error(
                            file,
                            'Image ' + response.data.errors[1].detail
                        );
                    }
                });
        }
    }

    uploadProgress = (file, progress) => {
        this.dropzone.options.uploadprogress(file, progress);
    };

    handlePhotoRendering(file, action, response = undefined) {
        var { photos } = this.state;
        var count = this.state.fileCount + 1
        if (action === 'insert') {
            var newPhoto = response.data.data.photos[0];
            file.id = newPhoto.id;
            photos.push(newPhoto);
        } else if (action === 'remove') {
        }
        this.setState({ photos: photos, fileCount: count });
    }

    handleSuccessResponse(response, file) {
        var dropzoneOptions = this.dropzone.options;
        if (response.status === 200) {
            this.handlePhotoRendering(file, 'insert', response);
            file.previewElement.classList.add('dz-complete');
            dropzoneOptions.success(file);
        }
    }

    showDialogueBox() {
        this.setState({
            alert: {
                show: true,
                title: 'Are you sure?',
                text: "Photo upload is going on, are you sure you want to cancel uploading?",
                btnText: 'Yes, cancel it!',
                type: 'warning',
                confirmAction: () => this.handleOk(),
                cancelBtn: true
            }
        });
    }

    hideDialogueBox() {
        this.setState({ alert: { show: false } });
        this.props.closeOn();
        this.props.renderNewPhotos(this.state.photos);
    }
    hideCancelDialogueBox() {
        this.setState({ alert: { show: false } });
    }

    handleOk() {
        this.setState({
            cancelUpload: true
        });
        this.hideDialogueBox()
    }

    closeOn() {
        this.props.renderNewPhotos(this.state.photos);
        this.props.closeOn();
    }

    componentDidMount() {
        var self = this;
        window.addEventListener("beforeunload", (ev) => {
            if (self.dropzone.files.length !== self.state.fileCount) {
                ev.preventDefault();
                ev.returnValue = false;
                if (ev.returnValue === true) {
                    return ev.returnValue = this.handleOk()
                }
                else {
                    return ev.returnValue;
                }
            }
        });
    }

    render() {
        const eventHandlers = {
            init: dz => (this.dropzone = dz),
            addedfile: this.handleUploadFile.bind(this),
        };
        const {
            alert, fileCount
        } = this.state;
        return (
            <Modal
                show={this.props.addPhoto}
                className="shared-album-modal"
                aria-labelledby="contained-modal-title-lg"
                bsSize="large"
            >
                <Modal.Body className="shared-album-body p-none">
                    <Col className="shared-content-wrap" sm={12}>
                        <DropzoneComponent
                            config={this.componentConfig}
                            eventHandlers={eventHandlers}
                            djsConfig={this.djsConfig}
                        />
                        <Col className="text-center p-none" sm={12}>
                            <Button
                                type="button"
                                onClick={() => this.closeOn()}
                                className="btn btn-orange create-album-submit add-photo done-btn"
                            >
                                Done
              </Button>
                        </Col>
                    </Col>
                </Modal.Body>
            </Modal>
        );
    }
}
