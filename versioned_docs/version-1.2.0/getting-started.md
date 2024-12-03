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


