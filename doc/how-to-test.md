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

## Troubleshooting

| Symptom                               | Likely cause                            | Fix                                                                                      |
| ------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------- |
| Node not visible in n8n palette       | Package not linked or n8n not restarted | Re-run `npm link` steps and restart n8n                                                  |
| "Icon file does not exist" lint error | SVG not found in `nodes/Altoviz/`       | Ensure `altoviz-logo.svg` is present in `nodes/Altoviz/`                                 |
| Credential test fails                 | Wrong API key or network issue          | Check the key in the Altoviz portal; verify `https://api.altoviz.com/Hello` is reachable |
| Binary download returns empty data    | `encoding: 'arraybuffer'` missing       | Confirm the download operation routing uses `encoding: 'arraybuffer'` in `request`       |
