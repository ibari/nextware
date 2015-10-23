# NextWare

[![devDependency Status](https://david-dm.org/zurb/foundation-apps-template/dev-status.svg)](https://david-dm.org/zurb/foundation-apps-template#info=devDependencies)

A prototype toolkit that allows users tasked with addressing endemic cybersecurity challenges to facilitate and visualize the various stakeholders involved in their cybersecurity as well as associated threats, incentives and opportunities for collaboration. The prototype toolkit can be used on the open web at www.nextwaresessions.org. This project is intended to allow users to deploy the web app within their own secure environments or to extend and improve the functionality of this prototype.

## Requirements

This project is built with [Foundation for Apps](https://github.com/zurb/foundation-apps), powered by Gulp, Angular, and libsass. 

If you're already an Angular developer, you may instead want to install the components into your own stack using Bower: `bower install foundation-apps`

You'll need the following software installed to get started.

  - [Node.js](http://nodejs.org): Use the installer for your OS.
  - [Git](http://git-scm.com/downloads): Use the installer for your OS.
    - Windows users can also try [Git for Windows](http://git-for-windows.github.io/).
  - [Gulp](http://gulpjs.com/) and [Bower](http://bower.io): Run `npm install -g gulp bower`
    - Depending on how Node is configured on your machine, you may need to run `sudo npm install -g gulp bower` instead, if you get an error with the first command.

## Get Started

Clone this repository.

```bash
git clone https://github.com/ibari/nextware.git nextware
```

Change into the directory.

```bash
cd nextware
```

Install the dependencies. If you're running Mac OS or Linux, you may need to run `sudo npm install` instead, depending on how your machine is configured.

```bash
npm install
bower install
```

While you're working on your project, run:

```bash
npm start
```

This will compile the Sass and assemble your Angular app. **Now go to `localhost:8080` in your browser to see it in action.** When you change any file in the `client` folder, the appropriate Gulp task will run to build new files.

To run the compiling process once, without watching any files, use the `build` command.

```bash
npm start build
```
