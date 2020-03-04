import React from 'react';
import legendChart from './legend';

export default class LegendComponent extends React.Component {
  props;
  state;
  static defaultProps = {
    chart: legendChart,
  };

  componentDidMount() {
    this._chart = this.props.chart.create(
      this._rootNode,
      this.props.data,
      this._getChartConfiguration(),
    );
  }

  componentDidUpdate() {
    this.props.chart.update(
      this._rootNode,
      this.props.data,
      this._getChartConfiguration(),
      this._chart,
    );
  }

  componentWillUnmount() {
    this.props.chart.destroy(this._rootNode);
  }

  /**
   * We want to remove the chart and data from the props in order to have a configuration object
   * @return {Object} Configuration object for the chart
   */
  _getChartConfiguration() {
    let configuration = { ...this.props };

    delete configuration.data;
    delete configuration.chart;

    return configuration;
  }

  _setRef(componentNode) {
    this._rootNode = componentNode;
  }

  render() {
    return <div className="legend-container" ref={this._setRef.bind(this)} />;
  }
}
