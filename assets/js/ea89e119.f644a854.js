"use strict";(self.webpackChunkaqua_docs_v_2=self.webpackChunkaqua_docs_v_2||[]).push([[7536],{1663:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"getting-started","title":"Getting Started","description":"Data Structure:","source":"@site/versioned_docs/version-1.2.0/getting-started.md","sourceDirName":".","slug":"/getting-started","permalink":"/docs/v2/getting-started","draft":false,"unlisted":false,"editUrl":"https://github.com/inblockio/versioned_docs/version-1.2.0/getting-started.md","tags":[],"version":"1.2.0","sidebarPosition":2,"frontMatter":{"title":"Getting Started","sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Prologue","permalink":"/docs/v2/prologue"},"next":{"title":"Introduction","permalink":"/docs/v2/Components/intro"}}');var s=n(4848),a=n(8453);const r={title:"Getting Started",sidebar_position:2},o=void 0,h={},d=[{value:"Data Structure:",id:"data-structure",level:2},{value:"Revision",id:"revision",level:3},{value:"Page",id:"page",level:3},{value:"Witness",id:"witness",level:3},{value:"Witness Network",id:"witness-network",level:3}];function l(e){const t={h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{id:"data-structure",children:"Data Structure:"}),"\n",(0,s.jsx)(t.p,{children:"This are the basics to get you started but for a thorough understanding one done with the sections below have a look at references section to  get a thorough understanding for example what is a witness, wtness network and how are witness hash created."}),"\n",(0,s.jsx)(t.p,{children:"The aqua chain structure can be broken into a the following components :"}),"\n",(0,s.jsx)(t.h3,{id:"revision",children:"Revision"}),"\n",(0,s.jsx)(t.p,{children:"A revision is the smallest portable entity within the AQP. Multiple revisions\nform a single portable hash chain which is serialized in JSON format.\nThey have existed before in unsecured systems where multiple revisions form a\nfile which can be displayed as a page. The AQP adds the cryptographic harness\nto secure it. With presenting a portable hash chain, it is possible to track\nall incremental changes stored in each revision to understand the history of a\npage and how it came to be. This allows us to have version control on digital\nassets being able to restore earlier states and to relate to them. This allows\nus to have historical evidence of digital assets."}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(t.p,{children:"Every revision is represented by a merkle-root hash representing a list of alphabetically ordered key-value pairs which are hashed (implementation example SHA3-512). This allows us to dynamically change the data structure without the need to introduce breaking protocol changes."}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"The input data MUST NOT have dublicated keys as this would lead to non-deterministic ordering."}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Aqua-Chain: Is a portable hash-chain. This provides immutability for the history of the file, once signed and/or witnessed with the respective security guarantees.\nAqua-revisions form a portable Aqua-Chain."}),"\n",(0,s.jsx)(t.p,{children:"There are 4 Types of Revisions:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Content Revision: Contains the data object(the data/file encoded to base 64).This is used to secure the data integrity and reference the data object for provenance purposes."}),"\n",(0,s.jsx)(t.li,{children:"Signature Revision: Is used to cryptographically sign, we are currently supporting  Ethereum signatures."}),"\n",(0,s.jsx)(t.li,{children:"Witness Revision: Used to witness the Hash to prove its existence. We are supporting Ethereum by default."}),"\n",(0,s.jsx)(t.li,{children:"Metadata Revision: used to ensure content revision is valid."}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"page",children:"Page"}),"\n",(0,s.jsx)(t.p,{children:"A page is a visible representation of a file containing multiple or a single\nrevision attributed to a shared origin. A page view could also be used to\ncreate a new revision by a used service which interfaces with the file for\nmanipulation. In AQP all revisions share a global URI hash to\nattribute them together called a genesis hash."}),"\n",(0,s.jsx)(t.h3,{id:"witness",children:"Witness"}),"\n",(0,s.jsx)(t.p,{children:"We define witnessing as the process of observing an event. A witness is judged\nby their capability to recollect and share an observed event. In other words,\nwitnessing is the process of storing input data for later playback to provide\ndata symmetry around an event."}),"\n",(0,s.jsx)(t.h3,{id:"witness-network",children:"Witness Network"}),"\n",(0,s.jsx)(t.p,{children:"The digital service in a distributed ledger or similar infrastructure which\nprovides transaction security and data symmetry for shared data within the\nnetwork. An example of a witness network would be Ethereum."}),"\n",(0,s.jsx)(t.p,{children:"E.g. Ethereum can be used to store a digital fingerprint of a domain snapshot\nof a data vault. A domain snapshot is the Merklized state of all witnessed hash\nchains being present in the data vault. It is required to pay the witness\nnetwork for its service. In the case of Ethereum, this is done using 'Ether'.\nThis in return allows the account owner to create an 'undeniable' proof that a\nspecific revision and the previous revisions within a hash chain has existed."})]})}function c(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>o});var i=n(6540);const s={},a=i.createContext(s);function r(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);