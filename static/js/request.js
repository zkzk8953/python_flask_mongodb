class HttpService {

    $rootUrl
    $headers

    constructor(url) {
        this.$rootUrl = `http://${url}`;
        this.$headers = {
            "Content-Type": "application/json"
        }
    }

    request(url, method, data) {
        return $.ajax({
            type: method,
            url: url,
            data: data,
        });
    }
}