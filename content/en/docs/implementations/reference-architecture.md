---
title: "Reference Implementation"
linkTitle: "Reference Implementation"
weight: 1
description: >
  Explains the technologies selected for the reference implementation and why we selected them.
---

Implementation specific architecture documentation for the Aqua Data
Vault 'Personal Knowledge Container (PKC)'. In this document you will
find reasoning as to why certain components were chosen to build this
prototype. We have not duplicated any vendor documentation. Please find
the linked-list for the documentation of the components we use here:

-   [MetaMask](https://docs.metamask.io/guide/)
-   [Ethereum](https://ethereum.org/en/developers/docs/)
-   [Docker](https://docs.docker.com/)
-   [MediaWiki](https://www.mediawiki.org/wiki/Documentation)
-   [MediaWiki Extension: Aqua](https://github.com/inblockio/aqua-docs)
-   [MediaWiki Skin Tweeki](https://tweeki.kollabor.at/)
-   [Pelith Eauth Server](https://github.com/pelith/node-eauth-server)
-   [Nodejs](https://nodejs.org/en/docs/)
-   [GitHub](https://docs.github.com/en)
-   [Apache](https://httpd.apache.org/docs/)
-   [Nginx](https://nginx.org/en/docs/)
-   [Let's Encrypt](https://letsencrypt.org/docs/)

All software components selected are open source licenses. They each
have active developer communities behind them to secure future support
and further development.

## Wallets / Accounts

Why do we use Ethereum Wallets / Accounts?

An identity anchor needs to be a public, private key. This allows a
public component which we can share (public key) and a private component
which proves ownership over that public-key. Public keys are used in
Ethereum as accounts to receive and send transactions. Therefore the
Ethereum ecosystem has developed standards. These have evolved to a
larger eco-system involving wallet-providers which have built software
and hardware wallets to securely manage those keys. We leverage one of
the most vibrant developer communities and utilize these wallets. In our
case they are used mainly for offline-activities (Login, Signing) which
do not require connectivity to the Ethereum blockchain.

## Web-Application (Chrome-Extension MetaMask)

Was selected as it is one of the most advanced, widely used,
feature-rich web-wallets. Most importantly it's a browser-plugin which
allows us to interact with browser applications. MetaMask also has the
ability to connect to a hardware wallet allowing for increased security
and levels of assurance.

-   Large User-Base 10 Million +

<!-- -->

-   Hardware Wallet Support (E.g. Ledger)
    -   Large User-base 5 Million +

<!-- -->

-   All related source code is open source, lot's of money behind it
    (future proof)
-   SSI (Self-sovereign identity): Compatible with the DID schema
    did:ethr:<wallet_address>
-   Fulfills SSI principles:
    -   Controlled by user, allows for creation of new accounts / wallet
        addresses
    -   User can create new identity anchor independent of third party
    -   Can be moved between devices by users recovery key or even to a
        hardware wallet (not recommended but possible:
        https://kryptonitelex.medium.com/how-to-transfer-your-metamask-to-a-ledger-hardware-wallet-bcece7d5567b)

## Witness Network

We are using the Ethereum Network as an optional Witness Network for
cryptographic time-stamping.

### Why public Blockchain?

The witness event serves the purpose of being able to prove the
existence of a document without the ability to deny it. This requires
censorship resistance and global coverage. The security of the network,
it's distribution, and the high economical price to attack the network,
are all good reasons why we want to use a public blockchain to publish
highly obfuscated hashes (fingerprints). This proves the state of the
data in a Data Vault (PKC).

The MetaMask wallet is able to publish the witness event verification
hash to the public Ethereum blockchain. This completes our third
important layer of integrity verification, which is to prove
cryptographic time and existence of a document by writing it's
fingerprint onto the ledger. This is not done directly, but through a
process which highly obfuscates the hash. This ensures that that there
is no plausible attack (even if the attacker owns a powerful quantum
computer) to match the fingerprint with any personal data.

## Data Vault

The Data Vault named 'Personal Knowledge Container' is creatd by using a
tool for containerization called 'Docker'. This allows us to package our
application so it can be deployed to different operating system
environments. Docker provides the abstraction / virtualization layer.

Inside Docker we containerized multiple services:

## MediaWiki for data governance

MediaWiki is a data governance tool which has a legacy as a
collaboration tool. It powers Wikipedia, the largest encyclopedia in the
world. We step into this experience, and the benefits of a feature rich,
battle-proven application. It's a powerful tool to both manage and
present data.

As MediaWiki has an active and established developer community, it is
possible to tap into existing professional service companies. Supporting
development and any required changes within the application.

MediaWiki has been modified to use workflows for data processing. This
will allow for implementing and testing workflows and business logic
between Personal-Knowledge-Containers.

We use all the benefits of MediaWiki to manage and present data in the
browser, while we work around one of its main limitations: Security.
MediaWiki was never developed to have advanced security and permission
structures, as it was built for Wikipedia - a fully public website. This
has several implications for us.

Security Practices:

-   We assume that we can't defend against insider attacks on the same
    MediaWiki instance, therefore every user has their own instance
-   If there is a need for a collaboration space, it is possible to
    spawn containers for multiple accounts which trust each other to
    work together on shared data

<!-- -->

-   If you use a hosted PKC instance, assume the provider has access to
    your data as we don't use homomorphic encryption nor do we have
    encryption implemented
-   We are using typed and tested PHP (for MediaWiki Extension Data
    Accounting) to improve test coverage to increase stability and
    security of our application

<!-- -->

-   To securely exchange data between PKC's, we implement a separate
    security software called Guardian. The Guardian protects the PKC and
    manages all access according to the accounts owners set permissions.
    The Guardian is under active development. It will receive the
    highest scrutiny and attention to ensure a minimal attack surface
    while allowing trust between Guardians so data can be exchanged.

<!-- -->

-   The Apache WebServer present in the MediaWiki container has a
    technological dependency and needs regular updates as Apache was
    effected by critical security issues like
    [CVE-2021-44228](https://nvd.nist.gov/vuln/detail/CVE-2021-44228)
-   Therefore we do not expose the Apache web-server to the internet by
    default and do not recommend this to ensure that there is no
    unnecessary attack surface. If an organization decides to expose the
    web-surface of a PKC to the internet, they should expect this
    instance to be compromised and leak all it's stored data. Therefore
    we re-emphasize: If PKC / MediaWiki is exposed to the web, there
    can't be any guarantee that data can be kept private. Therefore
    assume your data can be leaked on a web-facing MediaWiki instance.
    Organizations hosting PKC's for collaboration should do so with
    restricted firewall permissions, ensuring that the web-interface is
    only reachable for the employees authorized to see the content.

## MediaWiki Extension: Aqua

The existing ecosystem and reference implementations around MediaWiki
allowed us to quickly prototype our reference implementation for Aqua.
The implementation itself allowed us to further develop the protocol.
The downsides are currently old PHP code and MediaWiki's legacy. In
return we benefit from a well documented project.

Looking forward we want to see other client-implementations in different
languages independent of MediaWiki to show the potential of the Aqua
Protocol. We hope to re-use part of the PHP code base to apply it to
other applications, like Word-Press.

## MediaWiki Skin Choice

Using Tweeki as a Bootstrap 4 compatible Skin for MediaWiki, we were
able to establish contact with the chief maintainer of the extension,
and were able to collaborate to solve various issues to improve the
skin. We are coordinating with other parties to see how we can improve
support for the Skin. In the future we are hoping to increase the
maintainer base. Prospectively we want to use Tweeki as an abstraction
layer from MediaWiki classic to Bootstrap 4, and respectively Bootstrap
5+.

## Authentication

-   For Authentication with Web-Wallets, we use
    <https://github.com/pelith/node-eauth-server> which provides us with
    an open source solution for a signature-response challenge. We then
    integrate with OAUTH2 and OIDC using existing authentication
    standards to achieve the login.
-   The Pelith server provides us with the Signature-Challenge and is
    forwarding the access token via OAUTH2 to MediaWiki. Here we check
    if the user exists. If this is the case, access is granted.

## WebServer-Proxy / HTTPs

-   We are using NGINX Web-Server as the proxy server. NGINX is a modern
    and the most popular (#1 since 2021 by share[^1]) web-server on the
    web.
-   We are using Let's Encrypt to provide secure connections via HTTPS
    if a PKC is deployed to the web. Let's encrypt serves over 260
    million websites according to the vendor website.[^2] provides free
    TLS Certificates for secure HTTPS connections.
-   The NGINX Web-Proxy allows us to ensure that we can add additional
    services to the PKC and redirect the services according to our
    needs.

## Software-Development

-   We use <https://github.com> for software development. As we started
    with very little budget, we gratefully utilised free resources to
    develop our open source software. This allowed us to focus on being
    productive.
    -   Github is owned by Microsoft and is therefore subject to US
        policies and Microsofts interests.
    -   This itself requires us to move away to be independent or at
        least host a mirror instance outside of Github. The deletion of
        a repository or losing access could harm our development process
        significantly.
-   We use GPL-V3 license on the majority of our repositories.
    -   We maintain the rights on branding
    -   We maintain more restrictive rights on deployment scripts
        (service provider technologies)

## Browser Choice

We are using the Chrome-Engine as our Web-Browser of choice. It's the
most dominant web-browser on the Web, and has become the quasi standard
with many different forks creating an ecosystem around it.
Microsoft-Edge is actually Chrome. There are non-google chrome forks
which deserve attention, funding and support (like
<https://github.com/Eloston/ungoogled-chromium>). This will provide us
with a modern and state of the art browser architecture to work with.

As Chrome is the most secure and modern base to build on, we support
-only- chrome. Therefore we use a chrome extension to verify the content
of an Aqua file. This extension is available for download in the Google
Chrome App Store, or can be built from scratch following the
instructions in our repository.[^3]

This allows us to provide ease of setup, as users can easily deploy the
chrome extension without further effort by adding it from the google app
store.

We are using NPM / node.js for fast prototyping. This comes with severe
security implications as the npm ecosystem has been prone to various
supply-chain attacks over recent months [^4] .

## Technology choices on cryptography

All cryptography used in our development is based on international NIST
standards and follows the international understanding for internet
security. This is consistent with the perspective of the BSI in Germany,
but for some specific details there are no insights provided by the
ministry.

### Hashing Algorithms (SHA3-512)

PKC uses standard Crypto (SHA3-512) winner of the National Institute of
Standards and Technology see
<https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf> . We do not
use custom encryption as this comes at the cost of unnecessary risks.

This is an accepted secure and recommended standard according to [BSI -
Technische Richtlinie – Kryptographische Algorithmen und Schlussellängen
Seite
42](https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/TechnischeRichtlinien/TR02102/BSI-TR-02102.pdf?__blob=publicationFile).

### Merkle Tree[^5]

-   We use merkle trees to be able to witness the state of all pages /
    files in a single hash. Used to generate a unique fingerprint of a
    domain (a collection of verified data hash chain's within one
    domain).
-   There is a lot of future potential in ongoing research to improve
    privacy and utility of merkle trees in the [Aqua
    Protocol](https://pkc.inblock.io/index.php/Aqua_Protocol)
    -   See related technologies and research like TAPROOT:
        <https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki>

### Public-Private-Key Signatures (secp256k1)

Used in combination with Ethereum Accounts. It is used for signing and
authentication challenges.

-   in ether.js
    [cryptography/secp256k1](https://github.com/ethereumjs/ethereumjs-monorepo/blob/ade4233ddffffdd146b386de701762196a8c941c/packages/util/src/signature.ts#L23-L45)
    see
    [implementation](https://github.com/ethereum/js-ethereum-cryptography/blob/b1f35053df3f0cfa132fc45d59b688ca0d62994a/src/secp256k1-compat.ts#L99-L123)
-   related documents of the 'Standards for Efficient Cryptography
    Group' <https://secg.org/> specific doc secp256k1 \[[Both variants
    of the same standardization process of the Standards for Efficient
    Cryptography Group 2015, See differences
    P9](https://www.secg.org/sec2-v2.pdf)

<!-- -->

-   Supported by BSI secp256r1 but secp256k1 is not
    mentioned.https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/TechnischeRichtlinien/TR03116/BSI-TR-03116-4.pdf?__blob=publicationFile&v=7
    Request for clarification was send via E-Mail on the 3rd of November
    2021 by Tim Bansemer. Answer of the BSI: Currently the BSI has no
    assessment or recommendation for secp256k1.

<!-- -->

-   For authentication with Metamask Ethereum wallets we currently use
    <https://github.com/pelith/node-eauth-server>. We are signing a
    unique input value with ethereum.js using the personal sign method.
    Once the challenge is completed successfully we receive an OAUTH
    token from the Eauth identity provider of the pelith Eauth server.

[^1]: <https://linuxiac.com/nginx-most-popular-web-server/>

[^2]: <https://letsencrypt.org/>

[^3]: <https://github.com/inblockio/aqua-verifypage-chrome-extension>

[^4]: <https://duckduckgo.com/?q=npm+supply+chain+attack&ia=software>

[^5]: <https://en.wikipedia.org/wiki/Merkle_tree>
