// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';

import SizeAwareImage from 'components/size_aware_image';
import * as CommonUtils from 'utils/commons.jsx';
import {PostTypes} from 'utils/constants.jsx';
import {useSafeUrl} from 'utils/url';
import * as Utils from 'utils/utils.jsx';
import {getImageSrc, isSystemMessage} from 'utils/post_utils.jsx';

const DIMENSIONS_NEAREST_POINT_IMAGE = {
    height: 80,
    width: 80,
};

export default class PostAttachmentOpenGraph extends React.PureComponent {
    static propTypes = {

        /**
         * The link to display the open graph data for
         */
        link: PropTypes.string.isRequired,

        /**
         * The current user viewing the post
         */
        currentUser: PropTypes.object,

        /**
         * The post where this link is included
         */
        post: PropTypes.object,

        /**
         * The open graph data to render
         */
        openGraphData: PropTypes.object,

        isEmbedVisible: PropTypes.bool,
        toggleEmbedVisibility: PropTypes.func.isRequired,

        actions: PropTypes.shape({
            editPost: PropTypes.func.isRequired,
        }).isRequired,
    }

    constructor(props) {
        super(props);
        this.handleRemovePreview = this.handleRemovePreview.bind(this);

        const removePreview = this.isRemovePreview(props.post, props.currentUser);
        const imageUrl = this.getBestImageUrl(props.openGraphData);
        const {metadata} = props.post;
        const hasLargeImage = metadata && metadata.images && metadata.images[imageUrl] && imageUrl ? this.hasLargeImage(metadata.images[imageUrl]) : false;
        this.state = {
            hasLargeImage,
            removePreview,
            imageUrl,
        };
    }

