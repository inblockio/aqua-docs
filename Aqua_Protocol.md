|                  |                                |
|------------------|--------------------------------|
| Current version: | AQP v1.1                       |
| Author:          | Tim Bansemer                   |
| Date:            | 30.12.2021                     |
| Status:          | DRAFT / Experimental           |
| Implementation:  | <https://inblock.io/micro-PKC> |

## Introduction

The Aqua Protocol (AQP) is a content-exchange protocol between hosts in
peer-to-peer environments, providing both trustworthiness and
accountability. This document describes the functions performed by the
protocol, a Proof-Of-Concept that implements it, and it's interfaces. It
also showcases other services which can be developed on top of it.

## Motivation

There is no easy or automated approach for checking if data has been
manipulated or corrupted, is attributed to the wrong author, or is
attributed to the wrong time. It is impossible to verify the change
history of data and by which identity it was changed.

The Aqua Protocol (AQP) provides a foundation for creating trusted data,
which can be quickly and easily verified. This includes the verification
of integrity, the verification of account (who created or manipulated
the data), and the verification of existence and time.

The AQP provides a globally unique resource identification (URI) for
each chunk (revision) of verified data. A collision free address can
exist between multiple interacting hosts, each referring to multiple
URI's of verified data.

The AQP is used to realize the concept of [Data
Accounting](Data_Accounting "wikilink").

## Specification

All hashes are based on
[SHA3-512](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf).
This encryption standard is used to construct
[Mobile-Content-Hash-Chain](Mobile-Content-Hash-Chain "wikilink")'s,
which are then fully or partially exchanged between hosts depending on
the application of the data.

To meter data we hash it in SHA3-512 which always has 128 characters.
This value can be used as a check sum to verify data integrity. The
check sum can then be entangled in a hash-chain to create an immutable
track record. We differentiate between REQUIRED and OPTIONAL data for
each revision.

### **Revision Verification Structure**

Addressing: A verified data structure is identified by it's URI
**verification_hash** and grouped by it's **genesis_hash** which are
linked to the first revision linked to each other.

The first revision created will create a verification_hash which has a
special meaning and is referred to as the genesis_hash. All future
revisions building upon that first revision will be attributed to the
genesis_hash as a unique URI for grouping. This allows us to understand
if two revisions are related without needing to verify the whole history
of the hash chain.

##### Verification_Hash
revision verification_hash **is the hash sum over the string formed by adding** 

|Input Order | Hash name      | Input     |
|------------|----------------|-----------|
| 1          | content hash   | REQUIRED  |
|            | \+             |           |
| 2          | metadata hash  | REQUIRED  |
|            | \+             |           |
| 3          | signature hash | OPTIONAL  |
|            | \+             |           |
| 4          | witness hash   | OPTIONAL  |

##### Content

| Input order | Data Field                          | Inut     | Input                                                                                                                                                                                         |
|-------------|-------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \-          | Content_Hash                        | \-       | The check sum for all content data fields which simplifies hash construction and the ability to identify data corruption in this part of the verification structure.                          |
| 1           | Text                                | REQUIRED | The string input of the visible page using UTF-8 encoding schema.                                                                                                                             |
| 2           | Special Content: Slot: Transclusion | OPTIONAL | Holds the data of hashes-transcluded resources.                                                                                                                                               |
| 3           | Special Content Slot: File_Hash     | OPTIONAL | A file which is transcluded into the revision. The sha3-512 checksum is written into a specific content_slot in the file. Takes the binary string of the file as input to calculate the hash. |
| 4           | Special Content Slot: Signature     | OPTIONAL | A visible copy of the signature data for e.g. manual verification                                                                                                                             |
| 5           | Content_Slot N                      | OPTIONAL | There are 'N' content slots.                                                                                                                                                                  |

##### Metadata

| Input order | Data Field                | Input                                                                                                                                                                  |
|-------------|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \-          | metadata_hash             | The check sum for all metadata data fields. It simplifies the hash construction and the ability to identify data corrupton in this part of the verification structure. |
| 1           | domain_id                 | 10 digits hexadecimal randomly generated to identify the host                                                                                                          |
| 2           | time_stamp                | time-stamp of the current revision (decimal numbers YYYYMMDDHHMMSS e.g. 20211128092608)                                                                                |
| 3           | previous_verifiction_hash | previous_revision_verification_hash if present                                                                                                                         |

