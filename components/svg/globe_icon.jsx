// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

export default class GlobeIcon extends React.PureComponent {
    render() {
        return (
            <span {...this.props}>
                <FormattedMessage
                    id='generic_icons.channel.public'
                    defaultMessage='Public Channel Icon'
                >
                    {(ariaLabel) => (
                        <svg
                            width='16px'
                            height='16px'
                            viewBox='0 0 16 16'
                            role='icon'
                            aria-label={ariaLabel}
                        >
                            <g fill='#999C9F' fill-rule='evenodd'>
                                <path d='M7.3 14.677V8.52H3.99c.202 2.816 1.66 4.973 3.31 6.158M11.942 8.519h-3.31v6.158c1.65-1.185 3.109-3.342 3.31-6.158M7.3 7.185V1.023C5.46 2.345 4.19 4.69 3.995 7.185H7.3zM13.276 7.185h2.657A7.997 7.997 0 0 0 9.484 0c2.132 1.58 3.594 4.307 3.792 7.185M8.633 1.022v6.163h3.305c-.195-2.495-1.465-4.84-3.305-6.163M13.277 8.519c-.191 2.916-1.627 5.604-3.78 7.183a7.997 7.997 0 0 0 6.435-7.183h-2.655zM2.656 8.519H0a7.997 7.997 0 0 0 6.436 7.183c-2.154-1.58-3.589-4.267-3.78-7.183M2.657 7.185C2.855 4.307 4.317 1.58 6.449 0A7.997 7.997 0 0 0 0 7.185h2.657z'/>
                             </g>
                        </svg>
                    )}
                </FormattedMessage>
            </span>
        );
    }
}
