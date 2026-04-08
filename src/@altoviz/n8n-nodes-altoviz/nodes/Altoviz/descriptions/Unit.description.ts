import type { INodeProperties } from 'n8n-workflow';

export const unitOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['unit'] } },
    options: [
      {
        name: 'List',
        value: 'list',
        description: 'List all units',
        action: 'List units',
        routing: { request: { method: 'GET', url: '/v1/Units' } },
      },
    ],
    default: 'list',
  },
];

export const unitFields: INodeProperties[] = [];