##### Signature

Is a cryptographic signature of a [Public-Private-Key
Cryptography](Public-Private-Key_Cryptography "wikilink") pair. The
protocol should be abstract, while it will support 'Method' in later
iterations. This will allow to use different types of implementations
like: PGP Signatures, Ethereum or Bitcoin [Wallet](Wallet "wikilink")'s.

In this specification we use the only currently implemented way of
signing which is with an Ethereum Wallet.

<table>
<thead>
<tr class="header">
<th><p>Input order</p></th>
<th><p>Data Field</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>-</p></td>
<td><p>Signature_Hash</p></td>
<td><p>The check sum for all signature data fields. It simplifies hash construction, and identifies data corruption in this part of the verification structure.</p></td>
</tr>
<tr class="even">
<td><p>- [TBD]</p></td>
<td><p>Method</p></td>
<td><p>[Not implemented] Ethereum ethers.js secp256k1</p></td>
</tr>
<tr class="odd">
<td><p>1</p></td>
<td><p>Public Key / wallet_address</p></td>
<td><p>Used to check the signature.</p></td>
</tr>
<tr class="even">
<td><p>2</p></td>
<td><p>Signed Message</p></td>
<td><p>Constructed by PREFIX "<strong>I sign the following page verification_hash:" +[0x(revision_verification_hash)]</strong>" all elements matter to be able to reproduce the signature.</p>
<p>The verification_hash should never repeat itself keeping the private key safe to ensure that there is never the same signed message.</p></td>
</tr>
<tr class="odd">
<td><p>3</p></td>
<td><p>Signature</p></td>
<td><p>Cyphertext to verify against it</p></td>
</tr>
</tbody>
</table>

##### Witness

To complete the witnessing process, a Domain Manifest is created. This
is a collection of all witness revision hashes within one domain. A
[Merkle Tree](Merkle_Tree "wikilink") is used to unify all hashes of all
revisions and is then represented by a single hash value.

The witness_event_verification_hash is written to the [Witness
Network](Witness_Network "wikilink"). The
witness_event_verification_hash is then generated by using the
domain_manifest_genesis_hash and the merkle_root hash together. This
allows the page manifest itself to also be witnessed.

A single revision which is witnessed, will not store the whole [Merkle
Tree](Merkle_Tree "wikilink"), but only it's relevant path to the
[Merkle Root](Merkle_Root "wikilink"). Performing a [Merkle
Proof](Merkle_Proof "wikilink") will mean that it's revision is included
in the [Merkle Tree](Merkle_Tree "wikilink").

| Input order | Data field                      | Description                                                                                                                                                                                                                                                                        |
|-------------|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \-          | witness_hash                    | The check sum for all signature data fields. It simplifies hash construction and identifies data corruption in this part of the verification structure.                                                                                                                            |
| 1           | domain_manifest_genesis_hash    | Refers to the URI which stores the whole merkle_tree of the witness event                                                                                                                                                                                                          |
| 2           | merkle_root                     | The root hash of the merkle-tree. The presence of the merkle-tree allows for lazy verification to reduce required computational steps for verification by skipping the merkle-proof as both datasets can be entangled in the chain by a never revision and therefore be immutable. |
| 3           | witness_network                 | Specifies which witness network was used to store the witness_event. The following structure shows a AQP hash chain with 3 revisions which wrote the Witness_Event_Verification_Hash into the distributed ledger.                                                                  |
| \-          | relative-merkle-tree-proof      | Provide the relative path with all required hashes to verify the merkle_tree root from the first node which the verification_hash of the revision as a starting point.                                                                                                             |
| \-          | witness_event_verification_hash | \[IMPLICIT\] Is NOT part of the datastructure. It is calculated by taking the sha3-512 checksum of the domain_manifest_genesis_hash and the merkle_root hash. This ensures that the domain_manifest itself will be witnessed.                                                      |

The following structure shows a AQP hash chain with 3 revisions:

