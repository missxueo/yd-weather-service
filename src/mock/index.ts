
import Axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { real, forecasts, } from './mockdata';

const mock = new MockAdapter(Axios);


mock.onGet(/.*\/v2\/realweather.*/).reply(200, {
  statusCode: 200,
  version: 'v2',
  forecast: forecasts,
  realtime: real,
})
