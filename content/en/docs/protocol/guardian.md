---
title: "Guardian"
linkTitle: "Guardian"
weight: 9
description: >
  Shows access and transport layer logic used to interconnect data vaults
---

# Context

It is highly problematic to expose sensitive data, such as personal
identifiable data, to the internet. The service who hosts that sensitive
data, needs to be compromised only for a short amount of time, to leak
all the data. Often caused by configuration mistakes or by
vulnerabilities being present in the used technology stack.

We can't effort to have leaks on personal-identifiable data in data
vaults. To raise the bar on making attacks difficult and reducing the
chance of leakage of information, we introduce the Guardian as a extra
security layer to protect services like the PKC from attacks.

# Summary

The Guardian is a software which manages the boundaries of your digital
domain. Guardians are used to connect to secure transport networks
(HTTPS, Matrix Network, Didcomm) and publishing networks (e.g.
Swarm.eth). The Guardian is used to build trusted connections to other
Guardians via trusted transport-layers to exchange data with them. As
the Guardian connects to other Guardians, it also manages all
connections to services in it's domain and access to those services.

# Goal

Secure all services behind the Guardian from attacks and unauthorized
access. Keep the data vault and it's data private and safe, while
enabling the ability to exchange data with other Guardians.

## How

Enforcement is handled on each connection and each data set so that
services behind the Guardian are never directly exposed. This makes the
Guardian the most security sensitive component in the Aqua reference
implementation, as we expect the Guardian to handle all incoming and
outgoing traffic. The Guardian enjoys additional attention and effort to
be up to it's task by hardening it and applying security best practices
to ensure that it is fulfilling it's security promise to keep services
behind the Guardian safe.

Every transaction leaving or wanting to enter your domain will be
supervised and checked by the Guardian. The core functionality of the
Guardian is a library to verify the Aqua Protocol. Only if the
verification succeeds additional steps are introduced to make decisions
how the data is handled.

This allows the Guardian to read and understand Aqua verified data. This
allows for the implementation of a wide set of behavioral rules and
offers the opportunity to create various 'Smart contract' languages on
top of it.

The Guardian verifies a file, reads its contents and checks it's
permissions to classify if an action is considered legal or illegal,
permitted or denied. Basic functionality for a Guardian can be compared
with a traditional firewall, or a application firewall but is much more
sophisticated to manage access on the data-level.

# Terminology:

Proving ownership over a domain by signing the domain ID with an
self-issued identity claim which is also registered in a claim registry
to ensure nobody claims to have owned that domain before by manipulating
the digital clock and faking an earlier owner-ship claim over the
domain.

## **Permission Agreements** / Data Usage Agreement / Access Rights

are contracts which represent the terms and conditions under which files
and/or services are shared with other accounts and/or their digital
domains.

By nature those Permission Agreements will be compiled through pages and
stored as files. To form an agreement, the other party must be notified
about new resources as they become available. For example, when we share
a page with another account. To complete a permission agreement, the
counter party has to sign the permission agreement or reject it. If the
permission agreement is signed, the other party enters a contractual
relationship in which they will be liable for any agreement violates
executed from their digital domain.

# Processes

## Domain Handshake
Establish trust between two Aqua domains. For this we have Alice and Bob which
want to establish trust between their domains. They both have a Guardian in
place to protect their data vaults.

Steps:
1. Alice: Create access contract: I <Alice_account> want to connect from my <domain_id> to a <domain_id> controlled by <Bobs_account> with my <alice_domain_id> via the following channel: DNS/HTTPS via <alice_Guardian.domain.com>.
2. Alice: sign contract
3. Alice: SEND contract send the page via 'mail' / 'matrix' whatever to the remote PKC instance.
4. Bob: veries the contract contract and imports it
5. Bob: extend contract: I <bobs_acocunt> connect my PKC <bobs_domain_id> to your PKC <Alice_domain_id> via my Guardian_endpoint <bobs_guardian.domain2.com>.
6. Bob: sign extended contract: Bob uses his wallet to sign his extended contract.
7. Bob: send extended contract TO Alice: Bob sends his Contract to his Guardian.
8. Bob's Guardian: Verifies and sends the contract to Alice Guardian.
9. Alice Guardian:
    Guardian verifies all data
    Sends OK back to Bob's Guardian
    Sends Updates contract into Alice PKC
    Waits for Bob's Guardian to request available pages
