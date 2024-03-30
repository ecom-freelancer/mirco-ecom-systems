// Put this at the start and end of an inline component to work around this Chromium bug:

import { css } from '@packages/ds-core';
import React from 'react';

// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
export const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    className={css`
      font-size: 0;
    `}
  >
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);
