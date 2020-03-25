/*
Copyright 2018 FileThis, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*<link rel="import" href="start-panel.html">*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';

import 'ft-accordion-item/ft-accordion-item.js';
import 'ft-labeled-icon-button/ft-labeled-icon-button.js';
import 'ft-test-account-manager/ft-test-account-manager.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/polymer/polymer-legacy.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import './style-panel.js';
import './inspect-panel.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
                @apply --layout-vertical;
            }
        </style>

        <style>
            #managerPanelTabs
            {
                --paper-tabs-selection-bar-color:blue;
            }
            .verticalText
            {
                display: block;
                -webkit-transform: rotate(-90deg);
                -moz-transform: rotate(-90deg);
                -ms-transform: rotate(-90deg);
                -o-transform: rotate(-90deg);
            }
        </style>

        <app-localstorage-document key="managerPanel-managerIsOpen" data="{{_managerIsOpen}}">
        </app-localstorage-document>

        <ft-accordion-item heading="Fixture" is-open="{{_managerIsOpen}}" class="flex">

            <!-- Test account manager panel -->
            <ft-test-account-manager id="testAccountManager" slot="content" name="token" live="{{live}}" can-go-live="{{canGoLive}}" server="{{server}}" show-server="true" api-path="{{apiPath}}" user-account-id="{{userAccountId}}" token="{{token}}">
            </ft-test-account-manager>

        </ft-accordion-item>
`,

  is: 'manager-panel',

  properties:
  {
      /** Whether the FileThis Connect instance is live or not */
      live:
      {
          type: Object,
          notify: true,
          value: false
      },

      /** Whether the FileThis Connect instance can be live or not */
      canGoLive:
      {
          type: Object,
          notify: true,
          value: false
      },

      /** The "base" URL for requests. For example: "https://filethis.com". Note that you should not use a trailing slash. */
      server:
      {
          type: String,
          notify: true,
          value: "https://filethis.com"
      },

      /** The path under the baseUrl used for API requests. For example: "/api/v1". Note that you should use a leading slash, and no trailing slash. */
      apiPath:
      {
          type: String,
          value: "/api/v1"
      },

      /** The user's FileThis account id. */
      userAccountId: {
          type: String,
          notify: true,
          value: ""
      },

      /** The end-user FileThis token. Used to authenticate and authorize requests to the FileThis API endpoints. */
      token:
      {
          type: String,
          notify: true,
          value: ""
      },

      componentName:
      {
          type: String,
          notify: true,
          value: null
      },

      _selectedManagerPanelTabName:
      {
          type: String,
          value: "token"
      },

      _managerIsOpen:
      {
          type: Boolean,
          value: true,
      },
  },

  // Make sure this panel really exists
  _defaultPanelName: "token",

  // Startup -------------------------------------------------------------------------------------

  ready: function()
  {
      this.async(function()
      {
          // We have to be careful here to make sure that removed panels whose names have been stored
          // by a client get mapped to an actual panel.
          var panelName = this._readFromLocalStorage(this.localName + "selectedManagerPanelTabName", this._defaultPanelName);
          if (!this._isValidPanelName(panelName))
              panelName = this._defaultPanelName;

          this._selectedManagerPanelTabName = panelName;
      });
  },

  // User action event handling --------------------------------------------------------------------------

  _onPanelSelected: function()
  {
      localStorage.setItem(this.localName + "selectedManagerPanelTabName", this._selectedManagerPanelTabName);
  },

  _isValidPanelName: function(panelName)
  {
      switch (panelName)
      {
          case "token":
              return true;
      }
      return false;
  },

  // Local storage ----------------------------------------------------------------------------

  _readFromLocalStorage: function(name, defaultValue)
  {
      var value = localStorage.getItem(name);
      if (value === null)
          value = defaultValue;
      return value;
  },

  _readFromLocalStorageBoolean: function(name, defaultValue)
  {
      var value = localStorage.getItem(name);
      if (value === null)
          value = defaultValue;
      return JSON.parse(value);
  }
})
