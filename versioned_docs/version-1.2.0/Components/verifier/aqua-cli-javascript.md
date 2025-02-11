---
title: Aqua CLI Javascript Implementation
---

Aqua cli js  is a command line utility.That enables you to create aqua chains, verify aqua chains, witness and sign aqua chains.

:::warning
If you are just getting started use the rust cli , the js version is used to prototype ideas.
:::


💡 the repo location 
`https://github.com/inblockio/aqua-verifier-js`


💿 Envireonment set up

 1. ensure to install a js runtime, we use node [here](https://nodejs.org/en/download/package-manager), the latest version.
 2.  ensure to have `Yarn` or `npm`


📝 Usage

 1. `git clone  git@github.com:inblockio/aqua-cli-js.git`
 2. `cd aqu-cli-js &&  npm i && npm build`
 3. finally create a credentials.json `touch credentials.json`  paste the following content into the file , filling with appropriate details
    ```json
        {
            "mnemonic": "sample sample sample sample sample sample sample asampl  sample sample sample author matter",
            "nostr_sk": "xxxxxxxxxxxxxxxx",
            "did:key": "xxxxxxxxxxxxxx"
        }
    ```

* To get started run
  1. `./notarize.js --help`

        ```
        notarize.js [OPTIONS] <filename>
        which generates filename.aqua.json

        Options:
        --sign [cli|metamask|did]
            Sign with either of:
            1. the Ethereum seed phrase provided in mnemonic.txt
            2. MetaMask
            3. DID key
        --witness-eth      Witness to Ethereum on-chain with MetaMask
        --witness-nostr    Witness to Nostr network
        --witness-tsa      Witness to TSA DigiCert
        --link <filename.aqua.json>
            Add a link to an AQUA chain as a dependency

        ```
    1. `./verify.js --help`

        ```
            Usage:
            verify.js [OPTIONS] <page title>
            or
            verify.js [OPTIONS] --file <offline file.json or file.xml>

            Options:
            -v                     Verbose
            --server               <The url of the server, e.g. https://pkc.inblock.io>
            --ignore-merkle-proof  Ignore verifying the witness merkle proof of each revision
            --file                 (If present) The file to read from for the data
            If the --server is not specified, it defaults to http://localhost:9352
        ```