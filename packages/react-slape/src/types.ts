import { Editor } from 'slate';
import {
  RenderLeafProps,
  RenderElementProps as BaseRenderElementProps,
} from 'slate-react';
import { EditorContextModel } from './context';

export interface RenderElementProps extends BaseRenderElementProps {
  styles?: React.CSSProperties;
}
export interface SlapePlugin {
  name: string;
  initialize: (editor: Editor) => Editor;
  renderLeaf?: (props: RenderLeafProps) => JSX.Element;
  renderELement?: (props: RenderElementProps) => JSX.Element;
  hotKeys?: SlapeHotKey[];
  elementKeys?: string[];
}

export interface RenderLeafFunc<T extends RenderLeafProps> {
  (props: T): JSX.Element;
}

export interface RenderElementFunc<T extends RenderElementProps> {
  (props: T): JSX.Element;
}

export interface SlapeHotKey {
  keys: string[];
  description?: string;
  handler: (
    editor: Editor,
    pluginKeys?: string[],
    configs?: EditorContextModel,
  ) => void;
}
export interface SlapeLeafElement {
  text?: string;
}

export interface SlapeElement {
  type?: string;
  children?: Array<SlapeElement | SlapeLeafElement>;
}
