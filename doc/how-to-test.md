# How to Test the Altoviz Custom Node

This guide explains how to install and test the `@altoviz/n8n-nodes-altoviz` community node locally in an n8n instance.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [n8n](https://docs.n8n.io/hosting/installation/npm/) installed globally (`npm install -g n8n`)
- An [Altoviz API key](https://altoviz.com)

## 1. Build the node

```bash
cd src/@altoviz/n8n-nodes-altoviz
npm install
npm run build
```

The compiled output lands in `dist/`.

## 2. Link the package into n8n

n8n loads community nodes from the `~/.n8n/nodes` directory. The quickest way to point it at the local build is `npm link`:

```bash
# Inside the node package directory
npm link

# In your n8n home directory (default: ~/.n8n/nodes)
cd ~/.n8n/nodes
npm link @altoviz/n8n-nodes-altoviz
```

Alternatively, copy (or symlink) the whole package folder directly:

```bash
mkdir -p ~/.n8n/nodes
ln -s "$(pwd)/src/@altoviz/n8n-nodes-altoviz" ~/.n8n/nodes/@altoviz/n8n-nodes-altoviz
```

## 3. Start n8n

```bash
n8n start
```

Open http://localhost:5678 in your browser.

## 4. Add the Altoviz credential

1. Go to **Credentials → New credential**.
2. Search for **Altoviz API**.
3. Enter your API key and click **Save**.
4. n8n performs a test call to `GET /Hello`; a green checkmark confirms the key is valid.

## 5. Create a test workflow

1. Create a new workflow and add a **Manual Trigger** node.
2. Add an **Altoviz** node and connect it to the trigger.
3. Select a **Resource** (e.g. _Customer_) and an **Operation** (e.g. _List_).
4. Assign the Altoviz credential you created in step 4.
5. Click **Execute Node** and verify the output in the panel on the right.

### Suggested smoke tests

| Resource        | Operation | What to verify                                            |
| --------------- | --------- | --------------------------------------------------------- |
| Customer        | List      | Returns a paginated array of customers                    |
| Customer        | Get       | Returns a single customer object by ID                    |
| Customer        | Create    | Creates a new customer; response contains a non-zero `id` |
| SaleInvoice     | List      | Returns invoices                                          |
| SaleInvoice     | Download  | Output item contains a binary `data` field with a PDF     |
| PurchaseInvoice | Download  | Output item contains a binary `data` field with a PDF     |
| Webhook         | Create    | Returns the new webhook `id` and `url`                    |

## 6. Rebuild after code changes

While iterating on the source, rebuild and restart n8n:

```bash
npm run build   # inside src/@altoviz/n8n-nodes-altoviz
# then restart n8n (Ctrl+C + n8n start)
```

Or use watch mode (TypeScript only, does not run the full n8n build pipeline):

```bash
npm run build:watch
```

## 7. Lint and type-check

```bash
npm run lint    # ESLint with n8n community-node rules
```

Both `build` and `lint` must exit with code 0 before submitting a pull request.

## 8. Testing webhooks (Altoviz Trigger node)

The **Altoviz Trigger** node is a webhook-based trigger: when you activate a workflow that contains it, n8n registers a webhook with the Altoviz API (via `POST /v1/Webhooks`) and deregisters it when the workflow is deactivated (via `DELETE /v1/Webhooks`).

### Exposing your local n8n to the internet

Altoviz's servers must be able to reach the webhook URL that n8n generates. When running locally, `localhost:5678` is not publicly accessible, so you need a tunnel.

Using [ngrok](https://ngrok.com/):

```bash
ngrok http 5678
```

Copy the public `https://…ngrok-free.app` URL and set the `WEBHOOK_URL` environment variable **before** starting n8n:

```bash
export WEBHOOK_URL=https://<your-subdomain>.ngrok-free.app
n8n start
```

This tells n8n to advertise the public URL instead of `localhost` when registering webhooks.

### Quick-testing with "Test workflow"

1. Open a workflow containing the **Altoviz Trigger** node.
2. Click **Test workflow** (or _Listen for test event_). n8n registers a _test_ webhook with Altoviz and starts listening.
3. Trigger the event on Altoviz side (e.g. create a customer) — the trigger node receives the payload and n8n displays it.
4. When you stop listening, n8n automatically deletes the test webhook.

> **Tip:** If you stop listening before Altoviz sends the event, the test webhook may stay registered. Use the **Altoviz** (non-trigger) node with the **Webhook → List** operation to check for stale webhooks, then **Webhook → Delete** to clean them up.

### Production-style testing

1. **Activate** the workflow (toggle in the top-right corner). This registers a _production_ webhook.
2. Trigger the event on the Altoviz side.
3. Check the **Executions** tab to see the incoming payload and downstream results.
4. **Deactivate** the workflow when finished — n8n calls `DELETE /v1/Webhooks` to remove the registration.

### Cleaning up orphaned webhooks

If n8n crashes or you kill it without deactivating the workflow, the webhook may remain registered on Altoviz. To list and remove orphaned webhooks:

1. Add an **Altoviz** node → Resource: _Webhook_ → Operation: _List_.
2. Execute to see all registered webhooks.
3. Identify stale entries (e.g. URLs pointing to old ngrok subdomains).
4. Use Operation: _Delete_ with the webhook `id` to remove them.

Alternatively, call the API directly:

```bash
# List webhooks
curl -H "X-API-Key: <YOUR_KEY>" https://api.altoviz.com/v1/Webhooks

# Delete a webhook by id
curl -X DELETE -H "X-API-Key: <YOUR_KEY>" "https://api.altoviz.com/v1/Webhooks?id=<WEBHOOK_ID>"
```

## Troubleshooting

| Symptom                               | Likely cause                            | Fix                                                                                      |
| ------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------- |
| Node not visible in n8n palette       | Package not linked or n8n not restarted | Re-run `npm link` steps and restart n8n                                                  |
| "Icon file does not exist" lint error | SVG not found in `nodes/Altoviz/`       | Ensure `altoviz-logo.svg` is present in `nodes/Altoviz/`                                 |
| Credential test fails                 | Wrong API key or network issue          | Check the key in the Altoviz portal; verify `https://api.altoviz.com/Hello` is reachable |
| Binary download returns empty data    | `encoding: 'arraybuffer'` missing       | Confirm the download operation routing uses `encoding: 'arraybuffer'` in `request`       |
