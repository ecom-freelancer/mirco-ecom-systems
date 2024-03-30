import React from 'react';
import { InlineChromiumBugfix } from '../../../components/InlineChromiumBugfix';

export interface LinkElementProps {
  href: string;
  rel: string;
  children: React.ReactNode;
  target?: string;
  attributes?: any;
}

export const LinkElement: React.FC<LinkElementProps> = ({
  href,
  rel,
  children,
  target = '_blank',
  attributes,
}) => {
  return (
    <a
      {...attributes}
      href={href}
      rel={rel}
      target={target}
      onClick={(ev) => ev.preventDefault()}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  );
};
