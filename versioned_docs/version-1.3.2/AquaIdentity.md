---
title: AquaIdentity
---

# Aqua Identity

**Aqua Identity** leverages the Aqua Protocol to deliver trusted identity claims and attestations within a secure, decentralized framework. Operating as a layer-two application, it builds upon the foundational verifications completed at layer one, ensuring a robust and reliable identity management system. For an Aqua Identity to be considered valid, all prerequisite atomic and relational verification checks must be successfully completed prior to its issuance. **Atomic verification** refers to the validation of a single revision’s content, ensuring all required checks (e.g., data integrity, format compliance) are met. **Relational verification** examines the relationships between revisions, confirming plausibility of timestamps, consistency of revision hashes (e.g., matching the expected `previous_verification_hash`), and availability of linked resources.

## Self-Authenticated Identity Claims

Self-authenticated identity claims form the cornerstone of the Aqua Identity system. These claims originate from individuals asserting their own identity attributes, serving as the initial step in establishing a verifiable identity.

### Verification Conditions
To ensure the validity of a self-authenticated identity claim, the following conditions must be met:
- **Signature Requirement**: The claim MUST be cryptographically signed by the issuer, who is the owner of the associated wallet.
- **Ownership Restriction**: Only the wallet owner is authorized to issue claims pertaining to that wallet, ensuring authenticity and accountability.

## Example: Self-Authenticated Identity Claim

Below is an example of a self-authenticated identity claim represented as a JSON dictionary, encapsulating key personal attributes:

```
{
    "type": "identity_claim",
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "date_of_birth": "1995-10-15",
    "wallet_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50"
}
```

This JSON structure is encapsulated within an **Aqua revision** of type `"form"`, utilizing a tree-based verification structure. The tree structure enables **selective disclosure**, allowing the claimant to remove values from specific keys before sharing with third parties, without compromising the ability to verify the remaining fields. This ensures privacy while maintaining the integrity of the claim’s data structure.

### Aqua Revision Example
The following demonstrates how the identity claim is wrapped into an Aqua revision, including a signature for authentication:

```
{
    "revisions": {
        "0x5721891d757ee81ab3cd00442293f3808a99e676d2d1bda03cda26bae23daed1": {
            "previous_verification_hash": "",
            "local_timestamp": "20250228083859",
            "revision_type": "form",
            "file_hash": "e193009bf33316803481ad0dd2aea14ccf489ca261fa403c96f8e054d5ea4659",
            "file_nonce": "74a3389590e9af459113ad629ec5682b73747291b840e39226b58054a475d3ef",
            "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree",
            "forms_type": "identity_claim",
            "forms_name": "John",
            "forms_surname": "Doe",
            "forms_email": "john.doe@example.com",
            "forms_date_of_birth": "1995-10-15",
            "forms_wallet_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",
            "leaves": [
                "a30b33749a68fb367b267f2f8b44d53a1bfe3aba94b265df98f812a2db1ac60d",
                "f7f02d3b6bd597c63b423a0bb682e77c9b42b1c27ef777bad47259eaa6d5a45f",
                "3b5abc4d1a21b05caa891be0650cf25cea133ddb939b1c45a8282bcab686545a",
                "dcb7cfdf2bae4a7e558e58dc9a26bc2627f35f2097c38b3e1493693ed3495239",
                "5122dde9b24bdd39f3eb20f64c18e6a960b6a3320c7cfb7707b8e7de581cc7f2",
                "28d88a09468f136c21475a121b53c626d1c29902a076b7e94c8a77aaa2a45b37",
                "15a1e4c78fa31877be47fa99afee32bd426d6bf74c5297f0d1d706b987c528bd",
                "b95b4f6e034884da002c503e2753b4b93c5a9d07a0d9ee13576f0bace9c4649b",
                "78d7f2378e5160fd5d5e52065467c8c444f20b75e03e0b0d564ee6dc9b7fa7dd",
                "d781acf7ba880ecae581ffd8debcb4f5cb430bc2f237e27a6098471a9f7ffa60",
                "43fcaef3dc4b2a2d0550543b638048edcfb710da9276da109a9e011ed1a53ed1",
                "39ccd407bb105ed3be74df4a546d9b10c4f6c80e48b559102b04fa2b29aa83b4"
            ]
        },
        "0xe5ee04bc1eb8365d8c609cc6afa4dc9c003dd6cd0538797ba458d58a660aedf8": {
            "previous_verification_hash": "0x5721891d757ee81ab3cd00442293f3808a99e676d2d1bda03cda26bae23daed1",
            "local_timestamp": "20250228084213",
            "revision_type": "signature",
            "signature": "0x8a3055c71bc3fb705add8a82c88e6d7f909a1f53415e1172da66a7d807c517004b84b6df8f8e86d764bb49629ec9d5a34075a959799f9153fb1af0f246d4c2fe1b",
            "signature_public_key": "0x0380a77a1a6d59be5c10d7ee5e10def79283938bb8a60025d0fe5404e650e8ccc1",
            "signature_wallet_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",
            "signature_type": "ethereum:eip-191",
            "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
        }
    }
}
```

This example illustrates a fully formed identity claim with multiple attributes, cryptographically signed to ensure authenticity and integrity.

## Attestations

