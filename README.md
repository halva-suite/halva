[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/halva-suite/PoC">
    <img src="https://avatars2.githubusercontent.com/u/67451441?s=400&u=16f743b727e0d20fb8883c9794a87c9d5732fe67&v=4" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">Halva Suite</h3>

  <p align="center">
    ⚠️ (Work In Progress)
    <br />
    <a href="https://github.com/halva-suite/halva/issues">Report Bug</a> |
    <a href="https://github.com/halva-suite/halva/issues">Request Feature</a>
    <br />
    <p align="center"><b>🔥 ATTENTION 🔥</br> The module has been tested on Substrate <ins>2.0.0-rc5-2</ins> version, work on other versions is not guaranteed</b></p>
  </p>
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

Inspired by [Truffle](https://github.com/trufflesuite/truffle)

Halva is a toolchain for developing Decentralized Applications based on Substrate. It provides a high-level way to configure a development environment, interact with Substrate through external API and writing your test cases. Halva targets testing extrinsics via RPC calls this allows test Substrate (or clients compatible with Substrate RPC) as a black-box.

### Built With
Halva uses [Polkadot.js](https://github.com/polkadot-js)

<!-- GETTING STARTED -->
## Getting Started

1. Install `halva-cli`
```sh
npm install -g @halva-suite/halva-cli
```

2. Install NPM packages
```sh
npm install
```
3. Configure your network in `halva.js`
```JS
const mnemonic = "bottom drive obey lake curtain smoke basket hold race lonely fit walk";

module.exports = {
  networks: {
    test: {
      mnemonic,
      ws: "ws://127.0.0.1:9944",
    },
  },
  polkadotjs: {
    provider: { },
    types: { }
   },
}

```

<!-- USAGE EXAMPLES -->
## Usage

To run all tests, run:

```sh
halva-cli test  -p /path/to/tests/folder -n networkName
```
If you need help, use

```sh
halva-cli --help
```

To run REPL, simple run:

```sh
halva-cli console
```

## Test global scope

  You can use global variables provided by halva

```js
describe('Halva test', () => {

  describe('test global', () => {
    it('Get global var', async () => {
        console.log(halva.accounts[0].address); // halva_account global var
    });
  });
});
```

### Variable list:
* `halva.accounts` - 10 Keyring pairs for tests
* `halva.polkadot` - ApiPromise object of polkadot
* `alicePair` - KeyringPair object of Alice
* `bobPair` - KeyringPair object of Bob
* `charliePair` - KeyringPair object of Charlie
* `networkName` - Current network name
* `chainMetadata` - Metadata object 
* `mochaConfigure` - Current Mocha configuration object

## Assertions

`Halva` has its own assertion for working with `extrinsic` and `contracts` (in the future)

### Assertion list: 

* `passes(asyncFn, message, signer)` - Error if extrinsic call fails
* `eventEmitted(asyncFn, eventName, section, message, signer)` - Error if the event was not emitted in the transaction
* `eventNotEmitted(asyncFn, eventName, section, message, signer)` - Error if the event was emitted in a transaction
* `fails(asyncFn, errorName, module, signer, message)` - Error if the call ended without errors or with some other error

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/halva-suite/halva/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Project Link: [https://github.com/halva-suite/halva](https://github.com/halva-suite/halva)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/halva-suite/halva.svg?style=flat-square
[contributors-url]: https://github.com/halva-suite/halva/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/halva-suite/halva.svg?style=flat-square
[forks-url]: https://github.com/halva-suite/halva/network/members
[stars-shield]: https://img.shields.io/github/stars/halva-suite/halva.svg?style=flat-square
[stars-url]: https://github.com/halva-suite/halva/stargazers
[issues-shield]: https://img.shields.io/github/issues/halva-suite/halva.svg?style=flat-square
[issues-url]: https://github.com/halva-suite/halva/issues
[license-shield]: https://img.shields.io/github/license/halva-suite/halva.svg?style=flat-square
[license-url]: https://github.com/halva-suite/halva/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
