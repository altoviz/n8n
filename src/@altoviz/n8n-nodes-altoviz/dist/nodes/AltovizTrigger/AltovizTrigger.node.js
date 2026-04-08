"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AltovizTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const EVENT_TYPE_OPTIONS = [
    { name: 'Contact Created', value: 'ContactCreated' },
    { name: 'Contact Deleted', value: 'ContactDeleted' },
    { name: 'Contact Updated', value: 'ContactUpdated' },
    { name: 'Customer Created', value: 'CustomerCreated' },
    { name: 'Customer Deleted', value: 'CustomerDeleted' },
    { name: 'Customer Updated', value: 'CustomerUpdated' },
    { name: 'Invoice Created', value: 'InvoiceCreated' },
    { name: 'Invoice Deleted', value: 'InvoiceDeleted' },
    { name: 'Invoice Updated', value: 'InvoiceUpdated' },
    { name: 'Product Created', value: 'ProductCreated' },
    { name: 'Product Deleted', value: 'ProductDeleted' },
    { name: 'Product Updated', value: 'ProductUpdated' },
    { name: 'Quote Created', value: 'QuoteCreated' },
    { name: 'Quote Deleted', value: 'QuoteDeleted' },
    { name: 'Quote Updated', value: 'QuoteUpdated' },
];
class AltovizTrigger {
    constructor() {
        this.description = {
            displayName: 'Altoviz Trigger',
            name: 'altovizTrigger',
            icon: 'file:altoviz-logo.svg',
            group: ['trigger'],
            version: 1,
            description: 'Starts the workflow when Altoviz sends a webhook event',
            defaults: {
                name: 'Altoviz Trigger',
            },
            inputs: [],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [
                {
                    name: 'altovizApi',
                    required: true,
                },
            ],
            webhooks: [
                {
                    name: 'default',
                    httpMethod: 'POST',
                    responseMode: 'onReceived',
                    path: 'webhook',
                },
            ],
            properties: [
                {
                    displayName: 'Events',
                    name: 'events',
                    type: 'multiOptions',
                    required: true,
                    default: [],
                    description: 'The Altoviz events that will trigger this workflow',
                    options: EVENT_TYPE_OPTIONS,
                },
                {
                    displayName: 'Webhook Name',
                    name: 'webhookName',
                    type: 'string',
                    required: true,
                    default: 'n8n',
                    description: 'Label shown in the Altoviz webhook list',
                },
                {
                    displayName: 'Secret Key',
                    name: 'secretKey',
                    type: 'string',
                    typeOptions: { password: true },
                    default: '',
                    description: 'Optional secret used by Altoviz to sign payloads. If set, verify the X-Altoviz-Signature header in your workflow.',
                },
            ],
            usableAsTool: true,
        };
        this.webhookMethods = {
            default: {
                async checkExists() {
                    const webhookData = this.getWorkflowStaticData('node');
                    const webhookId = webhookData.webhookId;
                    if (!webhookId)
                        return false;
                    const endpoint = 'https://api.altoviz.com/v1/Webhooks';
                    try {
                        const registeredWebhooks = await this.helpers.httpRequestWithAuthentication.call(this, 'altovizApi', { method: 'GET', url: endpoint, json: true });
                        if (Array.isArray(registeredWebhooks)) {
                            return registeredWebhooks.some((wh) => wh.id === webhookId);
                        }
                    }
                    catch {
                        return false;
                    }
                    return false;
                },
                async create() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const events = this.getNodeParameter('events');
                    const webhookName = this.getNodeParameter('webhookName');
                    const secretKey = this.getNodeParameter('secretKey');
                    const body = {
                        name: webhookName,
                        url: webhookUrl,
                        types: events,
                    };
                    if (secretKey) {
                        body.secretKey = secretKey;
                    }
                    const response = await this.helpers.httpRequestWithAuthentication.call(this, 'altovizApi', {
                        method: 'POST',
                        url: 'https://api.altoviz.com/v1/Webhooks',
                        json: true,
                        body,
                    });
                    const webhookData = this.getWorkflowStaticData('node');
                    webhookData.webhookId = response.id;
                    return true;
                },
                async delete() {
                    const webhookData = this.getWorkflowStaticData('node');
                    const webhookId = webhookData.webhookId;
                    if (!webhookId)
                        return true;
                    try {
                        await this.helpers.httpRequestWithAuthentication.call(this, 'altovizApi', {
                            method: 'DELETE',
                            url: 'https://api.altoviz.com/v1/Webhooks',
                            qs: { id: webhookId },
                            json: true,
                        });
                    }
                    catch {
                        return false;
                    }
                    delete webhookData.webhookId;
                    return true;
                },
            },
        };
    }
    async webhook() {
        const bodyData = this.getBodyData();
        return {
            workflowData: [[{ json: bodyData }]],
        };
    }
}
exports.AltovizTrigger = AltovizTrigger;
//# sourceMappingURL=AltovizTrigger.node.js.map