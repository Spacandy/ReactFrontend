import React, { Component } from 'react';
import donut from './donut';

export default class DonutComponent extends Component {
  static defaultProps = {
    chart: donut,
    isAnimated: false,
  };

  constructor(props) {
    super(props);

    // We want to make this throw an error if no data is provided
    if (!props.data) {
      throw new Error('Data is required!');
    }
  }

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
    return <div className="donut-container" ref={this._setRef.bind(this)} />;
  }
}
