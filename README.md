# React Virtual Keyboard

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme) ![npm type definitions](https://img.shields.io/badge/-typescript-black?logo=typescript&style=flat-square) ![build tooling](https://img.shields.io/badge/-vite-green?logo=vite&style=flat-square)

This repository contains React Virtual Keyboard. It is a simple keyboard intended to provide a touch keyboard for devices that might not provide one.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
  - [Local Server](#run-local-server)
- [Related Efforts](#related-efforts)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Background

There are many excellent keyboard implementations for React. The use case for this keyboard is to provide total control over the caret positioning. This is especially useful when formatting the input values.

For example, if you want to format a phone number as (123) 456-7890, you need to be able to move the caret around the input value. This keyboard provides a way to do that. Since the entered value will not be formatted, the caret position is often lost or moved to the end of the input value.

## Install

This project uses [node](http://nodejs.org), [npm](https://npmjs.com) and [vite](https://vitejs.dev/) with React and TypeScript. Go check them out if you don't have them locally installed.

```sh
npm install
```

## Usage

This is only a documentation package. You can print out [spec.md](spec.md) to your console:

### Run Local Server

```sh
$ npm run dev
# Runs a local server
```

## Related Efforts

- [React Simple Keyboard](https://github.com/hodgef/react-simple-keyboard) - 💌 By far the best virtual keyboard for React. It's lightweight, customizable and easy to use.

## Maintainers

[@dewald-els](https://github.com/dewald-els).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/dewald-els/react-virtual-keyboard/issues/new) or submit PRs.

React Virtual Keyboard follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

### Contributors

- [@dewald-els](https://github.com/dewald-els).

## License

[MIT](LICENSE) © Dewald Els
