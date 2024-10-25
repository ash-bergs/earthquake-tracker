import { atom } from 'jotai';
import { getStartOfRange } from './utils';

// Sneaky, smelly helpers
//TODO: investigate improving these/making more reliable - moment js? a better ts option?
export const currentDateAtom = atom(new Date());

// current week's range (ending with today's date)
export const currentWeekRangeStringAtom = atom((get) => {
  const currentDate = get(currentDateAtom);
  const startOfRange = getStartOfRange(currentDate);

  return `${startOfRange.toLocaleDateString()} - ${currentDate.toLocaleDateString()}`;
});