Attestations enhance the trustworthiness of self-authenticated identity claims by introducing third-party validation. An attestation is issued by an attester who verifies the accuracy of the claim’s attributes against a reliable source, such as a government-issued ID.

### Example: Attestation Input JSON
Below is an example of the input JSON for an attestation within an Aqua form revision:

```
{
    "type": "identity_attestation",
    "identity_claim_id": "0x5721891d757ee81ab3cd00442293f3808a99e676d2d1bda03cda26bae23daed1",
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "date_of_birth": "1995-10-15",
    "context": "I verified the attributes against a government-issued ID. I hereby attest that the above information is true and correct to the best of my knowledge.",
    "wallet_address": "0x6b2f22390c318107e95c58c90a66afaf7ef06853"
}
```

### Verification Conditions
For an attestation to be valid, it MUST satisfy the following requirements:
- **`forms_type`**: Must be set to `"identity_attestation"`.
- **`forms_identity_claim_id`**: Must reference the revision hash of the associated identity claim.
- **`forms_wallet_address`**: Must correspond to the wallet address of the attester.
- **`forms_context`**: Optional but recommended field providing additional context about the attestation process (e.g., verification method or source), enhancing transparency and trust.
- **Attribute Overlap**: Must include at least one attribute with an identical key-value pair to the referenced identity claim, ensuring consistency.

### Aqua Revision for Attestation
The attestation is formalized within an Aqua revision, including both the form and its cryptographic signature:

```
{
    "revisions": {
        "0xcd5acfd60283091769c765b05add4fe7bfc6471174264af523de96305d367e46": {
            "previous_verification_hash": "",
            "local_timestamp": "20250228100501",
            "revision_type": "form",
            "file_hash": "2a8f574fa444958c2acfa5ce9652cbe26e3c38271cb130280682a119050565cc",
            "file_nonce": "4d5be0fffe4ea48a214f93cdc5da3933c252569a6e2d5e557346015219ab4921",
            "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree",
            "forms_type": "identity_attestation",
            "forms_identity_claim_id": "0x5721891d757ee81ab3cd00442293f3808a99e676d2d1bda03cda26bae23daed1",
            "forms_name": "John",
            "forms_surname": "Doe",
            "forms_email": "john.doe@example.com",
            "forms_date_of_birth": "1995-10-15",
            "forms_context": "I hereby attest that the above information is true and correct to the best of my knowledge.",
            "forms_wallet_address": "0x6b2f22390c318107e95c58c90a66afaf7ef06853",
            "leaves": [
                "80f38992d148b666addfdee7678aa8b6e6b6babb6b088d58d19e85135c5cd92f",
                "fadc2c5b6793a43ac3e0c5920b56bbd0cc3dac56fc60b45091a8671e884cbec9",
                "5890fbf208e5503532c9d4f1cf97cd78d993b42d023187ac02cdc4298a01a197",
                "3b5abc4d1a21b05caa891be0650cf25cea133ddb939b1c45a8282bcab686545a",
                "dcb7cfdf2bae4a7e558e58dc9a26bc2627f35f2097c38b3e1493693ed3495239",
                "a37e968e97736a195db0ca44538174984e34fc10b68aa6d351386ccf8b87470f",
                "5122dde9b24bdd39f3eb20f64c18e6a960b6a3320c7cfb7707b8e7de581cc7f2",
                "28d88a09468f136c21475a121b53c626d1c29902a076b7e94c8a77aaa2a45b37",
                "724b53a739396244b394d8ea53afb014de7c99eb243f5d6d574d154a02c9ba5f",
                "21e21d483289413fac72228b2005deddc3155cc4850059303f084a05368c4e57",
                "02f64008e4005ffc43c0270e32e4b3c1c1c8075793aea167923960c59a4300c2",
                "d781acf7ba880ecae581ffd8debcb4f5cb430bc2f237e27a6098471a9f7ffa60",
                "43fcaef3dc4b2a2d0550543b638048edcfb710da9276da109a9e011ed1a53ed1",
                "39ccd407bb105ed3be74df4a546d9b10c4f6c80e48b559102b04fa2b29aa83b4"
            ]
        },
        "0x7be476f6c305187b2410cfff0df8e6eeb4ba53a25b3e389231085d4934c68aec": {
            "previous_verification_hash": "0xcd5acfd60283091769c765b05add4fe7bfc6471174264af523de96305d367e46",
            "local_timestamp": "20250228100743",
            "revision_type": "signature",
            "signature": "0xb2b51810d7134f969fb48736e6f390d3eadac3b1e9adb5b8ef54c600ae77826971d64a74e01dd0bc1e2a18911ea1e8350733b3f7676866653ae8f0e7645fb7a51b",
            "signature_public_key": "0x02b027a2f4592f83c1301c1e6629f648a953d791d7c7059b1c46a6a24d9101f4c9",
            "signature_wallet_address": "0x6b2f22390c318107e95c58c90a66afaf7ef06853",
            "signature_type": "ethereum:eip-191",
            "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
        }
    }
}
```

Attesters play a critical role in the Aqua Identity ecosystem, validating self-authenticated claims to enhance their credibility and utility.

## Example Project

For a practical implementation, refer to the open-source project:

[**Aqua Identity on GitHub**](https://github.com/inblockio/aqua-identity)
