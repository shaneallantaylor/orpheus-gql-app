import React from 'react';

import ContinuousColorLegend from './../../node_modules/react-vis/dist/legends/continuous-color-legend';
import styles from './../styles/DataItemVisLegend.scss';

const DataItemVisLegend = props => {
  return (
    <ContinuousColorLegend className="shane"
      width={300}
      startTitle="Cold"
      endTitle="Spicy"
    />
  );
}

export default DataItemVisLegend;