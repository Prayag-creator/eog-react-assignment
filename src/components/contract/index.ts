export interface Measurement {
  metric: string;
  at: number;
  value: number;
  unit: string;
}

//interface for the subscription
export interface MeasurementSub {
  newMeasurement: Measurement;
}

//response from getDataQuery is an array of MetricNodes
export interface MetricNode {
  metric: string;
  measurements: Measurement[];
}
