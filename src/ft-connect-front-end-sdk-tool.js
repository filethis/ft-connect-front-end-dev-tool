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
/*
`ft-connect-front-end-sdk-tool`
A development tool to assist partners in developing a front-end to FileThis services.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/app-route/app-location.js';

import '@polymer/app-route/app-route.js';
import 'ft-confirmation-dialog/ft-confirmation-dialog.js';
import 'ft-connect-expand-out/ft-connect-expand-out.js';
import 'ft-connect-tabbed/ft-connect-tabbed.js';
import 'ft-connect-wizard/ft-connect-wizard.js';
import 'ft-connect-wizard/demo/ft-connect-wizard-settings-editor.js';
import 'ft-connection-panel/demo/ft-connection-panel-settings-editor.js';
import 'ft-connection-list-item/demo/ft-connection-list-item-settings-editor.js';
import 'ft-document-panel/demo/ft-document-panel-settings-editor.js';
import 'ft-element-demo/ft-element-demo.js';
import 'ft-source-panel/demo/ft-source-panel-settings-editor.js';
import 'ft-url-param-behavior/ft-url-param-behavior.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/polymer/polymer-legacy.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import './manager-panel.js';
import './configuration-panel.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning iron-flex-factors"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
                @apply --layout-vertical;

                --paper-button-raised-keyboard-focus: {
                    font-weight: normal;
                };
                --paper-button-flat-keyboard-focus: {
                    font-weight: normal;
                };
            }

            /* Custom Styling */
            :host > *
            {
                --ft-source-panel: {
                    background-color: white;
                };
                /*--ft-source-panel-header: {*/
                    /*background-color: dodgerblue;*/
                /*};*/
                /*--ft-source-panel-header: {*/
                    /*height: 120px;*/
                    /*@apply --layout-center-unset;*/
                    /*@apply --layout-vertical;*/
                /*};*/
                /*--ft-source-panel-search-field: {*/
                    /*background-color:dodgerblue;*/
                    /*width: initial;*/
                    /*@apply --layout-flex;*/
                /*};*/
            }
        </style>

        <!-- Custom Settings -->
        <ft-source-panel-settings ft-source-panel-heading="Please choose a website">
        </ft-source-panel-settings>

        <!-- Two-way bind the application route to the browser's address bar -->
        <!--<app-location-->
            <!--use-hash-as-path-->
            <!--route="{{route}}"-->
        <!--&gt;-->
        <!--</app-location>-->

        <!-- Header -->
        <div class="layout horizontal center" style="height:60px; border-bottom: 2px solid #DDD; ">

            <!-- Heading -->
            <div style="font-family:Arial; font-size: 16pt; padding-left: 20px; ">
                FileThisConnect Front-End SDK Tool
            </div>

            <!-- Guide button -->
            <ft-labeled-icon-button style="padding-left:20px; " hidden="true" icon="explore" label="Guide" on-tap="_onGuideButtonTapped">
            </ft-labeled-icon-button>

            <!-- Divider -->
            <!--<div-->
                <!--style="width:25px; height: 70%; border-left: 1px solid #EEE; margin-left: 25px; "-->
            <!--&gt;-->
            <!--</div>-->

            <!-- Platform menu -->
            <paper-dropdown-menu id="platformMenu" label="Platform" style="width:140px; " no-animations="true">
                <paper-listbox class="dropdown-content" slot="dropdown-content" selected="{{_selectedPlatformIndex}}">
                    <template is="dom-repeat" items="[[platforms]]" as="platform">
                        <paper-item>[[platform]]</paper-item>
                    </template>
                </paper-listbox>
            </paper-dropdown-menu>

            <!--<div-->
                <!--style="-->
                    <!--width:2px;-->
                    <!--height: 70%;-->
                    <!--border-left: 1px solid #EEE;-->
                    <!--margin-left: 25px;-->
                <!--"-->
            <!--&gt;-->
            <!--</div>-->

            <!-- Variants -->
            <paper-dropdown-menu id="variantsMenu" label="Web Component Variant" style="width:200px; " no-animations="true">
                <paper-listbox class="dropdown-content" slot="dropdown-content" selected="{{_selectedVariantIndex}}">
                    <template is="dom-repeat" items="[[variants]]" as="variant">
                        <paper-item>[[variant]]</paper-item>
                    </template>
                </paper-listbox>
            </paper-dropdown-menu>

            <!-- API documentation button -->
            <ft-labeled-icon-button id="docsButton" style="padding-left:20px; " icon="info-outline" label="Docs" on-tap="_onDocumentationButtonTapped">
            </ft-labeled-icon-button>

            <!-- GitHub repository button -->
            <ft-labeled-icon-button id="repoButton" style="padding-left:8px; " icon-src="./src/github.svg" label="Repo" on-tap="_onSourcesButtonTapped">
            </ft-labeled-icon-button>

            <!-- Divider -->
            <!--<div style="width:25px; height: 70%; border-left: 1px solid #EEE; margin-left: 22px; "-->
            <!--&gt;-->
            <!--</div>-->

            <!-- Spacer -->
            <div class="flex" style="min-width:30px; "></div>

            <!-- Live button -->
            <ft-labeled-icon-button id="liveButton" toggles="true" style="padding-left:30px; padding-right: 16px; " disabled="[[!canGoLive]]" icon="power-settings-new" label="[[_calculateEnabledButtonLabel(live)]]" active="{{!live}}">
            </ft-labeled-icon-button>

        </div>

        <!-- Main -->
        <div class="flex layout horizontal" style="background-color:#FAFAFA">

            <!-- Manager panel -->
            <manager-panel id="managerPanel" live="{{live}}" can-go-live="{{canGoLive}}" server="{{server}}" user-account-id="{{userAccountId}}" token="{{token}}" component-name="{{componentName}}" style="border-right:2px solid #DDD;">
            </manager-panel>

            <!-- Configuration panel -->
            <configuration-panel id="configurationPanel" style="border-right:2px solid #DDD;" configurations="{{_configurations}}" selected-configuration="{{selectedConfiguration}}" ft-connect-wizard-show-documents-panel="{{ftConnectWizardShowDocumentsPanel}}" ft-connect-wizard-show-document-count-badge="{{ftConnectWizardShowDocumentCountBadge}}" ft-connection-panel-show-heading="{{ftConnectionPanelShowHeading}}" ft-connection-panel-heading="{{ftConnectionPanelHeading}}" ft-connection-panel-show-delete-button="{{ftConnectionPanelShowDeleteButton}}" ft-connection-show-details-panel="{{ftConnectionShowDetailsPanel}}" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}" ft-document-panel-show-heading="{{ftDocumentPanelShowHeading}}" ft-document-panel-heading="{{ftDocumentPanelHeading}}" ft-document-panel-show-grid-button="{{ftDocumentPanelShowGridButton}}" ft-document-panel-show-list-button="{{ftDocumentPanelShowListButton}}" ft-document-panel-view-as-initial="{{ftDocumentPanelViewAsInitial}}" ft-document-panel-show-preview-button="{{ftDocumentPanelShowPreviewButton}}" ft-document-panel-show-upload-button="{{ftDocumentPanelShowUploadButton}}" ft-document-panel-show-download-button="{{ftDocumentPanelShowDownloadButton}}" ft-document-panel-show-delete-button="{{ftDocumentPanelShowDeleteButton}}" ft-document-panel-show-document-count="{{ftDocumentPanelShowDocumentCount}}" ft-source-panel-filters="{{ftSourcePanelFilters}}" ft-source-panel-show-filters="{{ftSourcePanelShowFilters}}" ft-source-panel-heading="{{ftSourcePanelHeading}}" ft-source-panel-show-heading="{{ftSourcePanelShowHeading}}" ft-source-panel-show-search-field="{{ftSourcePanelShowSearchField}}">
            </configuration-panel>

            <!-- FileThis Connect panel -->
            <div class="flex layout vertical center">
                <!-- Live or dead pages -->
                <iron-pages id="liveOrDeadPages" class="flex" style="width:100%; box-sizing:border-box;" attr-for-selected="name" selected="{{_liveOrDeadPageName}}">
                    <div class="layout vertical center" name="live" style="width:100%; height: 100%; ">
                        <!-- ft-connect-tabbed -->
                        <template is="dom-if" if="[[_variantTabbed]]" restamp="true">
                            <ft-element-demo name="ft-connect-tabbed" use-local-data="true" show-header="false" style="width:100%; height: 100%; " account-id="[[userAccountId]]" token="[[token]]" configurations="[[_configurations]]">
                                <ft-connect-tabbed id="instance" slot="instance" style="width:100%; height: 100%; " live="[[live]]" server="[[server]]" api-path="[[apiPath]]" user-account-id="[[userAccountId]]" token="[[token]]" interaction-version="[[interactionVersion]]" route="{{route}}" debug="true" fake-sources="true" on-ft-connect-error="_handleFileThisConnectErrorEvent">
                                </ft-connect-tabbed>
                            </ft-element-demo>
                        </template>

                        <!-- ft-connect-wizard -->
                        <template is="dom-if" if="[[_variantWizard]]" restamp="true">
                            <ft-element-demo name="ft-connect-wizard" version="0.0.11" show-header="false" style="width:100%; height: 100%; " account-id="[[userAccountId]]" token="[[token]]" configurations="[[_configurations]]">
                                <ft-connect-wizard id="instance" slot="instance" style="width:100%; height: 100%; " live="[[live]]" server="[[server]]" api-path="[[apiPath]]" user-account-id="[[userAccountId]]" token="[[token]]" interaction-version="[[interactionVersion]]" selected-panel-name="{{selectedPanelName}}" debug="true" fake-sources="true" on-ft-connect-error="_handleFileThisConnectErrorEvent" on-wizard-canceled-command="_handleWizardCanceledCommand" on-wizard-done-command="_handleWizardDoneCommand" ft-connect-wizard-show-documents-panel="{{ftConnectWizardShowDocumentsPanel}}" ft-connect-wizard-show-document-count-badge="{{ftConnectWizardShowDocumentCountBadge}}" ft-connection-panel-show-heading="{{ftConnectionPanelShowHeading}}" ft-connection-panel-heading="{{ftConnectionPanelHeading}}" ft-connection-panel-show-delete-button="{{ftConnectionPanelShowDeleteButton}}" ft-connection-show-details-panel="{{ftConnectionShowDetailsPanel}}" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}" ft-document-panel-show-heading="{{ftDocumentPanelShowHeading}}" ft-document-panel-heading="{{ftDocumentPanelHeading}}" ft-document-panel-show-grid-button="{{ftDocumentPanelShowGridButton}}" ft-document-panel-show-list-button="{{ftDocumentPanelShowListButton}}" ft-document-panel-view-as-initial="{{ftDocumentPanelViewAsInitial}}" ft-document-panel-show-preview-button="{{ftDocumentPanelShowPreviewButton}}" ft-document-panel-show-upload-button="{{ftDocumentPanelShowUploadButton}}" ft-document-panel-show-download-button="{{ftDocumentPanelShowDownloadButton}}" ft-document-panel-show-delete-button="{{ftDocumentPanelShowDeleteButton}}" ft-document-panel-show-document-count="{{ftDocumentPanelShowDocumentCount}}" ft-source-panel-filters="{{ftSourcePanelFilters}}" ft-source-panel-show-filters="{{ftSourcePanelShowFilters}}" ft-source-panel-heading="{{ftSourcePanelHeading}}" ft-source-panel-show-heading="{{ftSourcePanelShowHeading}}" ft-source-panel-show-search-field="{{ftSourcePanelShowSearchField}}">
                                </ft-connect-wizard>
                            </ft-element-demo>
                        </template>

                        <!-- ft-connect-expand-out -->
                        <template is="dom-if" if="[[_variantExpandOut]]" restamp="true">
                            <div style="height:100px; "></div>
                            <ft-connect-expand-out id="instance" live="[[live]]" server="[[server]]" api-path="[[apiPath]]" user-account-id="[[userAccountId]]" token="[[token]]" interaction-version="[[interactionVersion]]" route="{{route}}" debug="true" fake-sources="true" on-ft-connect-error="_handleFileThisConnectErrorEvent">
                            </ft-connect-expand-out>
                        </template>

                    </div>

                    <!-- Disabled page -->
                    <div name="dead" class="layout vertical center" style="width:100%; height: 100%; box-sizing:border-box; ">
                        <!-- Spacer -->
                        <div style="height:77px; "></div>

                        <!-- Dotted outline to show where the component will go -->
                        <div class="layout vertical center" style="
                                width: 800px; height: 500px;
                                border-style:dashed;
                                border-color:black;
                                border-width:2px;
                                padding:10px;
                                box-sizing:border-box;
                            ">

                            <!-- Heading -->
                            <div style="color:#A9A9A9; font-family: Arial, Helvetica, sans-serif;">[[selectedVariant]]</div>

                            <!-- Instructions -->
                            <div class="layout horizontal center" style="height:100% ">

                                <div class="layout vertical start">

                                    <div>Click the power button in the upper right corner</div>
                                    <div>to inject the user access token into this component</div>
                                    <div>and tell it connect to the FileThis services.</div>

                                </div>

                            </div>
                        </div>
                    </div>

                </iron-pages>
            </div>
        </div>

        <!-- Confirmation dialog -->
        <ft-confirmation-dialog id="confirmationDialog"></ft-confirmation-dialog>
