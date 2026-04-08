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

export const saleInvoiceOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['saleInvoice'] } },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new draft invoice',
        action: 'Create a sale invoice',
        routing: { request: { method: 'POST', url: '/v1/SaleInvoices' } },
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a draft invoice',
        action: 'Delete a sale invoice',
        routing: {
          request: { method: 'DELETE', url: '=/v1/SaleInvoices/{{$parameter["id"]}}' },
        },
      },
      {
        name: 'Download',
        value: 'download',
        description: 'Download the invoice as a PDF',
        action: 'Download a sale invoice as PDF',
        routing: {
          request: {
            method: 'GET',
            url: '=/v1/SaleInvoices/Download/{{$parameter["id"]}}',
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
        description: 'Finalize a draft invoice',
        action: 'Finalize a sale invoice',
        routing: {
          request: {
            method: 'POST',
            url: '=/v1/SaleInvoices/Finalize/{{$parameter["id"]}}',
          },
        },
      },
      {
        name: 'Find',
        value: 'find',
        description: 'Find invoices by internal ID',
        action: 'Find a sale invoice',
        routing: { request: { method: 'GET', url: '/v1/SaleInvoices/Find' } },
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get an invoice by ID',
        action: 'Get a sale invoice',
        routing: {
          request: { method: 'GET', url: '=/v1/SaleInvoices/{{$parameter["id"]}}' },
        },
      },
      {
        name: 'List',
        value: 'list',
        description: 'List invoices',
        action: 'List sale invoices',
        routing: { request: { method: 'GET', url: '/v1/SaleInvoices' } },
      },
      {
        name: 'Mark as Paid',
        value: 'markAsPaid',
        description: 'Mark an invoice as paid',
        action: 'Mark a sale invoice as paid',
        routing: { request: { method: 'POST', url: '/v1/SaleInvoices/MarkAsPaid' } },
      },
      {
        name: 'Send',
        value: 'send',
        description: 'Send an invoice by email',
        action: 'Send a sale invoice',
        routing: {
          request: { method: 'POST', url: '=/v1/SaleInvoices/Send/{{$parameter["id"]}}' },
        },
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a draft invoice',
        action: 'Update a sale invoice',
        routing: {
          request: { method: 'PUT', url: '=/v1/SaleInvoices/{{$parameter["id"]}}' },
        },
      },
    ],
    default: 'list',
  },
];

export const saleInvoiceFields: INodeProperties[] = [
  {
    displayName: 'Invoice ID',
    name: 'id',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['saleInvoice'],
        operation: ['get', 'update', 'delete', 'finalize', 'download', 'send'],
      },
    },
  },
  {
    displayName: 'Find By Internal ID',
    name: 'internalId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['saleInvoice'], operation: ['find'] } },
    routing: { request: { qs: { internalId: '={{$value}}' } } },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { resource: ['saleInvoice'], operation: ['list'] } },
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
        displayName: 'Include Cancelled',
        name: 'IncludeCancelled',
        type: 'boolean',
        default: false,
        routing: { request: { qs: { IncludeCancelled: '={{$value}}' } } },
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
        name: 'Status',
        type: 'options',
        default: '',
        options: [
          { name: 'Any', value: '' },
          { name: 'Draft', value: 'Draft' },
          { name: 'Expired', value: 'Expired' },
          { name: 'Incoming', value: 'Incoming' },
          { name: 'Paid', value: 'Paid' },
          { name: 'To Send', value: 'ToSend' },
        ],
        routing: { request: { qs: { Status: '={{$value}}' } } },
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
    description: 'Comma-separated list of email addresses to send the invoice to',
    displayOptions: { show: { resource: ['saleInvoice'], operation: ['send'] } },
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
  // MarkAsPaid fields
  {
    displayName: 'Invoice ID',
    name: 'payInvoiceId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['saleInvoice'], operation: ['markAsPaid'] } },
    routing: { request: { body: { invoiceId: '={{$value}}' } } },
  },
  {
    displayName: 'Payment Date',
    name: 'paymentDate',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['saleInvoice'], operation: ['markAsPaid'] } },
    routing: { request: { body: { date: '={{$value}}' } } },
  },
  {
    displayName: 'Payment Additional Fields',
    name: 'paymentAdditionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['saleInvoice'], operation: ['markAsPaid'] } },
    options: [
      {
        displayName: 'Allow Update',
        name: 'allowUpdate',
        type: 'boolean',
        default: false,
        routing: { request: { body: { allowUpdate: '={{$value}}' } } },
      },
      {
        displayName: 'Amount',
        name: 'amount',
        type: 'number',
        default: 0,
        routing: { request: { body: { amount: '={{$value}}' } } },
      },
      {
        displayName: 'Finalize Invoice',
        name: 'finalizeInvoice',
        type: 'boolean',
        default: false,
        routing: { request: { body: { finalizeInvoice: '={{$value}}' } } },
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
        displayName: 'Payment Reference',
        name: 'paymentReference',
        type: 'string',
        default: '',
        routing: { request: { body: { paymentReference: '={{$value}}' } } },
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
    displayOptions: { show: { resource: ['saleInvoice'], operation: ['create', 'update'] } },
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
    description: 'Invoice document lines',
    displayOptions: { show: { resource: ['saleInvoice'], operation: ['create', 'update'] } },
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
