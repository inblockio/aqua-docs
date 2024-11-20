# Aqua Protocol Version v1.3
(Writing in process, unfinished Nov. 10th, 2024)
This is a developer documentation.

The Aqua Protocol (AQP) is a data accountability and exchange protocol between hosts in peer-to-peer environments. The AQP is used to realize the goal of accounting for data origin and history (data provenance). Short: A verifiable linkable data structure to attest and certify data.

Issues for improving the protocol are tracked here: https://github.com/inblockio/aqua-improvement-proposal

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

Example:

1. Content-Revision


```
{
  "revisions": {
    "0xb576b6920e9bbb3e76d69b76e5b86f60590df43e9407d7d1b359cb8e2db00ce44d4c0741cbd1ca0f1a3605d3b2b56b58c412b2040743e12a1488de519e365587": {
      "previous_verification_hash": "",
      "domain_id": "5e5a1ec586",
      "nonce: 4231256454123",
      "local_timestamp": "20241105093856",
      "revision_type": "content",
      "content": "MIT License\n\nCopyright (c) 2024 inblock.io\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n",
      "leaves": [
        "da5385762bb4cd5e2fbc76861cceeb7fb5e7d5f3181e0e36997146c65a31fb7c363221759f77c2ed468f8874da81ec2467fa363243c71b90f94e2734db0134c1",
        "8f68acdd2ccbe8f0088d78438a411af9fcde4259f85a7ff28a0cd4f543ca3b139e24282d39170fe446526f015d5e227eafaead6e73a91f7e3df73b5e3e6a02fb",
        "78501ae4b82221563c51de71890ac8bad9d7bc608d8a094a512408785b4f39b3d3b8cea2a292326735ee19918a8c4919711d59661f4923117db8d2eaa2516e80",
        "4c6cabd6d78399bc0bc6bcd255e4a08576e9b0204a4f03ff83a328a065c076e327aaaa503bbc840636ccbf62d7b577b3db010b6775b4576be3fc30a068df70f1",
        "52e56bad6857482a1c56a0b52f577e2b513873573d15a48eee310b4c3f7efdee430945935ace2acbbe0fe3cf5ff914a9b6d0c9622453365203a7f55eefdf9771"
      ]
    }
```
2. Signature-Revision example (Ethereum Wallet)
```
    "0x25bc631dc35efd51f1a43e886097c5809e633cfbe5448c5a1ca973be20a10f2dcbab0939e66b752aa84191f6705591615e1a3cacb4d28eef824267fd9dc19064": {
      "previous_verification_hash": "0xb576b6920e9bbb3e76d69b76e5b86f60590df43e9407d7d1b359cb8e2db00ce44d4c0741cbd1ca0f1a3605d3b2b56b58c412b2040743e12a1488de519e365587",
      "domain_id": "5e5a1ec586",
      "local_timestamp": "20241105093856",
      "revision_type": "signature",
      "signature": "0x222d6a0c4024d50c5165f30125f64969a98af9f75cbe2b6a9798b5cd637714b60c7d7caf236afe773ce3879ede9a3dc95895dce60f6227a282a30cc116a56d681c",
      "signature_public_key": "0x03b6ff4b0c45ce230eb48499614538ca7daa43000395e694ac92eaa1e4b805df8a",
      "signature_wallet_address": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
      "signature_type": "Ethereum",
      "leaves": [
        "8f68acdd2ccbe8f0088d78438a411af9fcde4259f85a7ff28a0cd4f543ca3b139e24282d39170fe446526f015d5e227eafaead6e73a91f7e3df73b5e3e6a02fb",
        "78501ae4b82221563c51de71890ac8bad9d7bc608d8a094a512408785b4f39b3d3b8cea2a292326735ee19918a8c4919711d59661f4923117db8d2eaa2516e80",
        "eab2e00fd4ca01067827148e7df80aab6813eb5b26023c117f6ab66b1db2da6a9704eb80f87e28aa5ab4ab025285764f1f3f81f0ee2e51602163bbfa25ff48ac",
        "ed97cc41ef70162c0c3ca5b7f1bd88d9f3f3c249a3a9444376417d6cb9deb834f22890e25abb4fac8577e3d65e0e949f7224c11d5f549ad127c09d3b8dfa2df2",
        "9b03a873f0dff741aab24307681728c586c1dcff4df6b194d09c6b239b572d00406e2d7390a541f70e083ca99414b3879f8c92ab231e6bdebe0612a24fabce3f",
        "6ce0a5ba3573bb0d4650f912828af0f843856d0d67762cc647b65577eee5cf17c04ffb42472d71d53e5f228a6f581e6932cd671c0a505cf9e1f847b6eb01527d",
        "02d2b681147691fbe0b98d3d8bfb67e2da13694d7e9e2c953a96ef9ea942237127efa787b8ca9f8c0253574586171683bfacec5613b9950bd440c49cf5faedf6",
        "026bfe6061bbc69a805f5f9aeaa2d5c251fbd7a59602eafc1204542c37264700e3f45f79f972748f8424dfc5b0298273990638a4f11b143d11fd0483da7ad7c1"
      ]
    }
  }
}
```