`,

  is: 'ft-connect-front-end-sdk-tool',

  behaviors: [
      FileThis.ErrorBehavior,
      FileThis.HttpBehavior,
      FileThis.UrlParamBehavior,
  ],

  listeners:
  {
      "tap": "_onTap",
      'internal-settings-changed': '_onInternalSettingsChanged',
  },

  properties:
  {
      // Variant

      selectedVariant:
      {
          type: String,
          notify: true,
          value: "ft-connect-wizard",
          observer: "_onSelectedVariantChanged"
      },

      variants:
      {
          type: Array,
          notify: true,
          value: [
              '<ft-connect-wizard>',
              '<ft-connect-tabbed>',
              '<ft-connect-expand-out>',
          ]
      },

      _selectedVariantIndex:
      {
          type: Number,
          notify: true,
          value: "0",
          observer: "_onSelectedVariantIndexChanged"
      },


      // Platform

      selectedPlatform:
      {
          type: String,
          notify: true,
          value: "web",
          observer: "_onSelectedPlatformChanged"
      },

      platforms:
      {
          type: Array,
          notify: true,
          value: [
              'Web',
              'iOS - Hybrid',
              'Android - Hybrid',
          ]
      },

      _selectedPlatformIndex:
      {
          type: Number,
          notify: true,
          value: "0",
          observer: "_onSelectedPlatformIndexChanged"
      },

      /** Whether the FileThis Connect instance is live or not */
      live:
      {
          type: Object,
          notify: true,
          value: false,
          observer: "_onLiveChanged"
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
          value: ""
      },

      /** The end-user FileThis token. Used to authenticate and authorize requests to the FileThis API endpoints. */
      token:
      {
          type: String,
          value: ""
      },

      /** Version of user interaction schema to use. */
      interactionVersion:
      {
          type: Object,  // JSON
          value: "1.0.0"
      },

      componentName:
      {
          type: String,
          notify: true,
          value: null
      },

      // TODO: Remove once polling is done
      pollForChangeNotifications:
      {
          type: Boolean,
          value: true
      },

      _liveOrDeadPageName:
      {
          type: String,
          value: "dead"
      },

      _suppressWriteToLocalStorage: {
          type: Boolean,
          value: true
      },

      _variantExpandOut: {
          type: Boolean,
          value: false
      },

      _variantTabbed: {
          type: Boolean,
          value: false
      },

      _variantWizard: {
          type: Boolean,
          value: false
      },

      _variantExpandIn: {
          type: Boolean,
          value: false
      },

      // Configurations

      _configurations:{
          type: Array,
          notify: true,
          value: [
              {
                  name: "ft-connect-wizard",
                  label: "<ft-connect-wizard>",
              },
              {
                  name: "ft-connection-list-item",
                  label: "<ft-connection-list-item>",
              },
              {
                  name: "ft-connection-panel",
                  label: "<ft-connection-panel>",
              },
              {
                  name: "ft-document-panel",
                  label: "<ft-document-panel>",
              },
              {
                  name: "ft-source-panel",
                  label: "<ft-source-panel>",
              },
              // {
              //     name: "ft-source-grid-item",
              //     label: "<ft-source-grid-item>",
              // },
          ],
      },

      selectedConfiguration:
          {
              type: Object,
              value: null,
              notify: true,
              observer: "_onSelectedConfigurationChanged"
          },
  },

  ready: function()
  {
      // TODO: Make auto-enable at startup a preference?
      this.async(function()
      {
          // if (this.canGoLive)
          //     this.live = true;

          if (this.getUrlParam("devel"))
          {
              this.$.platformMenu.style.display = "block";
              this.$.variantsMenu.style.display = "block";
              this.$.docsButton.style.display = "block";
              this.$.repoButton.style.display = "block";
          }
          else
          {
              this.$.platformMenu.style.display = "none";
              this.$.variantsMenu.style.display = "none";
              this.$.docsButton.style.display = "none";
              this.$.repoButton.style.display = "none";
          }

      }, 500);
  },

  _onSelectedConfigurationChanged: function(to, from)
  {
      var selectedConfiguration = this.selectedConfiguration;
      if (!selectedConfiguration)
          return;
      switch (selectedConfiguration.name)
      {
          case "ft-connection-list-item":
          case "ft-connection-panel":
              this.selectedPanelName = "connections";
              break;

          case "ft-document-panel":
              this.selectedPanelName = "documents";
              break;

          case "ft-source-panel":
              this.selectedPanelName = "sources";
              break;
      }
  },

  _onTap: function(event)
  {
      // var componentName = event.ftComponentName;
      // this._inspect(componentName);
  },

  _onGuideButtonTapped: function(event)
  {
      this._openGuidePage();
  },

  _onDocumentationButtonTapped: function(event)
  {
      this._openConnectElementDocumentationPage();
  },

  _onSourcesButtonTapped: function(event)
  {
      this._openConnectElementSourcesPage();
  },

  _onInternalSettingsChanged: function(event)
  {
      this.$.configurationPanel.updateSettingsDefaultButtonEnabled();
  },

  _openGuidePage: function(event)
  {
      var url = "https://filethis.com/developer/front-end/ft-development-tool/";
      this._openUrl(url);
  },

  _openConnectElementDocumentationPage: function(event)
  {
      var url = "https://filethis.github.io/" + this.selectedVariant;
      this._openUrl(url);
  },

  _openConnectElementSourcesPage: function(event)
  {
      var url = "https://github.com/filethis/" + this.selectedVariant;
      this._openUrl(url);
  },

  _openUrl: function(url)
  {
      var win = window.open(url, '_blank');
      if (win)
          win.focus();
      else
          this.$.confirmationDialog.alert("Please allow popups for this site");
  },

  _inspect: function(componentName)
  {
      if (!!componentName)
          this.componentName = componentName;
      else
          this.componentName = null;
  },

  _onLiveChanged: function(to, from)
  {
      if (this.live)
          this._liveOrDeadPageName = "live";
      else
          this._liveOrDeadPageName = "dead";

      // Change the icon color of the power button
      var iconColor;
      if (this.live)
          iconColor = "limegreen";
      else
          iconColor = "firebrick";
      this.$.liveButton.updateStyles({
          '--ft-labeled-icon-button-icon-fill-color': iconColor
      });
  },

  _calculateEnabledButtonLabel: function(live)
  {
      if (live)
          return "On";
      else
          return "Off";
  },

  _handleFileThisConnectErrorEvent: function(event)
  {
      this.live = false;

      var message = this._getErrorMessageFromEvent(event);
      if (message)
          this.$.confirmationDialog.alert(message);
      else
          this.handleCaughtError(event.detail);
  },

  _getErrorMessageFromEvent: function(event)
  {
      var detail = event.detail;
      if (!detail)
          return null;
      var response = detail.response;
      if (!response)
          return null;
      var status = response.status;
      if (!status)
          return null;
      if (status === 400)
          return "The current FileThis user access token has expired.\n\nCreate a new one using the fixture panel on the left.";
      var message = response.message;
      if (!message)
          return null;
      return message;
  },

  _handleWizardCanceledCommand: function()
  {
      this.$.confirmationDialog.alert("When the user clicks the \"Cancel\" button, your \"wizard-canceled-command\" event handler should do the appropriate thing in your workflow.");
  },

  _handleWizardDoneCommand: function()
  {
      this.$.confirmationDialog.alert("When the user clicks the \"Done\" button, your \"wizard-done-command\" event handler should do the appropriate thing in your workflow.");
  },

  // Variant

  _onSelectedVariantChanged: function(to, from)
  {
      // Update the popup selection
      this._selectedVariantIndex = this._mapVariantToIndex(this.selectedVariant);

      this._variantWizard = false;
      this._variantTabbed = false;
      this._variantExpandOut = false;

      switch (this.selectedVariant)
      {
          case "ft-connect-wizard":
              this._variantWizard = true;
              break;
          case "ft-connect-tabbed":
              this._variantTabbed = true;
              break;
          case "ft-connect-expand-out":
              this._variantExpandOut = true;
              break;
          default:
              throw new Error("Unknown FileThis Connect variant: " + variant);
      }
  },

  _mapVariantToIndex: function(variant)
  {
      switch (variant)
      {
          case "ft-connect-wizard":
              return 0;
          case "ft-connect-tabbed":
              return 1;
          case "ft-connect-expand-out":
              return 2;
          default:
              throw new Error("Unknown FileThis Connect variant: " + variant);
      }
  },

  _onSelectedVariantIndexChanged: function()
  {
      switch (this._selectedVariantIndex)
      {
          case 0:
              this.selectedVariant = "ft-connect-wizard";
              break;
          case 1:
              this.selectedVariant = "ft-connect-tabbed";
              break;
          case 2:
              this.selectedVariant = "ft-connect-expand-out";
              break;
          default:
              throw new Error("Invalid variant index: " + this._selectedVariantIndex.toString());
      }
  },

  // Platform

  _onSelectedPlatformChanged: function(to, from)
  {
      // Update the popup selection
      this._selectedPlatformIndex = this._mapPlatformToIndex(this.selectedPlatform);

//                this._platformDesktop = false;
//                this._platformIos = false;
//                this._platformAndroid = false;

//                switch (this.selectedPlatform)
//                {
//                    case "web":
//                        this._platformDesktop = true;
//                        break;
//                    case "ios":
//                        this._platformIos = true;
//                        break;
//                    case "android":
//                        this._platformAndroid = true;
//                        break;
//                    default:
//                        throw new Error("Unknown FileThis Connect platform: " + platform);
//                }
  },

  _mapPlatformToIndex: function(platform)
  {
      switch (platform)
      {
          case "web":
              return 0;
          case "ios":
              return 1;
          case "android":
              return 2;
          default:
              throw new Error("Unknown FileThis Connect platform: " + platform);
      }
  },

  _onSelectedPlatformIndexChanged: function()
  {
      switch (this._selectedPlatformIndex)
      {
          case 0:
              this.selectedPlatform = "web";
              break;
          case 1:
              this.selectedPlatform = "ios";
              break;
          case 2:
              this.selectedPlatform = "android";
              break;
          default:
              throw new Error("Invalid platform index: " + this._selectedPlatformIndex.toString());
      }
  }
})
