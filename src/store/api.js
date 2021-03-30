export default Object.create({
    getUrl: function (method, params = {}) {
        let url = process.env.VUE_APP_SERVER;
        url += '/api/?action=' + method + '&' + this.urlParamsString(params)
        url += '&apiKey=' + process.env.VUE_APP_API_KEY;
        return url;
    },
    urlParamsString: function (params) {
        return Object.keys(params).map((k) => {
            return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
        }).join('&');
    },
})