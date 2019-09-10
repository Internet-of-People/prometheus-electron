#/usr/bin/env bash

if [[ ! -d ../mercury-rust ]]; then
    cat <<EOF
You have to get all rust code checked out in the parent dir.
$ cd ..
$ git clone ssh://git@gitlab.iop-ventures.com:2200/iop-stack/communication/mercury-rust.git
EOF
    exit 1
fi;

if [[ ! -d ../prometheus-ui ]]; then
    cat <<EOF
You have to get the UI code checked out in the parent dir.
$ cd ..
$ git clone ssh://git@gitlab.iop-ventures.com:2200/iop-stack/communication/prometheus-ui.git
EOF
    exit 1
fi;

cp -xrf upstream/prometheus-neon/ node_modules/
yarn run build-rust-release