<table>
<thead>
<tr class="header">
<th><p>Revision</p></th>
<th><p>Genesis_Hash</p></th>
<th><p>Verification Hash</p></th>
<th><p>Input</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1</p></td>
<td><p>genesis hash</p></td>
<td><p>verification_hash = genesis_hash</p></td>
<td><table>
<thead>
<tr class="header">
<th><p>Hash name</p></th>
<th><p>Input</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>content hash</p></td>
<td><p>REQUIRED</p></td>
</tr>
<tr class="even">
<td><p>metadata hash</p></td>
<td><p>REQUIRED</p></td>
</tr>
<tr class="odd">
<td><p>signature hash</p></td>
<td><p>OPTIONAL</p></td>
</tr>
<tr class="even">
<td><p>witness hash</p></td>
<td><p>OPTIONAL</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td><p>2</p></td>
<td><p>genesis hash</p></td>
<td><p>verification_hash</p></td>
<td><table>
<thead>
<tr class="header">
<th><p>Hash name</p></th>
<th><p>Input</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>content hash</p></td>
<td><p>REQUIRED</p></td>
</tr>
<tr class="even">
<td><p>metadata hash</p></td>
<td><p>REQUIRED</p></td>
</tr>
<tr class="odd">
<td><p>signature hash</p></td>
<td><p>OPTIONAL</p></td>
</tr>
<tr class="even">
<td><p>witness hash</p></td>
<td><p>OPTIONAL</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="odd">
<td><p>3</p></td>
<td><p>genesis hash</p></td>
<td><p>verification_hash</p></td>
<td><table>
<thead>
<tr class="header">
<th><p>Hash name</p></th>
<th><p>Input</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>content hash</p></td>
<td><p>REQUIRED</p></td>
</tr>
<tr class="even">
<td><p>metadata hash</p></td>
<td><p>REQUIRED</p></td>
</tr>
<tr class="odd">
<td><p>signature hash</p></td>
<td><p>OPTIONAL</p></td>
</tr>
<tr class="even">
<td><p>witness hash</p></td>
<td><p>OPTIONAL</p></td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td><p>N</p></td>
<td><p>genesis_hash of n</p></td>
<td><p>...</p></td>
<td></td>
</tr>
</tbody>
</table>

## API Endpoints

The AQP provides 3 API's which return data from a host which runs the
AQP.

<table>
<thead>
<tr class="header">
<th><p>API-Name</p></th>
<th><p>Input</p></th>
<th><p>Returns</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>/data_accounting/get_hash_chain_info/{id_type}/{id}</strong></p></td>
<td><p>id_type = (title or</p>
<p>genesis_hash)</p>
<p>id = genesis_hash or title string</p></td>
<td><p>Gives you all context for the requested hash_chain.</p></td>
</tr>
<tr class="even">
<td><p><strong>/data_accounting/get_revision_hashes/{verification_hash}</strong></p></td>
<td><p>verification_hash</p></td>
<td><p>Will return the revision requested if it exists and or a list of any newer revision then the one requested.</p></td>
</tr>
<tr class="odd">
<td><p><strong>/data_accounting/get_revision/{verification_hash}
</strong></p></td>
<td><p>verification_hash</p></td>
<td><p>Will return all data revision and revision verification data.</p></td>
</tr>
</tbody>
</table>

#### **GetHashChainInfoHandler.php data stracture**

-   genesis_hash
-   current_revision: returns the last written verification_hash
    representing the last revision grouped to this hash_chain.
-   domain_id
-   content: Returns e.g. header data for which interpreter to use to
    display or process the hash_chain. e.g. xml heador with side_info
    and namespace.

### **GetRevisionHandler.php data structure**

-   verification context
    -   transclusion: boolean (tells the verifier to scan content for
        sub-pages)
    -   signature: boolean (tells the verifier to load previous
        dependent revision)
    -   witness: boolean (tells the verifier to load previous dependent
        revision)
-   content
    -   content_data
    -   content_hash
-   metadata
    -   domain_id
    -   timestamp
    -   previous_verification_hash
-   signature
    -   signature
    -   wallet_address
    -   signature_hash
-   witness
    -   domain_manifest_genesis_hash
    -   merkle_root
    -   witness_network
    -   transaction
    -   witness_hash
-   merkle-tree-proof

#### **GetRevisionHashesHandler.php** data structure

-   <revision_hash> or a list of <revision_hashes>

## Verification Process

Is a repetition of the verification data generation process, based on
the content data, and a comparison of their results.

**Verification of Content**

All hashes are recalculated in a separate client implementation, and
compared with the ones sent via the API. If the data was not altered or
corrupted; nor was a there a difference in the process to calculate the
hash, they will match. This will create a high level of assurance that
the integrity and history of the file in question was not altered.

