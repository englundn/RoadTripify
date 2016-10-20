var React=require("react");

module.exports = {
  
  getApi:function(url,callback) {
      $.ajax({ 
             url: url,
             type: "GET",
             dataType: "json",
             success: function(data){        
                callback(data);
             },
            error: function(request, status, error) {
                
            }
        });
      
  },
  postApi:function(url,parameters,callback) {
    $.ajax({ 
        url: url,
        type: "POST",
        data: parameters,
        success: function(data) {
            callback(data);
        },
        error: function(request, status, error) {
            callback(request.status);
        }
     });
      
  }
};

