import type { INodeProperties } from 'n8n-workflow';

export const settingOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['setting'] } },
    options: [
      {
        name: 'Get',
        value: 'get',
        description: 'Get Altoviz account settings',
        action: 'Get settings',
        routing: { request: { method: 'GET', url: '/v1/Settings' } },
      },
    ],
    default: 'get',
  },
];

export const settingFields: INodeProperties[] = [];
