// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

export default class StatusDndAvatarIcon extends React.PureComponent {
    render() {
        return (
            <span {...this.props}>
                <FormattedMessage
                    id='mobile.set_status.dnd.icon'
                    defaultMessage='Do Not Disturb Icon'
                >
                    {(ariaLabel) => (
                        <svg
                            id='Layer_1'
                            x='0px'
                            y='0px'
                            width='16px'
                            height='16px'
                            viewBox='0 0 16 16'
                            style={style}
                            role='icon'
                            aria-label={ariaLabel}
                        >
                            <circle className='dnd--icon' cx='8' cy='8' r='4' fill-rule='evenodd'/>                        
                        </svg>
                    )}
                </FormattedMessage>
            </span>
        );
    }
}

const style = {
    enableBackground: 'new -299 391 12 12',
};
