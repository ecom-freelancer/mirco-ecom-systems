import { useCallback, useContext } from 'react';
import { EditorContext } from '../context';

export const useSlape = () => {
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

  return {
    getNextRenderLeaf,
    getNextRenderElement,
    renderElement,
    renderLeaf,
    plugins,
  };
};
