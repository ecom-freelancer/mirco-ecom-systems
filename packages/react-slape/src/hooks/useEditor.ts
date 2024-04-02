import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor, useSlate } from 'slate-react';

export const useEditor = (): BaseEditor & ReactEditor & HistoryEditor =>
  useSlate() as any;
