# CLion Installation Assistant
Multi-platform assistant to facilitate the installation of CLion and its dependencies on Windows, Mac and Linux.

### Executing the assistant

Download the corresponding package from the [releases page](https://github.com/jachinte/clion-installer/releases).

### Running from sources

To run the assistant from its sources, you need NodeJS and npm.

First, clone this repository:

```bash
git clone https://github.com/jachinte/clion-installer
cd clion-installer
```

Second, install the dependencies:

```bash
npm install
```
And third, run the application:

```bash
npm start
```

### Compiling from sources

On Linux, you need `rpm`.
To package the assistant:

```bash
npm run package
```

And to generate an installer:

```bash
npm run make
```

### Questions?

If you have any questions about this program, or something doesn't work as expected, please [submit an issue here](https://github.com/jachinte/clion-installer/issues/new).
