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

export const saleCreditOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['saleCredit'] } },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new draft credit',
        action: 'Create a sale credit',
        routing: { request: { method: 'POST', url: '/v1/SaleCredits' } },
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a draft credit',
        action: 'Delete a sale credit',
        routing: {
          request: { method: 'DELETE', url: '=/v1/SaleCredits/{{$parameter["id"]}}' },
        },
      },
      {
        name: 'Download',
        value: 'download',
        description: 'Download the credit as a PDF',
        action: 'Download a sale credit as PDF',
        routing: {
          request: {
            method: 'GET',
            url: '=/v1/SaleCredits/Download/{{$parameter["id"]}}',
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
        name: 'Finalize',
        value: 'finalize',
        description: 'Finalize a draft credit',
        action: 'Finalize a sale credit',
        routing: {
          request: {
            method: 'POST',
            url: '=/v1/SaleCredits/Finalize/{{$parameter["id"]}}',
          },
        },
      },
      {
        name: 'Find',
        value: 'find',
        description: 'Find credits by internal ID',
        action: 'Find a sale credit',
        routing: { request: { method: 'GET', url: '/v1/SaleCredits/Find' } },
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a credit by ID',
        action: 'Get a sale credit',
        routing: {
          request: { method: 'GET', url: '=/v1/SaleCredits/{{$parameter["id"]}}' },
        },
      },
      {
        name: 'List',
        value: 'list',
        description: 'List credits',
        action: 'List sale credits',
        routing: { request: { method: 'GET', url: '/v1/SaleCredits' } },
      },
      {
        name: 'Mark as Refunded',
        value: 'markAsRefunded',
        description: 'Mark a credit as refunded',
        action: 'Mark a sale credit as refunded',
        routing: { request: { method: 'POST', url: '/v1/SaleCredits/MarkAsRefunded' } },
      },
      {
        name: 'Send',
        value: 'send',
        description: 'Send a credit by email',
        action: 'Send a sale credit',
        routing: {
          request: { method: 'POST', url: '=/v1/SaleCredits/Send/{{$parameter["id"]}}' },
        },
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a draft credit',
        action: 'Update a sale credit',
        routing: {
          request: { method: 'PUT', url: '=/v1/SaleCredits/{{$parameter["id"]}}' },
        },
      },
    ],
    default: 'list',
  },
];

export const saleCreditFields: INodeProperties[] = [
  {
    displayName: 'Credit ID',
    name: 'id',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: { resource: ['saleCredit'], operation: ['get', 'update', 'delete', 'finalize', 'download', 'send'] },
    },
  },
  {
    displayName: 'Find By Internal ID',
    name: 'internalId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['saleCredit'], operation: ['find'] } },
    routing: { request: { qs: { internalId: '={{$value}}' } } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { resource: ['saleCredit'], operation: ['list'] } },
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
    description: 'Comma-separated list of email addresses to send the credit to',
    displayOptions: { show: { resource: ['saleCredit'], operation: ['send'] } },
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
  // MarkAsRefunded fields
  {
    displayName: 'Credit ID',
    name: 'creditId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['saleCredit'], operation: ['markAsRefunded'] } },
    routing: { request: { body: { creditId: '={{$value}}' } } },
  },
  {
    displayName: 'Refund Date',
    name: 'refundDate',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['saleCredit'], operation: ['markAsRefunded'] } },
    routing: { request: { body: { date: '={{$value}}' } } },
  },
  {
    displayName: 'Refund Additional Fields',
    name: 'refundAdditionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['saleCredit'], operation: ['markAsRefunded'] } },
    options: [
      {
        displayName: 'Amount',
        name: 'amount',
        type: 'number',
        default: 0,
        routing: { request: { body: { amount: '={{$value}}' } } },
      },
      {
        displayName: 'Finalize Credit',
        name: 'finalizeCredit',
        type: 'boolean',
        default: false,
        routing: { request: { body: { finalizeCredit: '={{$value}}' } } },
      },
      {
        displayName: 'Payment Method',
        name: 'paymentMethod',
        type: 'options',
        default: 'Transfer',
        options: [
          { name: 'Bill', value: 'Bill' },
          { name: 'Card', value: 'Card' },
          { name: 'Cash', value: 'Cash' },
          { name: 'Check', value: 'Check' },
          { name: 'Order', value: 'Order' },
          { name: 'Other', value: 'Other' },
          { name: 'Transfer', value: 'Transfer' },
          { name: 'Usec', value: 'Usec' },
        ],
        routing: { request: { body: { paymentMethod: '={{$value}}' } } },
      },
      {
        displayName: 'Refund Reference',
        name: 'refundReference',
        type: 'string',
        default: '',
        routing: { request: { body: { refundReference: '={{$value}}' } } },
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        default: 'Success',
        options: [
          { name: 'Failed', value: 'Failed' },
          { name: 'Pending', value: 'Pending' },
          { name: 'Success', value: 'Success' },
        ],
        routing: { request: { body: { status: '={{$value}}' } } },
      },
    ],
  },
  // Create/Update fields
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['saleCredit'], operation: ['create', 'update'] } },
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
    description: 'Credit document lines',
    displayOptions: { show: { resource: ['saleCredit'], operation: ['create', 'update'] } },
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
