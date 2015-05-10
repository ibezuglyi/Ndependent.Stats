define(['out/InputComponent'
        ,'react'
        ,'out/service/statParser.js'
        ,'out/service/httpService.js'
        ,'out/StatChart'
        ,'out/SelectOption'
        ],function(InputComponent, React, par, service, BarChart,SelectOption){


  function App() {
    this.AppView = React.createClass({displayName: "AppView",
      getInitialState:function(){
        return {
          selectedKey:"",
          options:[],
          stats:{},
          diagram:{
            x:[],
            y:[]
          }
        }
      },
      onNewStatSubmited:function(statText){
        var parsed = par.parseText(statText);
        var key = parsed["Analysis Date"];
        service.push(key, parsed);
        var stats = this.state.stats || {};
        stats[key] = parsed;
        this.setStateAndUpdate(stats);
      },
      setStateAndUpdate:function(val){
        this.setState({stats:val});
        this.mapDiagram("Assemblies");
      },
      onServerStatSubmited:function(s){
        this.setStateAndUpdate(s.val());
      },
      mapDiagram:function(selectedKey){
        var x = [];
        var y = [];
        var options = [];
        var stats = this.state.stats;
        _.forOwn(stats, function(stat,date){
          _.forOwn(stat, function(v,k){
            options.push(k);
            if(k === selectedKey){
              y.push(v);
              x.push(date);
            }
          });
        });
        this.setState({
                        "diagram":{
                          "x":x,
                          "y":y
                        },
                        "options":_.uniq(options),
                        "selectedKey":selectedKey
          });
      },
      componentDidMount:function(){
        service.bind(this.onServerStatSubmited);
      },
      onSelected:function(key){
        this.mapDiagram(key);
      },
      render: function() {
        return (
          React.createElement("div", {className: "container"}, 
            React.createElement("div", {className: "row padded-row"}, 
              React.createElement("div", {className: "col s3 box no-pad"}, 
                React.createElement(SelectOption, {selected: this.state.selectedKey, options: this.state.options, onchange: this.onSelected})
              ), 
              React.createElement("div", {className: "col s9"}, 
                React.createElement("div", {className: "box chart"}, 
                React.createElement(BarChart, {width: 1000, height: 400, vals: this.state.diagram})
                ), 
                React.createElement("div", null, 
                React.createElement(InputComponent, {onStatSubmited: this.onNewStatSubmited})
              )
            )
            )
          )
        );
      }
    });
  }

  App.prototype.init = function () {
    React.render(React.createElement(this.AppView, null), document.body);
  };

  return App;

});
