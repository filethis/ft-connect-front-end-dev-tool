/*
Copyright 2018 FileThis, Inc.

Licensed under the Apache License, Flavor 2.0 (the "License");
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
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import 'ft-error-behavior/ft-error-behavior.js';

import 'ft-http-behavior/ft-http-behavior.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/marked-element/marked-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
            }
        </style>

        <div class="layout vertical" style="width:400px; padding:12px; ">

            <div>
                Choose a panel name
            </div>

            <!-- First -->
            <paper-button id="firstButton" on-tap="_onFirstButtonTapped" raised="">
                First
            </paper-button>

            <!-- Second -->
            <paper-button id="secondButton" on-tap="_onSecondButtonTapped" raised="">
                Second
            </paper-button>

        </div>
`,

  is: 'style-panel',

  behaviors: [
      FileThis.ErrorBehavior,
      FileThis.HttpBehavior
  ],

  properties:
  {
      componentName:
      {
          type: String,
          notify: true,
          value: null
      }
  },

  _onFirstButtonTapped: function(event)
  {
  },

  _onSecondButtonTapped: function(event)
  {
  },

  changeTheme: function()
  {
      this.customStyle['--my-toolbar-color'] = 'blue';
      this.updateStyles();
  }
})
