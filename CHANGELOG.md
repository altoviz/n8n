## [0.9.14] - 2026-04-27

### Fixed
- Remove `process.env` access from `nodes/constants.ts` — hardcode production base URL to comply with n8n community node submission requirements
- Surface errors in `AltovizTrigger` `checkExists` and `delete` webhook lifecycle methods instead of swallowing them silently
- Align `package.json` version with the latest published npm release (0.9.14)
