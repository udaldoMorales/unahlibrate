
const SessionStorageService = (function () {

    let _service;

    function _getService() {
        if (_service) {
            _service = this;
            return _service;
        }
    }

    function _setItem(key, value) {
        sessionStorage.setItem(key, value);
        return true;
    }

    function _getItem(key) {
        return sessionStorage.getItem(key);
    }

    function _removeItem(key) {
        sessionStorage.removeItem(key);
        return true;
    }

    function _removeMultiple(keys) {
        keys.forEach(key => sessionStorage.removeItem(key));
        return true;
    }

    function _setToken(token) {
        sessionStorage.setItem('token', token);
        return true;
    }

    function _getToken() {
        return sessionStorage.getItem('token');
    }

    function _removeToken() {
        sessionStorage.removeItem('token');
        return true;
    }


    return {
        getService: _getService,
        setItem: _setItem,
        getItem: _getItem,
        removeItem: _removeItem,
        setToken: _setToken,
        getToken: _getToken,
        removeToken: _removeToken,
        removeMultiple: _removeMultiple
    }

})();


export default SessionStorageService;
