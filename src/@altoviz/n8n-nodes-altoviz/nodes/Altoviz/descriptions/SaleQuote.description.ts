import type { INodeProperties } from 'n8n-workflow';

const saleDocumentLineValues: INodeProperties[] = [
  {
    displayName: 'Classification ID',
    name: 'classificationId',
    type: 'number',
    default: 0,
    description: 'Classification ID (used if no product is set)',
  },
  {
    displayName: 'Date',
    name: 'date',
    type: 'dateTime',
    default: '',
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    typeOptions: { rows: 2 },
    default: '',
    description: 'Line description (can include HTML)',
  },
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'number',
    default: 0,
  },
  {
    displayName: 'Product Internal ID',
    name: 'productInternalId',
    type: 'string',
    default: '',
  },
  {
    displayName: 'Product Number',
    name: 'productNumber',
    type: 'string',
    default: '',
  },
  {
    displayName: 'Purchase Price',
    name: 'purchasePrice',
    type: 'number',
    default: 0,
  },
  {
    displayName: 'Quantity',
    name: 'quantity',
    type: 'number',
    default: 1,
  },
  {
    displayName: 'Tax Excluded Price',
    name: 'taxExcludedPrice',
    type: 'number',
    default: 0,
  },
  {
    displayName: 'Tax Included Price',
    name: 'taxIncludedPrice',
    type: 'number',
    default: 0,
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    default: 'Product',
    options: [
      { name: 'Empty', value: 'Empty' },
      { name: 'New Page', value: 'NewPage' },
      { name: 'Product', value: 'Product' },
      { name: 'Service', value: 'Service' },
      { name: 'Subtotal', value: 'Subtotal' },
      { name: 'Text', value: 'Text' },
    ],
  },
];

export const saleQuoteOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['saleQuote'] } },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new quote',
        action: 'Create a sale quote',
        routing: { request: { method: 'POST', url: '/v1/SaleQuotes' } },
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a quote',
        action: 'Delete a sale quote',
        routing: {
          request: { method: 'DELETE', url: '=/v1/SaleQuotes/{{$parameter["id"]}}' },
        },
      },
      {
        name: 'Download',
        value: 'download',
        description: 'Download the quote as a PDF',
        action: 'Download a sale quote as PDF',
        routing: {
          request: {
            method: 'GET',
            url: '=/v1/SaleQuotes/Download/{{$parameter["id"]}}',
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
      {
        name: 'Find',
        value: 'find',
        description: 'Find quotes by internal ID',
        action: 'Find a sale quote',
        routing: { request: { method: 'GET', url: '/v1/SaleQuotes/Find' } },
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a quote by ID',
        action: 'Get a sale quote',
        routing: {
          request: { method: 'GET', url: '=/v1/SaleQuotes/{{$parameter["id"]}}' },
        },
      },
      {
        name: 'List',
        value: 'list',
        description: 'List quotes',
        action: 'List sale quotes',
        routing: { request: { method: 'GET', url: '/v1/SaleQuotes' } },
      },
      {
        name: 'Send',
        value: 'send',
        description: 'Send a quote by email',
        action: 'Send a sale quote',
        routing: {
          request: { method: 'POST', url: '=/v1/SaleQuotes/Send/{{$parameter["id"]}}' },
        },
      },
    ],
    default: 'list',
  },
];

