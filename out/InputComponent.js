define(['react'], function(React){
  var InputComponent = React.createClass({displayName: "InputComponent",
    handleClick:function(){
      var node = this.refs.inputArea.getDOMNode()
      var text = node.value;
      this.props.onStatSubmited(text);
      node.value = "";
    },
    render:function(){
      return (
        React.createElement("div", null, 
        React.createElement("div", {className: "box"}, 
          React.createElement("div", {className: "input-field col s12"}, 
            React.createElement("textarea", {ref: "inputArea", id: "textarea1", className: "materialize-textarea"})
            )
          ), 
          React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "input-field col s3"}, 
            React.createElement("a", {onClick: this.handleClick, className: "waves-effect waves-light btn"}, "Add stats")
            )
          )
        ));
    }
  });
  return InputComponent;
});
