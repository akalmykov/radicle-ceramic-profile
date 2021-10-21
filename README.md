# Upstream with Ceramic Org Profiles

Upstream is a cross-platform desktop client for the radicle code collaboration
protocol. This version has been modified to support Radicle profiles.

![image](https://user-images.githubusercontent.com/4420479/138189305-cd1fd807-e933-4efc-9b7f-11aa9c57a84c.png)

What's new:
- Profiles with org name, description, url and logo. Profile are store in DataStore with the help of `@glaze/datastore`
- View/Edit functionalit with 3DID auth
- Custom logos replace the default emojis


Radicle repository: rad:git:hnrkjjc1hti1sw3oq9sdtndr8fa9asqecopfy

## Building and running Upstream

Prerequisites

* [NodeJS](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/getting-started/install)
* [Rustup](https://github.com/rust-lang/rustup)

To build upstream run

```bash
yarn run dist
```

This command will create an application package in the `./dist` folder which
you can then run.

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
