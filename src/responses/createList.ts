type List = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

type Subscriber = {
  name: string;
  id: string;
  listId: string;
  userId: string;
};

export type ListWithSubs = List & { subscribers: Subscriber[] };
