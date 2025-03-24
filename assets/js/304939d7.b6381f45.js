"use strict";(self.webpackChunkaqua_docs_v_2=self.webpackChunkaqua_docs_v_2||[]).push([[5936],{3759:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>t,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"Cheque","title":"A Payment Infrastructure Prototype","description":"This prototype implements a paper-cheque equivalent using the Aqua Protocol for offline data verification, WAVs as a gateway for distributed computation and on-chain triggers, and a smart contract to manage funds securely. It enables a sender to issue a \\"cheque\\" and a receiver to cash it out via cryptographic signatures and verification.","source":"@site/versioned_docs/version-1.3.2/Cheque.md","sourceDirName":".","slug":"/Cheque","permalink":"/docs/v3/Cheque","draft":false,"unlisted":false,"editUrl":"https://github.com/inblockio/versioned_docs/version-1.3.2/Cheque.md","tags":[],"version":"1.3.2","sidebarPosition":7,"frontMatter":{"sidebar_position":7},"sidebar":"tutorialSidebar","previous":{"title":"Access Control","permalink":"/docs/v3/AccessControl"}}');var r=i(4848),a=i(8453);const t={sidebar_position:7},c="A Payment Infrastructure Prototype",d={},l=[{value:"Core Workflow",id:"core-workflow",level:2},{value:"Flow Diagram",id:"flow-diagram",level:3},{value:"Example cheque",id:"example-cheque",level:3},{value:"Step-by-Step Process",id:"step-by-step-process",level:2},{value:"1. Create the Initial Aqua Form (Sender)",id:"1-create-the-initial-aqua-form-sender",level:3},{value:"2. Sender Signs the Form",id:"2-sender-signs-the-form",level:3},{value:"3. Receiver Updates the Form",id:"3-receiver-updates-the-form",level:3},{value:"4. Receiver Signs the Form",id:"4-receiver-signs-the-form",level:3},{value:"5. Verification and Execution",id:"5-verification-and-execution",level:3},{value:"Interface Design",id:"interface-design",level:2},{value:"View 1: cheque Registration",id:"view-1-cheque-registration",level:3},{value:"View 2: cheque Cashout",id:"view-2-cheque-cashout",level:3},{value:"API Integration",id:"api-integration",level:4},{value:"Aqua Revisions with Signatures",id:"aqua-revisions-with-signatures",level:2},{value:"Verification Rules",id:"verification-rules",level:3},{value:"Additional Milestones (Aqua-Dev-Team)",id:"additional-milestones-aqua-dev-team",level:2}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",img:"img",input:"input",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"a-payment-infrastructure-prototype",children:"A Payment Infrastructure Prototype"})}),"\n",(0,r.jsxs)(n.p,{children:["This prototype implements a paper-cheque equivalent using the ",(0,r.jsx)(n.strong,{children:"Aqua Protocol"})," for offline data verification, ",(0,r.jsx)(n.strong,{children:"WAVs"})," as a gateway for distributed computation and on-chain triggers, and a ",(0,r.jsx)(n.strong,{children:"smart contract"}),' to manage funds securely. It enables a sender to issue a "cheque" and a receiver to cash it out via cryptographic signatures and verification.']}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"GitHub"}),": ",(0,r.jsx)(n.a,{href:"https://github.com/inblockio/aqua-cheque",children:"aqua-cheques"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"WAVs Gateway"}),": ",(0,r.jsx)(n.a,{href:"https://github.com/Lay3rLabs/wavs-demos",children:"wavs-demos"})]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"core-workflow",children:"Core Workflow"}),"\n",(0,r.jsx)(n.p,{children:"The system mimics a traditional cheque:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Sender creates a cheque with payment details."}),"\n",(0,r.jsx)(n.li,{children:"Sender signs it cryptographically."}),"\n",(0,r.jsx)(n.li,{children:"Receiver updates the cheque with their address and signs it."}),"\n",(0,r.jsx)(n.li,{children:"The signed cheque is verified offline via Aqua and executed on-chain via WAVs."}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"flow-diagram",children:"Flow Diagram"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Escrow Gateway Aqua",src:i(7366).A+"",width:"771",height:"632"})}),"\n",(0,r.jsx)(n.h3,{id:"example-cheque",children:"Example cheque"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://mycurrencyexchange.com/wp-content/uploads/2020/06/parts-of-a-cheque-1024x516.jpg",alt:"Paper cheque Example"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"step-by-step-process",children:"Step-by-Step Process"}),"\n",(0,r.jsx)(n.h3,{id:"1-create-the-initial-aqua-form-sender",children:"1. Create the Initial Aqua Form (Sender)"}),"\n",(0,r.jsx)(n.p,{children:"The sender defines the payment in an Aqua JSON object:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",\n  "receiver": "",\n  "amount": "0.3",\n  "currency": "ETH"\n}\n'})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"sender"})}),": Ethereum address of the payer."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"receiver"})}),": Left blank initially (filled by the receiver later)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"amount"})}),": Payment amount in the specified currency."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"currency"})}),": Token or coin type (e.g., ETH)."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"2-sender-signs-the-form",children:"2. Sender Signs the Form"}),"\n",(0,r.jsx)(n.p,{children:'The sender signs the JSON using an Ethereum EIP-191 signature. This is appended to the Aqua revision history (see "Aqua Revisions" below).'}),"\n",(0,r.jsx)(n.h3,{id:"3-receiver-updates-the-form",children:"3. Receiver Updates the Form"}),"\n",(0,r.jsx)(n.p,{children:"The receiver adds their address to the JSON:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",\n  "receiver": "0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",\n  "amount": "0.3",\n  "currency": "ETH"\n}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"4-receiver-signs-the-form",children:"4. Receiver Signs the Form"}),"\n",(0,r.jsx)(n.p,{children:"The receiver signs the updated JSON, also using EIP-191, completing the cheque."}),"\n",(0,r.jsx)(n.h3,{id:"5-verification-and-execution",children:"5. Verification and Execution"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"The signed JSON is uploaded to the WAVs gateway."}),"\n",(0,r.jsxs)(n.li,{children:["WAVs runs the Aqua library (Rust API) to verify:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Sender and receiver signatures."}),"\n",(0,r.jsxs)(n.li,{children:["Consistency of fields (e.g., ",(0,r.jsx)(n.code,{children:"amount"})," and ",(0,r.jsx)(n.code,{children:"currency"})," match between revisions)."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"If valid, WAVs triggers the on-chain smart contract to transfer funds from the sender to the receiver."}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"interface-design",children:"Interface Design"}),"\n",(0,r.jsx)(n.p,{children:"The system assumes two user-facing views interacting with the WAVs gateway:"}),"\n",(0,r.jsx)(n.h3,{id:"view-1-cheque-registration",children:"View 1: cheque Registration"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Purpose"}),": Sender uploads the initial signed JSON."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Requirements"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Smart contract whitelists the sender\u2019s address to accept the cheque."}),"\n",(0,r.jsx)(n.li,{children:"Interface submits the JSON to the WAVs instance via an API call."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"view-2-cheque-cashout",children:"View 2: cheque Cashout"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Purpose"}),": Receiver uploads the fully signed JSON for verification and payout."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Requirements"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Interface submits the updated JSON to WAVs."}),"\n",(0,r.jsx)(n.li,{children:"WAVs verifies signatures and triggers the smart contract."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"api-integration",children:"API Integration"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["WAVs may provide a built-in interface (TBD\u2014cheque ",(0,r.jsx)(n.a,{href:"https://github.com/Lay3rLabs/wavs-demos",children:"wavs-demos"}),")."]}),"\n",(0,r.jsxs)(n.li,{children:["If not, your interface must:","\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Package the JSON with signatures."}),"\n",(0,r.jsxs)(n.li,{children:["Send it to the WAVs endpoint (e.g., ",(0,r.jsx)(n.code,{children:"POST /verify"}),")."]}),"\n",(0,r.jsx)(n.li,{children:"Handle the response (success triggers payout; failure returns an error)."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Example API Call"})," (hypothetical):"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'curl -X POST https://wavs-instance.example.com/verify \\\n  -H "Content-Type: application/json" \\\n  -d \'{"aqua_json": <signed_json>}\'\n'})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"aqua-revisions-with-signatures",children:"Aqua Revisions with Signatures"}),"\n",(0,r.jsx)(n.p,{children:"Aqua tracks changes and signatures in a revision tree. Below is an example of a fully signed cheque:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "revisions": {\n    "0xd453ccae56945ce381f1adb57feef37ba77e215604fe078faa2d9527159c9c76": {\n      "previous_verification_hash": "",\n      "local_timestamp": "20250306172550",\n      "revision_type": "form",\n      "file_hash": "dd056a2c7c877716e2fd9f4f1aecfff05da6aae0158c0aa60775afa88cc1daf3",\n      "forms_sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",\n      "forms_receiver": "",\n      "forms_amount": "0.3",\n      "forms_currency": "ETH",\n      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree"\n    },\n    "0x1ea148be50e98f45996353a8b2b1eb5b8e379c2bc02c18fe875e6c52bd1ccd08": {\n      "previous_verification_hash": "0xd453ccae56945ce381f1adb57feef37ba77e215604fe078faa2d9527159c9c76",\n      "revision_type": "signature",\n      "signature": "0xd3984892d212c2613fbbea69ed669449e378f5d085326c6e2770f69e5420408515a1975a9308e058f8d33dee700b8018e372b622e8ea12934ebc0b1c1e9832f21b",\n      "signature_wallet_address": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",\n      "signature_type": "ethereum:eip-191"\n    },\n    "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c": {\n      "previous_verification_hash": "",\n      "revision_type": "form",\n      "file_hash": "00bf727b9503eeb95283eb315595a4340aae9db9abc15e77caab0a27ebb62f93",\n      "forms_sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",\n      "forms_receiver": "0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",\n      "forms_amount": "0.3",\n      "forms_currency": "ETH"\n    },\n    "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86": {\n      "previous_verification_hash": "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c",\n      "revision_type": "signature",\n      "signature": "0xabdacd337ae491914b6f2afb2e53249709983c3c98c54c66fcf07fed186a5fb751a6b29e1444bec134695ee01da8fc12b56d71b89df7801c49ce67f2068cc30d1b",\n      "signature_wallet_address": "0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",\n      "signature_type": "ethereum:eip-191"\n    }\n  },\n  "tree": {\n    "hash": "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86",\n    "children": []\n  }\n}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"verification-rules",children:"Verification Rules"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"forms_sender"})}),", ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"forms_amount"})}),", and ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"forms_currency"})})," must match between revisions."]}),"\n",(0,r.jsxs)(n.li,{children:["Only ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"forms_receiver"})})," can differ (updated by the receiver)."]}),"\n",(0,r.jsx)(n.li,{children:"Signatures must validate against the respective wallet addresses."}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"additional-milestones-aqua-dev-team",children:"Additional Milestones (Aqua-Dev-Team)"}),"\n",(0,r.jsxs)(n.ol,{className:"contains-task-list",children:["\n",(0,r.jsxs)(n.li,{className:"task-list-item",children:[(0,r.jsx)(n.input,{type:"checkbox",disabled:!0})," ",(0,r.jsx)(n.strong,{children:"Aqua Library"}),": Integrate the Rust-based Aqua API for offline verification (see ",(0,r.jsx)(n.a,{href:"https://github.com/inblockio/aqua-cheques",children:"aqua-cheques"}),")."]}),"\n",(0,r.jsxs)(n.li,{className:"task-list-item",children:[(0,r.jsx)(n.input,{type:"checkbox",disabled:!0})," ",(0,r.jsx)(n.strong,{children:"WAVs Setup"}),": Deploy a WAVs instance or use an existing one. Ensure it can:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Accept JSON submissions."}),"\n",(0,r.jsx)(n.li,{children:"Run Aqua verification."}),"\n",(0,r.jsx)(n.li,{children:"Trigger the smart contract."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{className:"task-list-item",children:[(0,r.jsx)(n.input,{type:"checkbox",disabled:!0})," ",(0,r.jsx)(n.strong,{children:"Smart Contract"}),": Deploy an escrow contract with:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Whitelisting for sender addresses."}),"\n",(0,r.jsx)(n.li,{children:"Locking cheque amoung with revision hash and amount for possible revocation"}),"\n",(0,r.jsxs)(n.li,{children:["A ",(0,r.jsx)(n.code,{children:"cashout"})," function triggered by WAVs."]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},7366:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/Escrow_Gateway_Aqua-331b8e37ca68d5f47f989a8c6580fb99.png"},8453:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>c});var s=i(6540);const r={},a=s.createContext(r);function t(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);