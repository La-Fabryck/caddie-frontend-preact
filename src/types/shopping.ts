import { type List } from '@/responses';

export type MutateListFormProps = {
  listInitialValue: List;
  invalidateList: () => void;
  invalidateLists: () => void;
};
