import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Card, CardContent } from '@material-ui/core';
import Header from './DashHeader';
import Chart from './Chart';
import { client } from '../HOC/apollo';
import { useSubscription } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import MatrixQuery from '../graphql/query/matrix';
import multipleMatrixQuery from '../graphql/query/multipleMatrix';
import { MeasurementSub , Measurement, MetricNode} from './contract/index';

const useStyles = makeStyles({
  card: {
    margin: '2%',
  },
  taskBar: {
    backgroundColor: '#ccc',
  },
});

const thirtyMinutesAgo = new Date(Date.now() - 30 * 60000).getTime();
const CreateInputQuery = (metrics: string[]) => {
  return metrics.map(metric => {
    return `{ metricName: "${metric}", after: ${thirtyMinutesAgo} }`;
  });
};

const newMeasurementsSub = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;
//filters the transformed data to only contain data pertaining to selected metrics
const dataFilter = (data: Plotly.Data[], selection: (string | undefined)[]) => {
  let returnArr = data.filter(metricObj => {
    return selection.includes(metricObj.name);
  });

  //workaround for limitation with Plotly - it was unable to display pressure and injValveOpen
  //together without having temperature present. This dummy object tricks it into thinking the primary yaxis is present.
  const dummyObj: Plotly.Data = {
    x: [],
    y: [],
    name: '',
    yaxis: 'y',
    type: 'scatter',
    line: { color: '#444' },
  };

  returnArr.push(dummyObj);

  return returnArr;
};

//transforms the gql data object to a format compatible with Plot.ly
const dataTransformer = (data: MetricNode[]) => {
  const returnArr: Plotly.Data[] = [];
  const colorArr: string[] = ['#a83a32', '#2d8fa1', '#5ba12d', '#9c2894', '#e6ad8e', '#32403f'];
  data.forEach(metricNode => {
    let metricObj: Plotly.Data = {
      x: [],
      y: [],
      name: '',
      yaxis: '',
      type: 'scatter',
      line: { color: colorArr[data.indexOf(metricNode)] },
    };
    metricNode.measurements.forEach(measurement => {
      (metricObj.x as Plotly.Datum[]).push(new Date(measurement.at));
      (metricObj.y as Plotly.Datum[]).push(measurement.value);
    });
    metricObj.name = metricNode.metric;
    switch (metricNode.measurements[0].unit) {
      case 'F':
        metricObj.yaxis = 'y';
        break;
      case 'PSI':
        metricObj.yaxis = 'y2';
        break;
      case '%':
        metricObj.yaxis = 'y3';
    }
    returnArr.push(metricObj);
  });
  return returnArr;
};

const fetchMetrics = async () => {
  const res = await client.query({
    query: gql`
      ${MatrixQuery}
    `,
  });
  return res.data.getMetrics;
};

const fetchData = async (metrics: string[]) => {
  const res = await client.query({
    query: gql`
      ${multipleMatrixQuery(CreateInputQuery(metrics))}
    `,
  });
  return res.data.getMultipleMeasurements;
};

export default () => {
  const classes = useStyles();
  const [metricStrings, setMetricStrings] = React.useState<string[]>([]);
  const [selection, setSelection] = React.useState<(string | undefined)[]>([]);
  const [initialData, setInitialData] = React.useState<Plotly.Data[]>([]);
  const [filteredData, setFilteredData] = React.useState<Plotly.Data[]>([]);
  const { loading, data } = useSubscription<MeasurementSub>(newMeasurementsSub);
  const [prevSubData, setPrevSubData] = React.useState<Measurement>({metric: "", at: 0, value: 0, unit: ""});
  const [latestData, setLatestData] = React.useState<Measurement[]>([])

  //initial "run" logic
  React.useEffect(() => {
    const initialFetch = async () => {
      //grabs metric names to avoid hardcoding
      const metricsRes = await fetchMetrics();
      //fetches data based on metrics present in the API
      const dataRes = await fetchData(metricsRes);
      //transform the data to a format compatible with Plot.ly
      const transformedData = dataTransformer(dataRes);
      //set metrics to populate select menu
      setMetricStrings(metricsRes);
      //dynamically create a template based on metrics in API for subscription data to be pushed into 
      //to be displayed on taskbar
      let initialLatestData: Measurement[] = [] 
      metricsRes.forEach((metric: string)=>{
        initialLatestData.push({metric: metric, at: 0, value: 0, unit: ""})
      })
      setLatestData(initialLatestData);
      setInitialData(transformedData);
    };
    initialFetch();
  }, []);

  React.useEffect(() => {
    //upon initial load, and when the menu selection changes, filter the data so that only selected data is rendered
    const filteredDataValue = dataFilter(initialData, selection);
    setFilteredData(filteredDataValue);
  }, [initialData, selection]);

  return (
    <Card className={classes.card}>
      <Header metrics={metricStrings} selection={selection} setSelection={setSelection} latestData={latestData}/>
      <CardContent style={{ padding: 0 }}>
        <Chart data={filteredData} />
      </CardContent>
    </Card>
  );
};
