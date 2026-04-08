import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

import {
  bankAccountFields,
  bankAccountOperations,
  classificationFields,
  classificationOperations,
  colleagueFields,
  colleagueOperations,
  contactFields,
  contactOperations,
  customerFamilyFields,
  customerFamilyOperations,
  customerFields,
  customerOperations,
  productFamilyFields,
  productFamilyOperations,
  productImageFields,
  productImageOperations,
  productFields,
  productOperations,
  purchaseInvoiceFields,
  purchaseInvoiceOperations,
  receiptFields,
  receiptOperations,
  saleCreditFields,
  saleCreditOperations,
  saleInvoiceFields,
  saleInvoiceOperations,
  saleQuoteFields,
  saleQuoteOperations,
  settingFields,
  settingOperations,
  supplierFields,
  supplierOperations,
  unitFields,
  unitOperations,
  userFields,
  userOperations,
  vatFields,
  vatOperations,
  webhookFields,
  webhookOperations,
} from './descriptions';

export class Altoviz implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Altoviz',
    name: 'altoviz',
    icon: 'file:../../icons/altoviz-logo.svg',
    group: ['output'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Invoicing app for small businesses',
    defaults: {
      name: 'Altoviz',
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [
      {
        name: 'altovizApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.altoviz.com',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Bank Account', value: 'bankAccount' },
          { name: 'Classification', value: 'classification' },
          { name: 'Colleague', value: 'colleague' },
          { name: 'Contact', value: 'contact' },
          { name: 'Customer', value: 'customer' },
          { name: 'Customer Family', value: 'customerFamily' },
          { name: 'Product', value: 'product' },
          { name: 'Product Family', value: 'productFamily' },
          { name: 'Product Image', value: 'productImage' },
          { name: 'Purchase Invoice', value: 'purchaseInvoice' },
          { name: 'Receipt', value: 'receipt' },
          { name: 'Sale Credit', value: 'saleCredit' },
          { name: 'Sale Invoice', value: 'saleInvoice' },
          { name: 'Sale Quote', value: 'saleQuote' },
          { name: 'Setting', value: 'setting' },
          { name: 'Supplier', value: 'supplier' },
          { name: 'Unit', value: 'unit' },
          { name: 'User', value: 'user' },
          { name: 'VAT', value: 'vat' },
          { name: 'Webhook', value: 'webhook' },
        ],
        default: 'customer',
      },

      // Bank Account
      ...bankAccountOperations,
      ...bankAccountFields,

      // Classification
      ...classificationOperations,
      ...classificationFields,

      // Colleague
      ...colleagueOperations,
      ...colleagueFields,

      // Contact
      ...contactOperations,
      ...contactFields,

      // Customer
      ...customerOperations,
      ...customerFields,

      // Customer Family
      ...customerFamilyOperations,
      ...customerFamilyFields,

      // Product
      ...productOperations,
      ...productFields,

      // Product Family
      ...productFamilyOperations,
      ...productFamilyFields,

      // Product Image
      ...productImageOperations,
      ...productImageFields,

      // Purchase Invoice
      ...purchaseInvoiceOperations,
      ...purchaseInvoiceFields,

      // Receipt
      ...receiptOperations,
      ...receiptFields,

      // Sale Credit
      ...saleCreditOperations,
      ...saleCreditFields,

      // Sale Invoice
      ...saleInvoiceOperations,
      ...saleInvoiceFields,

      // Sale Quote
      ...saleQuoteOperations,
      ...saleQuoteFields,

      // Setting
      ...settingOperations,
      ...settingFields,

      // Supplier
      ...supplierOperations,
      ...supplierFields,

      // Unit
      ...unitOperations,
      ...unitFields,

      // User
      ...userOperations,
      ...userFields,

      // VAT
      ...vatOperations,
      ...vatFields,

      // Webhook
      ...webhookOperations,
      ...webhookFields,
    ],
  };
}
