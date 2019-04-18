// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';

import {getFilePreviewUrl, getFileUrl} from 'mattermost-redux/utils/file_utils';

<<<<<<< HEAD
import SizeAwareImage from 'components/size_aware_image';
=======
>>>>>>> add new fix for load new message
import {FileTypes} from 'utils/constants.jsx';
import {
    getFileType,
} from 'utils/utils';
<<<<<<< HEAD
=======

import LoadingImagePreview from 'components/loading_image_preview';
>>>>>>> add new fix for load new message
import ViewImageModal from 'components/view_image';

const PREVIEW_IMAGE_MIN_DIMENSION = 50;

export default class SingleImageView extends React.PureComponent {
    static propTypes = {
        postId: PropTypes.string.isRequired,
        fileInfo: PropTypes.object.isRequired,
        isRhsOpen: PropTypes.bool.isRequired,
        isEmbedVisible: PropTypes.bool,
        actions: PropTypes.shape({
            toggleEmbedVisibility: PropTypes.func.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        fileInfo: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            showPreviewModal: false,
            dimensions: {
                width: props.fileInfo.width,
                height: props.fileInfo.height,
            },
        };
    }

    componentDidMount() {
<<<<<<< HEAD
        this.mounted = true;
=======
        window.addEventListener('resize', this.handleResize);
        this.setViewPortWidth();
        this.loadImage(this.props.fileInfo);
>>>>>>> add new fix for load new message
    }

    static getDerivedStateFromProps(props, state) {
        if ((props.fileInfo.width !== state.dimensions.width) || props.fileInfo.height !== state.dimensions.height) {
            return {
                dimensions: {
                    width: props.fileInfo.width,
                    height: props.fileInfo.height,
                },
            };
        }
        return null;
    }

    componentWillUnmount() {
<<<<<<< HEAD
        this.mounted = false;
=======
        window.removeEventListener('resize', this.handleResize);
>>>>>>> add new fix for load new message
    }

    imageLoaded = () => {
        if (this.mounted) {
            this.setState({loaded: true});
        }
    }

<<<<<<< HEAD
=======
    loadImage = (fileInfo) => {
        const {has_preview_image: hasPreviewImage, id} = fileInfo;
        const fileURL = getFileUrl(id);
        const previewURL = hasPreviewImage ? getFilePreviewUrl(id) : fileURL;

        const loaderImage = new Image();

        loaderImage.src = previewURL;
        loaderImage.onload = () => {
            if (this.imageLoaded) {
                this.imageLoaded.src = previewURL;
            }

            this.setState({loaded: true});
        };
    }

>>>>>>> add new fix for load new message
    handleImageClick = (e) => {
        e.preventDefault();
        this.setState({showPreviewModal: true});
    }

    showPreviewModal = () => {
        this.setState({showPreviewModal: false});
    }

<<<<<<< HEAD
=======
    setImageLoadedRef = (node) => {
        this.imageLoaded = node;
    }

    computeImageDimensions = () => {
        const {fileInfo} = this.props;
        const viewPortWidth = this.state.viewPortWidth;

        let previewWidth = fileInfo.width;
        let previewHeight = fileInfo.height;

        if (viewPortWidth && previewWidth > viewPortWidth) {
            const origRatio = fileInfo.height / fileInfo.width;
            previewWidth = Math.min(PREVIEW_IMAGE_MAX_WIDTH, fileInfo.width, viewPortWidth);
            previewHeight = previewWidth * origRatio;
        }

        if (previewHeight > PREVIEW_IMAGE_MAX_HEIGHT) {
            const heightRatio = PREVIEW_IMAGE_MAX_HEIGHT / previewHeight;
            previewHeight = PREVIEW_IMAGE_MAX_HEIGHT;
            previewWidth *= heightRatio;
        }

        return {previewWidth, previewHeight};
    }

>>>>>>> add new fix for load new message
    toggleEmbedVisibility = () => {
        this.props.actions.toggleEmbedVisibility(this.props.postId);
    }

    render() {
        const {fileInfo} = this.props;
        const {
            loaded,
        } = this.state;

<<<<<<< HEAD
        const {has_preview_image: hasPreviewImage, id} = fileInfo;
        const fileURL = getFileUrl(id);
        const previewURL = hasPreviewImage ? getFilePreviewUrl(id) : fileURL;

        const previewHeight = fileInfo.height;
        const previewWidth = fileInfo.width;

=======
        const {previewHeight, previewWidth} = this.computeImageDimensions();
>>>>>>> add new fix for load new message
        let minPreviewClass = '';
        if (
            previewWidth < PREVIEW_IMAGE_MIN_DIMENSION ||
            previewHeight < PREVIEW_IMAGE_MIN_DIMENSION
        ) {
            minPreviewClass = 'min-preview ';

            if (previewHeight > previewWidth) {
                minPreviewClass += 'min-preview--portrait ';
            }
        }

        const toggle = (
            <a
                key='toggle'
                className='post__embed-visibility'
                data-expanded={this.props.isEmbedVisible}
                aria-label='Toggle Embed Visibility'
                onClick={this.toggleEmbedVisibility}
            />
        );

        const fileHeader = (
            <div className='image-name'>
                {toggle}
                <div onClick={this.handleImageClick}>
                    {fileInfo.name}
                </div>
            </div>
        );

        let viewImageModal;
        let fadeInClass = '';

        const fileType = getFileType(fileInfo.extension);
        let styleIfSvgWithDimentions = {};
        let imageContainerStyle = {};
        let svgClass = '';
        if (fileType === FileTypes.SVG) {
            svgClass = 'svg';
            if (this.state.dimensions.height) {
                styleIfSvgWithDimentions = {
                    width: '100%',
                };
            } else {
                imageContainerStyle = {
                    height: 150,
                    width: 'auto',
                };
            }
        }

        if (loaded) {
            viewImageModal = (
                <ViewImageModal
                    show={this.state.showPreviewModal}
                    onModalDismissed={this.showPreviewModal}
                    fileInfos={[fileInfo]}
                    postId={this.props.postId}
                />
            );

            fadeInClass = 'image-fade-in';
        }

        return (
            <div
                className={`${'file-view--single'}`}
            >
                <div
                    className='file__image'
                >
                    {fileHeader}
                    {this.props.isEmbedVisible &&
                    <div
                        className='image-container'
                        style={imageContainerStyle}
                    >
                        <div
                            className={`image-loaded ${fadeInClass} ${svgClass}`}
                            style={styleIfSvgWithDimentions}
                            onClick={this.handleImageClick}
                        >
                            <SizeAwareImage
                                className={minPreviewClass}
                                src={previewURL}
                                dimensions={this.state.dimensions}
                                onImageLoaded={this.imageLoaded}
                                showLoader={this.props.isEmbedVisible}
                            />
                        </div>
                    </div>
                    }
                    {viewImageModal}
                </div>
            </div>
        );
    }
}