3. Signature-Revision example (DID Example)
```
 "0x894ac8cfbaf9fb75aae916c3693928e7d41264e1a85d7089f0cf4bb46963c9626808d26c54709d8458c0d0a07b7c4c619bbb714884854a19195719cb36aafdb3": {
      "previous_verification_hash": "0x25bc631dc35efd51f1a43e886097c5809e633cfbe5448c5a1ca973be20a10f2dcbab0939e66b752aa84191f6705591615e1a3cacb4d28eef824267fd9dc19064",
      "domain_id": "5e5a1ec586",
      "local_timestamp": "20241105093856",
      "revision_type": "signature",
      "signature": {
        "payload": "eyJtZXNzYWdlIjoiSSBzaWduIHRoZSBmb2xsb3dpbmcgcGFnZSB2ZXJpZmljYXRpb25faGFzaDogWzB4MHgyNWJjNjMxZGMzNWVmZDUxZjFhNDNlODg2MDk3YzU4MDllNjMzY2ZiZTU0NDhjNWExY2E5NzNiZTIwYTEwZjJkY2JhYjA5MzllNjZiNzUyYWE4NDE5MWY2NzA1NTkxNjE1ZTFhM2NhY2I0ZDI4ZWVmODI0MjY3ZmQ5ZGMxOTA2NF0ifQ",
        "signatures": [
          {
            "protected": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa24xd01panVGdzVkZEE3SmN5dmdVa0tpZDhXaDN3WW5Cc1hXa2FUVVJrTWRMI3o2TWtuMXdNaWp1Rnc1ZGRBN0pjeXZnVWtLaWQ4V2gzd1luQnNYV2thVFVSa01kTCJ9",
            "signature": "h-OBw7eHVVNkgprtcEVD9GVu5_NgiLXzdshcyWXjdrJxljSdlu6yY9trrXBAuXcUXrxUuU-KWAR_eMTOq2-dCw"
          }
        ]
      },
      "signature_public_key": "did:key:z6Mkn1wMijuFw5ddA7JcyvgUkKid8Wh3wYnBsXWkaTURkMdL",
      "signature_wallet_address": "did:key:z6Mkn1wMijuFw5ddA7JcyvgUkKid8Wh3wYnBsXWkaTURkMdL",
      "signature_type": "did:key",
      "leaves": [
        "8f68acdd2ccbe8f0088d78438a411af9fcde4259f85a7ff28a0cd4f543ca3b139e24282d39170fe446526f015d5e227eafaead6e73a91f7e3df73b5e3e6a02fb",
        "78501ae4b82221563c51de71890ac8bad9d7bc608d8a094a512408785b4f39b3d3b8cea2a292326735ee19918a8c4919711d59661f4923117db8d2eaa2516e80",
        "d1bae393048ec8a35eacb290e538cc9575b616ee99e59af86585b36fe70541d8395d511a18f7cf31020f85a36b092784da29c4afb7ff641a541e342514b0a1c2",
        "ed97cc41ef70162c0c3ca5b7f1bd88d9f3f3c249a3a9444376417d6cb9deb834f22890e25abb4fac8577e3d65e0e949f7224c11d5f549ad127c09d3b8dfa2df2",
        "8a2a10de17eeed57fc11b8b277c9104cb4d0e1d4b919d07cf678401c80687c90b31cfbd6c35cb5590b7b02fdb7da0def97f0efdb8553f7fabcf6172a0c5fab5f",
        "9744c7f71cc7062d1fca9b2b39a6f6b91a53ead1fe4db788a4bf33d21f0509cd04ce7d9e04aa01f6dfe952524649895c807fe21984e5d7826f5d12228b9219b3",
        "94cccc4616e78a77cef476e299d75dab406c129cc28290d8779466fd4ab9364056521ca5356dcee82198dddb080ede7ec9dc210bc61c4deea9a5b439aaaf8cfc",
        "646b45aba43fdb8f083c7a7b652dcfa4279f81afcc532736bbac8b29da690d3ea922bad14565d80974a0fb05123ffdb952a2708bedd1ad58f7c6bcb72ec90006"
      ]
    }
  }
}
```

