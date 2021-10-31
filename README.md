# Upstream with Ceramic Org Profiles

Upstream is a cross-platform desktop client for the radicle code collaboration
protocol. This version has been modified to support Radicle profiles. Radicle repository is available at rad:git:hnrkjjc1hti1sw3oq9sdtndr8fa9asqecopfy

![image](https://user-images.githubusercontent.com/4420479/138189305-cd1fd807-e933-4efc-9b7f-11aa9c57a84c.png)

## What's new:
- Profiles with org name, description, url and logo. Profiles are stored in DataStore with the help of `@glaze/datastore`, [BasicProfile](https://developers.ceramic.network/streamtypes/tile-document/schemas/basic-profile/) data model is used.
- View/Edit functionalit with 3ID Auth (e.g. WalletConnect)
- Custom logos replace the default emojis. Logos are expected to hosted on IPFS

## Technical notes:

There are several tehcnical issues worth mentioning

- DataStore uses DID attached to the Ceramic instance. To change this, we patched DataStore. This allowed us to save read and write with did:safe.
- For some reason, Clay testnet didn't work well with Safe DIDs. We run our own Ceramic node of a newer version.

[A short presentation can be found here](https://docs.google.com/presentation/d/1GRl3e_hhJJIGdLlrvQc8KfXXvu4ZxVUy7KO_SM2hZWU)

## Future work:

We would love to see how Ceramic can help Radicle grow into a fully decentralized GitHub, with Issue tracker, Wiki, etc.

## Building and running Upstream

Prerequisites

* [NodeJS](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/getting-started/install)
* [Rustup](https://github.com/rust-lang/rustup)

To build upstream run

```bash
yarn install
yarn dist
```

This command will create an application package in the `./dist` folder which
you can then run.

Note: in case you see this error during the build process

```Module not found: Error: Can't resolve 'near-api-js' in '/home/lexx/code/radicle-root/radicle-ceramic-profile/node_modules/@ceramicnetwork/blockchain-utils-linking/lib'```

Install `near-api-js` package manually running:

```yarn add near-api-js --dev```

### Attribution

Upstream uses:
  - [Twemoji by Twitter][tw]
  - [The Inter typeface family by Rasmus Andersson][ra]
  - [Source Code Pro font family by Adobe][so]


[ba]: https://badge.buildkite.com/4fb43c6b471ab7cc26509eae235b0e4bbbaace11cc1848eae6.svg?branch=master
[co]: docs/contributing.md
[de]: docs/development.md
[pr]: proxy
[ra]: https://rsms.me/inter
[rc]: https://radicle.community
[ru]: https://www.rust-lang.org
[rw]: https://radicle.xyz/downloads.html
[so]: https://adobe-fonts.github.io/source-code-pro
[st]: https://buildkite.com/monadic/radicle-upstream
[sv]: https://svelte.dev
[tw]: https://twemoji.twitter.com
[ui]: ui
