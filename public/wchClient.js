/*
 * Copyright 2017  IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

'use strict';

const username = '{Username}';
const password = '{Password}';
const tenantId = '{Tenant ID}';

const baseTenantApiUrl = 'https://{Hostname}/api/' + tenantId;
const wchLoginURL = baseTenantApiUrl + '/login/v1/basicauth';
const contextualSearchServiceApiUrl = baseTenantApiUrl + '/delivery/v1/contextualsearch';

var loggedIn = true;

function loginToWch(callback) {
    console.log('Trying to login');
    var loginRequestOptions = {
        xhrFields: {
            withCredentials: true
        },
        url: wchLoginURL,
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        }
    };

    $.ajax(loginRequestOptions).done(function() {
        loggedIn = true;
        if (callback) {
            callback();
        }
    }).fail(function(request, textStatus, error) {
        alert('Could not login to Watson Content Hub with error : ' + error);
    });
}

function localeSearch(callback) {
    if (!loggedIn) {
        loginToWch(function() {
            _localeSearch();
        });
    } else {
        _localeSearch();
    }

    function _localeSearch() {
        var localeSearchUrl = contextualSearchServiceApiUrl + getContextualSearchQuery();
        console.log('Retrieving the content from contual search via : ' + localeSearchUrl);
        var contextualSearchRequestOptions = {
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json',
            url: localeSearchUrl,
        };
        $.ajax(contextualSearchRequestOptions).done(function(response) {
            callback(response);
        }).fail(function(request, textStatus, error) {
            alert('Could not search from Watson Content Hub with error : ' + error);
        });
    }
}