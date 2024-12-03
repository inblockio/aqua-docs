---
title: "Getting Started"
sidebar_position: 2
---

## Data Structure:
The aqua chain structure can be broken into a the following components :


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
<br/>

Every revision is represented by a merkle-root hash representing a list of alphabetically ordered key-value pairs which are hashed (implementation example SHA3-512). This allows us to dynamically change the data structure without the need to introduce breaking protocol changes.

  * The input data MUST NOT have dublicated keys as this would lead to non-deterministic ordering.

Aqua-Chain: Is a portable hash-chain. This provides immutability for the history of the file, once signed and/or witnessed with the respective security guarantees.
Aqua-revisions form a portable Aqua-Chain.

There are 4 Types of Revisions:
  * Content Revision: Contains the data object(the data/file encoded to base 64).This is used to secure the data integrity and reference the data object for provenance purposes. 
  * Signature Revision: Is used to cryptographically sign, we are currently supporting  Ethereum signatures.
  * Witness Revision: Used to witness the Hash to prove its existence. We are supporting Ethereum by default.
  * Metadata Revision: used to ensure content revision is valid.



### Page

A page is a visible representation of a file containing multiple or a single
revision attributed to a shared origin. A page view could also be used to
create a new revision by a used service which interfaces with the file for
manipulation. In AQP all revisions share a global URI hash to
attribute them together called a genesis hash.





##

