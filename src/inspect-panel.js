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
                Click on a component on the right to get information about it in this panel
            </div>

            <div>
                Name: [[componentName]]
            </div>

            <a href="https://github.com/filethis/[[componentName]]" target="_blank">GitHub Repository</a>

        </div>

        <!--<marked-element>-->
            <!--<div slot="markdown-html"></div>-->
            <!--<script type="text/markdown">-->
                <!--[[componentName]]-->

                <!--We can even embed elements without fear of the HTML parser mucking up their-->
                <!--textual representation:-->

                <!--\`\`\`html-->
                <!--<awesome-sauce>-->
                <!--<div>Oops, I'm about to forget to close this div.-->
                <!--</awesome-sauce>-->
                <!--\`\`\`-->
            <!--&lt;/script>-->
        <!--</marked-element>-->
`,

  is: 'inspect-panel',

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
  }
})
