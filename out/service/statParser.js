define(["lodash"], function(_){

  function Parser(){
    this.cleanValue = function(val){

      var toFormatTokens = val.split(" to ");
      var valueToReturn ="";
      if(toFormatTokens.length>1)
      {
        var rightToken = toFormatTokens[1];
        var statTokens= rightToken.split(" (");
        valueToReturn = _.trim(statTokens[0].replace(" ", ""));
      }
      else
      {
        valueToReturn = val.replace(" ", "");
      }

      var intVal = parseInt(valueToReturn);
      if(isNaN(intVal))
      {
        return valueToReturn;
      }
      return intVal;

    },
    this.parseText = function(text){
      var _this = this;
      var textItems = text.split("\n");
      var mapped = _.map(textItems, function(statItem){
        if(statItem.indexOf(":")>0)
        {
          return statItem.split(":");
        }
        else
        {
          return "";
        }

      });
      var ret = {};
      var reduced = _.reduce(mapped, function(result, val, key){
        if(val.length>1)
        {
          var key = _.trim(val[0]).replace("# ", "");
          ;
          var value =_this.cleanValue(_.trim(val[1]));
          result[key] = value;
        }
        return result;
      },ret);
      return ret;
    }
  };

  var p = new Parser();
  return p;

});
