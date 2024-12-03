---
title: "Getting Started"
sidebar_position: 2
---

## Data Structure:

Every revision is represented by a merkle-root hash representing a list of alphabetically ordered key-value pairs which are hashed (implementation example SHA3-512). This allows us to dynamically change the data structure without the need to introduce breaking protocol changes.

  * The input data MUST NOT have dublicated keys as this would lead to non-deterministic ordering.

Aqua-Chain: Is a portable hash-chain. This provides immutability for the history of the file, once signed and/or witnessed with the respective security guarantees.
Aqua-revisions form a portable Aqua-Chain.

There are 4 Types of Revisions:
  * Content Revision: Contains the data object if wrapped by the protocol. This is used to secure the data integrity and reference the data object for provenance purposes. The content revision makes the data object referencable for signatures, witness, and link revisions.
  * Signature Revision: Is used to cryptographically sign, we are currently supporting DID and Ethereum signatures.
  * Witness Revision: Used to witness the Hash to prove its existence. We are supporting Ethereum by default.
  * Link Revision (TBD): Protocol specification for how to interlink Aqua-Chains. This also includes tracking externally managed datasets which are not wrapped into the Aqua-Chain itself.

