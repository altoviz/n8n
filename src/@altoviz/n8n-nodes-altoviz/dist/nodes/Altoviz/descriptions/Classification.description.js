"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classificationFields = exports.classificationOperations = void 0;
exports.classificationOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['classification'] } },
        options: [
            {
                name: 'List',
                value: 'list',
                description: 'List all classifications',
                action: 'List classifications',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v1/Classifications',
                    },
                },
            },
        ],
        default: 'list',
    },
];
exports.classificationFields = [
    {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        default: '',
        description: 'Filter by classification type',
        displayOptions: { show: { resource: ['classification'], operation: ['list'] } },
        options: [
            { name: 'Any', value: '' },
            { name: 'Sale', value: 'Sale' },
            { name: 'Expense', value: 'Expense' },
            { name: 'Other', value: 'Other' },
        ],
        routing: {
            request: {
                qs: {
                    type: '={{$value || undefined}}',
                },
            },
        },
    },
];
//# sourceMappingURL=Classification.description.js.map