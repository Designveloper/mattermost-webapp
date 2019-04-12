#!/usr/bin/env bash
echo "=== Running Designveloper's custom script ==="
SEARCH="return user.first_name + ' ' + user.last_name;"
REPLACE="return user.last_name + ' ' + user.first_name;"
sed -i "" "s/${SEARCH}/${REPLACE}/g" ./node_modules/mattermost-redux/utils/user_utils.js
