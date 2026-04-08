import type {
  IDataObject,
  IHookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

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

export class AltovizTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Altoviz Trigger',
    name: 'altovizTrigger',
    icon: 'file:../../icons/altoviz-logo.svg',
    group: ['trigger'],
    version: 1,
    description: 'Starts the workflow when Altoviz sends a webhook event',
    defaults: {
      name: 'Altoviz Trigger',
    },
    inputs: [],
    outputs: [NodeConnectionTypes.Main],
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
        description:
          'Optional secret used by Altoviz to sign payloads. If set, verify the X-Altoviz-Signature header in your workflow.',
      },
    ],
    usableAsTool: true,
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');
        const webhookId = webhookData.webhookId as number | undefined;
        if (!webhookId) return false;

        const endpoint = 'https://api.altoviz.com/v1/Webhooks';
        try {
          const registeredWebhooks = await this.helpers.httpRequestWithAuthentication.call(
            this,
            'altovizApi',
            { method: 'GET', url: endpoint, json: true },
          );
          if (Array.isArray(registeredWebhooks)) {
            return registeredWebhooks.some(
              (wh: { id: number }) => wh.id === webhookId,
            );
          }
        } catch {
          return false;
        }
        return false;
      },

      async create(this: IHookFunctions): Promise<boolean> {
        const webhookUrl = this.getNodeWebhookUrl('default') as string;
        const events = this.getNodeParameter('events') as string[];
        const webhookName = this.getNodeParameter('webhookName') as string;
        const secretKey = this.getNodeParameter('secretKey') as string;

        const body: Record<string, unknown> = {
          name: webhookName,
          url: webhookUrl,
          types: events,
        };
        if (secretKey) {
          body.secretKey = secretKey;
        }

        const response = await this.helpers.httpRequestWithAuthentication.call(
          this,
          'altovizApi',
          {
            method: 'POST',
            url: 'https://api.altoviz.com/v1/Webhooks',
            json: true,
            body,
          },
        );

        const webhookData = this.getWorkflowStaticData('node');
        webhookData.webhookId = (response as { id: number }).id;
        return true;
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');
        const webhookId = webhookData.webhookId as number | undefined;
        if (!webhookId) return true;

        try {
          await this.helpers.httpRequestWithAuthentication.call(
            this,
            'altovizApi',
            {
              method: 'DELETE',
              url: 'https://api.altoviz.com/v1/Webhooks',
              qs: { id: webhookId },
              json: true,
            },
          );
        } catch {
          return false;
        }

        delete webhookData.webhookId;
        return true;
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const bodyData = this.getBodyData();

    return {
      workflowData: [[{ json: bodyData as IDataObject }]],
    };
  }
}
