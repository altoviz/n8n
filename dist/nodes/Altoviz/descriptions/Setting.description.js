"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingFields = exports.settingOperations = void 0;
exports.settingOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['setting'] } },
        options: [
            {
                name: 'Get',
                value: 'get',
                description: 'Get Altoviz account settings',
                action: 'Get settings',
                routing: { request: { method: 'GET', url: '/v1/Settings' } },
            },
        ],
        default: 'get',
    },
];
exports.settingFields = [];
//# sourceMappingURL=Setting.description.js.map