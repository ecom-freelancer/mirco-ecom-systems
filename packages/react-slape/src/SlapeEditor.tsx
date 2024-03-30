import React, { useMemo } from 'react';
import { withReact, Slate, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor, Descendant } from 'slate';
import { SlapeElement, SlapePlugin } from './types';
import { defaultPlugins } from './plugins';
import { EditorContext } from './context';
import { SlapEditable } from './Editable';
import { debounce } from 'lodash';
import { ToolBar } from './components';
import { EventProvider } from './context/event-context';

export interface SlapeEditorProps<E extends SlapeElement = SlapeElement> {
  plugins?: SlapePlugin[];
  initialValue?: E[];
  onChange?: (value: Descendant[]) => void;
  maxHeight?: string;
  minHeight?: string;
}

export const SlapeEditor: React.FC<SlapeEditorProps> = ({
  plugins = defaultPlugins,
  initialValue: defaultInitialValue,
  onChange: onValueChange,
  maxHeight = '500px',
  minHeight = '500px',
}) => {
  const editor = useMemo(() => {
    return plugins.reduce(
      (e, plugin) => plugin.initialize(e),
      withReact(withHistory(createEditor())),
    );
  }, [plugins]);

  const initialValue: SlapeElement[] = useMemo(() => {
    // if item type != null && child == null, add child = []
    const fillChildren = (e: SlapeElement) => {
      if (!e.type) {
        return e;
      }
      if (!!e.type && !e.children) {
        return { ...e, children: [] };
      } else {
        return {
          ...e,
          children: e.children.map((c) => fillChildren(c as SlapeElement)),
        };
      }
    };
    return defaultInitialValue.map((e) => fillChildren(e));
  }, []);

  const onChange = useMemo(() => {
    return debounce((value: Descendant[]) => {
      onValueChange?.(value);
    }, 300);
  }, []);

  const allElementKeys = useMemo(() => {
    return plugins
      .filter((p) => !!p.elementKeys)
      .map((p) => p.elementKeys)
      .flat();
  }, [plugins]);

  return (
    <EditorContext.Provider
      value={{
        plugins,
        editor,
        elementKeys: allElementKeys,
        minHeight: minHeight,
        maxHeight: maxHeight,
      }}
    >
      <EventProvider>
        <Slate
          editor={editor as ReactEditor}
          initialValue={initialValue as Descendant[]}
          onChange={onChange}
        >
          <ToolBar />
          <SlapEditable />
        </Slate>
      </EventProvider>
    </EditorContext.Provider>
  );
};