import React from 'react';
import { SlapePlugin } from '../types';

export interface EditorContextModel {
  editor: any;
  plugins: SlapePlugin[];
  elementKeys: string[];
  maxHeight: string;
  minHeight: string;
  emitEvent: (event: string, payload: any) => void;
  placeHolder?: string;
}

export const EditorContext = React.createContext<EditorContextModel | null>(
  null,
);
