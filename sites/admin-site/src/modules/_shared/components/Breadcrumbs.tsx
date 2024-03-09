import React from 'react';

export interface IBreadcrumb {
  label: string;
  path?: string;
}

export interface BreadCrumbsProps {
  breadcrumbs: IBreadcrumb[];
}

export const Breadcrumbs: React.FC<BreadCrumbsProps> = () => {
  return <div>Breadcrumbs</div>;
};
