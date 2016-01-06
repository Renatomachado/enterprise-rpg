app.factory('ToastConfig', function() {

  var self = this;

  var last = {
      bottom: true,
      top: false,
      left: true,
      right: false
  };

  self.toastPosition = angular.extend({}, last);
  
  self.getToastPosition = function() {
    sanitizePosition();
    return Object.keys(self.toastPosition)
        .filter(function(pos) {
          return self.toastPosition[pos];
        })
        .join(' ');
  };

  function sanitizePosition() {
      var current = self.toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
  }

  return {
    getToastPosition: self.getToastPosition 
  }

});