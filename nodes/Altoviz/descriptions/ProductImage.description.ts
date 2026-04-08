import type { INodeProperties } from 'n8n-workflow';

export const productImageOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['productImage'] } },
    options: [
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a product image',
        action: 'Delete a product image',
        routing: {
          request: { method: 'DELETE', url: '=/v1/ProductImages/{{$parameter["id"]}}' },
        },
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a product image',
        action: 'Get a product image',
        routing: {
          request: { method: 'GET', url: '=/v1/ProductImages/{{$parameter["productId"]}}' },
        },
      },
      {
        name: 'Upload',
        value: 'upload',
        description: 'Add or update a product image',
        action: 'Upload a product image',
        routing: {
          request: {
            method: 'POST',
            url: '=/v1/ProductImages/{{$parameter["productId"]}}',
          },
        },
      },
    ],
    default: 'get',
  },
];

export const productImageFields: INodeProperties[] = [
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['productImage'], operation: ['get', 'upload'] } },
  },
  {
    displayName: 'Image ID',
    name: 'id',
    type: 'number',
    required: true,
    default: 0,
    description: 'The ID of the product image to delete',
    displayOptions: { show: { resource: ['productImage'], operation: ['delete'] } },
  },
  {
    displayName: 'Binary Property',
    name: 'binaryPropertyName',
    type: 'string',
    required: true,
    default: 'data',
    description: 'Name of the binary property that contains the image file to upload',
    displayOptions: { show: { resource: ['productImage'], operation: ['upload'] } },
    routing: {
      send: {
        type: 'body',
        property: 'binaryPropertyName',
      },
    },
  },
];
