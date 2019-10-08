const path = require('path');

module.exports = {
  "resolve": {
    "alias": {
      "@": path.join(__dirname, '../prometheus-ui/src'),
      "vue$": "vue/dist/vue.esm.js"
    },
  },
  "externals": {
    //vue: 'Vue'
  }
};
