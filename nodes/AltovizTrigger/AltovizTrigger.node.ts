import type {
  IDataObject,
  IHookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { API_BASE_URL } from '../constants';

const WEBHOOKS_ENDPOINT = `${API_BASE_URL}/v1/Webhooks`;

export class AltovizTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Altoviz Trigger',
    name: 'altovizTrigger',
    icon: 'file:../../icons/altoviz-logo.svg',
    group: ['trigger'],
    version: 1,
    subtitle: '={{ $parameter["events"].join(", ") }}',
    description: 'Starts the workflow when an Altoviz event occurs',
    defaults: {
      name: 'Altoviz Trigger',
    },
    usableAsTool: true,
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
        description: 'The events that will trigger this workflow',
        options: [
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
        ],
      },
      {
        displayName: 'Webhook Name',
        name: 'webhookName',
        type: 'string',
        default: '',
        placeholder: 'e.g. n8n-altoviz',
        description:
          'Label shown in the Altoviz webhook list. Defaults to n8n if left blank.',
      },
      {
        displayName: 'Secret Key',
        name: 'secretKey',
        type: 'string',
        typeOptions: { password: true },
        default: '',
        description:
          'Optional secret used by Altoviz to sign payloads. If set, verify the X-Signature header in your workflow.',
      },
    ],
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');
        const webhookId = webhookData.webhookId as number | undefined;
        const webhookUrl = this.getNodeWebhookUrl('default') as string;
        const events = this.getNodeParameter('events') as string[];

        try {
          const registeredWebhooks = await this.helpers.httpRequestWithAuthentication.call(
            this,
            'altovizApi',
            { method: 'GET', url: WEBHOOKS_ENDPOINT, json: true },
          );
          if (Array.isArray(registeredWebhooks)) {
            const existing = (
              registeredWebhooks as Array<{ id: number; url: string; types: string[] }>
            ).find((wh) => wh.id === webhookId || wh.url === webhookUrl);

            if (!existing) return false;

            const typesMatch =
              existing.types.length === events.length &&
              events.every((e) => existing.types.includes(e));

            if (typesMatch) {
              webhookData.webhookId = existing.id;
              return true;
            }

            // Types changed — delete stale webhook so create() registers a fresh one
            await this.helpers.httpRequestWithAuthentication.call(this, 'altovizApi', {
              method: 'DELETE',
              url: WEBHOOKS_ENDPOINT,
              qs: { id: existing.id },
              json: true,
            });
            delete webhookData.webhookId;
          }
        } catch {
          return false;
        }
        return false;
      },

      async create(this: IHookFunctions): Promise<boolean> {
        const webhookUrl = this.getNodeWebhookUrl('default') as string;
        const events = this.getNodeParameter('events') as string[];
        const webhookName = (this.getNodeParameter('webhookName') as string) || 'n8n';
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
            url: WEBHOOKS_ENDPOINT,
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
              url: WEBHOOKS_ENDPOINT,
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

    // Altoviz sends Content-Type: text/plain, so the body may arrive as a
    // raw JSON string instead of a parsed object. Parse it if necessary.
    let body: { id?: string; type?: string; data?: IDataObject };
    if (typeof bodyData === 'string') {
      body = JSON.parse(bodyData) as typeof body;
    } else {
      body = bodyData as typeof body;
    }

    const output: IDataObject = {
      eventType: body.type ?? '',
      ...(body.data ?? {}),
    };
    return {
      workflowData: [[{ json: output }]],
    };
  }
}
