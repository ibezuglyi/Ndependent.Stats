define(['react','lodash'], function(React, _){
  var selectComponent = React.createClass({displayName: "selectComponent",
    onOptionSelected:function(e){
      var newVal = e.target.attributes["value"].value;
      this.setState({selected:newVal});
      this.props.onchange(newVal);
    },
    getInitialState:function(){
      return {
        selected:""
      }
    },
    getDefaultProps:function(){
      return {
        options:[],
        selected:""
        };
    },
    render:function(){
      var _this = this;
      var options = _.map(this.props.options, function(val){
        var isActive = _this.state.selected === val ? "active" : "";
        return React.createElement("a", {className: "collection-item "+isActive, onClick: _this.onOptionSelected, href: "#!", value: val}, val);
      });
      return (React.createElement("div", {className: "collection no-pad"}, 
        options
      ));
    },
  });
  return selectComponent;

});
