"use strict";(self.webpackChunkaqua_docs_v_2=self.webpackChunkaqua_docs_v_2||[]).push([[7965],{8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>d});var i=s(6540);const c={},a=i.createContext(c);function r(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:r(e.components),i.createElement(a.Provider,{value:n},e.children)}},9781:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>t,contentTitle:()=>d,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"schema","title":"Schema","description":"Below is the documentation for the schema based on the provided JSON content. It outlines the four types of revisions (file, content, signature, and witness) and their respective properties.","source":"@site/versioned_docs/version-1.3.2/schema.md","sourceDirName":".","slug":"/schema","permalink":"/docs/1.3.2/schema","draft":false,"unlisted":false,"editUrl":"https://github.com/inblockio/versioned_docs/version-1.3.2/schema.md","tags":[],"version":"1.3.2","frontMatter":{"title":"Schema","menu":{"main":{"weight":10}}},"sidebar":"tutorialSidebar","previous":{"title":"Version 1.3.2","permalink":"/docs/1.3.2/intro"}}');var c=s(4848),a=s(8453);const r={title:"Schema",menu:{main:{weight:10}}},d="Schema Documentation",t={},o=[{value:"Revisions",id:"revisions",level:2},{value:"1. File Revision",id:"1-file-revision",level:3},{value:"Properties:",id:"properties",level:4},{value:"Example:",id:"example",level:4},{value:"2. Signature Revision",id:"2-signature-revision",level:3},{value:"Properties:",id:"properties-1",level:4},{value:"Example:",id:"example-1",level:4},{value:"3. Witness Revision",id:"3-witness-revision",level:3},{value:"Properties:",id:"properties-2",level:4},{value:"Example:",id:"example-2",level:4},{value:"4. Content Revision",id:"4-content-revision",level:3},{value:"Properties:",id:"properties-3",level:4},{value:"Example:",id:"example-3",level:4},{value:"File Index",id:"file-index",level:2},{value:"Example:",id:"example-4",level:4},{value:"Tree Structure",id:"tree-structure",level:2},{value:"Example:",id:"example-5",level:4},{value:"Tree Mapping",id:"tree-mapping",level:2},{value:"Properties:",id:"properties-4",level:4},{value:"Example:",id:"example-6",level:4},{value:"Example",id:"example-7",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(n.p,{children:["Below is the documentation for the schema based on the provided JSON content. It outlines the four types of revisions (",(0,c.jsx)(n.code,{children:"file"}),", ",(0,c.jsx)(n.code,{children:"content"}),", ",(0,c.jsx)(n.code,{children:"signature"}),", and ",(0,c.jsx)(n.code,{children:"witness"}),") and their respective properties."]}),"\n",(0,c.jsx)(n.header,{children:(0,c.jsx)(n.h1,{id:"schema-documentation",children:"Schema Documentation"})}),"\n",(0,c.jsx)(n.p,{children:"This schema defines a structure for managing revisions of a file, including its content, signatures, and witness records. Each revision is uniquely identified by a hash and contains metadata specific to its type."}),"\n",(0,c.jsx)(n.h2,{id:"revisions",children:"Revisions"}),"\n",(0,c.jsxs)(n.p,{children:["The ",(0,c.jsx)(n.code,{children:"revisions"})," object contains all revisions, each identified by a unique hash. There are four types of revisions:"]}),"\n",(0,c.jsxs)(n.ol,{children:["\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.strong,{children:"File Revision"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.strong,{children:"Signature Revision"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.strong,{children:"Witness Revision"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.strong,{children:"Content Revision"})}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"Each revision type has specific properties, as described below."}),"\n",(0,c.jsx)(n.h3,{id:"1-file-revision",children:"1. File Revision"}),"\n",(0,c.jsxs)(n.p,{children:["A ",(0,c.jsx)(n.strong,{children:"File Revision"})," represents the initial or updated state of a file. It includes metadata about the file and its hash."]}),"\n",(0,c.jsx)(n.h4,{id:"properties",children:"Properties:"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"previous_verification_hash"})}),": (String) The hash of the previous revision in the chain. Empty for the first revision."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"local_timestamp"})}),": (String) The timestamp of the revision in ",(0,c.jsx)(n.code,{children:"YYYYMMDDHHMMSS"})," format."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"revision_type"})}),": (String) The type of revision, always ",(0,c.jsx)(n.code,{children:'"file"'})," for this type."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"file_hash"})}),": (String) The hash of the file content."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"file_nonce"})}),": (String) A unique nonce associated with the file."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"version"})}),": (String) The schema version and hashing method used."]}),"\n"]}),"\n",(0,c.jsx)(n.h4,{id:"example",children:"Example:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "previous_verification_hash": "",\n  "local_timestamp": "20250224154438",\n  "revision_type": "file",\n  "file_hash": "bd2e8e2a1b3c5d008e1d43ecb11105f42c5ad4e05922bab98981840b636c661e",\n  "file_nonce": "65eddd0e16a995170dbef8feaf86a7928678426f20a309bb6627887915c04efb",\n  "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar"\n}\n'})}),"\n",(0,c.jsx)(n.h3,{id:"2-signature-revision",children:"2. Signature Revision"}),"\n",(0,c.jsxs)(n.p,{children:["A ",(0,c.jsx)(n.strong,{children:"Signature Revision"})," represents a digital signature applied to a file revision. It includes the signature, public key, and wallet address of the signer."]}),"\n",(0,c.jsx)(n.h4,{id:"properties-1",children:"Properties:"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"previous_verification_hash"})}),": (String) The hash of the previous revision in the chain."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"local_timestamp"})}),": (String) The timestamp of the revision in ",(0,c.jsx)(n.code,{children:"YYYYMMDDHHMMSS"})," format."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"revision_type"})}),": (String) The type of revision, always ",(0,c.jsx)(n.code,{children:'"signature"'})," for this type."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"signature"})}),": (String) The digital signature."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"signature_public_key"})}),": (String) The public key of the signer."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"signature_wallet_address"})}),": (String) The wallet address of the signer."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"signature_type"})}),": (String) The type of signature (e.g., ",(0,c.jsx)(n.code,{children:'"ethereum:eip-191"'}),")."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"version"})}),": (String) The schema version and hashing method used."]}),"\n"]}),"\n",(0,c.jsx)(n.h4,{id:"example-1",children:"Example:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "previous_verification_hash": "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4",\n  "local_timestamp": "20250224154448",\n  "revision_type": "signature",\n  "signature": "0x799cd8177dc2c5dc34d389601175d550466a73509b71d533aaa3ff0ee958b3b31b574bdfd158a7ad0b186da5f5b440bc18453a6848bc659ccd6de06a09d6ea6e1b",\n  "signature_public_key": "0x0380a77a1a6d59be5c10d7ee5e10def79283938bb8a60025d0fe5404e650e8ccc1",\n  "signature_wallet_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",\n  "signature_type": "ethereum:eip-191",\n  "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar"\n}\n'})}),"\n",(0,c.jsx)(n.h3,{id:"3-witness-revision",children:"3. Witness Revision"}),"\n",(0,c.jsxs)(n.p,{children:["A ",(0,c.jsx)(n.strong,{children:"Witness Revision"})," represents a record of a witness event, such as a blockchain transaction. It includes metadata about the witness event, such as the transaction hash and network."]}),"\n",(0,c.jsx)(n.h4,{id:"properties-2",children:"Properties:"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"previous_verification_hash"})}),": (String) The hash of the previous revision in the chain."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"local_timestamp"})}),": (String) The timestamp of the revision in ",(0,c.jsx)(n.code,{children:"YYYYMMDDHHMMSS"})," format."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"revision_type"})}),": (String) The type of revision, always ",(0,c.jsx)(n.code,{children:'"witness"'})," for this type."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"version"})}),": (String) The schema version and hashing method used."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"witness_merkle_root"})}),": (String) The Merkle root of the witness event."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"witness_timestamp"})}),": (Number) The timestamp of the witness event."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"witness_network"})}),": (String) The network where the witness event occurred (e.g., ",(0,c.jsx)(n.code,{children:'"sepolia"'}),")."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"witness_smart_contract_address"})}),": (String) The address of the smart contract involved."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"witness_transaction_hash"})}),": (String) The hash of the transaction."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"witness_sender_account_address"})}),": (String) The address of the sender's account."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"witness_merkle_proof"})}),": (Array) An array of Merkle proofs."]}),"\n"]}),"\n",(0,c.jsx)(n.h4,{id:"example-2",children:"Example:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "previous_verification_hash": "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",\n  "local_timestamp": "20250224154506",\n  "revision_type": "witness",\n  "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar",\n  "witness_merkle_root": "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",\n  "witness_timestamp": 1740411910,\n  "witness_network": "sepolia",\n  "witness_smart_contract_address": "0x45f59310ADD88E6d23ca58A0Fa7A55BEE6d2a611",\n  "witness_transaction_hash": "0xad007675d238746783d697ca8cbc0260f87275430d43ba08dea11d26a00e8850",\n  "witness_sender_account_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",\n  "witness_merkle_proof": [\n    "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd"\n  ]\n}\n'})}),"\n",(0,c.jsx)(n.h3,{id:"4-content-revision",children:"4. Content Revision"}),"\n",(0,c.jsxs)(n.p,{children:["A ",(0,c.jsx)(n.strong,{children:"Content Revision"})," represents the actual content of a file. It includes the file's content, hash, and nonce."]}),"\n",(0,c.jsx)(n.h4,{id:"properties-3",children:"Properties:"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"previous_verification_hash"})}),": (String) The hash of the previous revision in the chain."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"local_timestamp"})}),": (String) The timestamp of the revision in ",(0,c.jsx)(n.code,{children:"YYYYMMDDHHMMSS"})," format."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"revision_type"})}),": (String) The type of revision, always ",(0,c.jsx)(n.code,{children:'"file"'})," for this type."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"content"})}),": (String) The content of the file."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"file_hash"})}),": (String) The hash of the file content."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"file_nonce"})}),": (String) A unique nonce associated with the file."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"version"})}),": (String) The schema version and hashing method used."]}),"\n"]}),"\n",(0,c.jsx)(n.h4,{id:"example-3",children:"Example:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "previous_verification_hash": "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab",\n  "local_timestamp": "20250224154548",\n  "revision_type": "file",\n  "content": "GNU GENERAL PUBLIC LICENSE...",\n  "file_hash": "bd7aec058dde7038fa2e88607ca870bd88da53e6fc32d6c0f8674b59419c061b",\n  "file_nonce": "2da1dc9f782e9f489c35cbd01413399f7c8ac14b3deea6c428b2380dbc7af725",\n  "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar"\n}\n'})}),"\n",(0,c.jsx)(n.h2,{id:"file-index",children:"File Index"}),"\n",(0,c.jsxs)(n.p,{children:["The ",(0,c.jsx)(n.code,{children:"file_index"})," object maps revision hashes to file names."]}),"\n",(0,c.jsx)(n.h4,{id:"example-4",children:"Example:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4": "LICENSE"\n}\n'})}),"\n",(0,c.jsx)(n.h2,{id:"tree-structure",children:"Tree Structure"}),"\n",(0,c.jsxs)(n.p,{children:["The ",(0,c.jsx)(n.code,{children:"tree"})," object represents the hierarchical structure of revisions. Each node contains a ",(0,c.jsx)(n.code,{children:"hash"})," and an array of ",(0,c.jsx)(n.code,{children:"children"}),"."]}),"\n",(0,c.jsx)(n.h4,{id:"example-5",children:"Example:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "hash": "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4",\n  "children": [\n    {\n      "hash": "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",\n      "children": [\n        {\n          "hash": "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab",\n          "children": [\n            {\n              "hash": "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3",\n              "children": []\n            }\n          ]\n        }\n      ]\n    }\n  ]\n}\n'})}),"\n",(0,c.jsx)(n.h2,{id:"tree-mapping",children:"Tree Mapping"}),"\n",(0,c.jsxs)(n.p,{children:["The ",(0,c.jsx)(n.code,{children:"treeMapping"})," object provides paths to specific revisions and identifies the latest revision hash."]}),"\n",(0,c.jsx)(n.h4,{id:"properties-4",children:"Properties:"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"paths"})}),": (Object) Maps revision hashes to their paths in the tree."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:"latestHash"})}),": (String) The hash of the latest revision."]}),"\n"]}),"\n",(0,c.jsx)(n.h4,{id:"example-6",children:"Example:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "paths": {\n    "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3": [\n      "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4",\n      "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",\n      "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab",\n      "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3"\n    ]\n  },\n  "latestHash": "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3"\n}\n'})}),"\n",(0,c.jsx)(n.h2,{id:"example-7",children:"Example"}),"\n",(0,c.jsx)(n.p,{children:"Below is a complete example on how Aquatree looks like"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "revisions": {\n    "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4": {\n      "previous_verification_hash": "",\n      "local_timestamp": "20250224154438",\n      "revision_type": "file",\n      "file_hash": "bd2e8e2a1b3c5d008e1d43ecb11105f42c5ad4e05922bab98981840b636c661e",\n      "file_nonce": "65eddd0e16a995170dbef8feaf86a7928678426f20a309bb6627887915c04efb",\n      "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar"\n    },\n    "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd": {\n      "previous_verification_hash": "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4",\n      "local_timestamp": "20250224154448",\n      "revision_type": "signature",\n      "signature": "0x799cd8177dc2c5dc34d389601175d550466a73509b71d533aaa3ff0ee958b3b31b574bdfd158a7ad0b186da5f5b440bc18453a6848bc659ccd6de06a09d6ea6e1b",\n      "signature_public_key": "0x0380a77a1a6d59be5c10d7ee5e10def79283938bb8a60025d0fe5404e650e8ccc1",\n      "signature_wallet_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",\n      "signature_type": "ethereum:eip-191",\n      "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar"\n    },\n    "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab": {\n      "previous_verification_hash": "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",\n      "local_timestamp": "20250224154506",\n      "revision_type": "witness",\n      "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar",\n      "witness_merkle_root": "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",\n      "witness_timestamp": 1740411910,\n      "witness_network": "sepolia",\n      "witness_smart_contract_address": "0x45f59310ADD88E6d23ca58A0Fa7A55BEE6d2a611",\n      "witness_transaction_hash": "0xad007675d238746783d697ca8cbc0260f87275430d43ba08dea11d26a00e8850",\n      "witness_sender_account_address": "0x568a94a8f0f3dc0b245b853bef572075c1df5c50",\n      "witness_merkle_proof": [\n        "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd"\n      ]\n    },\n    "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3": {\n      "previous_verification_hash": "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab",\n      "local_timestamp": "20250224154548",\n      "revision_type": "file",\n      "content": "GNU GENERAL PUBLIC LICENSE...",\n      "file_hash": "bd7aec058dde7038fa2e88607ca870bd88da53e6fc32d6c0f8674b59419c061b",\n      "file_nonce": "2da1dc9f782e9f489c35cbd01413399f7c8ac14b3deea6c428b2380dbc7af725",\n      "version": "aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar"\n    }\n  },\n  "file_index": {\n    "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4": "LICENSE"\n  },\n  "treeMapping": {\n    "paths": {\n      "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3": [\n        "0xe2922c4c80060a035fa7ace36ed7d9e32aa901382b5651e9f68354bc1bc9edb4",\n        "0x115d8604f5c689602b7703ce5f4c1ba59a731c9c1a3798cbd2d205df1e772ebd",\n        "0x121a8e95204fafdd18fb1ea1287c278693f48b28d88e341f86e3c336e9731eab",\n        "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3"\n      ]\n    },\n    "latestHash": "0x105356040bab31f82778a47bb24604bb966a6994b3f3fccc14e0b084f634bde3"\n  }\n}\n'})}),"\n",(0,c.jsx)(n.p,{children:"The above is a comprehensive overview of the schema and its components."})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}}}]);