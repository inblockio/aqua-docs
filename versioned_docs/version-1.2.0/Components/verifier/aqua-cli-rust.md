---
title: Aqua CLI Rust Implementation
---

Aqua cli is a command line utility.That enables you to create aqua chains, verify aqua chains, witness and sign aqua chains.

Just like other aqua  tooling and libraries cli 1.2 tooling the cli versioning matches the protocol supported.


🚀 How to install  it. 
1. `cargo install aqua-cli`
2. building from source 
    a.  `git clone  git@github.com:inblockio/aqua-cli-rs.git`
    b.  `cargo build--release`
    c.  `cd target/release/ && cp aqua-cli /usr/bin` 


💡 the repo location 
`https://github.com:inblockio/aqua-cli-rs`


📝  Usage
```
Aqua CLI TOOL

========================================================

This tool validates files using a aqua protocol. It can:
  • Verify aqua chain json file
  • Generate aqua chain.
  • Generate validation reports

COMMANDS: 
   • -a  or --authenticate  to verify an aqua json file.
   • -s or --sign to sign an aqua json file.
   • -w or --witness to witness an aqua json file.
   • -f or --file to generate an aqua json file.
   • -v or --verbose  to provide logs about the  process when using  -v,-s,-w or -f command (verbose option).
   • -o or --output to save the output to a file (json, html or pdf).
   • -l  or --level  define how strict the validation should be 1 or 2
        1: Strict validation (does look up, if local wallet mnemonic fails it panic)
        2: Standard validation (create a new mnemonic if one in keys.json faile)
   • -h or --help to show usage, about aqua-cli.
   • -i or --info to show the cli version.
   • -k or --key-file to specify the file containings  (this can also be set in the env  )
   • -d or --delete remove revision from an aqua json file, bydefault removes last revsion but can be used with -c or --count parameter to specifiy the number of revisions
   • -c or --count to specify the number of revisions to remove (note a genesis revision cannot be removed)

EXAMPLES:
    aqua-cli -a chain.json
    aqua-cli -s chain.json --output report.json
    aqua-cli -w chain.json --output report.json

    aqua-cli -f document.pdf
    aqua-cli --file image.png --verbose
    aqua-cli -f document.json --output report.json


SUMMARY
   * aquq-cli expects ateast parameter -s,-v,-w or -f.
   * in your environment set the
    1. aqua_domain="random_alphanumeric"
    2. aqua_network="sepolia" or  "holesky" or "mainnet"
    3. verification_platform="alchemy" or "infura" or "none"  for witnessing (default "none")
    4. aqua_alchemy_look_up=  false or true

For more information, visit: https://github.com/inblockio/aqua-verifier-cli"

```



