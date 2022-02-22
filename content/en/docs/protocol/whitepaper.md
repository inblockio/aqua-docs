---
title: Whitepaper
linkTitle: "Whitepaper"
weight: 1
description: >
  High level outline of Aqua Protocol (AQP) specification
---


|                  |                                            |
|------------------|--------------------------------------------|
| Current version: | Aqua Protocol v1.1 Specification           |
| Author:          | Tim Bansemer, Publius Dirac                |
| Date:            | 30.12.2021                                 |
| Status:          | DRAFT / Experimental                       |
| Implementation:  | <https://github.com/inblockio/micro-pkc>   |

## Introduction

The Aqua Protocol (AQP) is a data accountability and exchange protocol between
hosts in peer-to-peer environments. The AQP is used to realize the goal of
[accounting for data origin and history](data-accounting.md). The description
for the proof-of-concept implementation of the AQP can be found in [this
page](../implementations/reference-architecture.md).

## Motivation

In today's world, there are no widely adopted trustless processes of checking if
data have been manipulated or corrupted, are attributed to the wrong author, or
are attributed to the wrong time. Today's processes are dependent on centralized
trusted services which retain all power over governing the data.

There is a lack of transparency or ability to check if data have been altered
by an unauthorized party. Additionally, consumers of data are incapable of
verifying if centralized services have altered the data. This leads to a world
of untrustworthy information in which we don't know how to conclude what is
true.

In a world where every piece of information is a grain in a sandstorm, it has
become impossible to navigate reality. In contrast, in a world where every
piece of information is a fixed star in the sky for a lifetime, we are able to
relate and make sense of the information given. The Aqua Protocol (AQP) turns
grains of information into fixed stars of information.

The AQP adds a peer-to-peer layer of accountability, making it impossible to
change data unnoticed. AQP adds an essential line of defense against attacks on
data integrity, plagiarism, or misattribution. AQP is used to govern trusted
data, which can be quickly verified. This includes the verification of its
integrity and history, the verification of its account (the entity who creates
or manipulates the data), and the verification of its existence and timestamp.

    The Aqua Protocol provides trustworthiness to data by
    securing data ✅ integrity, 🔏 account and ⌚ time.

In order to account data, it is necessary to track and verify its history. The
AQP provides a globally unique resource identification (URI) for each revision
of the verified data. This identifier is collision-free, and is referred the
same way across multiple interacting hosts.

## Terminology

## Wallet
A wallet is a software for protecting and managing private cryptographic keys
(of private-public key pairs) which are used to govern digital assets. This is
done by authorization of transactions via digital signatures or by initiating
decryption processes to access data.

