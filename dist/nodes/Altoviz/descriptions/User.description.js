"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFields = exports.userOperations = void 0;
exports.userOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['user'] } },
        options: [
            {
                name: 'Get Me',
                value: 'getMe',
                description: 'Get the current authenticated user',
                action: 'Get current user',
                routing: { request: { method: 'GET', url: '/v1/Users/me' } },
            },
        ],
        default: 'getMe',
    },
];
exports.userFields = [];
//# sourceMappingURL=User.description.js.map