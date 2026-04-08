"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AltovizApi = void 0;
class AltovizApi {
    constructor() {
        this.name = 'altovizApi';
        this.displayName = 'Altoviz API';
        this.icon = 'file:../icons/altoviz-logo.svg';
        this.documentationUrl = 'https://altoviz.com';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
                description: 'API key generated in the Altoviz application',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'X-API-KEY': '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.altoviz.com',
                url: '/Hello',
                method: 'GET',
            },
        };
    }
}
exports.AltovizApi = AltovizApi;
//# sourceMappingURL=AltovizApi.credentials.js.map