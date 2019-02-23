var Chart = React.createClass({
    // When the DOM is ready, create the chart.
    componentDidMount: function() {
      // Extend Highcharts with modules
      if (this.props.modules) {
        this.props.modules.forEach(function(module) {
          module(Highcharts);
        });
      }
      // Set container which the chart should render to.
      this.chart = new Highcharts[this.props.type || "Chart"](
        this.props.container,
        this.props.options
      );
    },
    //Destroy chart before unmount.
    componentWillUnmount: function() {
      this.chart.destroy();
    },
    //Create the div which the chart will be rendered to.
    render: function() {
      return React.createElement('div', {
        id: this.props.container
      });
    }
  }),
  element,
  element2;


// Create and render element
element = React.createElement(Chart, {
  container: 'chart',
  options: {
    chart: {
      type: 'funnel',
      marginRight: 100
    },
    title: {
      text: 'React example',
      x: -50
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
          softConnector: true
        },
        neckWidth: '30%',
        neckHeight: '25%'

        //-- Other available options
        // height: pixels or percent
        // width: pixels or percent
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Unique users',
      data: [
        ['Website visits', 15654],
        ['Downloads', 4064],
        ['Requested price list', 1987],
        ['Invoice sent', 976],
        ['Finalized', 846]
      ]
    }]
  }
});
element2 = React.createElement(Chart, {
  container: 'stockChart',
  type: 'stockChart',
  options: {
    rangeSelector: {
      selected: 0
    },
    title: {
      text: 'USD to EUR exchange rate'
    },
    tooltip: {
      style: {
        width: '200px'
      },
      valueDecimals: 4,
      shared: true
    },
    yAxis: {
      title: {
        text: 'Exchange rate'
      }
    },
    series: [{
      name: 'USD to EUR',
      data: usdeur,
      id: 'dataseries'
      // the event marker flags
    }, {
      type: 'flags',
      data: [{
        x: Date.UTC(2015, 5, 8),
        title: 'C',
        text: 'Stocks fall on Greece, rate concerns; US dollar dips'
      }, {
        x: Date.UTC(2015, 5, 12),
        title: 'D',
        text: 'Zimbabwe ditches \'worthless\' currency for the US dollar '
      }, {
        x: Date.UTC(2015, 5, 19),
        title: 'E',
        text: 'US Dollar Declines Over the Week on Rate Timeline'
      }, {
        x: Date.UTC(2015, 5, 26),
        title: 'F',
        text: 'Greek Negotiations Take Sharp Turn for Worse, US Dollar set to Rally '
      }, {
        x: Date.UTC(2015, 5, 29),
        title: 'G',
        text: 'Euro records stunning reversal against dollar'
      }, {
        x: Date.UTC(2015, 5, 30),
        title: 'H',
        text: 'Surging US dollar curbs global IT spend'
      }],
      onSeries: 'dataseries',
      shape: 'circlepin',
      width: 16
    }]
  }
});
ReactDOM.render(element, document.getElementById('react-app'));
ReactDOM.render(element2, document.getElementById('react-stock'));