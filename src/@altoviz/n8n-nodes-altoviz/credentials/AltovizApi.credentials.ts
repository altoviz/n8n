import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class AltovizApi implements ICredentialType {
  name = 'altovizApi';

  displayName = 'Altoviz API';

  icon = 'file:altoviz-logo.svg' as const;

  documentationUrl = 'https://altoviz.com';

  properties: INodeProperties[] = [
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

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'X-API-KEY': '={{$credentials.apiKey}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://api.altoviz.com',
      url: '/Hello',
      method: 'GET',
    },
  };
}
