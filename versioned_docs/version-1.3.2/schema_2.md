---
title: "Schema (v3.2)"
---

The shema documentation below outlines the five types of revisions (`file`, `content`, `signature`, `witness`,`link` and `form`) and their respective properties.

This schema defines a structure for atomic revisions of aqua secured files.
Each revision is uniquely identified by a hash and contains metadata specific to its type.

## Revisions

The `revision` is identified by a unique hash which is also used to verify the integrity of the revision. 
It acts as a globally unique identifier. Unique identifiers are used as unique references to link revisions together or to perform operations on them (transport, access control, etc.).

There are four main types of revisions:

1. **Content Revision**
  1.1 **Form Revision** (a special type of content revision for layer 2 applications)
2. **Signature Revision**
3. **Witness Revision**
4. **Link Revision**

All revision types share properties which are common forming a hash-chain. These are:
- **`previous_verification_hash`**: (String) The hash of the previous revision in the chain. Empty for the first revision.
- **`local_timestamp`**: (String) The UTC timestamp of the revision in `YYYYMMDDHHMMSS` format.
- **`revision_type`**: (String) The type of revision.
- **`version`**: (String) The schema version and hashing method used.

In addition each revision type has specific properties outlined below.

### Hashing Method
The hashing method used is SHA256.

There are two hashing methods used:
- **`Scalar`**: which is a simple hash of the stringified revision object. This is the default method for performance reasons.
- **`Tree`**: the revision object sorts it key-values alphabetically and then creates a merkle tree of all the values. 
  This allows a more granular verification. This is used for e.g. selective disclosure.

### Hash Security
The system is designed to allow for the hash algorithm to be exchangable.
Same applies to any other cryptographic cyphers being used (e.g. signatures) to ensure post-quantum security.
Any type is modular, allowing for new subtypes to be introduced with different cyphers.

### 1. Content Revision

A **Content Revision** represents the initial or updated state of a file which is secured by the Aqua-Protocol. It includes metadata about the file: its hash and index.
The index is a mutable part of the datastructure, it allows to update file location and the services which handels the file.

#### Properties:
- **`previous_verification_hash`**: (String) The hash of the previous revision in the chain. Empty for the first revision (genesis revision).
- **`local_timestamp`**: (String) The UTC timestamp of the revision in `YYYYMMDDHHMMSS` format. 
  Its a local timestamp of the server running the aqua-service. For cryptographically secured timestamps the witness revision is used.
- **`revision_type`**: (String) The type of revision, always `"content"` for this type.
- **`file_hash`**: (String) The hash of the file content.
- **`file_nonce`**: (String) A unique nonce associated with the file. 
  This is used to ensure that additional entropy is added to the hash to make it globallyunique.
- **`version`**: (String) The schema version and hashing method used.

#### Example:
```json
{
  "previous_verification_hash": "",
  "local_timestamp": "20250224154438",
  "revision_type": "file",
  "file_hash": "bd2e8e2a1b3c5d008e1d43ecb11105f42c5ad4e05922bab98981840b636c661e",
  "file_nonce": "65eddd0e16a995170dbef8feaf86a7928678426f20a309bb6627887915c04efb",
  "version": "https://https://https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
}
```

### 1.1 Form Revision

Form revisions are a special type of content revision for layer 2 applications.
They are used to create a form that can be signed by the user. 

Native Layer 2 applications are aqua identity and aqua access control.
The tree verification structure allows for selective disclosure of the form data.

