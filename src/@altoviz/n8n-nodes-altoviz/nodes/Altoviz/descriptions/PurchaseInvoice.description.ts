import type { INodeProperties } from 'n8n-workflow';

export const purchaseInvoiceOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['purchaseInvoice'] } },
    options: [
      {
        name: 'Create From File',
        value: 'createFromFile',
        description: 'Create a new purchase invoice from a file',
        action: 'Create purchase invoice from file',
        routing: {
          request: {
            method: 'POST',
            url: '/v1/PurchaseInvoices/file',
          },
        },
      },
      {
        name: 'Download',
        value: 'download',
        description: 'Download a purchase invoice as PDF',
        action: 'Download purchase invoice as PDF',
        routing: {
          request: {
            method: 'GET',
            url: '=/v1/PurchaseInvoices/Download/{{$parameter["id"]}}',
            encoding: 'arraybuffer',
          },
          output: {
            postReceive: [
              {
                type: 'binaryData',
                properties: {
                  destinationProperty: 'data',
                },
              },
            ],
          },
        },
      },
    ],
    default: 'createFromFile',
  },
];

export const purchaseInvoiceFields: INodeProperties[] = [
  {
    displayName: 'Purchase Invoice ID',
    name: 'id',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['purchaseInvoice'], operation: ['download'] } },
  },
  {
    displayName: 'Binary Property',
    name: 'binaryPropertyName',
    type: 'string',
    required: true,
    default: 'data',
    description: 'Name of the binary property containing the invoice file',
    displayOptions: { show: { resource: ['purchaseInvoice'], operation: ['createFromFile'] } },
    routing: {
      send: {
        type: 'body',
        property: 'binaryPropertyName',
      },
    },
  },
];
