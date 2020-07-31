[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/halva-suite/halva">
    <img src="https://avatars2.githubusercontent.com/u/67451441?s=400&u=16f743b727e0d20fb8883c9794a87c9d5732fe67&v=4" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">Halva Suite</h3>

  <p align="center">
    ⚠️ (Work In Progress)
    <br />
    <a href="https://github.com/halva-suite/halva/issues">Report Bug</a> |
    <a href="https://github.com/halva-suite/halva/issues">Request Feature</a>
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

1. Clone the repo
```sh
git clone https://github.com/halva-suite/halva
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
    }
  }
}
```

<!-- USAGE EXAMPLES -->
## Usage

To run all tests, run:

```sh
npm test
```

To run REPL, simple run:

```sh
npm run console
```

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

<a href="http://wintex.pro/" target="_blank">
  <img src="https://github.com/halva-suite/assets/blob/master/wintex.png?raw=true" width="200" />
</a>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[wintex-url]: http://wintex.pro/
[wintex-logo]: https://github.com/halva-suite/assets/blob/master/wintex.png?raw=true
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