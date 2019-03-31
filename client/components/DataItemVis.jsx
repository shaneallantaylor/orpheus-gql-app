import React from 'react';
import { Hint, XYPlot, LineSeries, MarkSeries, LineMarkSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis } from 'react-vis';
// import "./node_modules/react-vis/dist/style";
import styles from './../styles/DataItemVis.scss';


const DataItemVis = props => {
  // this is a helper function to generate some data
  // it will not be used in the MVP
  // it is only here to demostrate the data
  function generateData() {
    const output = [{ x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }];
    for (let i = 4; i < 8; i += 1) {
      output.push({ x: i, y: Math.random('stuff') * 10 })
    }
    output.push({ x: 8, y: 5 }, { x: 9, y: 5 }, { x: 10, y: 5 }, { x: 11, y: 10 })
    return output;
  }
  // we can include grid lines or not
  // this is for development demo purposes
  // same with axises
  return (
    <div className="line-chart">
      <XYPlot height={300} width={300} >

        <VerticalGridLines />
        <HorizontalGridLines />

        <XAxis />
        <YAxis />
        <LineMarkSeries animation={'wobbly'} markStyle={{ stroke: "blue" }}
          data={props.visData}
          curve={"curveBasis"}
          color="lightblue" />
      </XYPlot>
      <button className="btn" onClick={() => { props.updateVisData(generateData()) }}>Update Data</button>
    </div>

  )
};

export default DataItemVis;