10. Bob's Guardian requests a list of pages: ' What pages do you share with me?'
11. Alice Guardian: Returns list of accessible resources for Bob

## Example: Sharing a File

Target: Sharing a file with another account. Using two Aqua data vaults
with their two Guardians to manage access to them. We assume the
Guardians already have executed a handshake to enter a trusted
relationship. We also assume, that the file should underlay access
basedon account restrictions and domain restrictions.

**Example 1:** Sharing a file **without additional** constrains with
another account.

Alice wants to share her page 'My secret research' with Bob. Their
Guardians have already formed a trusted connection. What Alice needs to
do now is to add a sub-page with an immutable link under the 'My secret
research' page and define access. To be able to define access Alice
needs to have a claim over the ownership over the domain she is sharing
from.

Alice creates an Access Permission for the whole page or for a single
revision by creating a page with the following syntax:

-   <genesis_hash>:access_contract
 -   To give access to the whole page with all it's revisions.

-   <revision_hash>:access_contract
 -   To give access to a specific revision.

<hr>

**Content of the page:**

I Alice <alice-account> give access to Bob <bob-account>

-   option 1: to the whole page including it's history <genesis_hash>
-   option 2: to the following revision <revision_hash>'My secret
    research'

**Additional one-sided conditions:**

-   This access contract expires in 7 days

This contract will come into place with my <Alice-account> signature.

The Guardian will react to a specific syntax of pages holding contracts,
agreements and access rights to adjust his network access rights
accordingly to it. Alice-Guardian will respond to the question what
resources are shared by Bobs-Guardian with the answer that there is a
new page available according to the access contract which now gives
Bobs-Guardian the ability to query the content of 'My secure research'
from Alice according to the contract. Depending on Bobs-Guardian
setting, the Guardian might automatically load the resource and forward
it into the post-box of Bobs Data Vault.

**Example 2:** Sharing a file **with** constrains forming a **contract**
to do so.

Same as 1 expect that for the contract to come into place, Bob needs to
sign the contract from Alice containing additional constrains.

---

**Content of the page:**

I Alice <alice-account> give access to Bob <bob-account>

-   option 1: to the whole page including it's history <genesis_hash>
-   option 2: to the following revision <revision_hash>'My secret
    research'

**Under the following conditions:**

