import { VideoStatusEnum } from '../constants/video-status';
import { IVideosFilters } from '../types/IVideosFilters';

export const videosFiltersInitialState: IVideosFilters = {
  fromDate: null, //new Date('2023-10-01T00:00'), // For debugging
  toDate: null, //new Date('2023-10-27T00:00'), // For debugging
  statuses: [
    VideoStatusEnum.Unprocessed,
    VideoStatusEnum.Usable,
    VideoStatusEnum.Restricted,
  ],
  eventId: undefined,
  lat: undefined,
  long: undefined,
  radius: undefined,
  page: 1,
  limit: 25,
};