import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
  Field,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions } from './types';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    // debugger;
    super(instanceSettings);
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    // const { range } = options;
    // const from = range!.from.valueOf();
    // const to = range!.to.valueOf();

    // Return a constant for each query.
    const data = options.targets.map((target) => {
      const expected = target.constant ?? 5;
      const total = expected > 15 ? 15 : expected;
      const fields: Array<Field<number>> = [];
      for (let i = 0; i < total; i++) {
        // push random number from 1 to 100 to the fields array
        fields.push({
          name: `Random Value ${i}`,
          // @ts-ignore
          values: [Math.floor(Math.random() * total) + 1, Math.floor(Math.random() * total) + 1],
          type: FieldType.number,
        });
      }
      return new MutableDataFrame({
        refId: target.refId,
        fields,
        // fields: [
        //   { name: 'Time', values: [from, to], type: FieldType.time },
        //   { name: 'Value', values: [target.constant, target.constant], type: FieldType.number },
        // ],
      });
    });

    // eslint-disable-next-line no-debugger
    console.log('data', data);

    return { data };
  }

  async testDatasource() {
    // Implement a health check for your data source.
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
