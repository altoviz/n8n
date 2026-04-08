"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitFields = exports.unitOperations = void 0;
exports.unitOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['unit'] } },
        options: [
            {
                name: 'List',
                value: 'list',
                description: 'List all units',
                action: 'List units',
                routing: { request: { method: 'GET', url: '/v1/Units' } },
            },
        ],
        default: 'list',
    },
];
exports.unitFields = [];
//# sourceMappingURL=Unit.description.js.map