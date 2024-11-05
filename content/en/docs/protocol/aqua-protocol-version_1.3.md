# Aqua Protocol Version v1.3
(Writing in process, unfinished Nov. 5th, 2024)
This is developer documentation.

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

4. Witness-Revision example Ethereum (non-aggregated)

