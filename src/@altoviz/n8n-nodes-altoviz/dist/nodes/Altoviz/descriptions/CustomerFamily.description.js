"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerFamilyFields = exports.customerFamilyOperations = void 0;
exports.customerFamilyOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['customerFamily'] } },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new customer family',
                action: 'Create a customer family',
                routing: { request: { method: 'POST', url: '/v1/CustomerFamilies' } },
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a customer family',
                action: 'Delete a customer family',
                routing: {
                    request: { method: 'DELETE', url: '=/v1/CustomerFamilies/{{$parameter["id"]}}' },
                },
            },
            {
                name: 'Find',
                value: 'find',
                description: 'Find a customer family by number or internal ID',
                action: 'Find a customer family',
                routing: { request: { method: 'GET', url: '/v1/CustomerFamilies/Find' } },
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get a customer family by ID',
                action: 'Get a customer family',
                routing: {
                    request: { method: 'GET', url: '=/v1/CustomerFamilies/{{$parameter["id"]}}' },
                },
            },
            {
                name: 'List',
                value: 'list',
                description: 'List customer families',
                action: 'List customer families',
                routing: { request: { method: 'GET', url: '/v1/CustomerFamilies' } },
            },
        ],
        default: 'list',
    },
];
exports.customerFamilyFields = [
    {
        displayName: 'Customer Family ID',
        name: 'id',
        type: 'number',
        required: true,
        default: 0,
        displayOptions: { show: { resource: ['customerFamily'], operation: ['get', 'delete'] } },
    },
    {
        displayName: 'Find By',
        name: 'findBy',
        type: 'collection',
        placeholder: 'Add Search Field',
        default: {},
        displayOptions: { show: { resource: ['customerFamily'], operation: ['find'] } },
        options: [
            {
                displayName: 'Internal ID',
                name: 'internalId',
                type: 'string',
                default: '',
                routing: { request: { qs: { internalId: '={{$value}}' } } },
            },
            {
                displayName: 'Number',
                name: 'number',
                type: 'string',
                default: '',
                routing: { request: { qs: { number: '={{$value}}' } } },
            },
        ],
    },
    {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: { show: { resource: ['customerFamily'], operation: ['list'] } },
        options: [
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
                displayName: 'Search Query',
                name: 'query',
                type: 'string',
                default: '',
                routing: { request: { qs: { query: '={{$value}}' } } },
            },
        ],
    },
    {
        displayName: 'Label',
        name: 'label',
        type: 'string',
        required: true,
        default: '',
        description: 'Label of the customer family',
        displayOptions: { show: { resource: ['customerFamily'], operation: ['create'] } },
        routing: { request: { body: { label: '={{$value}}' } } },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['customerFamily'], operation: ['create'] } },
        options: [
            {
                displayName: 'Internal ID',
                name: 'internalId',
                type: 'string',
                default: '',
                routing: { request: { body: { internalId: '={{$value}}' } } },
            },
            {
                displayName: 'Number',
                name: 'number',
                type: 'string',
                default: '',
                routing: { request: { body: { number: '={{$value}}' } } },
            },
        ],
    },
];
//# sourceMappingURL=CustomerFamily.description.js.map