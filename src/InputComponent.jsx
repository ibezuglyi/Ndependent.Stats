define(['react'], function(React){
  var InputComponent = React.createClass({
    handleClick:function(){
      var node = this.refs.inputArea.getDOMNode()
      var text = node.value;
      this.props.onStatSubmited(text);
      node.value = "";
    },
    render:function(){
      return (
        <div>
        <div className="box">
          <div className="input-field col s12">
            <textarea ref="inputArea" id="textarea1" className="materialize-textarea"></textarea>
            </div>
          </div>
          <div className="row">
          <div className="input-field col s3">
            <a onClick={this.handleClick} className="waves-effect waves-light btn">Add stats</a>
            </div>
          </div>
        </div>);
    }
  });
  return InputComponent;
});
