define(['firebase'], function(Firebase){

  var FirebaseRoot = new Firebase('https://devstats.firebaseio.com/');

  function Service(){
    this.bind = function(callback){
      FirebaseRoot.on("value", callback);
    };
    this.push = function(key, value){
      FirebaseRoot.child(key).set(value);
    };
  }

  var service = new Service();
  return service;
});
