import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['user'] } },
    options: [
      {
        name: 'Get Me',
        value: 'getMe',
        description: 'Get the current authenticated user',
        action: 'Get current user',
        routing: { request: { method: 'GET', url: '/v1/Users/me' } },
      },
    ],
    default: 'getMe',
  },
];

export const userFields: INodeProperties[] = [];
