define(['d3','react'], function(d3, React){

  var Chart = React.createClass({displayName: "Chart",
    render: function() {
      return (
        React.createElement("svg", {width: this.props.width, height: this.props.height}, this.props.children)
      );
    }
  });

  var Bar = React.createClass({displayName: "Bar",
    getDefaultProps: function() {
      return {
        width: 0,
        height: 0,
        offset: 0
      }
    },
    render: function() {
      return (
        React.createElement("rect", {fill: this.props.color, 
          width: this.props.width, height: this.props.height, 
          x: this.props.offset, y: this.props.availableHeight - this.props.height})
      );
    }
  });
  var TextItem = React.createClass({displayName: "TextItem",
    getDefaultProps: function() {
      return {
        color: 'red',
        x: 0,
        y:20,
        textlabel:""
      }
    },
    render:function(){
      return (
        React.createElement("text", {fill: this.props.color, x: this.props.x, y: this.props.y}, this.props.textlabel)
        );
    },
  });

  var DataSeries = React.createClass({displayName: "DataSeries",
    getDefaultProps: function() {
      return {
        title: '',
        data: []
      }
    },

    render: function() {
      var props = this.props;
      var min = d3.min(this.props.data.y);
      var minChartHeight = min*0.95;
      var ybs = _.map(this.props.data.y, function(val){
        return (val - minChartHeight) ;
      });
      var ybMax = d3.max(ybs);
      var m = props.height / ybMax;
      ybs = _.map(ybs, function(val){
        return val*m;
      });
      var yScale = d3.scale.linear()
        .domain([0, d3.max(ybs)])
        .range([0, this.props.height]);

      var xScale = d3.scale.ordinal()
        .domain(d3.range(ybs.length))
        .rangeRoundBands([0, this.props.width], 0.05);

      var bars = _.map(ybs, function(point, i) {
        return (
          React.createElement(Bar, {height: yScale(point), width: xScale.rangeBand(), offset: xScale(i), availableHeight: props.height, color: props.color, key: i})
        );
      });
      var xtexts = _.map(this.props.data.x, function(point,i) {
        return (
           React.createElement(TextItem, {textlabel: point, color: "#FFA500", x: xScale(i), y: props.height-10})
            );
      });
      var valTexts = _.map(this.props.data.y, function(val, i){
        return (
          React.createElement(TextItem, {textlabel: val, color: "#FFA500", x: xScale(i)})
          );
      });
      var transformAttr = "translate("+Math.floor(xScale.rangeBand()/7)+ ",0)";
      return (
        React.createElement("g", null, 
          React.createElement("g", null, 
            bars
          ), 
          React.createElement("g", {transform: transformAttr}, 
            xtexts
          ), 
              React.createElement("g", null, 
                valTexts
              )
        )
      );
    }
  });

  var BarChart = React.createClass({displayName: "BarChart",
    render: function() {
      return (
        React.createElement(Chart, {width: this.props.width, height: this.props.height}, 
          React.createElement(DataSeries, {data: this.props.vals, width: this.props.width, height: this.props.height, color: "#01766A"})
        )
      );
    }
  });

  return BarChart;

})