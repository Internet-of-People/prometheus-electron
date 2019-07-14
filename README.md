# Prometheus Cross-Platform Application

This code integrates Prometheus UI and Prometheus Backend into a cross-platform application using
[electron-webpack](https://webpack.electron.build/).

## Core Components Used

* [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) for development
* HMR for both `renderer` and `main` processes
* [`babel-preset-env`](https://github.com/babel/babel-preset-env) that is automatically configured based on your `electron` version
* [`electron-builder`](https://github.com/electron-userland/electron-builder) to package and build a distributable electron application

# Usage

## Prerequisites

* The [prometheus-ui](https://gitlab.libertaria.community/iop-stack/communication/prometheus-ui) repo cloned out. The renderer's source directory is set to `../prometheus-ui/src`, so it directly uses that repo's code. All the dependencies are used in that repo must be included here too, as we only reference the Vue components here, we do not use the `prometheus-ui` repo for building.
* Install *neon-cli* with the command `npm install -g neon-cli`
* Install Python **2.7**

## Development Scripts

```bash
# install dependencies. Note: it will take a lot of time because of the neon bindings
yarn install
```

```bash
# builds the neon bindings. Note: it will take a lot of time
yarn run build-rust-[production|dev]
```

```bash
# run application in development mode
yarn dev

# compile source code and create webpack output
yarn compile

# build with electron-builder
yarn [dist|dist-win|dist-mac|dist-linux]
```

# TODOs

* `yarn install/remove` removes the neon built index.node from node_modules
* Rebuild index.node if Rust code changes
* Ocons are generated properly under dist on Linux, but somewhy AppImage still shows an empty image. Also, I cannot install AppImage. If I say yes, please install it, it still just runs it. https://github.com/electron-userland/electron-builder/issues/2577 and https://github.com/standardnotes/desktop/tree/master/app (this is a working code in another project) and https://github.com/electron-userland/electron-builder/issues/748 and https://github.com/electron-userland/electron-builder/issues/2269