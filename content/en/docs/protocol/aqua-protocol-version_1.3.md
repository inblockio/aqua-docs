# Aqua Protocol Version v1.3
(Writing in process, unfinished Nov. 5th, 2024)
This is developer documentation.

The Aqua Protocol (AQP) is a data accountability and exchange protocol between hosts in peer-to-peer environments. The AQP is used to realize the goal of accounting for data origin and history (data provenance). Short: A verifiable linkable data structure to attest and certify data.

Issues for improving the protocol are tracked here: https://github.com/inblockio/aqua-improvement-proposal

## Data Structure:

Every revision is represented by a merkle-root hash representing a list of alphabetically ordered key-value pairs which are hashed (implementation example SHA3-512). This allows us to dynamically change the data structure without the need to introduce breaking protocol changes.

Aqua-Chain: Is a portable hash-chain. This provides immutability for the history of the file, once signed and/or witnessed with the respective security guarantees.
Aqua-revisions form a portable Aqua-Chain.

There are 4 Types of Revisions:
  * Content Revision: Contains the data object if wrapped by the protocol. This is used to secure the data integrity and reference the data object for provenance purposes. The content revision makes the data object referencable for signatures, witness, and link revisions.
  * Signature Revision: Is used to cryptographically sign, we are currently supporting DID and Ethereum signatures.
  * Witness Revision: Used to witness the Hash to prove its existence. We are supporting Ethereum by default.
  * Link Revision (TBD): Protocol specification for how to interlink Aqua-Chains. This also includes tracking externally managed datasets which are not wrapped into the Aqua-Chain itself.

Example:

1. Content-Revision
2. Signature-Revision example (Ethereum Wallet)
3. Signature-Revision example (DID Example)
4. Witness-Revision example Ethereum (non-aggregated)