-   Do not share outside your domain <Bobs-domain_id>
-   Do not share with any body else (Bobs domain can't have another
    account registered to it, if there is an account registered the
    Guardian of Bob will say that Bobs domain does not fulfill the
    requirements to establish this contract.
-   Do not modify it.
-   Delete it after 7 days.

For this contract to be valid, signatures of first Alice and then Bob
need to be present. This means, after Alice signed the access contract,
the contract is a new available resource to Bob to be loaded. Bob can
now sign the resource in his domain and return the contract. Leading to
the contract send back to Alice domain and being updated there. Bob now
gets access to 'My secret research' which has been updated as well, to
contain via an immutable link the access contract.

Permission Templates, Complex Permissions (Groups and more)

It is possible to apply complex permissions based on templates, or and
connecting multiple access contracts by using

-   instead of this syntax <genesis_hash>:permission_agreement
-   the following the syntax <genesis_hash>:<genesis_hash-2> in
    which the <genesis_hash-2> contains a list of sub-pages with access
    contracts which can be used to apply access via permission-objects
    which are represented by the <genesis_hash-2> page object.

1.  Alice wants to
2.  If the user wants to propose changes to the page, he will send an
    updated PAGE FILE to the OWNER of the PAGE.
3.  The owner can decide to ACCEPT the changes. Or to include the
    changes in the HISTORY File, but not COMMIT them. Or to NOT include
    the update of the PAGE, and disregard it.

---

### Specifications:

The Guard Daemon checks if there is digital contract present in his
domain. Those contracts set permissions for allowing a counter party to
access a service or resource (like a file or a page, or a revision).
It's also defining the constrains under which permissions access is
given. In this case it requires the digital signature of the receiving
party for the agreement to come into place and be valid.

Guardians have administrative access to the services they manage.
Therefore they can supervise the activities of services and use them as
triggers to e.g. provide access according to a set permission without
additional user action.

# Guardian Components:

APIs
-   System-API to control a service via a service specific library. Each
    services will have their own control-library and control API to
    create an abstraction layer which allows for a unified control logic
    in the Guardian.
    -   E.g. an account is allowed to access a service
    -   E.g. a resource is shared with an account
    -   E.g. a trust relationship between two services is established
        (based on an agreement between two accounts) to exchange data
    -   **Implementation Specific PKC:** All interactions for system
        interaction with MediaWiki / PKC
        -   Execute Actions: Move, Update, Edit, Delete Pages
        -   Request send to the Guardian: Verify a specific page or a
            list of pages

- **Data-API** to retrieve Aqua-Data between a service and the
    Guardian, or between two Guardians.
    -   Send data to import API
    -   Read data via export API
        -   **Implementation Specific PKC:** Read special Pages used to
            give access e.g. Data Usage Agreements, Permission
            Agreements

- **Aqua Verification Library** to be able to verify incoming and
    outgoing data
    -   implementation of the 'external-verifier' in e.g. GO, Typescript
        or Javascript (current)
-   Account-Registry (Holding the list of trusted keys and the
    relationship between them)
    -   This includes defined 'trusted accounts'
-   Session-Handler/Registry (Acts like Stateful-Firewall on the
    page-object level to mange imports / exports). The Guardian verifies
    incoming and outgoing data and constructs sessions based on it.
-   Guardian Policies: Are sets of rules followed and enforced by the
    Guardian. This includes set of rules used to protect the domain from
    unauthorized operations and access. Part of that are page access
    permissions which are managed by the [Data Usage
    Agreements](Data_Usage_Agreement "wikilink").
    -   <domain_id><account><genesis_hash><revision_hash>:<domain_id><account><genesis_hash><revision_hash>
-   Transport Layer API's / Sub-Modules for connectivity to distributed
    services
    -   The Guardian-to-Guardian communication handler (via DNS/HTTPS
        transport)
    -   Ethereum Integration, Ethereum Handler (As a witness Network)
    -   Matrix Integration, Matrix Handler (As a restrictive/
        permissioned transport layer)
    -   Schwarm Integration, Swarm Handler (As a publishing network)

# Guardian-Integration-Services
The Guardian has a modular design to support integration with many services and
transport layers.

## Web (HTTPS / DNS) Integration Goal: Have a
handler to connect web-facing Guardians with each other in a safe way. Be able
to run guardian procedures via two public Facing guardians which use a public
DNS name and HTTPS to interconnect with each other. Guardian procedures are:
Guardian handshakes to establish trust or remove trust Request or Send portable
Hash-Chains based on access rights between each other

## Ethereum Node

Integration Goal: Connect to a self-hosted or remote Ethereum Node. Option 1:
Configuration via Alchemy (Providing Keys) via Special:DataAccountingConfig
Option 2: Implementation of Ethereum Node via ./setup --ethereum-node (provide
container) Configuration of Connection to RPC Ethereum node via address (if in
same network) The Wallet can be directly be connected to a local Ethereum node
via RPC to avoid meta-data gathering of large providers, like INFURA which
could potential track which IP address has created which Ethereum Transaction
with which Metamask-Wallet, leading to a de-pseudonymousation of the user. ###
Ethereum Node Handler Goal: Accelerate lookups of the Guardian via caching
Every-time a witness contract is called, the Ethereum Node Handler will start
to cache the all Ethereum-Witness events of that Witness-Contract and Index
them in it's database. This will reduce access times to ms vs potential seconds
in lookup times, making the Guardian more performant and responsive. ## Matrix
Node Integration Goal: Connect to a self-hosted or remote synapse-server
(MATRIX) Node. Configure a remote matrix server or a local one via Guardian.
Implementation of Matrix-Node deployment via ./pkc setup --matrix-node (provide
container).

### Matrix Node Handler

Context: We use Ethereum Wallets as Identity-Anchors as they are globally
unique addresses (which are collision free) broadly adopted with supported
hardware ledgers as secure hardware elements with an existing fast moving
ecosystem for further development. They act as 'web-based' PGP-like utilities
which do not need any Blockchain-Interaction for Signing messages and can be
used as a valuable off-line capable identity anchor. With this step we separate
Identity and Service; even in case of compromising the computer of the user or
by having a breach of secrets in the Element-Client the Identity would be safe
(in case a hardware wallet would be used). This also drastically reduces attack
surface to phish a users credentials; as there is no Password-Login there is no
way to steal the password to impersonate the user. All security assumptions of
the User-Identity come back to the security of his private key. For the
Kolibri/PKC project this is the foundation for using wallet-addresses as
Identities to route traffic with matrix bots between PKC's. The following
actions are required to use the Ethereum Wallet as a strong Identity Anchor
within Matrix.

This requires the following functionality:
* Register the user via an Ethereum wallet address (successfully piloted by inblockio)
* Detect that it is an Ethereum Wallet-Address; Verify integrity of address with the Ethereum Wallet-Address Checksum (TBD)
* Make username not changeable (Done via Matrix settings,successfully piloted by inblockio)
* Wallet login with Web-Wallet Metamask via OIDC (Open ID Connect) (successfully Piloted by inblockio)
* Verify Ownership of the Wallet by doing an Element-Client side Signature Challenge to the User. Challenge resolved by signing a message with sufficient entropy to not be ever the same (to protect against leakage) with the private key via the Ethereum
Metamask Webwallet (or a connected Hardware-Wallet)
* Implement a User-to-User request of proof of Identity Users / Server can challenge other users to proof that they hold the private Wallet-Key by triggering the Signature Challenge to the User; After the challenge is done, the requested party is provided with all information to do a manual verification of the signature (the Message which was
Signed, the Signature, the used method used for the signature)

### Matrix-BOT

Context: The Matrix-Network communicates with the PKC through the Guardian who
will manage all access to the MediaWiki service. The Guardian uses a Matrix-Bot (to
handle the communication) and a Matrix-Integration (to be flexible to use a
private synapse or a remote synapse server) to interact with the Matrix Network
as a permissioned transport layer.

Referenz-Implementation:
Suitable options for a matrix-integration are 'go-lang' or 'rust'. Guardian
next generation Guardian will be written in Rust, so integration of security
relevant components would be preferably in Rust and Webassambly. A central
point to configure the guardian to connect to matrix and other services needs
to be provided. The matrix server is connected to the guardian with a service
bot which is able to open rooms to exchange revisions between PKC’s.

Required Functionality of the Matrix-Bot:
* open new room for user (required) - to share resource invite / remove other
users to/ from room (required) - to set permissions who can read
* shared resource close room (required) - after resource share is revoked join a
room the user is invited too (by other matrix-bot)
*'accept invite' check for
challenge (provided via text from remote Guardian), leave room if challenge is
faulty and block user (required) delete? room / delete history?
Note: Use matrix only as channel not as storage (optional) preferably the
history of the channel is not kept
* post content of (mediawiki API query results from the Guardian) into a room
* (required) read content of room (send it to the Guardian for verification,
 before it's send to the import API) (required)

