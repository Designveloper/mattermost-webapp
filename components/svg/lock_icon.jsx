// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {FormattedMessage} from 'react-intl';

export default class LockIcon extends React.PureComponent {
    render() {
        return (
            <span {...this.props}>
                <FormattedMessage
                    id='generic_icons.channel.private'
                    defaultMessage='Private Channel Icon'
                >
                    {(title) => (
                        <svg
                            width='16px'
                            height='16px'
                            viewBox='0 0 16 16'
                            role='icon'
                            title={title}
                        >
                           <path fill='#999C9F' fill-rule='evenodd' d='M10.306 5.411H5.194V4.133A2.558 2.558 0 0 1 7.75 1.578a2.558 2.558 0 0 1 2.556 2.555v1.278zm-1.917 6.271v1.396H7.11v-1.396a1.914 1.914 0 0 1-1.278-1.799c0-1.056.86-1.916 1.917-1.916s1.917.86 1.917 1.916c0 .832-.536 1.535-1.278 1.8zm4.472-6.27h-1.278V4.132A3.837 3.837 0 0 0 7.75.3a3.837 3.837 0 0 0-3.833 3.833v1.278H2.639A.64.64 0 0 0 2 6.05v8.944a.64.64 0 0 0 .639.64H12.86a.64.64 0 0 0 .639-.64V6.05a.64.64 0 0 0-.639-.639z'/>
                        </svg>
                    )}
                </FormattedMessage>
            </span>
        );
    }
}
