# Aqua Docs

Check out aqua docs [here](https://aqua-protocol.org/docs)

Contribution:
- To add a new page you go to the versioned docs folder and select the version you want to add to.
- Creaste a new page "My new page.md"
- If you want to give a page a specific title use the title metadata tag
```markdown
---
title: "Version 3.2"
menu:
  main:
    weight: 10
---
```

## GitHub Actions
Any changes pushed to main-branch will trigger an automatic build and publishing to https://aqua-protocol.org/docs.

## Local Build & Installation
If you want to run it locally for testing you can do:

```bash
npm i & npm start & npm run build
```
This will start up a local test-instance on localhost:3000
