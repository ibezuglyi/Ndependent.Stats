define(['jsx!src/InputComponent'
        ,'react'
        ,'src/service/statParser.js'
        ,'src/service/httpService.js'
        ,'jsx!src/StatChart'
        ,'jsx!src/SelectOption'
        ],function(InputComponent, React, par, service, BarChart,SelectOption){


  function App() {
    this.AppView = React.createClass({
      getInitialState:function(){
        return {
          options:[],
          stats:[],
          diagram:{
            x:[],
            y:[]
          }
        }
      },
      onNewStatSubmited:function(statText){
        var parsed = par.parseText(statText);
        service.push(parsed["Analysis Date"], parsed);
      },
      onServerStatSubmited:function(s){
        this.setState({stats:s.val()});
        this.mapDiagram("Assemblies");
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
        this.setState({"diagram":{"x":x, "y":y}});
        this.setState({"options":_.uniq(options)});
      },
      componentDidMount:function(){
        service.bind(this.onServerStatSubmited);
      },
      onSelected:function(key){
        this.mapDiagram(key);
      },
      render: function() {
        return (
          <div className="container">
            <div className="row padded-row" >
              <div className="col s3">
                <SelectOption selected="Assemblies" options={this.state.options} onchange={this.onSelected}></SelectOption>
              </div>
              <div className="col s9">
                <BarChart width={600} height={300} yVals={this.state.diagram.y}></BarChart>
                <InputComponent onStatSubmited={this.onNewStatSubmited}></InputComponent>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  App.prototype.init = function () {
    React.render(<this.AppView />, document.body);
  };

  return App;

});