See [Separation of Concerns](design-principles.md#separation-of-account-and-service).

### Account

We are following Ethereum's account definition:
> In general, there are two types of accounts. Externally owned accounts,
> controlled by private keys. And contract accounts, controlled by their
> contract code
-- [Ethereum Whitepaper](https://ethereum.org/en/whitepaper/#ethereum-accounts)

In general, we can't prove if an account owner is a person or a machine. With
advancements in AI, it will become increasingly difficult to prove that a human
is a human. [Attempts are being made](https://www.proofofhumanity.id/) to
increase trustworthiness of accounts which fall short in questions of privacy
and security as they make public claims. Traditional know your customer (KYC)
combined with the AQP and Aqua Identity Protocol (AIP) identification processes
can provide similar "proof of being human" which can be attested to an account.
This allows us to outsource the problem of identification, where we only focus
on unique accounts which are sufficient for data accounting independent of
humans or machines. Identity claims issued via the AIP will help to provide the
context required to meaningfully interact between accounts.

For more on this topic, please read the [Aqua Identity
Protocol](aqua-identity-protocol.md).

### Domain
A domain is a unique namespace attributed to an account. It allows us to manage
services and files within that namespace creating a domain of data governance
After granted permissions, additional accounts can be added to share control
over a domain or singular assets. To enforce boundaries of a domain, additional
software like the [Guardian](guardian.md) is required.

E.g. by setting up the a data vault with your account it becomes your
domain of data governance.

### Revision

A revision is the smallest portable entity within the AQP. Multiple revisions
form a single portable hash chain which is serialized in JSON format.
They have existed before in unsecured systems where multiple revisions form a
file which can be displayed as a page. The AQP adds the cryptographic harness
to secure it. With presenting a portable hash chain, it is possible to track
all incremental changes stored in each revision to understand the history of a
page and how it came to be. This allows us to have version control on digital
assets being able to restore earlier states and to relate to them. This allows
us to have historical evidence of digital assets.

### Page

A page is a visible representation of a file containing multiple or a single
revision attributed to a shared origin. A page view could also be used to
create a new revision by a used service which interfaces with the file for
manipulation. In AQP all revisions share a global URI hash to
attribute them together called a genesis hash.

### Transaction Security

Transaction security is an economic measure of the level of integrity assurance
for a transaction. It is defined as the cost required to forge a transaction.
The transaction security can be increased by cryptographic security and by strong
replication of transactions. Public distributed ledger systems are highly suitable
for providing very high level of transaction security at the cost of privacy
and immutability (data can't be changed or deleted). Today, public distributed
ledgers such as Bitcoin and Ethereum provide the highest level of transaction
security.

### Data Asset

Data turns into a valuable asset if it is accounted for. In an accounted form
it can be easily priced, exchanged or traded.

### Data Vault

Software used to store and manage data with an account. The software must apply
a secure architecture and measures for keeping data assets safe. This is
achieved through encryption, strong authentication and restrictive access to
keep data private by default.

See [Design Principles / Separation of Account and
Service](design-principles.md#separation-of-account-and-service)


### Witness

We define witnessing as the process of observing an event. A witness is judged
by their capability to recollect and share an observed event. In other words,
witnessing is the process of storing input data for later playback to provide
data symmetry around an event.

### Witness Network

The digital service in a distributed ledger or similar infrastructure which
provides transaction security and data symmetry for shared data within the
network. An example of a witness network would be Ethereum.

E.g. Ethereum can be used to store a digital fingerprint of a domain snapshot
of a data vault. A domain snapshot is the Merklized state of all witnessed hash
chains being present in the data vault. It is required to pay the witness
network for its service. In the case of Ethereum, this is done using 'Ether'.
This in return allows the account owner to create an 'undeniable' proof that a
specific revision and the previous revisions within a hash chain has existed.

### Portable Hash Chain

A hash chain is a linked list where each node contains the cryptographic hash
of the previous node content. A portable hash chain is a hash chain that can be
moved from one host to another.

### Immutable Hyperlinks / Transclusions
See [Immutable Hyperlinks](immutable-hyperlinks.md).

## Specification

To identify a revision with a unique fingerprint, we hash its content using
the SHA3-512 hashing function which always has a 128 characters long
output. This value can be used as a checksum to verify data integrity.
The checksum can then be entangled in a hash-chain to create an
immutable track record. We then calculate multiple properties associated
with the revision, in addition to its content checksum. In the next section,
we differentiate between REQUIRED and OPTIONAL properties for each
revision.

All hashes are based on
[SHA3-512](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf).
This encryption standard is used to construct [portable hash
chains](#portable-hash-chain), which are serializing of data and its history in
a form that can be verified, and independent of location. The portable hash
chain can be fully or partially exchanged between hosts depending on the
application of the data. From here on, we refer the term "portable hash chain"
as "hash chain."

In order to implement the AQP, we need to utilize a software that is capable of
generating portable hash chains and facilitating actions described in the
AQP. We call those nodes which facilitate the Aqua Protocol 'Aqua Data
Vaults' which given their role should be implemented as a software with secure
architecture and measures for keeping data assets safe. This is achieved
through encryption, authentication and restrictive access to keep data private
by default.

# Revision Verification Structure

A revision is RECOMMENDED to be limited to 50 Megabytes to ensure that the verification can take
place on all imaginable clients which might have slow network connectivity, low
memory, low cpu performance. Once a revision is verified, the next one can be
verified. Clients with more performance will be able to parallelize the
verification. Larger files can be chunked to be placed in multiple revisions.

A verified data structure is identified by its URI `verification_hash`
and grouped by its `genesis_hash`. The first revision created will
create a `verification_hash` which has a special meaning and is
referred to as the `genesis_hash`. All future revisions building upon
that first revision will be attributed to the `genesis_hash` as a unique
URI for grouping the revisions. This allows us to understand if two
revisions are related without needing to verify the whole history of the
hash chain.

## Verification Hash
`revision_verification_hash` is the hash sum over the string formed by the
following operation

```
revision_verification_hash = calculate_hash_sum(
    content_hash + metadata_hash +
    signature_hash + witness_hash
)
```
The content_hash and metadata_hash are REQUIRED.
The signature_hash and witness_hash are OPTIONAL.

## Content

A content hash is the check sum for all content data fields which simplifies
hash construction and the ability to identify data corruption in this part of
the verification structure.
`content_hash` is the hash sum over the string formed by following operation:

```
contentObj = {
    "main": content,
    "extension_key_1": content_extension_1,
    "extension_key_2": content_extension_2,
    ...,
    "extension_key_n": content_extension_n,
}
sortedContenObj = sort_by_keys(contentObj)
content_hash = calculate_hash_sum(
    sortedContenObjValue_1,
    sortedContenObjValue_2,
    ...,
    sortedContenObjValue_n,
)
```
Description:
- content: The string input of the visible page using UTF-8 encoding schema.
  REQUIRED.
- content extensions: more data MAY be encapsulated in addition to the main
  content. These could be a file, a stateful link, or a signature. The content
  extensions are sorted alphabetically by their key names. OPTIONAL.
- The `sort_by_keys` function sorts the content object elements by their keys
  alphabetically. The JSON input MAY be a canonical JSON, in which the keys
  order is already alphabetical, but we sort it always to ensure the order is
  correct.

To see an example of `contentObj` of a revision, see the [example](#Example)
section,

## Metadata

```
metadata_hash = calculate_hash_sum(
    domain_id + time_stamp + previous_verification_hash
)
```

Description:
- metadata_hash: The check sum for all metadata data fields. It simplifies the
  hash construction and the ability to identify data corrupton in this part of
  the verification structure.
- domain_id: 10 digits hexadecimal randomly generated to identify the host
  system that runs the AQP service.
- time_stamp: time-stamp of the current revision (decimal numbers
  YYYYMMDDHHMMSS e.g. 20211128092608).
- previous_verification_hash: previous_revision_verification_hash if present

## Signature

A signature in AQP is a cryptographic signature generated by public-private key
pair. The protocol should be abstract, where it will support 'Method' in later
iterations. This will allow us to use different types of implementations such
as: PGP signatures, Ethereum, or Bitcoin
[wallet](https://en.wikipedia.org/wiki/Cryptocurrency_wallet)'s signatures.

In this specification, we use the AQP reference implementation's signing
method, which is via an Ethereum wallet.

```
signature_hash = calculate_hash_sum(
    signature + public_key
)
```

The signature is generated by a wallet signing the following message:
```
I sign the following page verification_hash:" +[0x<revision_verification_hash>]
```
The `revision_verification_hash` MUST NOT be signed twice by the same key, to
avoid information leakage of the private key.

For example, a wallet with an address of
`0xa2026582b94feb9124231fbf7b052c39218954c2` and a public key of
`0x041518581af65749b3ddc69889df3e5d229bc8ad79279a07ddeb368ade5e1592368c5ff3b69143d7a1e7cf64f7d0774a6724e6eaf138d318d07ddc30f6081ca89a`
signs the following message:
```
I sign the following page verification_hash:" +[0x9dab72c7635043452958c4cc2902f48ef7c4ae437058280197c6a2736ab9635f799cbf190d9d07dd76589055a8ad64e61c6bebd1487994207d4cb7918b471f57]
```
which results in the following signature:
```
0x19b5697c4541509c1add3db9fc2f678b7b80325ebffd4d945ca00db5f8b3f98a142edbf9a7faa0a0c7ec4f10ae1b64cf2ea62ce3ee73ed2e37ce916d6bd016601c
```

## Witness

Witnessing allows one to undeniably prove the existence of a dataset
(represented as a portable hash chain). To complete the witnessing process, a
Domain Snapshot is created. This is a collection of all revision hashes within
one domain. A Merkle tree is used to unify all hashes of the latest revisions
of all portable hash chains within a domain into a single hash value.

The `witness_event_verification_hash` is written to the [Witness
Network](#witness-network). The
`witness_event_verification_hash` is then generated by using the
`domain_snapshot_genesis_hash` and the `merkle_root` hash together. This
allows the page snapshot itself to also be witnessed.

A single revision which has been witnessed, will not store the whole Merkle
tree, but only its relevant path to the Merkle root. Performing a Merkle proof
means that its revision is included in the Merkle tree.

```
witness_hash = calculate_hash_sum(
    domain_snapshot_genesis_hash + merkle_root +
    witness_network + witness_event_transaction_hash
)
```

Description:
- `witness_hash`: the checksum for all signature data fields. It simplifies hash
  construction and identifies data corruption in this part of the verification
  structure.
- `domain_snapshot_genesis_hash`: Refers to the URI of the page which stores the
  whole Merkle tree of the witness event.
- `merkle_root`: the root hash of the Merkle tree. The presence of the
  Merkle tree allows for lazy verification to reduce required computational
  steps for verification by skipping the Merkle proof as both datasets can be
  entangled in the chain by a newer revision and therefore be immutable.
- `witness_network`: specifies which witness network was used to store the
  `witness_event`. The following structure shows an AQP hash chain with 3
  revisions which wrote the `witness_event_verification_hash` into the
  witness network.

Additional context:
- relative-merkle-tree-proof: This provide the relative path with all required
  hashes to verify the Merkle tree root from the first node which the
  `verification_hash` of the revision as a starting point. 
- `witness_event_verification_hash`: It is calculated by taking the sha3-512
  checksum of the `domain_snapshot_genesis_hash` and the `merkle_root` hash.
  This ensures that the`domain_snapshot` itself will be witnessed.


## Example
The following structure shows an AQP hash chain with 3 revisions:

### 1st Revision
This revision features all REQUIRED (content, metadata) and all OPTIONAL
(signature, witness) AQP data fields.
```json
{
  "verification_context": {
    "has_previous_signature": false,
    "has_previous_witness": false
  },
  "content": {
    "rev_id": 358,
    "content": {
      "main": "First revision text",
      "transclusion-hashes": ""
    },
    "content_hash": "ae188be061822074716b43925b3ffa90a03c530342be73c3440d8f022765ffebbb56c16552f13cd1ea61f876d2d892e0a73dcba5173fc47d371b4251d6c094da"
  },
  "metadata": {
    "domain_id": "acfa9f682e",
    "time_stamp": "20220116090401",
    "previous_verification_hash": "",
    "metadata_hash": "d1025fd8866d9367735d2f6617b3aa87401e08d726f311cdf834ea9540955bfc59b428676bce5d47d5fed381394ab2ed838c5eecfc9cb37313705374752c247d",
    "verification_hash": "9dab72c7635043452958c4cc2902f48ef7c4ae437058280197c6a2736ab9635f799cbf190d9d07dd76589055a8ad64e61c6bebd1487994207d4cb7918b471f57"
  },
  "signature": {
    "signature": "0x19b5697c4541509c1add3db9fc2f678b7b80325ebffd4d945ca00db5f8b3f98a142edbf9a7faa0a0c7ec4f10ae1b64cf2ea62ce3ee73ed2e37ce916d6bd016601c",
    "public_key": "0x041518581af65749b3ddc69889df3e5d229bc8ad79279a07ddeb368ade5e1592368c5ff3b69143d7a1e7cf64f7d0774a6724e6eaf138d318d07ddc30f6081ca89a",
    "wallet_address": "0xa2026582b94feb9124231fbf7b052c39218954c2",
    "signature_hash": "cc42f40c4452a25f9ea48a97b6dfba6f69dec347db5c1adf25475b0b4a5da36af3fe48bf9f7ea0dda6bbed9367dc9c82834dbf8cc7f6220fd190cdb729d3f4ec"
  },
  "witness": {
    "witness_event_id": "2",
    "domain_id": "acfa9f682e",
    "domain_snapshot_title": "Data Accounting:DomainSnapshot:b33afaf53ed3d245f0319d4997db2032de9d77791ae11f5125189815eef44f2fba9633bebe2e57bc5ea4b0424872ed02fa6aa9ad909f467726b536933bf715bf",
    "witness_hash": "9707780cebcf6ed02b40bd7e6956b35ffe142a2b5f8cee15c703a652fa389eb118ef101e2f463e95663aa4013a42d9f1ce4a83eed3528b02bf98626e7599bbd8",
    "domain_snapshot_genesis_hash": "b33afaf53ed3d245f0319d4997db2032de9d77791ae11f5125189815eef44f2fba9633bebe2e57bc5ea4b0424872ed02fa6aa9ad909f467726b536933bf715bf",
    "merkle_root": "14f26d7dc0be77afff9131c03cab39a2fa9e1270c6face3fdc35b9b4b4ac4550d048c356a4713568c42411c3e7fe3553ec7b993c9bd7da97cb976e843d7e4d29",
    "witness_event_verification_hash": "67e187411f1e514f232ae2858168da29b15ddfd07523e7a7618bfbf91c583f54fe8e850146120539a92a63ce6138f96599fb8a46ed492e428fe6fde9b9ea82ae",
    "witness_network": "goerli",
    "smart_contract_address": "0x45f59310ADD88E6d23ca58A0Fa7A55BEE6d2a611",
    "witness_event_transaction_hash": "0x5900103adc09a789fd3bd7c23dfeff1ffce41dfba0a52b525ecc032e9279eb1f",
    "sender_account_address": "0xa2026582b94feb9124231fbf7b052c39218954c2",
    "source": "default",
    "structured_merkle_proof": [
      {
        "witness_event_verification_hash": "67e187411f1e514f232ae2858168da29b15ddfd07523e7a7618bfbf91c583f54fe8e850146120539a92a63ce6138f96599fb8a46ed492e428fe6fde9b9ea82ae",
        "depth": "4",
        "left_leaf": "2554fb53531f4de26ff3ad1fb8c61feea6ea47c3f13c4abda385c46ef8541361f7eee42433050281714a3900115f04fe52b5a8d781a71c4c439c5de6b91cbe3c",
        "right_leaf": "9dab72c7635043452958c4cc2902f48ef7c4ae437058280197c6a2736ab9635f799cbf190d9d07dd76589055a8ad64e61c6bebd1487994207d4cb7918b471f57",
        "successor": "789e508ccb23fe053b628cebc19a2d32f34e6aa21e878e8611f7c14d891625c7b2e243b3c3105b98295333b9183e5ea272a055a84ab65ad927f7fd9c27aae48e"
      },
      {
        "witness_event_verification_hash": "67e187411f1e514f232ae2858168da29b15ddfd07523e7a7618bfbf91c583f54fe8e850146120539a92a63ce6138f96599fb8a46ed492e428fe6fde9b9ea82ae",
        "depth": "3",
        "left_leaf": "789e508ccb23fe053b628cebc19a2d32f34e6aa21e878e8611f7c14d891625c7b2e243b3c3105b98295333b9183e5ea272a055a84ab65ad927f7fd9c27aae48e",
        "right_leaf": "c16a966333cd22ff3497875a62202874221c1dae2e74b4351d058910f8d37160be480fce9aab4ec5e725beb695509f0fd65ae581568c6f1ae25eb4f1440b287f",
        "successor": "80d7549af24e9a6bdfc32cefe0536d6528d665cc8e65859ef4cff87270f3db8d9b95aaecc167e10c9b5be9ce3ab36d8d880c3a518e1c5eb899ca9d95af24e9db"
      },
      {
        "witness_event_verification_hash": "67e187411f1e514f232ae2858168da29b15ddfd07523e7a7618bfbf91c583f54fe8e850146120539a92a63ce6138f96599fb8a46ed492e428fe6fde9b9ea82ae",
        "depth": "2",
        "left_leaf": "80d7549af24e9a6bdfc32cefe0536d6528d665cc8e65859ef4cff87270f3db8d9b95aaecc167e10c9b5be9ce3ab36d8d880c3a518e1c5eb899ca9d95af24e9db",
        "right_leaf": "f4e189a08b486253ea0a5cc7bf7150055e738898115c4caf00e45634d6925539d51852409d1fe9108469e9b15668b940f3369300bb27cc292d1fabc0c07cd593",
        "successor": "e227dd97e5166364483b41f058f0d176e3a50a7510299038b09ae3aef2cbafb26c787afad82563a945b433fa2d1279af3535755235ab69d6e5ab089179177c14"
      },
      {
        "witness_event_verification_hash": "67e187411f1e514f232ae2858168da29b15ddfd07523e7a7618bfbf91c583f54fe8e850146120539a92a63ce6138f96599fb8a46ed492e428fe6fde9b9ea82ae",
        "depth": "1",
        "left_leaf": "e227dd97e5166364483b41f058f0d176e3a50a7510299038b09ae3aef2cbafb26c787afad82563a945b433fa2d1279af3535755235ab69d6e5ab089179177c14",
        "right_leaf": "780f3eb08f24022be4463be141bcda6a33a157cd0fd44cf209312b8427ac4036637a63d239526555128a4e7f4bb588ebfdbd8a8cc7d797038e29b852a4fae26c",
        "successor": "f3bd4e82b1e3d304005a7ddf4ab940f3e4e1cf099ca1c058454c431ed3feb0674c044e53150eb5691073ba58a3491565f72f6a6c2a24562ea080b569b4496c9f"
      },
      {
        "witness_event_verification_hash": "67e187411f1e514f232ae2858168da29b15ddfd07523e7a7618bfbf91c583f54fe8e850146120539a92a63ce6138f96599fb8a46ed492e428fe6fde9b9ea82ae",
        "depth": "0",
        "left_leaf": "f3bd4e82b1e3d304005a7ddf4ab940f3e4e1cf099ca1c058454c431ed3feb0674c044e53150eb5691073ba58a3491565f72f6a6c2a24562ea080b569b4496c9f",
        "right_leaf": "4a0c120fbdd6219b774eb2cb2076f4050d606b621e384c3ec645be0e5dbcdac3132f1f2acb531fa5ff62429907b77cf8d29a760be3765eb4decd83949a2925f8",
        "successor": "14f26d7dc0be77afff9131c03cab39a2fa9e1270c6face3fdc35b9b4b4ac4550d048c356a4713568c42411c3e7fe3553ec7b993c9bd7da97cb976e843d7e4d29"
      }
    ]
  }
}
```

### 2nd Revision
This revision entangles all data fields of the previous revision. As the
calculation of the revision_verification hash depends on the revision of the
previous revision, it is shown in verification_context.

```json
{
  "verification_context": {
    "has_previous_signature": true,
    "has_previous_witness": true
  },
  "content": {
    "rev_id": 362,
    "content": {
      "main": "First revision text",
      "signature-slot": "[\n    {\n        \"user\": \"0xa2026582b94feb9124231fbf7b052c39218954c2\",\n        \"timestamp\": \"20220116090439\"\n    }\n]",
      "transclusion-hashes": ""
    },
    "content_hash": "9732084a45fd344d63687ccf9b5cd942f99ffe1debd11622b05d0cd24a2de3e5608d5f5121bdd7559c0a2d39067f9258c4f9612e44728df2e8d9026a88ed650c"
  },
  "metadata": {
    "domain_id": "acfa9f682e",
    "time_stamp": "20220116090439",
    "previous_verification_hash": "9dab72c7635043452958c4cc2902f48ef7c4ae437058280197c6a2736ab9635f799cbf190d9d07dd76589055a8ad64e61c6bebd1487994207d4cb7918b471f57",
    "metadata_hash": "8df483539e2f81e64c9b9df0c7e13ae7778947b5defef860fbaed1260eade794999839bb254ea5006a5d4b6a89a37980ab576dc546d6336518d65b80bf2a5cb5",
    "verification_hash": "296347471b33f3d3c69cc6e0699d80b4cb68ffc79c3ecce96beb659fa324fab1de7a888932fbfb7c60bb8cc83c9445ce15532987a7b59440cada649681618293"
  },
  "signature": {
    "signature": "",
    "public_key": "",
    "wallet_address": "",
    "signature_hash": ""
  },
  "witness": null
}
```

### 3rd Revision
This revision features a transclusion-hash for an immutable link to another
revision.

```json
{
  "verification_context": {
    "has_previous_signature": false,
    "has_previous_witness": false
  },
  "content": {
    "rev_id": 363,
    "content": {
      "main": "First revision text\n\n[[File:Logo_inblockio.png]]",
      "signature-slot": "[\n    {\n        \"user\": \"0xa2026582b94feb9124231fbf7b052c39218954c2\",\n        \"timestamp\": \"20220116090439\"\n    }\n]",
      "transclusion-hashes": "[{\"dbkey\":\"Logo_inblockio.png\",\"ns\":6,\"verification_hash\":\"9b2b3cafb90a07433a2b61885a9e64641a99b1e9024cf53b640501d3706b142fed7bc372300973137ef9d92584fac70976c3889d5610abcfe1f187c248263a56\"}]"
    },
    "content_hash": "14b8256ccd5fa1d883983317f92f428eadb52f699f476b9be69f14c6892b41979ff7b5b7a7a978177985d6aaa0bcfd9857a2646aedc4cbb3299373daa647814b"
  },
  "metadata": {
    "domain_id": "acfa9f682e",
    "time_stamp": "20220116090556",
    "previous_verification_hash": "296347471b33f3d3c69cc6e0699d80b4cb68ffc79c3ecce96beb659fa324fab1de7a888932fbfb7c60bb8cc83c9445ce15532987a7b59440cada649681618293",
    "metadata_hash": "09688c05a83bb74bb255fb0c571cb6314b65f5b7f00750547a2c43f4959d4702ae2aec019c6fb4b0e5d23adea87fd456b0eaffc6ae271163a1fa45b4bae54230",
    "verification_hash": "b35894d74dfcf8b41ff95eed97705e1acf9081021e0d478d8645cb04b8a0b4a013ee8f7fb6e140d149f2c92f20bba984fad5535938a5e36ae6a799a18343b806"
  },
  "signature": {
    "signature": "",
    "public_key": "",
    "wallet_address": "",
    "signature_hash": ""
  },
  "witness": null
}
```

# API Endpoints

The AQP provides 3 API endpoints which return data from a host that runs the
AQP:

## Get Hash Chain
`/get_hash_chain_info/{identifier}?identifier=<title or genesis hash>`  
Input:
- `identifier_type`: the value must either be "title" or "genesis_hash"
- `identifier`: the title or genesis_hash string, e.g. "Main Page" or "02c3c2...215d8d"
Returns: all context for the requested hash_chain.

Example:

API Request:
`/get_hash_chain_info/genesis_hash?identifier=dffd37be12adc9e774b51aa712f7c5bfc09f48b083540d8ca55f91f317e8685bf09daf004f7c841e53732b8c7992de3f3b9b79350d13570c3b46803ba5119c26`

API Response:
```json
{
  "genesis_hash": "dffd37be12adc9e774b51aa712f7c5bfc09f48b083540d8ca55f91f317e8685bf09daf004f7c841e53732b8c7992de3f3b9b79350d13570c3b46803ba5119c26",
  "domain_id": "acfa9f682e",
  "latest_verification_hash": "2554fb53531f4de26ff3ad1fb8c61feea6ea47c3f13c4abda385c46ef8541361f7eee42433050281714a3900115f04fe52b5a8d781a71c4c439c5de6b91cbe3c",
  "site_info": {
    "sitename": "Personal Knowledge Container",
    "dbname": "my_wiki",
    "base": "http://localhost:9352/index.php/Aqua",
    "generator": "MediaWiki 1.37.1",
    "case": "first-letter",
    "namespaces": {
      "0": {
        "case": true,
        "title": ""
      },
     "6942": {
        "case": true,
        "title": "Data Accounting"
      }
    },
    "version": "0.3.0"
  },
  "title": "Aqua",
  "namespace": 0,
  "chain_height": 3
}
```

## Get Revision Hashes
`/get_revision_hashes/{verification_hash}`
Input:
- `verification_hash`
Returns: the revision requested if it exists and/or a list of any newer
revision than the one requested.

Example:

API Request:
`/get_revision_hashes/dffd37be12adc9e774b51aa712f7c5bfc09f48b083540d8ca55f91f317e8685bf09daf004f7c841e53732b8c7992de3f3b9b79350d13570c3b46803ba5119c26`

API Response:
```json
[
  "dffd37be12adc9e774b51aa712f7c5bfc09f48b083540d8ca55f91f317e8685bf09daf004f7c841e53732b8c7992de3f3b9b79350d13570c3b46803ba5119c26",
  "f483d7746f67e7099099bcfa8ea5a93148251c598857e8fad21ce842da62794467067802ef9e818d240cd3312a3346a769f363145a87bfc1eeae19fe8d21b328",
  "2554fb53531f4de26ff3ad1fb8c61feea6ea47c3f13c4abda385c46ef8541361f7eee42433050281714a3900115f04fe52b5a8d781a71c4c439c5de6b91cbe3c"
]
```

## Get Revision
`/get_revision/{verification_hash}`
Input:
- `verification_hash`
Returns: the revision content together with its verification data

Example: See example above.

API Request: `/get_revision/dffd37be12adc9e774b51aa712f7c5bfc09f48b083540d8ca55f91f317e8685bf09daf004f7c841e53732b8c7992de3f3b9b79350d13570c3b46803ba5119c26`

# Verification Process

The verification process is a redo of the verification data generation
process, and additionally a comparison of their results.

**Verification of Content**

All hashes are recalculated in a separate client implementation, and
compared with the ones sent via the API. If the data was not altered or
corrupted; nor was there a difference in the process to calculate the
hash, they will match. This will create a high level of assurance that
the integrity and history of the portable hash chain in question has not been
altered.

**Verification of Account**

We cryptographically verify that the revision signature is indeed generated by the account specified in the verification data.

**Verification of Time**

To verify that the witness event included in a revision is correct, a
lookup and comparison of the `witness_event_verification_hash` on-chain is
performed and compared with the recalculated event.

**Reference Implementation**

|                                    |                                                                    |
|------------------------------------|--------------------------------------------------------------------|
| Command-Line-Verification-Tool     | <https://github.com/inblockio/aqua-verifier-js> |
| Chrome Extension Verification Tool | <https://github.com/inblockio/aqua-verifier-webextension> |




# Appendix

The following content is informational and not part of the
specification. It should help to better understand utility, context and
services which can be built on top of AQP.

## Aqua Protocol v1.1 Changes

Moving over to revision based verification. This allows:

-   Bulk / in parallel verification; ensuring logarithmic verification
    times, not linear increasing verification times with longer history.
    In short: Much faster and scalable.
-   Single revision and range verification (you want to verify a
    specific part of the content-chain)
    -   This is useful for verification of identity claims, where
        trusted parties have signed the claim and for the validator it's
        sufficient to see that signature.
-   This allows direct verification after every edit via the Guardian.
    This is the preparation in the interaction to provide services
    through the [Guardian](guardian.md).
-   Changing the design to include transclusions e.g. this allows the
    verification of subpages via their stateful links /
    revision_verification_hashes
    -   This also allows the inclusion of media files in the
        verification process
    -   You can upload pictures, PDF's, Word-Documents and have them
        automatically included in the aqua protocol and therefore in the
        verified data-structure
-   Introduction of verification_context which indicates if the previous
    revision has signature or witness data, or if the current revision
    has transcluded resources. This will build the correct verification
    structure before verification.

Change in the data-structure:

-   when requesting a revision this is done via the
    GetRevisionHandler.php
-   the previous verification hash is always served as well
-   if signature or witness data is present in the previous revision,
    there is a flag (1/0) that this revision depends on the previous
    revision
-   transcluded resources will be added to the content hash for
    verification

## Data Accounting Protocol v1.2 \[TBD\]

-   Generalization of the Signature-Metadata to inform which signature
    method was used.
    -   GPG Signatures
    -   BTC Wallet Signatures
    -   Ethereum Wallet Signatures
    -   Done by: Displaying method used for signing, displaying
        underlying architecture.
-   Including Account as part of the verified data structure
-   Defining maximum payload size per revision

## Services on AQP (Not yet implemented, exploration)

- AQP-DACS: [Domain](#domain) Access Control System
 -   See: [Guardian](guardian.md) (Acting similar to a WebApplication-Firewall)

- ANS: Name-System and Name-Registry.
 - See [Aqua Name Resolution](aqua-name-resolution.md)

- AQP-SSI: Self-Sovereign-Identity Protocol for [Identity
    Claim](aqua-identity-protocol.md#self-issued-identity-claims) management
 - See [Aqua Identity Protocol](aqua-identity-protocol.md)

- AQP Delegated Witnessing
    - See [Delegated Witnessing](delegated-witnessing.md)

## Similar Projects

None of the listed projects apply the concepts of versioning to their documents,
the concept of portable hash chains, the concept of personal data vaults for data
management in comparison with the AQP reference implementation.

This following list is not exhaustive:
- [Surety](http://surety.com/)
    The oldest blockchain-like timestamping service which has been publishing
    to the New York Times since 1995.
- [OpenTimestamp](https://opentimestamps.org/)
    A free and open-source service provided by Peter Todd using the Bitcoin
    network as a distributed cryptographic clock. The AQP MAY use OpenTimestamp
    as a witness network.
- [OriginStamp](https://originstamp.com/)
    A company providing paid timestamping services for their customers.
    It looks very similar to OpenTimestamps with open-source client libraries.
- [Factom Protocol](https://www.factomprotocol.org/)
    A service which creates an architecture with an extra layer of blockchain,
    to provide an extra layer of trusted parties while providing their own
    token. In our opinion, it introduces unnecessary complexity and
    intermediaries as dependencies compared to the AQP.
- [OpenAttestation](https://www.openattestation.com/)
    An implementation of a timestamping service for document certification. One
    application of it is for secure digital vaccination certificates by the
    Singaporean government. They use the MetaMask Ethereum wallet for signing
    documents making it the most similar project to AQP to our knowledge.

## Blockchain Context

DISCLAIMER: AQP is not a permissionless distributed ledger. In order for the
AQP to be valuable and working, a single node implementation and single node
deployments are sufficient, and do not require the witnessing part. The AQP MAY
benefit from being published to a distributed ledger technology (DLT)) to
achieve a witness event with high transaction security. AQP does not have a
token nor is it distributing data by default.

As some concepts are very similar as those used in DLT's, please refer to the
following:

A portable hash chain and its revisions are similar to a blockchain structure
and its blocks, which has its own root hash and a set of transactions which
are included inside.

<table>
	<thead>
		<tr class="header">
			<th><p>Blockchain Term</p>
			</th>
			<th><p>AQP Term</p>
			</th>
			<th><p>Explanation</p>
			</th>
		</tr>
	</thead>
	<tbody>
		<tr class="odd">
			<td><p>Transaction</p>
			</td>
			<td><p>Input Data</p>
			</td>
			<td><p>In a blockchain its a signed transaction. In AQP its all the input data provided to calculate the respective content slot hashes.</p>
			</td>
		</tr>
		<tr class="even">
			<td><p>Block</p>
			</td>
			<td><p>Revision</p>
			</td>
			<td><p>A block contains the Merklized list of transactions. A&nbsp;revision contains various&nbsp;hashed data inputs such as</p>
			<ul>
			<li>Content slots</li>
			<li>Metadata data</li>
			<li>Signature data</li>
			<li>Witness data</li>
			</ul>
			</td>
		</tr>
		<tr class="odd">
			<td><p>Genesis Block</p>
			</td>
			<td><p>Genesis Revision</p>
			</td>
			<td><p>The first object in the hash chain / block chain.</p>
			</td>
		</tr>
		<tr class="even">
			<td><p>Blockchain</p>
			</td>
			<td>Hash Chain</td>
			<td>The hash chain is not distributed but by default only in the local PKC, therefore it is not a distributed ledger. Furthermore the PKC is missing a consensus algorithm to create a shared truth between notes.</td>
		</tr>
	</tbody>
</table>

### A side note

It has not escaped our notice that the provided AQP improves the existing
process of double-entry bookkeeping and provides a foundation for a new data
economy. This also allows to create unforgeable invoices which can be clearly
attributed to its sender, avoiding fraud. This is one of many other use cases,
e.g. providing trusted news via revision-controlled journalism.
