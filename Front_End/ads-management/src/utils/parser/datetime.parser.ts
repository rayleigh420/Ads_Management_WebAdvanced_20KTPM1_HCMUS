import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { isNull, isUndefined } from 'lodash';

import { DATE_FORMAT } from '@/core/constants/date.constant';
import { Nil } from '../types/utility.type';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

export const parseDate = (
  date?: Nil<string>,
  format = DATE_FORMAT.DATE.HYPHEN,
  defaultValue: string | null | undefined = null,
) => (!date ? defaultValue : dayjs(date).format(format));

export const parseDateTime = (date: string): string | null =>
  dayjs(date).isValid() ? dayjs(date).format(DATE_FORMAT.DATE_TIME_SECOND.CUSTOM) : null;

export const parseDateTimeSecond = (date: string) =>
  dayjs(date).format(DATE_FORMAT.DATE_TIME_SECOND.HYPHEN);

export const parseQueryDate = (date: Nil<Dayjs>, defaultValue: any = null) =>
  date ? date.format(DATE_FORMAT.DATE.HYPHEN) : defaultValue;

export const parseQueryDateStr = (date: Nil<string>, defaultValue: any = null) =>
  date ? dayjs(date).format(DATE_FORMAT.DATE.HYPHEN) : defaultValue;

export const dayjsOrNull = (value: Nil<string>) => (value ? dayjs(value) : null);

export const parseTime = (hour: Nil<number>, minute: Nil<number>, format = DATE_FORMAT.TIME._12H) =>
  !isNull(hour) && !isNull(minute)
    ? dayjs(`${hour}:${minute}`, DATE_FORMAT.TIME._24H).format(format)
    : null;

export const parseTimePicker = (value?: string) => {
  return value && dayjs(value, DATE_FORMAT.TIME._12H_PICKER);
};

export const parseDatePicker = (value?: string) => (isUndefined(value) ? undefined : dayjs(value));

export const parseDatetimeISO8601 = (date: string) =>
  dayjs(date).format(DATE_FORMAT.DATE_TIME_SECOND.CUSTOM);

export const parseTimeLeftSmallFormat = (milliseconds: number) =>
  dayjs(milliseconds).format(DATE_FORMAT.TIME._60P);

export const parseISO8601 = (date: Nil<Dayjs>, defaultValue = undefined) =>
  !date ? defaultValue : date.format(DATE_FORMAT.DATE_TIME_SECOND.ISO8601);

export function getRemainingTime(targetDate: string) {
  const now = dayjs();
  const end = dayjs(targetDate);
  const remainingTime = end.diff(now);

  // Create a duration object from the remaining time
  const remainingDuration = dayjs.duration(remainingTime);

  // Extract the components
  const years = remainingDuration.years();
  const months = remainingDuration.months();
  const days = remainingDuration.days();
  const hours = remainingDuration.hours();
  const minutes = remainingDuration.minutes();
  const seconds = remainingDuration.seconds();

  return { years, months, days, hours, minutes, seconds };
}

export const dayOfWeekKR = (date: string) =>
  ['월', '화', '수', '목', '금', '토', '일'][dayjs(date).day()];
