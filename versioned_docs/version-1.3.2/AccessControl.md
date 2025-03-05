---
title: "Access Control"
---

# Access Control

This document specifies the access control mechanisms in version 3 of the Aqua Protocol, leveraging portable hash-chains (Aqua-Chains) to manage permissions and enforce secure data exchange. Access control is facilitated through structured revisions within Aqua-Chains, enabling authoritative users to grant or negotiate access to resources using cryptographic signatures and optional bilateral agreements.

The examples below illustrate two primary access control scenarios: unilateral access grants and bilateral access agreements requiring receiver acknowledgment. These use Ethereum-based signatures and SHA256 hashing, with optional timestamping on the Ethereum blockchain for trust.

Context: Prototype for Fire-Wall like systems where prototyped in version 1.2 of the protocol, see https://github.com/inblockio/aqua-guardian

---

## Unilateral Access Grant

### Overview
A unilateral access grant allows an authoritative user to permit another party to access a specific resource without requiring additional acknowledgment. The sender must be an authoritative user within the context where the access is interpreted.

### Input JSON for Access Grant
The input is a JSON form submitted to create an AquaTree revision.

```
{
    "type": "access",
    "sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
    "receiver": "0x556f9d33Ac143718861bf23C918b50D32ff09F2f",
    "resource": "0x98b736ef2dcdd0402f32748c4312b3226b24be8b8757ccd50b818991f98f93ad"
}
```

- **`type`**: Specifies the form type as an access grant.
- **`sender`**: Ethereum wallet address of the authoritative user granting access.
- **`receiver`**: Ethereum wallet address of the recipient granted access.
- **`resource`**: Verification hash of the Aqua-Chain revision representing the resource (e.g., a file or dataset).

### Resulting Aqua-Chain Revision Datastructure
The access grant is encoded into an AquaTree with two revisions: a form revision and a signature revision. The signature verifies the sender’s authority.

```
{
    "0x78daea3f7a0e2a5699489bbdcb205fb829deed50d92883e2cff5204e5684c8fb": {
        "previous_verification_hash": "",
        "local_timestamp": "20250305204539",
        "revision_type": "form",
        "file_hash": "625110fe1d0c45174728fa6761029e8790b4323aa98a0aa73203f6e0161bdf85",
        "file_nonce": "18ac9ab5e9c06d73441aa3bdf76461312a8acb0e29da8e3ac6d263b46b1a0948",
        "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree",
        "forms_type": "access",
        "forms_sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
        "forms_receiver": "0x556f9d33Ac143718861bf23C918b50D32ff09F2f",
        "forms_resource": "0x98b736ef2dcdd0402f32748c4312b3226b24be8b8757ccd50b818991f98f93ad",
        "leaves": [
            "0ce8e015983856b9aa4bf1b981d4c1190cb3d75e8e672d939acbd99863803fd0",
            "a1cc6e765d9443175ba32a450a04106a78391dbc036f8c437bf801744e4db417",
            "a93ec79a8b62a91db5927c6b8d231284e3d018527769b21d71d555efbf390dde",
            "aa0fb1f2bd8c5ee3169f03983d1c8d4ae50d48898282344ffb2a01ed0a0ce0eb",
            "6e44f260490db970aa88fc21969f9018efb09b68e2e105765740fde4c82fff8e",
            "0f7937d986689f822e4a296e2832195c19b119f2bb33ed3d01238e7da270fce0",
            "356f5f23ac38ad9b94a9f962baee07cadd9212207541b538e19511b096bcf846",
            "d781acf7ba880ecae581ffd8debcb4f5cb430bc2f237e27a6098471a9f7ffa60",
            "43fcaef3dc4b2a2d0550543b638048edcfb710da9276da109a9e011ed1a53ed1",
            "39ccd407bb105ed3be74df4a546d9b10c4f6c80e48b559102b04fa2b29aa83b4"
        ]
    },
    "0x2b4510a35f731af92fb2fde4dd78d5e325e174f84fb56123c973eaa6b3c57cd0": {
        "previous_verification_hash": "0x78daea3f7a0e2a5699489bbdcb205fb829deed50d92883e2cff5204e5684c8fb",
        "local_timestamp": "20250305204619",
        "revision_type": "signature",
        "signature": "0xa8c1b94521428454c96446523719a5a1795ec187e845efe7df5ce1c44dc99ca54d2813eed5e24fd4898bb8e5015fcc1f2df80c3d1b928dd7541b6f82011e419c1c",
        "signature_public_key": "0x03b6ff4b0c45ce230eb48499614538ca7daa43000395e694ac92eaa1e4b805df8a",
        "signature_wallet_address": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
        "signature_type": "ethereum:eip-191",
        "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
    }
}
```

### Enforcement
The protocol requires:
1. Verification of the signature using the sender’s public key.
2. Confirmation that the sender is an authoritative user within the domain managing the resource.
3. Permission granted to the receiver to access the resource identified by `forms_resource`.

---

## Bilateral Access Agreement

### Overview
A bilateral access agreement requires both the sender and receiver to sign an Aqua-Chain, formalizing conditions for data sharing. The receiver’s signature acknowledges the conditions, and the resource is shared only after both signatures are present.

### Input JSON for Access Agreement
The input includes conditions that the receiver must acknowledge.

