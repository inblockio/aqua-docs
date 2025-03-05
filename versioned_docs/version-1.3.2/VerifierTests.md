---
title: "Verifier Tests"
---

## Overview
The Aqua verifier MUST validate revisions per the schema defined at [https://aqua-protocol.org/docs/v3/schema_2](https://aqua-protocol.org/docs/v3/schema_2). This document specifies required tests for implementations to ensure compliance with the Aqua protocol, as introduced at [/docs/v3/intro](/docs/v3/intro). Tests are divided into Revision Verification and Relational Verification domains. Implementations MUST pass all tests to be considered conformant.

## Prerequisites
- **Schema**: Implementations MUST conform to [https://aqua-protocol.org/docs/v3/schema_2](https://aqua-protocol.org/docs/v3/schema_2).  
- **Tools**: Implementations MAY use any framework supporting SHA256 hashing and Ethereum EIP-191 (using the secp256k1 curve) signature validation. Implementations MAY support additional hashing algorithms (e.g., SHA3-512) or signature schemes (e.g., secp256r1) only if specified in an updated schema and supported by new, defined `signature_type` or `witness_network` values.

## Revision Verification Tests
These tests ensure each revision object in `revisions` is independently valid. Types MUST adhere to the schema at [https://aqua-protocol.org/docs/v3/schema_2](https://aqua-protocol.org/docs/v3/schema_2).  

- **RV-01: Version Compliance**  
  - The `version` field MUST be one of the following exact strings:  
    - `"https://aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar"`  
    - `"https://aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: tree"`  
  - Implementations MUST reject any other value.  

- **RV-02: Required Fields**  
  - Every revision MUST include `previous_verification_hash`, `local_timestamp`, `revision_type`, and `version`.  
  - Implementations MUST reject revisions missing these fields or containing empty strings for `local_timestamp`, `revision_type`, or `version`.  
  - `local_timestamp` MUST be in YYYYMMDDHHMMSS format and MUST represent a valid UTC time after 2020-01-01 00:00:00.  

- **RV-03: File Revision Integrity**  
  - A `revision_type` of `"file"` MUST include `file_hash` and `file_nonce`.  
  - The `file_hash` MUST equal the SHA256 hash of either:  
    - The referenced file content concatenated with `file_nonce`, OR  
    - The OPTIONAL `content` field (serialized file data) concatenated with `file_nonce`, if present.  
  - Implementations MUST reject revisions where `file_hash` does not match either computation.  

- **RV-04: Signature Verification | Signature Type: ethereum:eip-191**  
  - A `revision_type` of `"signature"` MUST include `signature`, `signature_public_key`, and `signature_wallet_address`.  
  - The `signature` MUST validate against `previous_verification_hash` using `signature_public_key` per `signature_type` `"ethereum:eip-191"` (secp256k1 curve).  
  - Implementations MUST reject invalid signatures.  

- **RV-05: Witness Verification | Witness (Ethereum)**  
  - A `revision_type` of `"witness"` MUST include `witness_network`, `witness_address`, and `witness_smart_contract_address`.  
  - `witness_network` MUST be one of: `"mainnet"`, `"sepolia"`, `"nostr"`, or `"TSA_RFC3161"`. Other values MUST be rejected.  
  - `witness_merkle_root`, if present, MUST be the valid Merkle root hash derived from `witness_merkle_proof`.  
  - `witness_smart_contract_address` MUST be a valid Ethereum contract address for the specified `witness_network`, capable of storing and retrieving verification hashes.  
  - `witness_transaction_hash`, if present, MUST be a valid transaction hash for the specified `witness_network`.  
  - `witness_sender_account_address`, if present, MUST be a valid account address for the specified `witness_network`.  
  - `witness_merkle_proof`, if present, MUST be a valid Merkle proof including `previous_verification_hash` as a leaf.  
  - Implementations MUST reject witness revisions failing these checks.  

- **RV-06: Signature Type Restriction**  
  - `signature_type` MUST be one of: `"ethereum:eip-191"` or `"did_key"` for signature revisions. Other values MUST be rejected.  

- **RV-07: Witness Type Restriction**  
  - `witness_network` MUST be one of: `"mainnet"`, `"sepolia"`, `"nostr"`, or `"TSA_RFC3161"` for witness revisions. Other values MUST be rejected.  

- **RV-08: Indexed Content Verification**  
  - Each key in `file_index` MUST be a valid `file_hash` from a revision with `revision_type` `"file"`.  
  - Implementations MUST reject `file_index` entries referencing invalid or nonexistent `file_hash` values.  

## Relational Verification Tests
These tests ensure consistency across `revisions`, `file_index`, `tree`, and `treeMapping`. Types MUST be strict per [https://aqua-protocol.org/docs/v3/schema_2](https://aqua-protocol.org/docs/v3/schema_2).  

- **RL-01: Previous Hash Linking**  
  - `previous_verification_hash` MUST match a valid revision key in the pool of all verified revisions or be empty for the first (genesis) revision.  
  - Implementations MUST reject invalid or nonexistent references.  

- **RL-02: Type: Link Revision**  
  - A revision referenced by revision type `link` MUST exist and be valid in the pool of all verified revisions.  
  - Implementations MUST reject links to invalid or missing revisions and throw an revision not found error.

- **RL-03: Loop Detection**  
  - Implementations MUST have a loop detection mechanism.

- **RL-04: Fork Detection**  
  - Implementations MUST have a fork detection mechanism to output deterministic results.

- **RL-05: Timestamp Order**  
  - Implementations MUST have a timestamp plausibility check accross revisions for local timestamps 
  - Implementations MUST have a timestamp plausibility check for cryptographic timestamps (Witness events)
