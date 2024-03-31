import { useCallback, useContext, useMemo } from 'react';
import { EditorContext } from '../context';
import isHotkey from 'is-hotkey';
import { ReactEditor, useSlate } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { Editor } from 'slate';

export const useSlape = () => {
  const editor = useSlate();

  const marks = useMemo(() => {
    return Editor.marks(editor);
  }, [editor]);

  const context = useContext(EditorContext);

  const { plugins } = context;

  const getNextRenderLeaf = useCallback(
    (key: string) => {
      if (!plugins.length) {
        return undefined;
      }
      const pluginIndex = plugins.findIndex((p) => p.name === key);
      if (pluginIndex === -1) {
        return undefined;
      }
      const plugin = plugins.find(
        (p, index) => index > pluginIndex && !!p.renderLeaf,
      );

      return plugin?.renderLeaf;
    },
    [plugins],
  );

  const getNextRenderElement = useCallback(
    (key: string) => {
      if (!plugins.length) {
        return undefined;
      }
      const pluginIndex = plugins.findIndex((p) => p.name === key);
      if (pluginIndex === -1) {
        return undefined;
      }
      const plugin = plugins.find(
        (p, index) => index > pluginIndex && !!p.renderELement,
      );

      return plugin?.renderELement;
    },
    [plugins],
  );

  const renderElement = useCallback(
    (props) => {
      const plugin = plugins.find((p) => !!p.renderELement);
      if (!plugin) {
        return null;
      }
      return plugin.renderELement(props);
    },
    [plugins],
  );

  const renderLeaf = useCallback(
    (props) => {
      const plugin = plugins.find((p) => !!p.renderLeaf);
      if (!plugin) {
        return null;
      }
      return plugin.renderLeaf(props);
    },
    [plugins],
  );

  const hanldeHotKeys: React.KeyboardEventHandler = useCallback(
    (e) => {
      plugins.forEach((plugin) => {
        if (!plugin.hotKeys) {
          return;
        }
        plugin.hotKeys.forEach((hotKey) => {
          if (isHotkey(hotKey.keys, e)) {
            e.preventDefault();
            hotKey.handler(editor, plugin.elementKeys, context);
          }
        });
      });
    },
    [editor, plugins],
  );

  return {
    editor: editor as ReactEditor & HistoryEditor,
    getNextRenderLeaf,
    getNextRenderElement,
    renderElement,
    renderLeaf,
    hanldeHotKeys,
    plugins,
    marks,
  };
};
