---
title: "Schema"
menu:
  main:
    weight: 10
---

Below is the documentation for the schema based on the provided JSON content. It outlines the four types of revisions (`file`, `content`, `signature`, and `witness`) and their respective properties.

---

# Schema Documentation

This schema defines a structure for managing revisions of a file, including its content, signatures, and witness records. Each revision is uniquely identified by a hash and contains metadata specific to its type.

---

## Revisions

The `revisions` object contains all revisions, each identified by a unique hash. There are four types of revisions:

1. **File Revision**
2. **Signature Revision**
3. **Witness Revision**
4. **Content Revision**

Each revision type has specific properties, as described below.

---

### 1. File Revision

A **File Revision** represents the initial or updated state of a file. It includes metadata about the file and its hash.

#### Properties:
- **`previous_verification_hash`**: (String) The hash of the previous revision in the chain. Empty for the first revision.
- **`local_timestamp`**: (String) The timestamp of the revision in `YYYYMMDDHHMMSS` format.
- **`revision_type`**: (String) The type of revision, always `"file"` for this type.
- **`file_hash`**: (String) The hash of the file content.
- **`file_nonce`**: (String) A unique nonce associated with the file.
- **`version`**: (String) The schema version and hashing method used.

#### Example:
```json
{
  "previous_verification_hash": "",
  "local_timestamp": "20250224154438",
  "revision_type": "file",
  "file_hash": "bd2e8e2a1b3c5d008e1d43ecb11105f42c5ad4e05922bab98981840b636c661e",
  "file_nonce": "65eddd0e16a995170dbef8feaf86a7928678426f20a309bb6627887915c04efb",
  "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar"
}
```

---

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
  "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar"
}
```

---

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
  "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar",
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

---

### 4. Content Revision

A **Content Revision** represents the actual content of a file. It includes the file's content, hash, and nonce.

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
  "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar"
}
```

---

## File Index

The `file_index` object maps revision hashes to file names.

#### Example:
```json
{
  "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4": "LICENSE"
}
```

---

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

---

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

---

This documentation provides a comprehensive overview of the schema and its components. 