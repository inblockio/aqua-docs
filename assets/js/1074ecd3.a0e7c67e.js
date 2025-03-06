"use strict";(self.webpackChunkaqua_docs_v_2=self.webpackChunkaqua_docs_v_2||[]).push([[5410],{7366:(e,a,c)=>{c.d(a,{A:()=>n});const n=c.p+"assets/images/Escrow_Gateway_Aqua-331b8e37ca68d5f47f989a8c6580fb99.png"},7935:(e,a,c)=>{c.r(a),c.d(a,{assets:()=>r,contentTitle:()=>t,default:()=>b,frontMatter:()=>s,metadata:()=>n,toc:()=>i});const n=JSON.parse('{"id":"Checks","title":"Checks","description":"This is a prototype for a payment infrastructure. Using Aqua Protocol to establish a paper check equavilant.","source":"@site/versioned_docs/version-1.3.2/Checks.md","sourceDirName":".","slug":"/Checks","permalink":"/docs/v3/Checks","draft":false,"unlisted":false,"editUrl":"https://github.com/inblockio/versioned_docs/version-1.3.2/Checks.md","tags":[],"version":"1.3.2","frontMatter":{"title":"Checks"},"sidebar":"tutorialSidebar","previous":{"title":"Access Control","permalink":"/docs/v3/AccessControl"}}');var d=c(4848),f=c(8453);const s={title:"Checks"},t="Interface",r={},i=[{value:"Aqua Revisions with signatures as fixture",id:"aqua-revisions-with-signatures-as-fixture",level:2}];function o(e){const a={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",...(0,f.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(a.p,{children:["This is a prototype for a payment infrastructure. Using Aqua Protocol to establish a paper check equavilant.\nWe use the ",(0,d.jsx)(a.a,{href:"https://github.com/Lay3rLabs/wavs-demos",children:"https://github.com/Lay3rLabs/wavs-demos"})," as a gateway to do all verifications and triggers the online payout.\nThe wavs instance will run the aqua-library / rust api calls to verify the aqua-json object.\nIf tests pass, the payment is executed."]}),"\n",(0,d.jsxs)(a.p,{children:["Flow:\n",(0,d.jsx)(a.img,{alt:"Escrow Gateway Aqua",src:c(7366).A+"",width:"771",height:"632"})]}),"\n",(0,d.jsxs)(a.p,{children:["Example of a check:\n",(0,d.jsx)(a.img,{src:"https://mycurrencyexchange.com/wp-content/uploads/2020/06/parts-of-a-check-1024x516.jpg",alt:"Check"})]}),"\n",(0,d.jsx)(a.p,{children:"The flow is:"}),"\n",(0,d.jsxs)(a.ol,{children:["\n",(0,d.jsx)(a.li,{children:"Create aqua form which includes the JSON as input as follows:"}),"\n"]}),"\n",(0,d.jsx)(a.pre,{children:(0,d.jsx)(a.code,{className:"language-json",children:'{\n"sender":"0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",\n"receiver":"",\n"amount":"0.3",\n"currency":"ETH"\n}\n'})}),"\n",(0,d.jsxs)(a.ol,{start:"2",children:["\n",(0,d.jsx)(a.li,{children:"sender signature"}),"\n",(0,d.jsx)(a.li,{children:"receiver creates new form update"}),"\n"]}),"\n",(0,d.jsx)(a.pre,{children:(0,d.jsx)(a.code,{className:"language-json",children:'{\n"sender":"0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",\n"receiver":"0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",\n"amount":"0.3",\n"currency":"ETH"\n}\n'})}),"\n",(0,d.jsxs)(a.ol,{start:"4",children:["\n",(0,d.jsx)(a.li,{children:"receiver signes form"}),"\n",(0,d.jsx)(a.li,{children:"upload to check cashout interface?? (unclear how the Aqua JSON is send into the run-time environment for"}),"\n"]}),"\n",(0,d.jsx)(a.header,{children:(0,d.jsx)(a.h1,{id:"interface",children:"Interface"})}),"\n",(0,d.jsx)(a.p,{children:'assumption: which interacts with the wavs service (? unclear if the service can provide an interface or if we must send the "full package").\nassumption 2: if we need to send full package, our interface needs to provide the API to send it to the wavs instance. How to?'}),"\n",(0,d.jsx)(a.p,{children:"View 1:\nCheck registration\n-> upload the JSON for registration\nSmart Contract Account requires the sender address to be whitelisted to accept input."}),"\n",(0,d.jsx)(a.p,{children:"View 2:\nCheck cashout\n-> upload JSON for verification"}),"\n",(0,d.jsx)(a.h2,{id:"aqua-revisions-with-signatures-as-fixture",children:"Aqua Revisions with signatures as fixture"}),"\n",(0,d.jsx)(a.pre,{children:(0,d.jsx)(a.code,{className:"language-json",children:'{\n  "revisions": {\n    "0xd453ccae56945ce381f1adb57feef37ba77e215604fe078faa2d9527159c9c76": {\n      "previous_verification_hash": "",\n      "local_timestamp": "20250306172550",\n      "revision_type": "form",\n      "file_hash": "dd056a2c7c877716e2fd9f4f1aecfff05da6aae0158c0aa60775afa88cc1daf3",\n      "file_nonce": "79c6f2e3a11f7cd306032118056e01fe3c5a1da72f14459485ac9341ff49bc2f",\n      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree",\n      "forms_sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",\n      "forms_receiver": "",\n      "forms_amount": "0.3",\n      "forms_currency": "ETH",\n      "leaves": [\n        "d124372eec01c6eb4feb48f47bd3603ae004c54193da50d830cfa64fe7ae80f3",\n        "bdf6998e531c9b2c6e9cfe343ac899e9ac3f24148ea173d09e5d16df04bb0c03",\n        "130625d45114805fdfe7b6c84635ccf20d6284039f1385a1196f492eb888d26b",\n        "831d23b3883442d5d261da2ac9d41339b12bc9052a1ccef27917cb570cbc0232",\n        "136924ff8b4b84ac661c86eada4dde73c8557b908088a4506df409fde3a6020d",\n        "6e44f260490db970aa88fc21969f9018efb09b68e2e105765740fde4c82fff8e",\n        "9625de7853e122ab54ffe26b8957b41d9d38164e9e68417dbe1d6ef49312f33e",\n        "d781acf7ba880ecae581ffd8debcb4f5cb430bc2f237e27a6098471a9f7ffa60",\n        "43fcaef3dc4b2a2d0550543b638048edcfb710da9276da109a9e011ed1a53ed1",\n        "39ccd407bb105ed3be74df4a546d9b10c4f6c80e48b559102b04fa2b29aa83b4"\n      ]\n    },\n    "0x1ea148be50e98f45996353a8b2b1eb5b8e379c2bc02c18fe875e6c52bd1ccd08": {\n      "previous_verification_hash": "0xd453ccae56945ce381f1adb57feef37ba77e215604fe078faa2d9527159c9c76",\n      "local_timestamp": "20250306172614",\n      "revision_type": "signature",\n      "signature": "0xd3984892d212c2613fbbea69ed669449e378f5d085326c6e2770f69e5420408515a1975a9308e058f8d33dee700b8018e372b622e8ea12934ebc0b1c1e9832f21b",\n      "signature_public_key": "0x03b6ff4b0c45ce230eb48499614538ca7daa43000395e694ac92eaa1e4b805df8a",\n      "signature_wallet_address": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",\n      "signature_type": "ethereum:eip-191",\n      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"\n    },\n    "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c": {\n      "previous_verification_hash": "",\n      "local_timestamp": "20250306172628",\n      "revision_type": "form",\n      "file_hash": "00bf727b9503eeb95283eb315595a4340aae9db9abc15e77caab0a27ebb62f93",\n      "file_nonce": "3edf611220843407552e0f89da6165d785123cb6921922750d8a43f27f56ff4a",\n      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree",\n      "forms_sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",\n      "forms_receiver": "0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",\n      "forms_amount": "0.3",\n      "forms_currency": "ETH",\n      "leaves": [\n        "970f5529bf91fceb547fea1f2f9962deeb253ed49168d41dfc73612a4e5fa9e6",\n        "5eb7762546b6eb479b4337ed813bb2165a545d4be1865f018f4cb2b8370d8b34",\n        "130625d45114805fdfe7b6c84635ccf20d6284039f1385a1196f492eb888d26b",\n        "831d23b3883442d5d261da2ac9d41339b12bc9052a1ccef27917cb570cbc0232",\n        "fee6445323587d801908747e6e5c526a4feda60ae958994805761810a1b76eba",\n        "6e44f260490db970aa88fc21969f9018efb09b68e2e105765740fde4c82fff8e",\n        "213843c34277d010b091a747720999aaec970767533c9a192a10c10a06b9bc41",\n        "d781acf7ba880ecae581ffd8debcb4f5cb430bc2f237e27a6098471a9f7ffa60",\n        "43fcaef3dc4b2a2d0550543b638048edcfb710da9276da109a9e011ed1a53ed1",\n        "39ccd407bb105ed3be74df4a546d9b10c4f6c80e48b559102b04fa2b29aa83b4"\n      ]\n    },\n    "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86": {\n      "previous_verification_hash": "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c",\n      "local_timestamp": "20250306172702",\n      "revision_type": "signature",\n      "signature": "0xabdacd337ae491914b6f2afb2e53249709983c3c98c54c66fcf07fed186a5fb751a6b29e1444bec134695ee01da8fc12b56d71b89df7801c49ce67f2068cc30d1b",\n      "signature_public_key": "0x04a76d584098ec55bff33c1390dedcbeed4bb2204f7eafcccefd70635e70fa09719446f47d0db1ec1b027803b1040d9e000cf08d81b5026be09c134851b26d7c75",\n      "signature_wallet_address": "0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",\n      "signature_type": "ethereum:eip-191",\n      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"\n    }\n  },\n  "file_index": {\n    "0xd453ccae56945ce381f1adb57feef37ba77e215604fe078faa2d9527159c9c76": "check.json",\n    "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c": "check_chash_out.json"\n  },\n  "tree": {\n    "hash": "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c",\n    "children": [\n      {\n        "hash": "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86",\n        "children": []\n      }\n    ]\n  },\n  "treeMapping": {\n    "paths": {\n      "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86": [\n        "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c",\n        "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86"\n      ]\n    },\n    "latestHash": "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86"\n  }\n}\n'})}),"\n",(0,d.jsx)(a.p,{children:"Additional verification checks:\nAqua-Form fields must be identical between revision 1 and 2 except receiving account."})]})}function b(e={}){const{wrapper:a}={...(0,f.R)(),...e.components};return a?(0,d.jsx)(a,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}},8453:(e,a,c)=>{c.d(a,{R:()=>s,x:()=>t});var n=c(6540);const d={},f=n.createContext(d);function s(e){const a=n.useContext(f);return n.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function t(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:s(e.components),n.createElement(f.Provider,{value:a},e.children)}}}]);