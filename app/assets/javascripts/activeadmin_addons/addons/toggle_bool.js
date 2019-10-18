var initializer = function() {
  $('.toggle-bool-switch').click(function(e) {
    var boolSwitch = $(e.target);
    var model = boolSwitch.data('model');
    var objectId = boolSwitch.data('object_id');          
    var field = boolSwitch.data('field');
    var url = boolSwitch.data('url');
    var value = boolSwitch.data('value');
    var successMessage = boolSwitch.data('success_message');
    var data = { id: objectId };
    data[model] = {};
    data[model][field] = !value;
    if (model == "user"){
      if (field == "elemental_docket_upload_status"){
        var prevValue = $(this).hasClass('on');
        if (prevValue) {
        }else{
          var retVal = confirm("Are you sure you want to manually approve the customer?");
          if(retVal){
            var resVal = confirm("This function cannot be undone. Are you sure?");
            if (resVal) {
              update_manual_status(data, value, url, boolSwitch);
            }else{}
          }else{} 
        }
      }else if(field == "blocked"){
        var prevValue = $(this).hasClass('on');
        if (prevValue) {
          var retVal = confirm("Are you sure you want to unblock this user?");
          if(retVal){
            default_toggel_status(data, value, url, boolSwitch);
          }else{}
        }else{
          var retVal = confirm("A Blocked user cannot access his/her dashboard. Are you sure you want to block this user?");
          if(retVal){
            default_toggel_status(data, value, url, boolSwitch);
          }else{} 
        }
      }     
    }else{
      var prevValue = $(this).hasClass('on');
      if (prevValue) {
        var retVal = confirm("Are you sure?");
        if(retVal){
          default_toggel_status(data, value, url, boolSwitch);
        }else{}
      }else{
        var retVal = confirm("Are you sure?");
        if(retVal){
          default_toggel_status(data, value, url, boolSwitch);
        }else{} 
      }
    }  
  }); 
};

$(initializer);
$(document).on('turbolinks:load', initializer);

update_manual_status = function(data, value, url, boolSwitch){
  $.ajax({
    url: url,
    data: data,
    dataType: 'json',
    headers : {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
    error: function() {
      var errorMsg = 'Error: Update Unsuccessful';
      alert(errorMsg);
    },
    success: function() {
      boolSwitch.data('value', !value);
      boolSwitch.addClass('on');
      if (!boolSwitch.hasClass('notify-success')) return;
      $(function() {
        setTimeout(alert(successMessage), 500);
      });
    },
    type: 'PATCH',
  });
}


default_toggel_status = function(data, value, url, boolSwitch){
  $.ajax({
    url: url,
    data: data,
    dataType: 'json',
    headers : {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
    error: function() {
      var errorMsg = 'Error: Update Unsuccessful';
      alert(errorMsg);
    },
    success: function() {
      boolSwitch.data('value', !value);
      boolSwitch.toggleClass('on');
      if (!boolSwitch.hasClass('notify-success')) return;
      $(function() {
        setTimeout(alert(successMessage), 500);
      });
    },
    type: 'PATCH',
  });
}