4. A) Witness-Revision example Ethereum (non-aggregated)


4. B) Witness_Revision example timestamping authority (TSA_RFC3161)
The witness_transaction_hash contains the server certificate chain.
```
"0x0487556a32b8ba92cd579ace7062027e779295960eeb8ca7ac3908e3f379ae551953ae7bfb121f030d1f29b81dcf3dc955aebf992bcfbaee3f08487ab00416b7": {
      "previous_verification_hash": "0x894ac8cfbaf9fb75aae916c3693928e7d41264e1a85d7089f0cf4bb46963c9626808d26c54709d8458c0d0a07b7c4c619bbb714884854a19195719cb36aafdb3",
      "domain_id": "5e5a1ec586",
      "local_timestamp": "20241105093856",
      "revision_type": "witness",
      "witness_merkle_root": "0x894ac8cfbaf9fb75aae916c3693928e7d41264e1a85d7089f0cf4bb46963c9626808d26c54709d8458c0d0a07b7c4c619bbb714884854a19195719cb36aafdb3",
      "witness_timestamp": 1730802112,
      "witness_network": "TSA_RFC3161",
      "witness_smart_contract_address": "http://timestamp.digicert.com",
      "witness_transaction_hash": "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",
      "witness_sender_account_address": "DigiCert",
      "witness_merkle_proof": "[{\"depth\":\"0\",\"left_leaf\":\"0x894ac8cfbaf9fb75aae916c3693928e7d41264e1a85d7089f0cf4bb46963c9626808d26c54709d8458c0d0a07b7c4c619bbb714884854a19195719cb36aafdb3\",\"right_leaf\":null,\"successor\":\"0x894ac8cfbaf9fb75aae916c3693928e7d41264e1a85d7089f0cf4bb46963c9626808d26c54709d8458c0d0a07b7c4c619bbb714884854a19195719cb36aafdb3\"}]",
      "leaves": [
        "8f68acdd2ccbe8f0088d78438a411af9fcde4259f85a7ff28a0cd4f543ca3b139e24282d39170fe446526f015d5e227eafaead6e73a91f7e3df73b5e3e6a02fb",
        "78501ae4b82221563c51de71890ac8bad9d7bc608d8a094a512408785b4f39b3d3b8cea2a292326735ee19918a8c4919711d59661f4923117db8d2eaa2516e80",
        "f90837f8515c0def443cb512ee9dfaf8919722467d4019aaf63c13603600903202e8bf21304de25caafc61925b96e024c77c8f0e3223f00c724f524a12cebe95",
        "13aa6a0a8800b4d8adeea104f8328bb1b5035276e2522a561c48d3db628263e26093426b35626dbd43b8198a15c6b017609d9fe4f9506f167a7997f80fd71859",
        "9df7e7c5741d4373d29f576f3b0e894dacc4feda2cbed0b165a89c7ed3997f29482a5ac1f3f95ed34be0690b53f41d687334e132e80041563b15442380033a01",
        "065c9da00b8c0e1d6f165ec946431b88f3a0d5764f9d3d3a5994a095122c81da3d0f3719d1ef712adf47effcea88ea1a2c7e6dbea7d71f0ae70ec388ed646995",
        "a2ad3cedcedf8c9ae6ebbb0adde1863bf45247dcc51c14edea7fe4524b06f8ea7cba97f6da77641b537384bae53fa042bb43e377a2e98e71158c99e78185c6b3",
        "41bb7271d1596fa17fa5ffcec141eb787d56c79c897ecc6cc83cda650171988e5cfd04e9b878f57d5bcc6f1054cd6162d271d06635b43011ad6785d6f0536b6e",
        "6fe1ebd64bfcefda3b61ad5db9b450013e998b511384a9b671fe4c8809fe1f9868a5669bb6211e14346c8af55a41abd02994c73c52ced299d7e23fccd8a4cb13",
        "e875b9b6fb0e609b72c6e303701abc3035e160ac541f0b7d542e8f1c354f957fb1d09518e02c6600d9b7e4e4a2591e7754cb60c4869153751bd49e231cdeb1ee",
        "078df46bfe5b9db36854c62a053fc68c80a074ce9c13aef0f22e41f266583f1558a37bf56ec2346e34ac125a7aded5534d9506e624774680f128c817770d0370"
      ]
    }
  }
```
# Drafts

