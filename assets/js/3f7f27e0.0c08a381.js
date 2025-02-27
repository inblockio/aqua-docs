"use strict";(self.webpackChunkaqua_docs_v_2=self.webpackChunkaqua_docs_v_2||[]).push([[8929],{8453:(e,i,n)=>{n.d(i,{R:()=>c,x:()=>o});var s=n(6540);const r={},t=s.createContext(r);function c(e){const i=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),s.createElement(t.Provider,{value:i},e.children)}},9565:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>o,default:()=>a,frontMatter:()=>c,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"VerifierTests","title":"Verifier Tests","description":"Overview","source":"@site/versioned_docs/version-1.3.2/VerifierTests.md","sourceDirName":".","slug":"/VerifierTests","permalink":"/docs/v3/VerifierTests","draft":false,"unlisted":false,"editUrl":"https://github.com/inblockio/versioned_docs/version-1.3.2/VerifierTests.md","tags":[],"version":"1.3.2","frontMatter":{"title":"Verifier Tests","menu":{"main":{"weight":10}}},"sidebar":"tutorialSidebar","previous":{"title":"Rest API","permalink":"/docs/v3/RestAPI"},"next":{"title":"Aqua Protocol Version 3","permalink":"/docs/v3/intro"}}');var r=n(4848),t=n(8453);const c={title:"Verifier Tests",menu:{main:{weight:10}}},o=void 0,l={},d=[{value:"Overview",id:"overview",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Revision Verification Tests",id:"revision-verification-tests",level:2},{value:"Relational Verification Tests",id:"relational-verification-tests",level:2}];function h(e){const i={a:"a",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h2,{id:"overview",children:"Overview"}),"\n",(0,r.jsxs)(i.p,{children:["The Aqua verifier MUST validate revisions per the schema defined at ",(0,r.jsx)(i.a,{href:"https://aqua-protocol.org/docs/v3/schema_2",children:"https://aqua-protocol.org/docs/v3/schema_2"}),". This document specifies required tests for implementations to ensure compliance with the Aqua protocol, as introduced at ",(0,r.jsx)(i.a,{href:"/docs/v3/intro",children:"/docs/v3/intro"}),". Tests are divided into Revision Verification and Relational Verification domains. Implementations MUST pass all tests to be considered conformant."]}),"\n",(0,r.jsx)(i.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"Schema"}),": Implementations MUST conform to ",(0,r.jsx)(i.a,{href:"https://aqua-protocol.org/docs/v3/schema_2",children:"https://aqua-protocol.org/docs/v3/schema_2"}),"."]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"Tools"}),": Implementations MAY use any framework supporting SHA256 hashing and Ethereum EIP-191 (using the secp256k1 curve) signature validation. Implementations MAY support additional hashing algorithms (e.g., SHA3-512) or signature schemes (e.g., secp256r1) only if specified in an updated schema and supported by new, defined ",(0,r.jsx)(i.code,{children:"signature_type"})," or ",(0,r.jsx)(i.code,{children:"witness_network"})," values."]}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"revision-verification-tests",children:"Revision Verification Tests"}),"\n",(0,r.jsxs)(i.p,{children:["These tests ensure each revision object in ",(0,r.jsx)(i.code,{children:"revisions"})," is independently valid. Types MUST adhere to the schema at ",(0,r.jsx)(i.a,{href:"https://aqua-protocol.org/docs/v3/schema_2",children:"https://aqua-protocol.org/docs/v3/schema_2"}),"."]}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RV-01: Version Compliance"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["The ",(0,r.jsx)(i.code,{children:"version"})," field MUST be one of the following exact strings:","\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:'"https://aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: scalar"'})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:'"https://aqua-protocol.org/docs/schema/v1.3.2 | SHA256 | Method: tree"'})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(i.li,{children:"Implementations MUST reject any other value."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RV-02: Required Fields"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["Every revision MUST include ",(0,r.jsx)(i.code,{children:"previous_verification_hash"}),", ",(0,r.jsx)(i.code,{children:"local_timestamp"}),", ",(0,r.jsx)(i.code,{children:"revision_type"}),", and ",(0,r.jsx)(i.code,{children:"version"}),"."]}),"\n",(0,r.jsxs)(i.li,{children:["Implementations MUST reject revisions missing these fields or containing empty strings for ",(0,r.jsx)(i.code,{children:"local_timestamp"}),", ",(0,r.jsx)(i.code,{children:"revision_type"}),", or ",(0,r.jsx)(i.code,{children:"version"}),"."]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"local_timestamp"})," MUST be in YYYYMMDDHHMMSS format and MUST represent a valid UTC time after 2020-01-01 00:00:00."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RV-03: File Revision Integrity"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["A ",(0,r.jsx)(i.code,{children:"revision_type"})," of ",(0,r.jsx)(i.code,{children:'"file"'})," MUST include ",(0,r.jsx)(i.code,{children:"file_hash"})," and ",(0,r.jsx)(i.code,{children:"file_nonce"}),"."]}),"\n",(0,r.jsxs)(i.li,{children:["The ",(0,r.jsx)(i.code,{children:"file_hash"})," MUST equal the SHA256 hash of either:","\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["The referenced file content concatenated with ",(0,r.jsx)(i.code,{children:"file_nonce"}),", OR"]}),"\n",(0,r.jsxs)(i.li,{children:["The OPTIONAL ",(0,r.jsx)(i.code,{children:"content"})," field (serialized file data) concatenated with ",(0,r.jsx)(i.code,{children:"file_nonce"}),", if present."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["Implementations MUST reject revisions where ",(0,r.jsx)(i.code,{children:"file_hash"})," does not match either computation."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsxs)(i.strong,{children:["RV-04: Signature Verification | Signature Type: ethereum",":eip-191"]})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["A ",(0,r.jsx)(i.code,{children:"revision_type"})," of ",(0,r.jsx)(i.code,{children:'"signature"'})," MUST include ",(0,r.jsx)(i.code,{children:"signature"}),", ",(0,r.jsx)(i.code,{children:"signature_public_key"}),", and ",(0,r.jsx)(i.code,{children:"signature_wallet_address"}),"."]}),"\n",(0,r.jsxs)(i.li,{children:["The ",(0,r.jsx)(i.code,{children:"signature"})," MUST validate against ",(0,r.jsx)(i.code,{children:"previous_verification_hash"})," using ",(0,r.jsx)(i.code,{children:"signature_public_key"})," per ",(0,r.jsx)(i.code,{children:"signature_type"})," ",(0,r.jsx)(i.code,{children:'"ethereum:eip-191"'})," (secp256k1 curve)."]}),"\n",(0,r.jsx)(i.li,{children:"Implementations MUST reject invalid signatures."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RV-05: Witness Verification | Witness (Ethereum)"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["A ",(0,r.jsx)(i.code,{children:"revision_type"})," of ",(0,r.jsx)(i.code,{children:'"witness"'})," MUST include ",(0,r.jsx)(i.code,{children:"witness_network"}),", ",(0,r.jsx)(i.code,{children:"witness_address"}),", and ",(0,r.jsx)(i.code,{children:"witness_smart_contract_address"}),"."]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"witness_network"})," MUST be one of: ",(0,r.jsx)(i.code,{children:'"mainnet"'}),", ",(0,r.jsx)(i.code,{children:'"sepolia"'}),", ",(0,r.jsx)(i.code,{children:'"nostr"'}),", or ",(0,r.jsx)(i.code,{children:'"TSA_RFC3161"'}),". Other values MUST be rejected."]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"witness_merkle_root"}),", if present, MUST be the valid Merkle root hash derived from ",(0,r.jsx)(i.code,{children:"witness_merkle_proof"}),"."]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"witness_smart_contract_address"})," MUST be a valid Ethereum contract address for the specified ",(0,r.jsx)(i.code,{children:"witness_network"}),", capable of storing and retrieving verification hashes."]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"witness_transaction_hash"}),", if present, MUST be a valid transaction hash for the specified ",(0,r.jsx)(i.code,{children:"witness_network"}),"."]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"witness_sender_account_address"}),", if present, MUST be a valid account address for the specified ",(0,r.jsx)(i.code,{children:"witness_network"}),"."]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"witness_merkle_proof"}),", if present, MUST be a valid Merkle proof including ",(0,r.jsx)(i.code,{children:"previous_verification_hash"})," as a leaf."]}),"\n",(0,r.jsx)(i.li,{children:"Implementations MUST reject witness revisions failing these checks."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RV-06: Signature Type Restriction"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"signature_type"})," MUST be one of: ",(0,r.jsx)(i.code,{children:'"ethereum:eip-191"'})," or ",(0,r.jsx)(i.code,{children:'"did_key"'})," for signature revisions. Other values MUST be rejected."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RV-07: Witness Type Restriction"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"witness_network"})," MUST be one of: ",(0,r.jsx)(i.code,{children:'"mainnet"'}),", ",(0,r.jsx)(i.code,{children:'"sepolia"'}),", ",(0,r.jsx)(i.code,{children:'"nostr"'}),", or ",(0,r.jsx)(i.code,{children:'"TSA_RFC3161"'})," for witness revisions. Other values MUST be rejected."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RV-08: Indexed Content Verification"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["Each key in ",(0,r.jsx)(i.code,{children:"file_index"})," MUST be a valid ",(0,r.jsx)(i.code,{children:"file_hash"})," from a revision with ",(0,r.jsx)(i.code,{children:"revision_type"})," ",(0,r.jsx)(i.code,{children:'"file"'}),"."]}),"\n",(0,r.jsxs)(i.li,{children:["Implementations MUST reject ",(0,r.jsx)(i.code,{children:"file_index"})," entries referencing invalid or nonexistent ",(0,r.jsx)(i.code,{children:"file_hash"})," values."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"relational-verification-tests",children:"Relational Verification Tests"}),"\n",(0,r.jsxs)(i.p,{children:["These tests ensure consistency across ",(0,r.jsx)(i.code,{children:"revisions"}),", ",(0,r.jsx)(i.code,{children:"file_index"}),", ",(0,r.jsx)(i.code,{children:"tree"}),", and ",(0,r.jsx)(i.code,{children:"treeMapping"}),". Types MUST be strict per ",(0,r.jsx)(i.a,{href:"https://aqua-protocol.org/docs/v3/schema_2",children:"https://aqua-protocol.org/docs/v3/schema_2"}),"."]}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RL-01: Previous Hash Linking"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"previous_verification_hash"})," MUST match a valid revision key in the pool of all verified revisions or be empty for the first (genesis) revision."]}),"\n",(0,r.jsx)(i.li,{children:"Implementations MUST reject invalid or nonexistent references."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RL-02: Type: Link Revision"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["A revision referenced by revision type ",(0,r.jsx)(i.code,{children:"link"})," MUST exist and be valid in the pool of all verified revisions."]}),"\n",(0,r.jsx)(i.li,{children:"Implementations MUST reject links to invalid or missing revisions and throw an revision not found error."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RL-03: Loop Detection"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Implementations MUST have a loop detection mechanism."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RL-04: Fork Detection"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Implementations MUST have a fork detection mechanism to output deterministic results."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"RL-05: Timestamp Order"})}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Implementations MUST have a timestamp plausibility check accross revisions for local timestamps"}),"\n",(0,r.jsx)(i.li,{children:"Implementations MUST have a timestamp plausibility check for cryptographic timestamps (Witness events)"}),"\n"]}),"\n"]}),"\n"]})]})}function a(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}}}]);