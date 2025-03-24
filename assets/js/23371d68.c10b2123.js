"use strict";(self.webpackChunkaqua_docs_v_2=self.webpackChunkaqua_docs_v_2||[]).push([[2605],{81:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>d,default:()=>f,frontMatter:()=>s,metadata:()=>i,toc:()=>r});const i=JSON.parse('{"id":"AquaIdentity","title":"Aqua Identity","description":"Aqua Identity leverages the Aqua Protocol to deliver trusted identity claims and attestations within a secure, decentralized framework. Operating as a layer-two application, it builds upon the foundational verifications completed at layer one, ensuring a robust and reliable identity management system. For an Aqua Identity to be considered valid, all prerequisite atomic and relational verification checks must be successfully completed prior to its issuance. Atomic verification refers to the validation of a single revision\u2019s content, ensuring all required checks (e.g., data integrity, format compliance) are met. Relational verification examines the relationships between revisions, confirming plausibility of timestamps, consistency of revision hashes (e.g., matching the expected previousverificationhash), and availability of linked resources.","source":"@site/versioned_docs/version-1.3.2/AquaIdentity.md","sourceDirName":".","slug":"/AquaIdentity","permalink":"/docs/v3/AquaIdentity","draft":false,"unlisted":false,"editUrl":"https://github.com/inblockio/versioned_docs/version-1.3.2/AquaIdentity.md","tags":[],"version":"1.3.2","frontMatter":{"title":"Aqua Identity"},"sidebar":"tutorialSidebar","previous":{"title":"Witnessing","permalink":"/docs/v3/sdk/api/witnessing"},"next":{"title":"Access Control","permalink":"/docs/v3/AccessControl"}}');var n=a(4848),c=a(8453);const s={title:"Aqua Identity"},d="Aqua Identity",o={},r=[{value:"Self-Authenticated Identity Claims",id:"self-authenticated-identity-claims",level:2},{value:"Verification Conditions",id:"verification-conditions",level:3},{value:"Example: Self-Authenticated Identity Claim",id:"example-self-authenticated-identity-claim",level:2},{value:"Aqua Revision Example",id:"aqua-revision-example",level:3},{value:"Attestations",id:"attestations",level:2},{value:"Example: Attestation Input JSON",id:"example-attestation-input-json",level:3},{value:"Verification Conditions",id:"verification-conditions-1",level:3},{value:"Aqua Revision for Attestation",id:"aqua-revision-for-attestation",level:3},{value:"Example Project",id:"example-project",level:2}];function l(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"aqua-identity",children:"Aqua Identity"})}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Aqua Identity"})," leverages the Aqua Protocol to deliver trusted identity claims and attestations within a secure, decentralized framework. Operating as a layer-two application, it builds upon the foundational verifications completed at layer one, ensuring a robust and reliable identity management system. For an Aqua Identity to be considered valid, all prerequisite atomic and relational verification checks must be successfully completed prior to its issuance. ",(0,n.jsx)(t.strong,{children:"Atomic verification"})," refers to the validation of a single revision\u2019s content, ensuring all required checks (e.g., data integrity, format compliance) are met. ",(0,n.jsx)(t.strong,{children:"Relational verification"})," examines the relationships between revisions, confirming plausibility of timestamps, consistency of revision hashes (e.g., matching the expected ",(0,n.jsx)(t.code,{children:"previous_verification_hash"}),"), and availability of linked resources."]}),"\n",(0,n.jsx)(t.h2,{id:"self-authenticated-identity-claims",children:"Self-Authenticated Identity Claims"}),"\n",(0,n.jsx)(t.p,{children:"Self-authenticated identity claims form the cornerstone of the Aqua Identity system. These claims originate from individuals asserting their own identity attributes, serving as the initial step in establishing a verifiable identity."}),"\n",(0,n.jsx)(t.h3,{id:"verification-conditions",children:"Verification Conditions"}),"\n",(0,n.jsx)(t.p,{children:"To ensure the validity of a self-authenticated identity claim, the following conditions must be met:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Signature Requirement"}),": The claim MUST be cryptographically signed by the issuer, who is the owner of the associated wallet."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Ownership Restriction"}),": Only the wallet owner is authorized to issue claims pertaining to that wallet, ensuring authenticity and accountability."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"example-self-authenticated-identity-claim",children:"Example: Self-Authenticated Identity Claim"}),"\n",(0,n.jsx)(t.p,{children:"Below is an example of a self-authenticated identity claim represented as a JSON dictionary, encapsulating key personal attributes:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:'{\n    "type": "identity_claim",\n    "name": "John",\n    "surname": "Doe",\n    "email": "john.doe@example.com",\n    "date_of_birth": "1995-10-15",\n    "wallet_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50"\n}\n'})}),"\n",(0,n.jsxs)(t.p,{children:["This JSON structure is encapsulated within an ",(0,n.jsx)(t.strong,{children:"Aqua revision"})," of type ",(0,n.jsx)(t.code,{children:'"form"'}),", utilizing a tree-based verification structure. The tree structure enables ",(0,n.jsx)(t.strong,{children:"selective disclosure"}),", allowing the claimant to remove values from specific keys before sharing with third parties, without compromising the ability to verify the remaining fields. This ensures privacy while maintaining the integrity of the claim\u2019s data structure."]}),"\n",(0,n.jsx)(t.h3,{id:"aqua-revision-example",children:"Aqua Revision Example"}),"\n",(0,n.jsx)(t.p,{children:"The following demonstrates how the identity claim is wrapped into an Aqua revision, including a signature for authentication:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:'{\n    "revisions": {\n        "0x5721891d757ee81ab3cd00442293f3808a99e676d2d1bda03cda26bae23daed1": {\n            "previous_verification_hash": "",\n            "local_timestamp": "20250228083859",\n            "revision_type": "form",\n            "file_hash": "e193009bf33316803481ad0dd2aea14ccf489ca261fa403c96f8e054d5ea4659",\n            "file_nonce": "74a3389590e9af459113ad629ec5682b73747291b840e39226b58054a475d3ef",\n            "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree",\n            "forms_type": "identity_claim",\n            "forms_name": "John",\n            "forms_surname": "Doe",\n            "forms_email": "john.doe@example.com",\n            "forms_date_of_birth": "1995-10-15",\n            "forms_wallet_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",\n            "leaves": [\n                "a30b33749a68fb367b267f2f8b44d53a1bfe3aba94b265df98f812a2db1ac60d",\n                "f7f02d3b6bd597c63b423a0bb682e77c9b42b1c27ef777bad47259eaa6d5a45f",\n                "3b5abc4d1a21b05caa891be0650cf25cea133ddb939b1c45a8282bcab686545a",\n                "dcb7cfdf2bae4a7e558e58dc9a26bc2627f35f2097c38b3e1493693ed3495239",\n                "5122dde9b24bdd39f3eb20f64c18e6a960b6a3320c7cfb7707b8e7de581cc7f2",\n                "28d88a09468f136c21475a121b53c626d1c29902a076b7e94c8a77aaa2a45b37",\n                "15a1e4c78fa31877be47fa99afee32bd426d6bf74c5297f0d1d706b987c528bd",\n                "b95b4f6e034884da002c503e2753b4b93c5a9d07a0d9ee13576f0bace9c4649b",\n                "78d7f2378e5160fd5d5e52065467c8c444f20b75e03e0b0d564ee6dc9b7fa7dd",\n                "d781acf7ba880ecae581ffd8debcb4f5cb430bc2f237e27a6098471a9f7ffa60",\n                "43fcaef3dc4b2a2d0550543b638048edcfb710da9276da109a9e011ed1a53ed1",\n                "39ccd407bb105ed3be74df4a546d9b10c4f6c80e48b559102b04fa2b29aa83b4"\n            ]\n        },\n        "0xe5ee04bc1eb8365d8c609cc6afa4dc9c003dd6cd0538797ba458d58a660aedf8": {\n            "previous_verification_hash": "0x5721891d757ee81ab3cd00442293f3808a99e676d2d1bda03cda26bae23daed1",\n            "local_timestamp": "20250228084213",\n            "revision_type": "signature",\n            "signature": "0x8a3055c71bc3fb705add8a82c88e6d7f909a1f53415e1172da66a7d807c517004b84b6df8f8e86d764bb49629ec9d5a34075a959799f9153fb1af0f246d4c2fe1b",\n            "signature_public_key": "0x0380a77a1a6d59be5c10d7ee5e10def79283938bb8a60025d0fe5404e650e8ccc1",\n            "signature_wallet_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",\n            "signature_type": "ethereum:eip-191",\n            "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"\n        }\n    }\n}\n'})}),"\n",(0,n.jsx)(t.p,{children:"This example illustrates a fully formed identity claim with multiple attributes, cryptographically signed to ensure authenticity and integrity."}),"\n",(0,n.jsx)(t.h2,{id:"attestations",children:"Attestations"}),"\n",(0,n.jsx)(t.p,{children:"Attestations enhance the trustworthiness of self-authenticated identity claims by introducing third-party validation. An attestation is issued by an attester who verifies the accuracy of the claim\u2019s attributes against a reliable source, such as a government-issued ID."}),"\n",(0,n.jsx)(t.h3,{id:"example-attestation-input-json",children:"Example: Attestation Input JSON"}),"\n",(0,n.jsx)(t.p,{children:"Below is an example of the input JSON for an attestation within an Aqua form revision:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:'{\n    "type": "identity_attestation",\n    "identity_claim_id": "0x5721891d757ee81ab3cd00442293f3808a99e676d2d1bda03cda26bae23daed1",\n    "name": "John",\n    "surname": "Doe",\n    "email": "john.doe@example.com",\n    "date_of_birth": "1995-10-15",\n    "context": "I verified the attributes against a government-issued ID. I hereby attest that the above information is true and correct to the best of my knowledge.",\n    "wallet_address": "0x6b2f22390c318107e95c58c90a66afaf7ef06853"\n}\n'})}),"\n",(0,n.jsx)(t.h3,{id:"verification-conditions-1",children:"Verification Conditions"}),"\n",(0,n.jsx)(t.p,{children:"For an attestation to be valid, it MUST satisfy the following requirements:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"forms_type"})}),": Must be set to ",(0,n.jsx)(t.code,{children:'"identity_attestation"'}),"."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"forms_identity_claim_id"})}),": Must reference the revision hash of the associated identity claim."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"forms_wallet_address"})}),": Must correspond to the wallet address of the attester."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"forms_context"})}),": Optional but recommended field providing additional context about the attestation process (e.g., verification method or source), enhancing transparency and trust."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Attribute Overlap"}),": Must include at least one attribute with an identical key-value pair to the referenced identity claim, ensuring consistency."]}),"\n"]}),"\n",(0,n.jsx)(t.h3,{id:"aqua-revision-for-attestation",children:"Aqua Revision for Attestation"}),"\n",(0,n.jsx)(t.p,{children:"The attestation is formalized within an Aqua revision, including both the form and its cryptographic signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:'{\n    "revisions": {\n        "0xcd5acfd60283091769c765b05add4fe7bfc6471174264af523de96305d367e46": {\n            "previous_verification_hash": "",\n            "local_timestamp": "20250228100501",\n            "revision_type": "form",\n            "file_hash": "2a8f574fa444958c2acfa5ce9652cbe26e3c38271cb130280682a119050565cc",\n            "file_nonce": "4d5be0fffe4ea48a214f93cdc5da3933c252569a6e2d5e557346015219ab4921",\n            "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree",\n            "forms_type": "identity_attestation",\n            "forms_identity_claim_id": "0x5721891d757ee81ab3cd00442293f3808a99e676d2d1bda03cda26bae23daed1",\n            "forms_name": "John",\n            "forms_surname": "Doe",\n            "forms_email": "john.doe@example.com",\n            "forms_date_of_birth": "1995-10-15",\n            "forms_context": "I hereby attest that the above information is true and correct to the best of my knowledge.",\n            "forms_wallet_address": "0x6b2f22390c318107e95c58c90a66afaf7ef06853",\n            "leaves": [\n                "80f38992d148b666addfdee7678aa8b6e6b6babb6b088d58d19e85135c5cd92f",\n                "fadc2c5b6793a43ac3e0c5920b56bbd0cc3dac56fc60b45091a8671e884cbec9",\n                "5890fbf208e5503532c9d4f1cf97cd78d993b42d023187ac02cdc4298a01a197",\n                "3b5abc4d1a21b05caa891be0650cf25cea133ddb939b1c45a8282bcab686545a",\n                "dcb7cfdf2bae4a7e558e58dc9a26bc2627f35f2097c38b3e1493693ed3495239",\n                "a37e968e97736a195db0ca44538174984e34fc10b68aa6d351386ccf8b87470f",\n                "5122dde9b24bdd39f3eb20f64c18e6a960b6a3320c7cfb7707b8e7de581cc7f2",\n                "28d88a09468f136c21475a121b53c626d1c29902a076b7e94c8a77aaa2a45b37",\n                "724b53a739396244b394d8ea53afb014de7c99eb243f5d6d574d154a02c9ba5f",\n                "21e21d483289413fac72228b2005deddc3155cc4850059303f084a05368c4e57",\n                "02f64008e4005ffc43c0270e32e4b3c1c1c8075793aea167923960c59a4300c2",\n                "d781acf7ba880ecae581ffd8debcb4f5cb430bc2f237e27a6098471a9f7ffa60",\n                "43fcaef3dc4b2a2d0550543b638048edcfb710da9276da109a9e011ed1a53ed1",\n                "39ccd407bb105ed3be74df4a546d9b10c4f6c80e48b559102b04fa2b29aa83b4"\n            ]\n        },\n        "0x7be476f6c305187b2410cfff0df8e6eeb4ba53a25b3e389231085d4934c68aec": {\n            "previous_verification_hash": "0xcd5acfd60283091769c765b05add4fe7bfc6471174264af523de96305d367e46",\n            "local_timestamp": "20250228100743",\n            "revision_type": "signature",\n            "signature": "0xb2b51810d7134f969fb48736e6f390d3eadac3b1e9adb5b8ef54c600ae77826971d64a74e01dd0bc1e2a18911ea1e8350733b3f7676866653ae8f0e7645fb7a51b",\n            "signature_public_key": "0x02b027a2f4592f83c1301c1e6629f648a953d791d7c7059b1c46a6a24d9101f4c9",\n            "signature_wallet_address": "0x6b2f22390c318107e95c58c90a66afaf7ef06853",\n            "signature_type": "ethereum:eip-191",\n            "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: scalar"\n        }\n    }\n}\n'})}),"\n",(0,n.jsx)(t.p,{children:"Attesters play a critical role in the Aqua Identity ecosystem, validating self-authenticated claims to enhance their credibility and utility."}),"\n",(0,n.jsx)(t.h2,{id:"example-project",children:"Example Project"}),"\n",(0,n.jsx)(t.p,{children:"For a practical implementation, refer to the open-source project:"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"https://github.com/inblockio/aqua-identity",children:(0,n.jsx)(t.strong,{children:"Aqua Identity on GitHub"})})})]})}function f(e={}){const{wrapper:t}={...(0,c.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},8453:(e,t,a)=>{a.d(t,{R:()=>s,x:()=>d});var i=a(6540);const n={},c=i.createContext(n);function s(e){const t=i.useContext(c);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),i.createElement(c.Provider,{value:t},e.children)}}}]);