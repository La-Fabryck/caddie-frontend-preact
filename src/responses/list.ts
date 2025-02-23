import { type DateString } from '@/helpers';

export type List = {
  id: string;
  title: string;
  createdAt: DateString;
  updatedAt: DateString;
};
