var React = require('react');

module.exports = {
  
  getApi: function(url, headers, callback) {
    $.ajax({ 
      url: url,
      type: 'GET',
      headers: headers,
      dataType: 'json',
      success: function(data) {        
        callback(null, data);
      },
      error: function(request, status, error) {
        callback(error, null);          
      }
    });
      
  },
  postApi: function(url, headers, parameters, callback) {
    $.ajax({ 
      url: url,
      type: 'POST',
      headers: headers,
      data: parameters,
      success: function(data) {
        callback(null, data);
      },
      error: function(request, status, error) {
        callback(error, null);
      }
    });
      
  }
};

