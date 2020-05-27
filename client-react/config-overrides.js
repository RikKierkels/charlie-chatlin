const { override, useBabelRc } = require('customize-cra');
const { addReactRefresh } = require('customize-cra-react-refresh');

module.exports = override(addReactRefresh({ disableRefreshCheck: true }), useBabelRc());
