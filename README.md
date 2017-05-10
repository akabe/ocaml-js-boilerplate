# OCaml JavaScript boilerplate

A template repository for OCaml and JavaScript

## Getting started

This repository requires two package managers [npm](https://www.npmjs.com/) for JavaScript, and [opam](https://opam.ocaml.org/) for OCaml.

### Install dependencies

```sh
npm install
opam install -y omake js_of_ocaml c3
```

### Build programs

Build OCaml programs, [pug](https://pugjs.org/) templates, and [sass](http://sass-lang.com/) code by

```sh
npm run build
```

or watch changes of source files as follows:

```
npm run watch
```
