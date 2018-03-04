## Howdy, Partner!

This page is an early draft of documentation for the FileThis "Partner Application" web component which is currently under active development. When complete, this component can be embedded into our partner's own web pages to provide out-of-the box integration with our Document Aggregation Service (DAS). Partner end-users will be able to seamlessly interact with the FileThis services in the context of each partner's own pages and workflows. The component is customizable in many ways: CSS, runtime configuration options, the adding, removing, or re-composition of sub-components, and even forking of source code from our public repositories to make deeper changes. 

Before the full application component is complete, we are releasing the sub-components which make it up, in the hope that they may be useful to our partners, either as living examples of what is to come, or in their own right as parts of integration work already in progress.

Of the several sub-components we are publishing, there is one in particular that may be of immediate use: Our "user interaction" form. User interaction requests are abstract representations of the various challenge questions that can be posed by a website when our services log in and traverse them. These questions must be conveyed to the end-user for them to answer in realtime. When our service gets the user's response back, the fetching process resumes, resulting in the delivery of documents. Our [ft-user-interaction-form](https://filethis.github.io/ft-user-interactions-demo) component takes as input the JSON representation of a user interaction request, dynamically renders a GUI dialog from it, collects user input, and generates the JSON representation of the response to be sent back to our servers. Having a drop-in implementation of this UI and behavior will save a considerable amount of time and trouble for partners and we want to make it available even before the full solution is ready.


## Google Polymer

To build our web components, we have chosen to use a JavaScript library called [Google Polymer](https://www.polymer-project.org/). Google founded an independent organization at [WebComponents.org](https://www.webcomponents.org/) to support Polymer and other component libraries that adhere to a set of published standards. 

As this document evolves, we will say more here about how to get started with Polymer and how to set up your development environment to build and test our components. Until then, we refer you to their [online documentation](https://www.polymer-project.org/1.0/docs/devguide/feature-overview). Note that our components are built on version 1 of Polymer, not yet the latest 2.0 that is frontmost on their website. We will be porting our code to the latest version, in due course. As an instantiator of the components, you will see very little difference in element public API's between the versions.


## Exploring the FileThis Partner Application Web Components

As you will read in the Polymer documentation, Polymer elements are published in two ways: As unique GitHub repositories, and as Bower packages. The latter are used to pull down versions of published component code and their library dependencies into development and deployment environments. The GitHub repositories provide versioned source code that can be pulled and/or forked for customization.

Polymer provides some very nice support for the documentation of components. It will generate a documentation page from source file [JSDoc](http://usejsdoc.org/) annotations of element properties, methods, and events. Furthermore, if developers take the time to write a simple demo app to illustrate the appearance and behavior of an element, Polymer will include this live demo on the generated documentation page. We have taken advantage of this to create documentation for each of our elements.

The following is a list of the more mature FileThis partner application components. Note that there is a button at the top right of each of the documentation pages that toggles between the API documentation and an element demo.

-------------------------------

### Source Panel

ft-source-panel&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-source-panel/components/ft-source-panel/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-source-panel)

ft-create-connection-dialog&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-create-connection-dialog/components/ft-create-connection-dialog/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-create-connection-dialog)

-------------------------------

### Connection Panel

ft-connection-panel&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-connection-panel/components/ft-connection-panel/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-connection-panel)

ft-connection-list&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-connection-list/components/ft-connection-list/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-connection-list)

ft-connection-list-item&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-connection-list-item/components/ft-connection-list-item/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-connection-list-item)

ft-connection-details&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-connection-details/components/ft-connection-details/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-connection-details)

-------------------------------

### Document Panel

ft-document-panel&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-document-panel/components/ft-document-panel/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-document-panel)

ft-document-list&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-document-list/components/ft-document-list/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-document-list)

ft-document-list-item&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-document-list-item/components/ft-document-list-item/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-document-list-item)

ft-document-grid&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-document-grid/components/ft-document-grid/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-document-grid)

ft-document-grid-item&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-document-grid-item/components/ft-document-grid-item/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-document-grid-item)

-------------------------------

### User Interactions

ft-user-interaction-form&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-user-interaction-form/components/ft-user-interaction-form/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-user-interaction-form)

ft-user-interactions-demo&nbsp;&nbsp;[documentation](https://filethis.github.io/ft-user-interactions-demo/components/ft-user-interactions-demo/)&nbsp;&nbsp;[repository](https://github.com/filethis/ft-user-interactions-demo)


## Caveat Hackor

Our code is under very active development. Please consider it potentially-useful late-alpha, early-beta software. It will settle down once we release the first version of our full partner application component. Because it is strictly versioned, though, you can lock in the use of a particular sub-component version in your code, but be aware that subsequent versions may change considerably. We use [semantic versioning](http://semver.org/) and you can therefore know by the version number increments whether the changes require you to modify your own code for compatibility, or not. The "SemVer" rules for bumping the numbers are, in brief:

    Given a version number MAJOR.MINOR.PATCH, increment the:

        MAJOR version when you make incompatible API changes,
        MINOR version when you add functionality in a backwards-compatible manner, and
        PATCH version when you make backwards-compatible bug fixes.

