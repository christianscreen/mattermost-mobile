// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {OnlineStatus, AwayStatus, OfflineStatus} from 'app/components/status_icons';

import {General} from 'mattermost-redux/constants';

import {changeOpacity, makeStyleSheetFromTheme} from 'app/utils/theme';

export default class ChannelIcon extends React.PureComponent {
    static propTypes = {
        isActive: PropTypes.bool,
        isInfo: PropTypes.bool,
        isUnread: PropTypes.bool,
        membersCount: PropTypes.number,
        size: PropTypes.number,
        status: PropTypes.string,
        theme: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired
    };

    static defaultProps = {
        isActive: false,
        isInfo: false,
        isUnread: false,
        size: 12
    };

    render() {
        const {isActive, isUnread, isInfo, membersCount, size, status, theme, type} = this.props;
        const style = getStyleSheet(theme);

        let activeIcon;
        let unreadIcon;
        let activeGroupBox;
        let unreadGroupBox;
        let activeGroup;
        let unreadGroup;
        let offlineColor = changeOpacity(theme.sidebarText, 0.5);

        if (isUnread) {
            unreadIcon = style.iconUnread;
            unreadGroupBox = style.groupBoxUnread;
            unreadGroup = style.groupUnread;
        }

        if (isActive) {
            activeIcon = style.iconActive;
            activeGroupBox = style.groupBoxActive;
            activeGroup = style.groupActive;
        }

        if (isInfo) {
            activeIcon = style.iconInfo;
            activeGroupBox = style.groupBoxInfo;
            activeGroup = style.groupInfo;
            offlineColor = changeOpacity(theme.centerChannelColor, 0.5);
        }

        let icon;

        if (type === General.OPEN_CHANNEL) {
            icon = (
                <Icon
                    name='globe'
                    style={[style.icon, unreadIcon, activeIcon, {fontSize: size}]}
                />
            );
        } else if (type === General.PRIVATE_CHANNEL) {
            icon = (
                <Icon
                    name='lock'
                    style={[style.icon, unreadIcon, activeIcon, {fontSize: size}]}
                />
            );
        } else if (type === General.GM_CHANNEL) {
            icon = (
                <View style={[style.groupBox, unreadGroupBox, activeGroupBox, {width: size, height: size}]}>
                    <Text style={[style.group, unreadGroup, activeGroup, {fontSize: (size - 6)}]}>
                        {membersCount}
                    </Text>
                </View>
            );
        } else if (type === General.DM_CHANNEL) {
            if (status === General.ONLINE) {
                icon = (
                    <OnlineStatus
                        width={size}
                        height={size}
                        color={theme.onlineIndicator}
                    />
                );
            } else if (status === General.AWAY) {
                icon = (
                    <AwayStatus
                        width={size}
                        height={size}
                        color={theme.awayIndicator}
                    />
                );
            } else {
                icon = (
                    <OfflineStatus
                        width={size}
                        height={size}
                        color={offlineColor}
                    />
                );
            }
        }

        return (
            <View style={[style.container, {width: size, height: size}]}>
                {icon}
            </View>
        );
    }
}

const getStyleSheet = makeStyleSheetFromTheme((theme) => {
    return {
        container: {
            marginRight: 12,
            alignItems: 'center'
        },
        icon: {
            color: changeOpacity(theme.sidebarText, 0.4)
        },
        iconActive: {
            color: theme.sidebarTextActiveColor
        },
        iconUnread: {
            color: theme.sidebarUnreadText
        },
        iconInfo: {
            color: theme.centerChannelColor
        },
        groupBox: {
            alignSelf: 'flex-start',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: changeOpacity(theme.sidebarText, 0.4),
            justifyContent: 'center'
        },
        groupBoxActive: {
            borderColor: theme.sidebarTextActiveColor
        },
        groupBoxUnread: {
            borderColor: theme.sidebarUnreadText
        },
        groupBoxInfo: {
            borderColor: theme.centerChannelColor
        },
        group: {
            color: changeOpacity(theme.sidebarText, 0.4),
            fontSize: 10,
            fontWeight: '600'
        },
        groupActive: {
            color: theme.sidebarTextActiveColor
        },
        groupUnread: {
            color: theme.sidebarUnreadText
        },
        groupInfo: {
            color: theme.centerChannelColor
        }
    };
});
