var findFromYelp = function(searchTerm,searchCity) {
    var auth = {
        consumerKey: "TKk4q4d0R_ChTSTgfJe__g",
        consumerSecret: "DgGPubFJnmQS3P9JNKmDQh61lds",
        accessToken: "nXF2cUc5nwnGh06V8W8ZmIAt2B5WPzUY",
        accessTokenSecret: "WkVTrSYhI0oChU-uyvvuldJPK0A",
        serviceProvider: {
            signatureMethod: "HMAC-SHA1"
        }
    };

    var terms = searchTerm;
    var near = searchCity;

    var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
    };

    var parameters = [];
    parameters.push(['term', terms]);
    //parameters.push(['limit',20]);
    parameters.push(['sort',0]);
    parameters.push(['offset',40]);
    parameters.push(['location', near]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {
        'action': 'http://api.yelp.com/v2/search',
        'method': 'GET',
        'parameters': parameters
    };

    OAuth.setTimestampAndNonce(message);

    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

    return $.ajax({
        url: message.action,
        data: parameterMap,
        cache: true,
        dataType: 'jsonp',
        contentType: "application/json;charset=utf-8"
    });
};