"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vatFields = exports.vatOperations = void 0;
exports.vatOperations = [
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
exports.vatFields = [];
//# sourceMappingURL=Vat.description.js.map