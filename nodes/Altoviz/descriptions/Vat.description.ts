import type { INodeProperties } from 'n8n-workflow';

export const vatOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['vat'] } },
    options: [
      {
        name: 'List',
        value: 'list',
        description: 'List all VAT rates',
        action: 'List VAT rates',
        routing: { request: { method: 'GET', url: '/v1/Vats' } },
      },
    ],
    default: 'list',
  },
];

export const vatFields: INodeProperties[] = [];
