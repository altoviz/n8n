"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFamilyFields = exports.productFamilyOperations = void 0;
exports.productFamilyOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['productFamily'] } },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new product family',
                action: 'Create a product family',
                routing: { request: { method: 'POST', url: '/v1/ProductFamilies' } },
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a product family',
                action: 'Delete a product family',
                routing: {
                    request: { method: 'DELETE', url: '=/v1/ProductFamilies/{{$parameter["id"]}}' },
                },
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get a product family by ID',
                action: 'Get a product family',
                routing: {
                    request: { method: 'GET', url: '=/v1/ProductFamilies/{{$parameter["id"]}}' },
                },
            },
            {
                name: 'List',
                value: 'list',
                description: 'List product families',
                action: 'List product families',
                routing: { request: { method: 'GET', url: '/v1/ProductFamilies' } },
            },
        ],
        default: 'list',
    },
];
exports.productFamilyFields = [
    {
        displayName: 'Product Family ID',
        name: 'id',
        type: 'number',
        required: true,
        default: 0,
        displayOptions: { show: { resource: ['productFamily'], operation: ['get', 'delete'] } },
    },
    {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: { show: { resource: ['productFamily'], operation: ['list'] } },
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
        displayOptions: { show: { resource: ['productFamily'], operation: ['create'] } },
        routing: { request: { body: { label: '={{$value}}' } } },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['productFamily'], operation: ['create'] } },
        options: [
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
//# sourceMappingURL=ProductFamily.description.js.map