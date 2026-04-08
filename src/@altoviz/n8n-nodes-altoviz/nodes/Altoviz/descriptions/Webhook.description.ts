import type { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['webhook'] } },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Register a new webhook',
        action: 'Create a webhook',
        routing: { request: { method: 'POST', url: '/v1/Webhooks' } },
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Unregister a webhook',
        action: 'Delete a webhook',
        routing: { request: { method: 'DELETE', url: '/v1/Webhooks' } },
      },
      {
        name: 'List',
        value: 'list',
        description: 'List all webhooks',
        action: 'List webhooks',
        routing: { request: { method: 'GET', url: '/v1/Webhooks' } },
      },
    ],
    default: 'list',
  },
];

export const webhookFields: INodeProperties[] = [
  // Create required fields
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['webhook'], operation: ['create'] } },
    routing: { request: { body: { name: '={{$value}}' } } },
  },
  {
    displayName: 'URL',
    name: 'url',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['webhook'], operation: ['create'] } },
    routing: { request: { body: { url: '={{$value}}' } } },
  },
  {
    displayName: 'Event Types',
    name: 'types',
    type: 'multiOptions',
    required: true,
    default: [],
    displayOptions: { show: { resource: ['webhook'], operation: ['create'] } },
    options: [
      { name: 'Contact Created', value: 'ContactCreated' },
      { name: 'Contact Deleted', value: 'ContactDeleted' },
      { name: 'Contact Updated', value: 'ContactUpdated' },
      { name: 'Customer Created', value: 'CustomerCreated' },
      { name: 'Customer Deleted', value: 'CustomerDeleted' },
      { name: 'Customer Updated', value: 'CustomerUpdated' },
      { name: 'Invoice Created', value: 'InvoiceCreated' },
      { name: 'Invoice Deleted', value: 'InvoiceDeleted' },
      { name: 'Invoice Updated', value: 'InvoiceUpdated' },
      { name: 'Product Created', value: 'ProductCreated' },
      { name: 'Product Deleted', value: 'ProductDeleted' },
      { name: 'Product Updated', value: 'ProductUpdated' },
      { name: 'Quote Created', value: 'QuoteCreated' },
      { name: 'Quote Deleted', value: 'QuoteDeleted' },
      { name: 'Quote Updated', value: 'QuoteUpdated' },
    ],
    routing: { request: { body: { types: '={{$value}}' } } },
  },
  {
    displayName: 'Optional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['webhook'], operation: ['create'] } },
    options: [
      {
        displayName: 'Secret Key',
        name: 'secretKey',
        type: 'string',
        typeOptions: { password: true },
        default: '',
        description: 'Secret key used to sign webhook payloads',
        routing: { request: { body: { secretKey: '={{$value}}' } } },
      },
    ],
  },
  // Delete fields
  {
    displayName: 'Delete By',
    name: 'deleteBy',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    description: 'Specify either ID or URL to identify the webhook to delete',
    displayOptions: { show: { resource: ['webhook'], operation: ['delete'] } },
    options: [
      {
        displayName: 'Webhook ID',
        name: 'id',
        type: 'number',
        default: 0,
        routing: { request: { qs: { id: '={{$value}}' } } },
      },
      {
        displayName: 'Webhook URL',
        name: 'url',
        type: 'string',
        default: '',
        routing: { request: { qs: { url: '={{$value}}' } } },
      },
    ],
  },
];
