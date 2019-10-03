# Prometheus Cross-Platform Application

This code integrates Prometheus UI and Prometheus Backend into a cross-platform application using
[electron-webpack](https://webpack.electron.build/).

## Table of Contents <!-- omit in toc -->

- [Background](#Background)
- [Install](#Install)
  - [Prerequisites](#Prerequisites)
  - [Development Environment](#Development-Environment)
  - [Core Components Used](#Core-Components-Used)
- [Maintainers](#Maintainers)
- [Contributing](#Contributing)
- [License](#License)
- [TODOs](#TODOs)

## Background

This application is one of the user-installable applications's UI that give access to
the [IoP Stack](https://iop.global/the-iop-stack/)™.

## Install

### Prerequisites

* The [prometheus-ui](https://github.com/Internet-of-People/prometheus-ui) repository cloned out on the same directory level as this repository. The renderer's source directory is set to `../prometheus-ui/src`, so it directly uses that repo's code.
  - Run [installation setup](../prometheus-ui/README.md#L23) the prometheus-ui repo.
* The [mercury-rust](https://github.com/Internet-of-People/mercury-rust) repository cloned out on the same directory level as this repository.
* Latest [Rust](https://www.rust-lang.org/)
```sh
$ curl https://sh.rustup.rs -sSf | sh
$ cargo --version
cargo 1.36.0 (c4fcfb725 2019-05-15)
$ rustc --version
rustc 1.36.0 (a53f9df32 2019-07-03)
```
* [Neon CLI](https://neon-bindings.com/)
```sh
$ npm install -g neon-cli
$ neon version
0.2.0
```
* [Python 2.7](https://www.python.org/)
```sh
$ python --version
Python 2.7.16
```

### Development Environment

```bash
# install dependencies
yarn install
```

```bash
# builds the neon bindings. Note: it will take a lot of time
yarn run build-rust-[dev|release]

# optionally you can use the shell script above, 
# which does some extra checks and helps you to rebuild the Rust part of the application
./update-rust.sh
```

```bash
# run application in development mode
yarn start
```

```bash
# build the application
yarn dist
```

### Core Components Used

* [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) for development
* HMR for both `renderer` and `main` processes
* [`babel-preset-env`](https://github.com/babel/babel-preset-env) that is automatically configured based on your `electron` version
* [`electron-builder`](https://github.com/electron-userland/electron-builder) to package and build a distributable electron application

### Configuration Files Location

* On OSX: `~/Library/Preferences/prometheus/`
* On Linux: `~/.config/prometheus/`

## Maintainers

* [@mudlee](https://github.com/mudlee)
* [@wigy_opensource_developer](https://github.com/wigy_opensource_developer)

## Contributing

PRs that are inline with our goals to the core Prometheus user experience are
more than welcome. To avoid losing precious time you spend on coding, you could
open an issue first and discuss what you are up to before forking and sending us
a PR.

Small note: If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[GPL-3.0 or later](https://spdx.org/licenses/GPL-3.0-or-later)
© 2019 Decentralized Society Foundation, PA

## TODOs

* `yarn install/remove` removes the neon built index.node from node_modules
* Icons are generated properly under dist on Linux, but somewhy AppImage still shows an empty image. Also, I cannot install AppImage. If I say yes, please install it, it still just runs it. https://github.com/electron-userland/electron-builder/issues/2577 and https://github.com/standardnotes/desktop/tree/master/app (this is a working code in another project) and https://github.com/electron-userland/electron-builder/issues/748 and https://github.com/electron-userland/electron-builder/issues/2269