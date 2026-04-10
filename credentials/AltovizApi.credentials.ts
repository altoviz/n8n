import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

import { API_BASE_URL } from '../nodes/constants';

export class AltovizApi implements ICredentialType {
  name = 'altovizApi';

  displayName = 'Altoviz API';

  icon = 'file:../icons/altoviz-logo.svg' as const;

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
      baseURL: API_BASE_URL,
      url: '/Hello',
      method: 'GET',
    },
  };
}