    componentDidMount() {
        this.mounted = true;
        if (!this.props.post.metadata) {
            this.fetchData(this.props.link);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
        if (!Utils.areObjectsEqual(nextProps.post, this.props.post)) {
            const removePreview = this.isRemovePreview(nextProps.post, nextProps.currentUser);
            const imageUrl = this.getBestImageUrl(nextProps.openGraphData);
            const {metadata} = nextProps.post;
            const hasLargeImage = metadata && metadata.images && metadata.images[imageUrl] && imageUrl ? this.hasLargeImage(metadata.images[imageUrl]) : false;

            this.setState({
                hasLargeImage,
                removePreview,
                imageUrl,
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    fetchData = (url) => {
        if (!this.props.openGraphData) {
            this.props.actions.getOpenGraphMetadata(url);
        }
    }

    getBestImageUrl(data) {
        if (!data || Utils.isEmptyObject(data.images)) {
            return null;
        }

        const bestImage = CommonUtils.getNearestPoint(DIMENSIONS_NEAREST_POINT_IMAGE, data.images, 'width', 'height');
        return bestImage.secure_url || bestImage.url;
    }

    hasLargeImage({height, width}) {
        let hasLargeImage;
        const largeImageMinRatio = 16 / 9;
        const largeImageMinWidth = 150;

        const imageRatio = width / height;
        if (width >= largeImageMinWidth && imageRatio >= largeImageMinRatio) {
            hasLargeImage = true;
        } else {
            hasLargeImage = false;
        }

        return hasLargeImage;
    }

    onImageLoad = ({width, height}) => {
        if (!this.mounted) {
            return;
        }

        const hasLargeImage = this.hasLargeImage({width, height});

        this.setState({
            hasLargeImage,
        });
    }

    imageToggleAnchorTag(imageUrl) {
        if (imageUrl && this.state.hasLargeImage) {
            return (
                <a
                    className={'post__embed-visibility'}
                    data-expanded={this.props.isEmbedVisible}
                    aria-label='Toggle Embed Visibility'
                    onClick={this.props.toggleEmbedVisibility}
                />
            );
        }
        return null;
    }

    loadLargeImage(imageUrl) {
        if (imageUrl && this.props.isEmbedVisible && this.state.hasLargeImage) {
            const {metadata} = this.props.post;
            let imagesDimensions = null;
            if (metadata && metadata.images && metadata.images[imageUrl]) {
                imagesDimensions = metadata.images[imageUrl];
            }
            return (
                <SizeAwareImage
                    className='attachment__image attachment__image--opengraph large_image'
                    src={imageUrl}
                    dimensions={imagesDimensions}
                    onImageLoaded={this.onImageLoad}
                />
            );
        }
        return null;
    }

    loadSmallImage(imageUrl) {
        if (imageUrl && !this.state.hasLargeImage) {
            const {metadata} = this.props.post;
            let imagesDimensions = null;
            if (metadata && metadata.images && metadata.images[imageUrl]) {
                imagesDimensions = metadata.images[imageUrl];
            }
            return (
                <div className='attachment__image__container--opengraph'>
                    <SizeAwareImage
                        className='attachment__image attachment__image--opengraph'
                        src={imageUrl}
                        dimensions={imagesDimensions}
                        onImageLoaded={this.onImageLoad}
                    />
                </div>
            );
        }
        return null;
    }

    truncateText(text) {
        const maxLength = 300;
        const ellipsis = '...';

        if (text && text.length > maxLength) {
            return text.substring(0, maxLength - ellipsis.length) + ellipsis;
        }
        return text;
    }

    handleRemovePreview = async () => {
        const props = Object.assign({}, this.props.post.props);
        props[PostTypes.REMOVE_LINK_PREVIEW] = 'true';

        const patchedPost = ({
            id: this.props.post.id,
            props,
        });

        const {data} = await this.props.actions.editPost(patchedPost);
        if (data) {
            this.setState({removePreview: true});
        }
    }

    isRemovePreview(post) {
        if (post && post.props) {
            return post.props[PostTypes.REMOVE_LINK_PREVIEW] && post.props[PostTypes.REMOVE_LINK_PREVIEW] === 'true';
        }

        return false;
    }

    render() {
        if (!this.props.post || isSystemMessage(this.props.post)) {
            return null;
        }

        if (this.state.removePreview) {
            return null;
        }

        const data = this.props.openGraphData;
        if (!data) {
            return null;
        }

        let removePreviewButton;
        if (this.props.currentUser.id === this.props.post.user_id) {
            removePreviewButton = (
                <button
                    id='removePreviewButton'
                    type='button'
                    className='btn-close'
                    aria-label='Close'
                    onClick={this.handleRemovePreview}
                >
                    <span aria-hidden='true'>{'×'}</span>
                </button>
            );
        }
        const {imageUrl} = this.state;

        let body;
        if (data.description || imageUrl) {
            body = (
                <React.Fragment>
                    <div className={'attachment__body attachment__body--opengraph'}>
                        <div>
                            <div>
                                {this.truncateText(data.description)}
                                {' '}
                                {this.imageToggleAnchorTag(imageUrl)}
                            </div>
                            {this.loadLargeImage(imageUrl)}
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        return (
            <div
                className='attachment attachment--opengraph'
                ref='attachment'
            >
                <div className='attachment__content'>
                    <div
                        className={'clearfix attachment__container attachment__container--opengraph'}
                    >
                        <div
                            className={'attachment__body__wrap attachment__body__wrap--opengraph'}
                        >
                            <span className='sitename'>{this.truncateText(data.site_name)}</span>
                            {removePreviewButton}
                            <h1
                                className={'attachment__title attachment__title--opengraph' + (data.title ? '' : ' is-url')}
                            >
                                <a
                                    className='attachment__title-link attachment__title-link--opengraph'
                                    href={useSafeUrl(data.url || this.props.link)}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    title={data.title || data.url || this.props.link}
                                >
                                    {this.truncateText(data.title || data.url || this.props.link)}
                                </a>
                            </h1>
                            {body}
                        </div>
                        {this.loadSmallImage(imageUrl)}
                    </div>
                </div>
            </div>
        );
    }
}