#### Example:
```json
"revisions": {
    "0xd9bc7c36e7b28c6d97c8389881b90e1df163b067b11c69139bf4f24498d5cf92": {
      "previous_verification_hash": "",
      "local_timestamp": "20250228211940",
      "revision_type": "form",
      "file_hash": "2a3b63fabff884365782f5457c68491852cf8f3cbf9a9ca4bfffb1da8f295407",
      "file_nonce": "9d68ebcc6b09d3c854c09efec4f872be85deabe436dbae3baa00d4a176b02167",
      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree",
      "forms_type": "identity_claim",
      "forms_name": "John",
      "forms_surname": "Doe",
      "forms_email": "john.doe@example.com",
      "forms_date_of_birth": "1995-10-15",
      "forms_wallet_address": "0x1234567890abcdef",
      "leaves": [
        "1bea26961b7276cb64c432e67852ec2ce634c20c96192036f6da1fd8adfc9168",
        "ff0edef64dcdf6aafed912534f11d228a88ef6a3f9ef0e5dcd659a131e1a130b",
        "3b5abc4d1a21b05caa891be0650cf25cea133ddb939b1c45a8282bcab686545a",
        "dcb7cfdf2bae4a7e558e58dc9a26bc2627f35f2097c38b3e1493693ed3495239",
        "5122dde9b24bdd39f3eb20f64c18e6a960b6a3320c7cfb7707b8e7de581cc7f2",
        "28d88a09468f136c21475a121b53c626d1c29902a076b7e94c8a77aaa2a45b37",
        "15a1e4c78fa31877be47fa99afee32bd426d6bf74c5297f0d1d706b987c528bd",
        "15df50012dddb9f5b7157aa4dc227b3e1452c19232443ac2b388eeb07a94ec43",
        "74e6c3c9476b3547c42b157edd3a61571fef4b1b109c8a0170fd146008d639d3",
        "d781acf7ba880ecae581ffd8debcb4f5cb430bc2f237e27a6098471a9f7ffa60",
        "43fcaef3dc4b2a2d0550543b638048edcfb710da9276da109a9e011ed1a53ed1",
        "39ccd407bb105ed3be74df4a546d9b10c4f6c80e48b559102b04fa2b29aa83b4"
      ]
    }
```

### 2. Signature Revision

A **Signature Revision** represents a digital signature applied to a file revision. It includes the signature, public key, and wallet address of the signer.

#### Properties:
- **`previous_verification_hash`**: (String) The hash of the previous revision in the chain.
- **`local_timestamp`**: (String) The timestamp of the revision in `YYYYMMDDHHMMSS` format.
- **`revision_type`**: (String) The type of revision, always `"signature"` for this type.
- **`signature`**: (String) The digital signature.
- **`signature_public_key`**: (String) The public key of the signer.
- **`signature_wallet_address`**: (String) The wallet address of the signer.
- **`signature_type`**: (String) The type of signature (e.g., `"ethereum:eip-191"`). 
  This allows for different signature types to be added to Aqua Protocol.
- **`version`**: (String) The schema version and hashing method used.

#### Example:
```json
{
  "previous_verification_hash": "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4",
  "local_timestamp": "20250224154448",
  "revision_type": "signature",
  "signature": "0x799cd8177dc2c5dc34d389601175d550466a73509b71d533aaa3ff0ee958b3b31b574bdfd158a7ad0b186da5f5b440bc18453a6848bc659ccd6de06a09d6ea6e1b",
  "signature_public_key": "0x0380a77a1a6d59be5c10d7ee5e10def79283938bb8a60025d0fe5404e650e8ccc1",
  "signature_wallet_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",
  "signature_type": "ethereum:eip-191",
  "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
}
```

### 3. Witness Revision

A **Witness Revision** represents a record of a witness event, such as a blockchain transaction. It includes metadata about the witness event, such as the transaction hash and network.

#### Properties:
- **`previous_verification_hash`**: (String) The hash of the previous revision in the chain.
- **`local_timestamp`**: (String) The timestamp of the revision in `YYYYMMDDHHMMSS` format.
- **`revision_type`**: (String) The type of revision, always `"witness"` for this type.
- **`version`**: (String) The schema version and hashing method used.
- **`witness_merkle_root`**: (String) The Merkle root of the witness event.
- **`witness_timestamp`**: (Number) The timestamp of the witness event.
- **`witness_network`**: (String) The network where the witness event occurred (e.g., `"sepolia"`).
- **`witness_smart_contract_address`**: (String) The address of the smart contract involved.
- **`witness_transaction_hash`**: (String) The hash of the transaction.
- **`witness_sender_account_address`**: (String) The address of the sender's account.
- **`witness_merkle_proof`**: (Array) An array of Merkle proofs.

#### Example:
```json
{
  "previous_verification_hash": "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",
  "local_timestamp": "20250224154506",
  "revision_type": "witness",
  "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar",
  "witness_merkle_root": "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",
  "witness_timestamp": 1740411910,
  "witness_network": "sepolia",
  "witness_smart_contract_address": "0x45f59310ADD88E6d23ca58A0Fa7A55BEE6d2a611",
  "witness_transaction_hash": "0xad007675d238746783d697ca8cbc0260f87275430d43ba08dea11d26a00e8850",
  "witness_sender_account_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",
  "witness_merkle_proof": [
    "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd"
  ]
}
```

### 4. File Revision

A **File Revision** includes the file's content or reference, hash and nonce.

