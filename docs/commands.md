## CLI commands

## halva-cli

#### Description

The Halva Command Line Interface is a unified tool to run Halva tools

#### Synopsis

> halva-cli \<command> [options]

#### Options

| Option | Description|
| ------------- | ------------- |
| --version (boolean) | Show version |
| --help (boolean) | Show help information |

## Commands

## init

#### Description

Initialize a new halva project

#### Synopsis

> init [options]

#### Options

| Option | Description|
| ------------- | ------------- |
| -p, --project-name | Project name |
| -f, --force | Overwriting files in the directory if names match |
| --version (boolean) | Show version |
| --help (boolean) | Show help information |

## start

#### Description

Build and run substrate node

#### Synopsis

> start [options]

#### Options

| Option | Description|
| ------------- | ------------- |
| -p, --path | Path to substrate bin file |
| --version (boolean) | Show version |
| --help (boolean) | Show help information |

## test

#### Description

Run tests

#### Synopsis

> test [options]

#### Options

| Option | Description|
| ------------- | ------------- |
| -p, --path | Path to test folder |
| -c, --config | Path to configure file |
| -n, --network | Show help information |
| -b, --bail | Enable bail |
| -v, --verbose | Wite debug info |
| -t, --timeout | Timeout time for test |
| --version (boolean) | Show version |
| --help (boolean) | Show help information |

## create

#### Description

Generates files based on a templates

#### Synopsis

> create <TemplateType> <Name> [options]

#### Options

| Option | Description|
| ------------- | ------------- |
| --version (boolean) | Show version |
| --help (boolean) | Show help information |

#### Example

> halva-cli create test token
