import React from 'react';
import { IJobStatus } from '../types';
import { Tag } from 'antd';

export interface JobStatusProps {
  status: IJobStatus;
}

const colors: Record<IJobStatus, string> = {
  pending: 'orange',
  processing: 'blue',
  completed: 'green',
  failed: 'red',
  canceled: 'gray',
};

export const JobStatus: React.FC<JobStatusProps> = ({ status }) => {
  return <Tag color={colors[status]}>{status}</Tag>;
};
