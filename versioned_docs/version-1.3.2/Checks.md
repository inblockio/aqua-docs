---
title: "Checks"
---

This is a prototype for a payment infrastructure. Using Aqua Protocol to establish a paper check equavilant.
We use the https://github.com/Lay3rLabs/wavs-demos as a gateway to do all verifications and triggers the online payout.
The wavs instance will run the aqua-library / rust api calls to verify the aqua-json object.
If tests pass, the payment is executed.

Flow:
![Escrow Gateway Aqua](/docs_pics/Escrow_Gateway_Aqua.png)

Example of a check:
![Check](https://mycurrencyexchange.com/wp-content/uploads/2020/06/parts-of-a-check-1024x516.jpg)


The flow is:
1) Create aqua form which includes the JSON as input as follows:
```json
{
"sender":"0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
"receiver":"",
"amount":"0.3",
"currency":"ETH"
}
```
2) sender signature
3) receiver creates new form update
```json
{
"sender":"0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
"receiver":"0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",
"amount":"0.3",
"currency":"ETH"
}
```
4) receiver signes form
5) upload to check cashout interface?? (unclear how the Aqua JSON is send into the run-time environment for  


# Interface 
assumption: which interacts with the wavs service (? unclear if the service can provide an interface or if we must send the "full package").
assumption 2: if we need to send full package, our interface needs to provide the API to send it to the wavs instance. How to?

View 1:
Check registration
-> upload the JSON for registration
Smart Contract Account requires the sender address to be whitelisted to accept input.

View 2: 
Check cashout
-> upload JSON for verification

## Aqua Revisions with signatures as fixture

```json
{
  "revisions": {
    "0xd453ccae56945ce381f1adb57feef37ba77e215604fe078faa2d9527159c9c76": {
      "previous_verification_hash": "",
      "local_timestamp": "20250306172550",
      "revision_type": "form",
      "file_hash": "dd056a2c7c877716e2fd9f4f1aecfff05da6aae0158c0aa60775afa88cc1daf3",
      "file_nonce": "79c6f2e3a11f7cd306032118056e01fe3c5a1da72f14459485ac9341ff49bc2f",
      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree",
      "forms_sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
      "forms_receiver": "",
      "forms_amount": "0.3",
      "forms_currency": "ETH",
      "leaves": [
        "d124372eec01c6eb4feb48f47bd3603ae004c54193da50d830cfa64fe7ae80f3",
        "bdf6998e531c9b2c6e9cfe343ac899e9ac3f24148ea173d09e5d16df04bb0c03",
        "130625d45114805fdfe7b6c84635ccf20d6284039f1385a1196f492eb888d26b",
        "831d23b3883442d5d261da2ac9d41339b12bc9052a1ccef27917cb570cbc0232",
        "136924ff8b4b84ac661c86eada4dde73c8557b908088a4506df409fde3a6020d",
        "6e44f260490db970aa88fc21969f9018efb09b68e2e105765740fde4c82fff8e",
        "9625de7853e122ab54ffe26b8957b41d9d38164e9e68417dbe1d6ef49312f33e",
        "d781acf7ba880ecae581ffd8debcb4f5cb430bc2f237e27a6098471a9f7ffa60",
        "43fcaef3dc4b2a2d0550543b638048edcfb710da9276da109a9e011ed1a53ed1",
        "39ccd407bb105ed3be74df4a546d9b10c4f6c80e48b559102b04fa2b29aa83b4"
      ]
    },
    "0x1ea148be50e98f45996353a8b2b1eb5b8e379c2bc02c18fe875e6c52bd1ccd08": {
      "previous_verification_hash": "0xd453ccae56945ce381f1adb57feef37ba77e215604fe078faa2d9527159c9c76",
      "local_timestamp": "20250306172614",
      "revision_type": "signature",
      "signature": "0xd3984892d212c2613fbbea69ed669449e378f5d085326c6e2770f69e5420408515a1975a9308e058f8d33dee700b8018e372b622e8ea12934ebc0b1c1e9832f21b",
      "signature_public_key": "0x03b6ff4b0c45ce230eb48499614538ca7daa43000395e694ac92eaa1e4b805df8a",
      "signature_wallet_address": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
      "signature_type": "ethereum:eip-191",
      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
    },
    "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c": {
      "previous_verification_hash": "",
      "local_timestamp": "20250306172628",
      "revision_type": "form",
      "file_hash": "00bf727b9503eeb95283eb315595a4340aae9db9abc15e77caab0a27ebb62f93",
      "file_nonce": "3edf611220843407552e0f89da6165d785123cb6921922750d8a43f27f56ff4a",
      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree",
      "forms_sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
      "forms_receiver": "0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",
      "forms_amount": "0.3",
      "forms_currency": "ETH",
      "leaves": [
        "970f5529bf91fceb547fea1f2f9962deeb253ed49168d41dfc73612a4e5fa9e6",
        "5eb7762546b6eb479b4337ed813bb2165a545d4be1865f018f4cb2b8370d8b34",
        "130625d45114805fdfe7b6c84635ccf20d6284039f1385a1196f492eb888d26b",
        "831d23b3883442d5d261da2ac9d41339b12bc9052a1ccef27917cb570cbc0232",
        "fee6445323587d801908747e6e5c526a4feda60ae958994805761810a1b76eba",
        "6e44f260490db970aa88fc21969f9018efb09b68e2e105765740fde4c82fff8e",
        "213843c34277d010b091a747720999aaec970767533c9a192a10c10a06b9bc41",
        "d781acf7ba880ecae581ffd8debcb4f5cb430bc2f237e27a6098471a9f7ffa60",
        "43fcaef3dc4b2a2d0550543b638048edcfb710da9276da109a9e011ed1a53ed1",
        "39ccd407bb105ed3be74df4a546d9b10c4f6c80e48b559102b04fa2b29aa83b4"
      ]
    },
    "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86": {
      "previous_verification_hash": "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c",
      "local_timestamp": "20250306172702",
      "revision_type": "signature",
      "signature": "0xabdacd337ae491914b6f2afb2e53249709983c3c98c54c66fcf07fed186a5fb751a6b29e1444bec134695ee01da8fc12b56d71b89df7801c49ce67f2068cc30d1b",
      "signature_public_key": "0x04a76d584098ec55bff33c1390dedcbeed4bb2204f7eafcccefd70635e70fa09719446f47d0db1ec1b027803b1040d9e000cf08d81b5026be09c134851b26d7c75",
      "signature_wallet_address": "0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",
      "signature_type": "ethereum:eip-191",
      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"
    }
  },
  "file_index": {
    "0xd453ccae56945ce381f1adb57feef37ba77e215604fe078faa2d9527159c9c76": "check.json",
    "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c": "check_chash_out.json"
  },
  "tree": {
    "hash": "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c",
    "children": [
      {
        "hash": "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86",
        "children": []
      }
    ]
  },
  "treeMapping": {
    "paths": {
      "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86": [
        "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c",
        "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86"
      ]
    },
    "latestHash": "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86"
  }
}
``` 

Additional verification checks:
Aqua-Form fields must be identical between revision 1 and 2 except receiving account.
