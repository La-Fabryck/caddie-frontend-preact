import { type DateString } from '@/helpers';

type List = {
  id: string;
  title: string;
  createdAt: DateString;
  updatedAt: DateString;
  subscribers: Subscriber[];
};

type Subscriber = {
  name: string;
  id: string;
  listId: string;
  userId: string;
};

export type ListWithSubs = List;
