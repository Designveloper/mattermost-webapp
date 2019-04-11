// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

export default class StatusAwayAvatarIcon extends React.PureComponent {
    render() {
        return (
            <span {...this.props}>
                <FormattedMessage
                    id='mobile.set_status.away.icon'
                    defaultMessage='Away Icon'
                >
                    {(ariaLabel) => (

                        <svg
                            width='16px'
                            height='16px'
                            viewBox='0 0 16 16'
                            style={style}
                            role='icon'
                            aria-label={ariaLabel}
                        >
                             <circle className='away--icon' cx='8' cy='8' r='4' fill-rule='evenodd'/>
                        </svg>
                    )}
                </FormattedMessage>
            </span>
        );
    }
}

const style = {
    fillRule: 'evenodd',
    clipRule: 'evenodd',
    strokeLinejoin: 'round',
    strokeMiterlimit: 1.41421,
};
