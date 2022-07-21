# Markbook

NodeJS server that renders markdown files to HTML and serves them

## Support ❤️

If you find the project useful, please consider supporting, or contributing.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/dubniczky)

## Description

This server treats `.md` files as if they were standard `.html` files, except it renders markdown before serving. The root is `/public` folder, so feel free to clear it, then add a `index.md` file to any folder, just as if you were using `index.html` files. Every other file type is served normally.

By default, each rendered markdown file is cached and only recompiled if the file has changed. Caching yields between 2 and 4 times performance improvement with smaller markdown files, this will increase as they get bigger.

Edit `config.yml` to change settings before deployment or container building.

## Requirements

This project uses `yarn` for package management.  
Refer to [.nvmrc](./.nvmrc) for node version.

## Usage

### Container

Start using docker-compose

```bash
docker-compose up --build
```

Build container manually

```bash
make container
make run
```

### Local Host

```bash
make deploy
make start
```

### Development mode

```bash
make install
make
```