```
{
    "type": "access_agreement",
    "sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
    "receiver": "0xa2026582B94FEb9124231fbF7b052c39218954C2",
    "resource": "0x98b736ef2dcdd0402f32748c4312b3226b24be8b8757ccd50b818991f98f93ad",
    "conditions": "With signing this access agreement, the receiver agrees to use the resource solely for non-commercial purposes and not to redistribute it without prior consent."
}
```

- **`conditions`**: Human-readable and machine-enforceable terms of use

### Resulting Aqua-Chain Revision Datastructure
The agreement comprises three revisions: the form, the sender’s signature, and the receiver’s signature.

```
{
    "revisions": {
        "0xb9bc2f140ae99258eb350aca87f5de0f26f2204fd4dc143683b1d1497f87e6f9": {
            "previous_verification_hash": "",
            "local_timestamp": "20250305205355",
            "revision_type": "form",
            "file_hash": "78cbba02860c4e7f376f1b0544b747f1b3e3127d9f3712d2ec98c7fa03ed2e90",
            "file_nonce": "42f43925d31bfdd26ac339c272a547c5d217d5d35ab87f4d337f5be7ce8cff94",
            "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree",
            "forms_type": "access_agreement",
            "forms_sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
            "forms_receiver": "0xa2026582B94FEb9124231fbF7b052c39218954C2",
            "forms_resource": "0x98b736ef2dcdd0402f32748c4312b3226b24be8b8757ccd50b818991f98f93ad",
            "forms_conditions": "With signing this access agreement, the receiver agrees to use the resource solely for non-commercial purposes and not to redistribute it without prior consent.",
            "leaves": [
                "d19b134d9445113182f49cb00bdbe1c26876bd05e64155120825530bd799fca8",
                "b58f63b8c75ce58b2344b821f5374bd981480e0a12d8fc7135395d3b9ce7501c",
                "cf42137b5cf6ae8ddd4b46d6a69abbe4fb6808b82a519b999cf8b3e708a650ec",
                "64d1e018b19bf2d17f37a214d090fd307b5fea9be326a4d76ad48de5cb26fea2",
                "aa0fb1f2bd8c5ee3169f03983d1c8d4ae50d48898282344ffb2a01ed0a0ce0eb",
                "6e44f260490db970aa88fc21969f9018efb09b68e2e105765740fde4c82fff8e",
                "91016c1a2a26b2dbab249bf4760062136aa89326028afaf8a69193749f80484f",
                "7eb6a8beb0f74cb11e14eeff9ec4d70bafe4cc5739824d5d147580403a8ea466",
                "d781acf7ba880ecae581ffd8debcb4f5cb430bc2f237e27a6098471a9f7ffa60",
                "43fcaef3dc4b2a2d0550543b638048edcfb710da9276da109a9e011ed1a53ed1"
            ]
        },
        "0x04e5c695969ab0634e337c9cfc920a6c3d0a8b06f6480daf36ae74a4e6193b56": {
            "previous_verification_hash": "0xb9bc2f140ae99258eb350aca87f5de0f26f2204fd4dc143683b1d1497f87e6f9",
            "local_timestamp": "20250305205405",
            "revision_type": "signature",
            "signature": "0x6771333580642308cb18b27869d751e723d6e5a8328e2b5c1a6cb35a0a5d841536817d4b40301d8830a877f55f1869a222380df3432176e76959827811859acc1c",
            "signature_public_key": "0x03b6ff4b0c45ce230eb48499614538ca7daa43000395e694ac92eaa1e4b805df8a",
            "signature_wallet_address": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
            "signature_type": "ethereum:eip-191",
            "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
        },
        "0x84cf1e09c51911599d4c2a9e5ad6390027b82f397db929a5468c1cc9b9815119": {
            "previous_verification_hash": "0x04e5c695969ab0634e337c9cfc920a6c3d0a8b06f6480daf36ae74a4e6193b56",
            "local_timestamp": "20250305205420",
            "revision_type": "signature",
            "signature": "0xba380c0b07cbcdaefd258cc3bdb21a3f31993a54d9e991ba0b9953e62767f5cc53b03f659dc80466dd9a00e83920fa0eeffa43921a6f5a387e44155547b58f311c",
            "signature_public_key": "0x041518581af65749b3ddc69889df3e5d229bc8ad79279a07ddeb368ade5e1592368c5ff3b69143d7a1e7cf64f7d0774a6724e6eaf138d318d07ddc30f6081ca89a",
            "signature_wallet_address": "0xa2026582B94FEb9124231fbF7b052c39218954C2",
            "signature_type": "ethereum:eip-191",
            "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
        }
    }
}
```

#### Key Fields:
- **`forms_conditions`**: Specifies enforceable terms, stored as part of the Aqua-Chain.
- **`signature`**: Two signatures are required:
  - Sender’s signature authorizes the agreement.
  - Receiver’s signature acknowledges the conditions.

### Enforcement Workflow
The protocol requires:
1. **Sender Initiation**: The sender creates and signs the agreement (revisions 1 and 2).
2. **Receiver Acknowledgment**: The receiver signs the agreement (revision 3).
3. **Validation**: The fully signed Aqua-Chain is verified, ensuring both signatures are valid.
Additional checks: Signature must be authoritative in the context of the sender. Signature of the receiver must be from the account defined by the sender.
4. **Resource Sharing**: The resource is shared with the receiver only after both signatures are confirmed. An option is to share any revision before the referrenced revision to provide verifiable history. Another option could be to define optional policies to allow e.g. access to future revisions (updates) to the AquaTree.

