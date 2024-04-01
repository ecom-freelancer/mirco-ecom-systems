import { useCallback, useContext } from 'react';
import { useSlate } from 'slate-react';
import { EditorContext } from '../context';
import isHotkey from 'is-hotkey';

export const useHotKeys = () => {
  const context = useContext(EditorContext);

  const { plugins } = context;

  const editor = useSlate();

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
    [plugins],
  );
  return {
    hanldeHotKeys,
  };
};
