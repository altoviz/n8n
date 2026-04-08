# @altoviz/n8n-nodes-altoviz

[![CI](https://github.com/altoviz/n8n/actions/workflows/ci.yml/badge.svg)](https://github.com/altoviz/n8n/actions/workflows/ci.yml)
[![Publish](https://github.com/altoviz/n8n/actions/workflows/publish.yml/badge.svg)](https://github.com/altoviz/n8n/actions/workflows/publish.yml)
[![npm](https://img.shields.io/npm/v/@altoviz/n8n-nodes-altoviz)](https://www.npmjs.com/package/@altoviz/n8n-nodes-altoviz)

This is an n8n community node package that integrates [Altoviz](https://altoviz.com) with your n8n workflow, so you can create quotes and invoices, extract customers data and more. It provides two nodes — **Altoviz** (action) and **Altoviz Trigger** (webhook) — covering all 20 API resources.

[Altoviz](https://altoviz.com) is a French invoicing and accounting app for small businesses and freelancers.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) AI workflow automation platform.

[Installation (self-hosted)](#installation-self-hosted)
[Installation (n8n Cloud)](#installation-n8n-cloud)
[Installation (development and contributing)](#installation-development-and-contributing)
[Operations](#operations)
[Credentials](#credentials)
[Usage](#usage)
[Compatibility](#compatibility)
[Resources](#resources)
[Version history](#version-history)

## Installation (self-hosted)

To install the node directly from the n8n Editor UI:

1. Open your n8n instance.
2. Go to **Settings → Community Nodes**.
3. Select **Install**.
4. Enter the npm package name: `@altoviz/n8n-nodes-altoviz` to install the latest version.  
   To install a specific version (e.g. 0.2.0), enter `@altoviz/n8n-nodes-altoviz@0.2.0`.
5. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes and select **Install**.
6. The node is now available in your workflows.

## Installation (n8n Cloud)

1. Go to the Canvas and open the nodes panel.
2. Search for **Altoviz** in the community node registry.
3. Click **Install node**.

## Installation (development and contributing)

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

```bash
node --version   # v18.x or higher
npm --version    # 9.x or higher
```

### 1. Clone and install dependencies

```bash
git clone https://github.com/altoviz/n8n.git
cd n8n/src/@altoviz/n8n-nodes-altoviz
npm install
```

### 2. Build the node

```bash
npm run build
```

### 3. Link into your local n8n instance

```bash
# In the node package directory
npm link

# In ~/.n8n/nodes
cd ~/.n8n/nodes
npm link @altoviz/n8n-nodes-altoviz
```

Then start n8n: `n8n start`

### Making changes

After editing source files, rebuild and restart n8n:

```bash
npm run build
# restart n8n
```

### Public webhook URL for the Altoviz Trigger

When running n8n locally, webhook URLs use `localhost` which Altoviz cannot reach. Set a publicly accessible URL before starting n8n:

```bash
export WEBHOOK_URL="https://your-tunnel.example.com"
n8n start
```

You can use a tunnelling tool such as [ngrok](https://ngrok.com/) or [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) to expose your local instance.

## Operations

### Altoviz node

The node exposes a **Resource** dropdown with 20 resources. Each resource supports one or more operations:

| Resource         | Operations                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------- |
| Bank Account     | List Providers                                                                            |
| Classification   | List                                                                                      |
| Colleague        | Create, Delete, Find, Get, Get By Internal ID, List, Update                               |
| Contact          | Create, Delete, Find, Get, List, Update                                                   |
| Customer         | Create, Delete, Find, Get, Get By Internal ID, Get Contacts, List, Update                 |
| Customer Family  | Create, Delete, Find, Get, List                                                           |
| Product          | Create, Delete, Find, Get, List, Update                                                   |
| Product Family   | Create, Delete, Get, List                                                                 |
| Product Image    | Delete, Get, Upload                                                                       |
| Purchase Invoice | Create From File, Download (PDF)                                                          |
| Receipt          | Create, Delete, Find, Get, List, Update                                                   |
| Sale Credit      | Create, Delete, Download (PDF), Finalize, Find, Get, List, Mark as Refunded, Send, Update |
| Sale Invoice     | Create, Delete, Download (PDF), Finalize, Find, Get, List, Mark as Paid, Send, Update     |
| Sale Quote       | Create, Delete, Download (PDF), Find, Get, List, Send                                     |
| Setting          | Get                                                                                       |
| Supplier         | Create, Delete, Find, Get, Get By Internal ID, Get Contacts, List, Update                 |
| Unit             | List                                                                                      |
| User             | Get Me                                                                                    |
| VAT              | List                                                                                      |
| Webhook          | Create, Delete, List                                                                      |

### Altoviz Trigger node

Listens for Altoviz webhook events and starts the workflow when one is received. Supported events:

- Contact Created / Updated / Deleted
- Customer Created / Updated / Deleted
- Invoice Created / Updated / Deleted
- Product Created / Updated / Deleted
- Quote Created / Updated / Deleted

On activation the node automatically registers a webhook in Altoviz. On deactivation it removes it.

## Credentials

1. In Altoviz, generate an API key (**Settings → Integrations → API**).
2. In n8n, create a new **Altoviz API** credential and paste the key.
3. n8n will test the credential against `GET /Hello` — a green checkmark confirms it is valid.

## Usage

### Sending a sale invoice by email

1. Add the **Altoviz** node to your workflow.
2. Select **Resource → Sale Invoice** and **Operation → Send**.
3. Set the **Invoice ID** — for example from a previous _Create_ or _Find_ step.
4. Connect n8n credentials (**Altoviz API**).
5. Execute the node.

### Automating a quote-to-invoice flow

1. **Altoviz** node — **Sale Quote → Create** — fill in customer, lines, and date.
2. **Altoviz** node — **Sale Quote → Find** — retrieve the newly created quote ID.
3. **Altoviz** node — **Sale Invoice → Create** — create the invoice from the same data.
4. **Altoviz** node — **Sale Invoice → Finalize** — lock the invoice.
5. **Altoviz** node — **Sale Invoice → Send** — email it to the customer.

### Reacting to Altoviz events

1. Add the **Altoviz Trigger** node to start your workflow.
2. Select one or more **Events** (e.g. _Invoice Created_).
3. Optionally set a **Secret Key** to verify the `X-Altoviz-Signature` header and reject forged requests.
4. Activate the workflow — the trigger automatically registers a webhook in Altoviz and removes it when deactivated.
5. Connect downstream nodes to process the event payload (customer ID, invoice number, etc.).

## Compatibility

Requires **n8n v1.x** or later (n8n nodes API version 1). Tested against n8n v1.

## Resources

- [Altoviz website](https://altoviz.com)
- [Altoviz DevHub developer website](https://developer.altoviz.com)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Source code](https://github.com/altoviz/n8n.git)

## Version history

### 0.9.0

- Initial release — all 20 Altoviz API resources, Altoviz Trigger webhook node
