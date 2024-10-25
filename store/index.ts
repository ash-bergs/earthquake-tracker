import * as mapStore from './map';
import * as dailyStore from './daily';
import * as dateStore from './date';
import * as weeklyStore from './weekly';

const store = {
  map: mapStore,
  date: dateStore,
  daily: dailyStore,
  weekly: weeklyStore,
};

export type StoreType = typeof store;
export default store;