export const saleQuoteFields: INodeProperties[] = [
  {
    displayName: 'Quote ID',
    name: 'id',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: { resource: ['saleQuote'], operation: ['get', 'delete', 'download', 'send'] },
    },
  },
  {
    displayName: 'Find By Internal ID',
    name: 'internalId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['saleQuote'], operation: ['find'] } },
    routing: { request: { qs: { internalId: '={{$value}}' } } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { resource: ['saleQuote'], operation: ['list'] } },
    options: [
      {
        displayName: 'Customer ID',
        name: 'CustomerId',
        type: 'number',
        default: 0,
        routing: { request: { qs: { CustomerId: '={{$value}}' } } },
      },
      {
        displayName: 'From Date',
        name: 'From',
        type: 'dateTime',
        default: '',
        routing: { request: { qs: { From: '={{$value}}' } } },
      },
      {
        displayName: 'Order By',
        name: 'OrderBy',
        type: 'string',
        default: '',
        routing: { request: { qs: { OrderBy: '={{$value}}' } } },
      },
      {
        displayName: 'Page Index',
        name: 'PageIndex',
        type: 'number',
        default: 0,
        routing: { request: { qs: { PageIndex: '={{$value}}' } } },
      },
      {
        displayName: 'Page Size',
        name: 'PageSize',
        type: 'number',
        default: 50,
        routing: { request: { qs: { PageSize: '={{$value}}' } } },
      },
      {
        displayName: 'Status',
        name: 'StatusStatus',
        type: 'options',
        default: '',
        options: [
          { name: 'Accepted', value: 'Accepted' },
          { name: 'Any', value: '' },
          { name: 'Closed', value: 'Closed' },
          { name: 'Invoiced', value: 'Invoiced' },
          { name: 'Pending', value: 'Pending' },
          { name: 'Refused', value: 'Refused' },
          { name: 'Sent', value: 'Sent' },
        ],
        routing: { request: { qs: { 'Status.Status.Status': '={{$value}}' } } },
      },
      {
        displayName: 'To Date',
        name: 'To',
        type: 'dateTime',
        default: '',
        routing: { request: { qs: { To: '={{$value}}' } } },
      },
    ],
  },
  // Send operation
  {
    displayName: 'Email Addresses',
    name: 'emails',
    type: 'string',
    required: true,
    default: '',
    description: 'Comma-separated list of email addresses to send the quote to',
    displayOptions: { show: { resource: ['saleQuote'], operation: ['send'] } },
    routing: {
      send: {
        preSend: [
          async function (this, requestOptions) {
            const emails = (this.getNodeParameter('emails') as string)
              .split(',')
              .map((e) => e.trim())
              .filter(Boolean);
            requestOptions.body = emails;
            return requestOptions;
          },
        ],
      },
    },
  },
  // Create fields
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['saleQuote'], operation: ['create'] } },
    options: [
      {
        displayName: 'Customer ID',
        name: 'customerId',
        type: 'number',
        default: 0,
        routing: { request: { body: { customerId: '={{$value}}' } } },
      },
      {
        displayName: 'Customer Order Reference',
        name: 'customerOrderReference',
        type: 'string',
        default: '',
        routing: { request: { body: { customerOrderReference: '={{$value}}' } } },
      },
      {
        displayName: 'Date',
        name: 'date',
        type: 'dateTime',
        default: '',
        routing: { request: { body: { date: '={{$value}}' } } },
      },
      {
        displayName: 'Footer Notes',
        name: 'footerNotes',
        type: 'string',
        default: '',
        routing: { request: { body: { footerNotes: '={{$value}}' } } },
      },
      {
        displayName: 'Header Notes',
        name: 'headerNotes',
        type: 'string',
        default: '',
        routing: { request: { body: { headerNotes: '={{$value}}' } } },
      },
      {
        displayName: 'Internal ID',
        name: 'internalId',
        type: 'string',
        default: '',
        routing: { request: { body: { internalId: '={{$value}}' } } },
      },
      {
        displayName: 'Internal Notes',
        name: 'internalNotes',
        type: 'string',
        default: '',
        routing: { request: { body: { internalNotes: '={{$value}}' } } },
      },
      {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        default: '',
        routing: { request: { body: { subject: '={{$value}}' } } },
      },
      {
        displayName: 'Vendor Reference',
        name: 'vendorReference',
        type: 'string',
        default: '',
        routing: { request: { body: { vendorReference: '={{$value}}' } } },
      },
    ],
  },
  {
    displayName: 'Lines',
    name: 'lines',
    type: 'fixedCollection',
    typeOptions: { multipleValues: true },
    placeholder: 'Add Line',
    default: {},
    description: 'Quote document lines',
    displayOptions: { show: { resource: ['saleQuote'], operation: ['create'] } },
    options: [
      {
        displayName: 'Line',
        name: 'line',
        values: saleDocumentLineValues,
      },
    ],
    routing: {
      send: {
        preSend: [
          async function (this, requestOptions) {
            const lines = (this.getNodeParameter('lines') as { line?: unknown[] })?.line;
            if (lines?.length) {
              (requestOptions.body as Record<string, unknown>).lines = lines;
            }
            return requestOptions;
          },
        ],
      },
    },
  },
];
