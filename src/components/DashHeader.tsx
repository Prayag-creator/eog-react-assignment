import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Grid } from '@material-ui/core';
import SelectBox from './SelectBox';
import { Measurement } from './contract/index';
import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles({
  chip: {
    minWidth: 250,
    margin: 3,
    fontSize: 15,
  },
});

export default (props: {
  metrics: string[];
  selection: (string | undefined)[];
  setSelection: Function;
  latestData: Measurement[];
}) => {
  const { metrics, selection, setSelection, latestData } = props;
  const classes = useStyles();

  return (
    <CardContent>
      <Grid container spacing={4} justify="space-between">
        <Grid item xs={12} sm={6}>
          {/*render a tag displaying latest data for each selected metric*/}
          {latestData.map(measurement => {
            return selection.includes(measurement.metric) ? 
              <Chip className={classes.chip} label={`${measurement.metric}: ${measurement.value}${measurement.unit}`} /> : ''
            })}
        </Grid>
        <Grid item xs={12} sm={6}>
          {/*render a select box that will set the selection object in Dashboard state*/}
          <SelectBox metrics={metrics} selection={selection} setSelection={setSelection} />
        </Grid>
      </Grid>
    </CardContent>
  );
};
