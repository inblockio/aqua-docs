Aqua Docs
=========

This documentation gives context to the Aqua Protocol. 

- [https://aqua-protocol.org](https://aqua-protocol.org)

---

## Deploying To Server

1. Install Hugo static site generator:

- [Install Hugo](https://gohugo.io/getting-started/installing/)

2. Install webserver of choice. configure certs, etc...
3. Configure webserver to point at HTML directory `aqua-protocol.org/`
4. Clone this repo

```
$ git clone https://github.com/inblockio/aqua-docs/ aqua-docs
```

5. Build the HTML site

```
$ cd aqua-docs
$ hugo -d ../path/to/aqua-protocol.org/
```

Site should be compiled and viewable.

---

Build with following technologies:

- [Hugo](https://gohugo.io)
- [Docsy Theme](https://example.docsy.dev/)
