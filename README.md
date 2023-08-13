# Deploy Approval

This is the front end code for https://deploy-approval.app

## Local Development

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Copy the `.env.template` file to `.env` and ask just for the secret needed to
make auth work locally.

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

Open http://localhost:8000/ in a browser to see the app run

### Recommended Tools

- [Visual Studio Code](https://code.visualstudio.com/download)
- [Deno Extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)

## Related Projects

- [Deploy Approval API](https://github.com/justinmchase/deploy-approval-api)
