import type { INodeProperties } from 'n8n-workflow';

export const bankAccountOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['bankAccount'] } },
    options: [
      {
        name: 'List Providers',
        value: 'listProviders',
        description: 'List supported bank account providers',
        action: 'List bank account providers',
        routing: {
          request: {
            method: 'GET',
            url: '/v1/BankAccounts/Providers',
          },
          output: {
            postReceive: [{ type: 'rootProperty', properties: { property: '.' } }],
          },
        },
      },
    ],
    default: 'listProviders',
  },
];

export const bankAccountFields: INodeProperties[] = [
  {
    displayName: 'Search Query',
    name: 'query',
    type: 'string',
    default: '',
    description: 'Full text search',
    displayOptions: { show: { resource: ['bankAccount'], operation: ['listProviders'] } },
    routing: { request: { qs: { query: '={{$value}}' } } },
  },
];
