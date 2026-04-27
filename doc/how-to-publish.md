# How to Publish a New Version

Releases are driven locally by `release-it` and then completed by the `publish.yml` GitHub Actions workflow. The workflow runs on every push to `master` (build + lint only) and on every `v*` tag push (build + lint + publish to npm).

## One-time setup

1. Generate an npm **Automation token** at [npmjs.com](https://www.npmjs.com) → _Account → Access Tokens → Generate New Token → Automation_.
2. Add it as a repository secret named `NPM_TOKEN` in GitHub → _Settings → Secrets and variables → Actions → New repository secret_.

## How the version number is set

`package.json` is the source of truth. The version is bumped locally before tagging — the CI workflow publishes whatever version it finds in `package.json` at the time the tag was pushed.

Use `release-it` (already installed as a dev dependency) to bump, commit, and tag in one step:

```bash
# Bump to an explicit version
npx release-it 0.9.15

# Or let release-it increment automatically
npx release-it patch   # 0.9.14 → 0.9.15
npx release-it minor   # 0.9.14 → 0.10.0
npx release-it major   # 0.9.14 → 1.0.0
```

`release-it` will:
1. Bump the version in `package.json`
2. Commit `chore: release v<version>`
3. Create and push the `v<version>` tag
4. **Not** publish to npm — that is handled by CI

## Publishing a release

### 1. Merge your changes to `master`

```bash
git checkout master && git pull
```

### 2. Run `release-it`

```bash
npx release-it <version>
```

This bumps `package.json`, commits the change, and pushes the tag. The tag push triggers the `publish.yml` workflow automatically.

### 3. Monitor the workflow

The publish job:
1. Checks out the code at the tag
2. Installs dependencies (`npm ci`)
3. Applies the ESLint compatibility patch (`node scripts/patch-eslint-compat.mjs`)
4. Runs lint (`npm run lint` + `npm run lint:community`)
5. Builds (`npm run build`)
6. Publishes to npm with provenance (`npm publish --access public --provenance`)

### 4. Verify the release

- Check the **Actions** tab in GitHub for the workflow run.
- Confirm the package appears at `https://www.npmjs.com/package/@altoviz/n8n-nodes-altoviz`.
- Update `CHANGELOG.md` with the changes included in the release.

## Dry run (optional)

To preview what would be published without actually publishing:

```bash
npm run build
npm pack --dry-run
```

`npm pack --dry-run` lists every file that would be included in the tarball.

## Hotfix release

```bash
git checkout master && git pull
# cherry-pick or commit the hotfix
git commit -m "fix: correct invoice download encoding"
npx release-it patch
```

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Workflow skips the Publish step | Tag does not start with `v` | `release-it` creates `v*` tags by default — check `.release-it.json` |
| `npm publish` fails with 401 | `NPM_TOKEN` secret missing or expired | Regenerate the token and update the secret |
| `npm publish` fails with 403 | Package scope not owned by your npm account | Make sure `@altoviz` org exists on npm and you have publish rights |
| Lint fails with `context.getFilename is not a function` | `eslint-plugin-n8n-nodes-base` not patched | Run `node scripts/patch-eslint-compat.mjs` manually, then retry |
| `release-it` says working directory is not clean | Uncommitted changes present | Commit or stash changes before running `release-it` |
