# whpcli

ClI app for the webhooks plug infrastructure

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [whpcli](#whpcli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g whpcli
$ whpcli COMMAND
running command...
$ whpcli (--version)
whpcli/0.0.4 darwin-arm64 node-v21.2.0
$ whpcli --help [COMMAND]
USAGE
  $ whpcli COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`whpcli deploy`](#whpcli-deploy)
* [`whpcli destroy`](#whpcli-destroy)
* [`whpcli ui`](#whpcli-ui)

## `whpcli deploy`

Deploy the webhooks plug infrastructure to your AWS Account.

```
USAGE
  $ whpcli deploy

DESCRIPTION
  Deploy the webhooks plug infrastructure to your AWS Account.
```

_See code: [src/commands/deploy.ts](https://github.com/webhooks-plug/webhooks-plug-cli/blob/v0.0.4/src/commands/deploy.ts)_

## `whpcli destroy`

Destroy the webhooks plug infrastructure on your AWS Account

```
USAGE
  $ whpcli destroy

DESCRIPTION
  Destroy the webhooks plug infrastructure on your AWS Account
```

_See code: [src/commands/destroy.ts](https://github.com/webhooks-plug/webhooks-plug-cli/blob/v0.0.4/src/commands/destroy.ts)_

## `whpcli ui`

Spin up the webplug UI dashboard

```
USAGE
  $ whpcli ui

DESCRIPTION
  Spin up the webplug UI dashboard
```

_See code: [src/commands/ui.ts](https://github.com/webhooks-plug/webhooks-plug-cli/blob/v0.0.4/src/commands/ui.ts)_
<!-- commandsstop -->