5. Linkage

Restriction: The linked resource MUST be an Aqua-Chain or MAY contain content addressed files (BitTorrent, IPFS, Swarm, any content that is verifiable by hash).

url: path to ressource
remote expect-aqua-chain: boolean
  expect type: aqua-chain / bittorrent / ipfs - the type of the linked resources.
  require-in-depth-verification: if false, in depth verification will only draw a warning for not verifing or not be able to load the resource, if true, it will cause a critical verification error.

* load and hash ressource (pull in with copy, pull in without copy). Restriction: only single files allowed. Possible to embedd remote content.
{
  "revision_type": "link (when linking to other aqua-chain) / reference (when referencing an external source)",
  "expect type": "aqua / bittorent / ipfs"
  "required-indepth-verification: "true / false",
  "verification-hash": "078df46bfe5b9db36854c62a053fc68c80a074ce9c13aef0f22e41f266583f1558a37bf56ec2346e34ac125a7aded5534d9506e624774680f128c817770d0370",
  "url": "FQDN/path: full network-path to ressource / local: ABSOLUTE or RELATIVE path to the aquafier directly
}

Requirements:
* Remote data needs to be verifiable (stateful)
* This means the ressource must be loadable to hash it for verification
 
* Aqua chains MAY support various content addressed storage solutions including: BitTorrent, IPFS, Swarm, any content that is verifiable by hash, these are specifc link types
* Content revisions MUST indicate if its an internal or externally tracked file object
* MIME type of the file  (?)
* Filepath + SHA3 Hash

How to load external resources / Summery: "how to draw the world in":

* Verifier has its own content storage to store resources which have been loaded for verification.
* This content storage is content hashed (which means same files are not stored files)
* If content references an externally linked file, then the file is loaded and stored when verifying the aqua-chain
* A file is always looked up in the local content storage first by hash, before its loaded from the URL

Object which is referenced needs to be persistant and verifiable.
Verifiable ressources must be: available (available), hashed, type defined

Discussion:
* Using JSON-LD https://json-ld.org/ ?
* No, to many aspects which are not needed, Aqua chain focuses on verifiability

# Backlog

Future capabilities:

Content links with external file tracking (and specific tools to interact):
6. Bit-Torrent file support (public files) referencing only the magnet link with the data requered for a torrent tool to load the data.
7. Git-File support to track a repository.
8. Generlised external-file-storage integration (write basic own implementation).
9. X-API integration: E.g. load the JSON and embedd data strucutre of a single tweet via API (TBD: how to solve media pull in pictures and videos). Solve by content addressed storage implementation for large media files: pictures, video, others.
10. Archive.org / Website download (offline archiving) with local storing but externally storage management.

Support basic statements with a md-text-editor, form.
Type: Contract, requires in-depth-verification.

Aggregator: Timestamping at maximum.

When timestamping an aqua-chain receive a mutable flag on the revision which is timestamp. LOCKING it (do not allow new revisions until unlocked / unflagged). Idea: End-revisions, are not allowed to be extended.

Topic: Witness Contract:
API Read function?
Verifier needs to have a hard conviction of whats our truth. ONE SMART contract, if not we could fall into the trap that somebody changes a witness revision to a different contract and it still would be valid. --> Is this a problem?

Discussion:

Optimizations:

Different Hashing machanism
* https://crypto.stackexchange.com/questions/31674/what-advantages-does-keccak-sha-3-have-over-blake2 i can't find a strong reason for preferring sha3
* tl; dr: blake2 didn't win nist because it's too similar to sha2. on the other hand, sha2 has been proven to stay even after decades, so being similar to it is actually a feature, not bug. but this is an argument from the author of blake2, which is biased
* Potentially using blake3 (optimized) which seems to be up to 15x faster
* What are the security considerations / drawbacks


Discussion "removing internally tracked files / content revisions":
* Remove Content revision with wrapping
* Track files with a local storage deamon -> only have their hash, receive files by hash, store them by hash
* Storage service and hasher service always come togather
* Possible to extend the aqua-verifier to support other storage implementations via shared interface (?)
* Track matadata of file with DB or with an extra file containing the sha3 hash and URL how to receive the file (?)RITIQUE and option (OPTIMIZATION): In depth verification (secure every field) vs shadllow verification (just hash the whole JSON file structure with one hash (root hash).