**Verification of Account**

To verify that the account signature that signed the revision is valid.

**Verification of Time**

To verify that the witness event included in a revision is correct, a
lookup and comparison of the witness_event_verification_hash on-chain is
performed and compared with the recalculated event.

**Reference Implementationrecalculate**

|                                    |                                                                    |
|------------------------------------|--------------------------------------------------------------------|
| Command-Line-Verification-Tool     | <https://github.com/inblockio/data-accounting-external-verififier> |
| Chrome Extension Verification Tool | <https://github.com/inblockio/VerifyPage>                          |

### Stateful Hyperlinks / Transclusions

## Appendix

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
    through the [Guardian](Guardian "wikilink").
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

### Data Accounting Protocol v1.2 \[TBD\]

-   Generalization of the Signature-Metadata to inform which signature
    method was used.
    -   GPG Signatures
    -   BTC Wallet Signatures
    -   Ethereum Wallet Signatures
    -   Done by: Displaying method used for signing, displaying
        underlying architecture.
-   Including Account as part of the verified data structure
-   Defining maximum payload size per revision

## Known Design Limitations

As the content (e.g. a file) is part of a revision, it makes sense to
investigate maximum payload per requested revision. If it exceeds the
supported maximum, the verification will fail.

-   Excluding large files from transfer and using an existing
    file-transfer protocol might be desired.

<!-- -->

-   As the file is wrapped in the verification_protocol, it's transport
    can be a fully separated concern.

An alternative solution would be chunking the file into a maximum
allowed payload per request, and then the reassembling the file at the
destination. This would also allow for integrity verification as each
content load is integrity verified anyway. This would be the logical
segmentation of one logical revision into many smaller virtual
revisions, which will resolve after reassembly into the logical
verification_hash.

## Services on AQP (Not yet implemented, exploration)

## AQP-DACS: [Domain](Domain "wikilink") Access Control System

-   -   See: [Guardian](Guardian "wikilink") (Acting as like a Firewall)

-   AQP-NS: Name-System and Name-Registry.
    -   See [PKC Name Resolution](PKC_Name_Resolution "wikilink")

-   AQP-SSI: Self-Sovereign-Identity Protocol for [Identity
    Claim](Identity_Claim "wikilink") management
    -   See [Aqua Identity Protocol](Aqua_Identity_Protocol "wikilink")

-   AQP Delegated Witnessing
    -   See [Delegated Witnessing](Delegated_Witnessing "wikilink")

## Blockchain Context

DISCLAIMER: AQP is not a permissionless distributed ledger. It works
with single-node deployments and does not require the witnessing part
(which benefits from being published to a DLT) to be valuable and
working. AQP does not have a token nor is it distributed by default.

As some concepts are very similar as those used in DLT's, please refer
to the following:

A revision is similar to a block in a Blockchain structure, which has
it's own ROOT HASH and a set of TRANSACTIONS which are included inside.
Our transactions is content written into a revision.

<table>
<thead>
<tr class="header">
<th><p>Blockchain Term</p></th>
<th><p>AQP Term</p></th>
<th><p>Explaination</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Block</p></td>
<td><p>Revision</p></td>
<td><p>We use content which comes from pages</p></td>
</tr>
<tr class="even">
<td><p>Root Hash</p></td>
<td><p>verification_hash</p></td>
<td><p>Also referred to as verification_hash</p></td>
</tr>
<tr class="odd">
<td><p>Transaction</p></td>
<td><p>Input Data</p></td>
<td><p>Is the data which is inputted into the hashing function.</p>
<ul>
<li>Content Data</li>
<li>Metadata Data</li>
<li>Signature Data</li>
<li>Witness Data</li>
</ul></td>
</tr>
<tr class="even">
<td><p>Genesis Block</p></td>
<td><p>Genesis Hash</p></td>
<td><p>Is the unique hash chain identifier</p></td>
</tr>
<tr class="odd">
<td><p>Blockchain</p></td>
<td><p><a href="Hash_Chain" title="wikilink">Hash Chain</a></p></td>
<td><p>The hash chain is not distributed but by default only in the local PKC, therefore it is not a distributed ledger. Furthermore the PKC is missing a consensus algorithm to create a shared truth between notes.</p></td>
</tr>
</tbody>
</table>