#### Properties:
- **`previous_verification_hash`**: (String) The hash of the previous revision in the chain.
- **`local_timestamp`**: (String) The timestamp of the revision in `YYYYMMDDHHMMSS` format.
- **`revision_type`**: (String) The type of revision, always `"file"` for this type.
- **`content`**: (String) The content of the file.
- **`file_hash`**: (String) The hash of the file content.
- **`file_nonce`**: (String) A unique nonce associated with the file.
- **`version`**: (String) The schema version and hashing method used.

#### Example:
```json
{
  "previous_verification_hash": "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab",
  "local_timestamp": "20250224154548",
  "revision_type": "file",
  "content": "GNU GENERAL PUBLIC LICENSE...",
  "file_hash": "bd7aec058dde7038fa2e88607ca870bd88da53e6fc32d6c0f8674b59419c061b",
  "file_nonce": "2da1dc9f782e9f489c35cbd01413399f7c8ac14b3deea6c428b2380dbc7af725",
  "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
}
```

## File Index

The `file_index` object maps revision hashes to file names.

#### Example:
```json
{
  "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4": "LICENSE"
}
```

## Tree Structure

The `tree` object represents the hierarchical structure of revisions. Each node contains a `hash` and an array of `children`.

#### Example:
```json
{
  "hash": "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4",
  "children": [
    {
      "hash": "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",
      "children": [
        {
          "hash": "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab",
          "children": [
            {
              "hash": "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3",
              "children": []
            }
          ]
        }
      ]
    }
  ]
}
```

## Tree Mapping

The `treeMapping` object provides paths to specific revisions and identifies the latest revision hash.

#### Properties:
- **`paths`**: (Object) Maps revision hashes to their paths in the tree.
- **`latestHash`**: (String) The hash of the latest revision.

#### Example:
```json
{
  "paths": {
    "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3": [
      "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4",
      "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",
      "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab",
      "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3"
    ]
  },
  "latestHash": "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3"
}
```

## Example

Below is a complete example on how Aquatree looks like


```json
{
  "revisions": {
    "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4": {
      "previous_verification_hash": "",
      "local_timestamp": "20250224154438",
      "revision_type": "file",
      "file_hash": "bd2e8e2a1b3c5d008e1d43ecb11105f42c5ad4e05922bab98981840b636c661e",
      "file_nonce": "65eddd0e16a995170dbef8feaf86a7928678426f20a309bb6627887915c04efb",
      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
    },
    "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd": {
      "previous_verification_hash": "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4",
      "local_timestamp": "20250224154448",
      "revision_type": "signature",
      "signature": "0x799cd8177dc2c5dc34d389601175d550466a73509b71d533aaa3ff0ee958b3b31b574bdfd158a7ad0b186da5f5b440bc18453a6848bc659ccd6de06a09d6ea6e1b",
      "signature_public_key": "0x0380a77a1a6d59be5c10d7ee5e10def79283938bb8a60025d0fe5404e650e8ccc1",
      "signature_wallet_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",
      "signature_type": "ethereum:eip-191",
      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
    },
    "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab": {
      "previous_verification_hash": "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",
      "local_timestamp": "20250224154506",
      "revision_type": "witness",
      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar",
      "witness_merkle_root": "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",
      "witness_timestamp": 1740411910,
      "witness_network": "sepolia",
      "witness_smart_contract_address": "0x45f59310ADD88E6d23ca58A0Fa7A55BEE6d2a611",
      "witness_transaction_hash": "0xad007675d238746783d697ca8cbc0260f87275430d43ba08dea11d26a00e8850",
      "witness_sender_account_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",
      "witness_merkle_proof": [
        "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd"
      ]
    },
    "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3": {
      "previous_verification_hash": "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab",
      "local_timestamp": "20250224154548",
      "revision_type": "file",
      "content": "GNU GENERAL PUBLIC LICENSE...",
      "file_hash": "bd7aec058dde7038fa2e88607ca870bd88da53e6fc32d6c0f8674b59419c061b",
      "file_nonce": "2da1dc9f782e9f489c35cbd01413399f7c8ac14b3deea6c428b2380dbc7af725",
      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
    }
  },
  "file_index": {
    "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4": "LICENSE"
  },
  "treeMapping": {
    "paths": {
      "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3": [
        "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4",
        "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",
        "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab",
        "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3"
      ]
    },
    "latestHash": "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3"
  }
}
```

The above is a comprehensive overview of the schema and its components. 

## Open Todos for the Schema
- Add documentation for linked revisions
- Add documentation for form revisions
