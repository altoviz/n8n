# How to Publish a New Version

Releases are fully automated via the `publish.yml` GitHub Actions workflow. The workflow runs on every push to `main` (build + lint only) and on every `v*` tag push (build + lint + publish to npm).

## One-time setup

1. Generate an npm **Automation token** at [npmjs.com](https://www.npmjs.com) → _Account → Access Tokens → Generate New Token → Automation_.
2. Add it as a repository secret named `NPM_TOKEN` in GitHub → _Settings → Secrets and variables → Actions → New repository secret_.

## How the version number is calculated

The version is derived automatically from the Git history by [GitVersion](https://gitversion.net/) using the rules in `src/@altoviz/n8n-nodes-altoviz/GitVersion.yml`:

| Commit message prefix                 | Version bump    |
| ------------------------------------- | --------------- |
| `feat:`                               | minor — `0.x.0` |
| `fix:`, `perf:`                       | patch — `0.0.x` |
| `BREAKING CHANGE` or `+semver: major` | major — `x.0.0` |
| `+semver: none` / `+semver: skip`     | no bump         |

You do **not** need to edit `package.json` manually — the workflow stamps the version automatically before publishing.

## Publishing a release

### 1. Merge your changes to `main`

Make sure all commits follow the Conventional Commits convention above so GitVersion computes the right bump.

### 2. Create and push a tag

```bash
# From the repo root
git checkout main && git pull

# Create an annotated tag — the version here is just a label;
# GitVersion will use it as the authoritative version
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0
```

Pushing the tag triggers the publish workflow. The job:

1. Computes the semantic version from the tag via GitVersion
2. Stamps `package.json` with that version (`npm version … --no-git-tag-version`)
3. Runs lint and build
4. Publishes to npm with provenance (`npm publish --access public --provenance`)

### 3. Verify the release

- Check the **Actions** tab in GitHub for the workflow run.
- Confirm the package appears at `https://www.npmjs.com/package/@altoviz/n8n-nodes-altoviz`.

## Dry run (optional)

To preview what would be published without actually publishing:

```bash
cd src/@altoviz/n8n-nodes-altoviz
npm run build
npm pack --dry-run
```

`npm pack --dry-run` lists every file that would be included in the tarball.

## Hotfix release

```bash
git checkout main && git pull
# cherry-pick or commit the hotfix
git commit -m "fix: correct invoice download encoding"
git tag -a v1.2.1 -m "Hotfix v1.2.1"
git push origin main v1.2.1
```

## Troubleshooting

| Symptom                         | Likely cause                                | Fix                                                                                     |
| ------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------- |
| Workflow skips the Publish step | Tag does not start with `v`                 | Use `v1.2.0`, not `1.2.0`                                                               |
| `npm publish` fails with 401    | `NPM_TOKEN` secret missing or expired       | Regenerate the token and update the secret                                              |
| `npm publish` fails with 403    | Package scope not owned by your npm account | Make sure `@altoviz` org exists on npm and you have publish rights                      |
| GitVersion returns `0.0.0`      | No tags in history                          | Push an initial tag: `git tag -a v0.1.0 -m "Initial release" && git push origin v0.1.0` |
