"use strict";(self.webpackChunkaqua_docs_v_2=self.webpackChunkaqua_docs_v_2||[]).push([[7909],{288:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>r,contentTitle:()=>s,default:()=>l,frontMatter:()=>c,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"protocol/data-accounting","title":"Data Accounting","description":"Introduces the concept of Data Accounting\\n","source":"@site/docs/protocol/data-accounting.md","sourceDirName":"protocol","slug":"/protocol/data-accounting","permalink":"/docs/protocol/data-accounting","draft":false,"unlisted":false,"editUrl":"https://github.com/inblockio/docs/protocol/data-accounting.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"title":"Data Accounting","linkTitle":"Data Accounting","weight":5,"sidebar_position":6,"description":"Introduces the concept of Data Accounting\\n"},"sidebar":"tutorialSidebar","previous":{"title":"Assurance Levels (AAL)","permalink":"/docs/protocol/assurance-levels-aal"},"next":{"title":"Data Governance","permalink":"/docs/protocol/data-governance"}}');var o=a(4848),i=a(8453);const c={title:"Data Accounting",linkTitle:"Data Accounting",weight:5,sidebar_position:6,description:"Introduces the concept of Data Accounting\n"},s=void 0,r={},d=[{value:"Metering data / anchoring data in space",id:"metering-data--anchoring-data-in-space",level:2},{value:"Accounting data / anchoring data to account",id:"accounting-data--anchoring-data-to-account",level:2},{value:"Proof of existence / anchoring data to time",id:"proof-of-existence--anchoring-data-to-time",level:2},{value:"Practical accounting",id:"practical-accounting",level:2}];function h(e){const t={a:"a",em:"em",h2:"h2",p:"p",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.p,{children:"We first exchanged goods, then we used means to exchange goods, such as\nshells and coins. Today we use money. We have transitioned to a world where\nwe present and exchange data to receive goods and services."}),"\n",(0,o.jsx)(t.p,{children:"The system for accounting provided by Luca Pacioli, the double-entry\naccounting is the foundation of our work. We present a modern\nway to do double-entry bookkeeping for data."}),"\n",(0,o.jsx)(t.p,{children:"Data accounting is the process of metering data in a standardized unit\nof exchange, and converting it into a form which can be exchanged to\nprovide data symmetry between accounts."}),"\n",(0,o.jsx)(t.p,{children:"The unit of exchange is not measured in a numeric value as found in cash\nsystems. Data have multi-dimensional value, which means they depends on your\nperspective and your relationship to data. This determines how much this\ndata-set is worth to the individual."}),"\n",(0,o.jsx)(t.p,{children:"The standard measure of exchange is a hash, representing the state of the\ndata. A SHA3-512 hash always has 128 characters, regardless of the size\nof the data it is representing."}),"\n",(0,o.jsx)(t.h2,{id:"metering-data--anchoring-data-in-space",children:"Metering data / anchoring data in space"}),"\n",(0,o.jsx)(t.p,{children:"To meter data, we can refer to them using a digital fingerprint, i.e. their\nhash. This allows us to refer to the data in a consistent form. The hash has\ncaptured sufficient entropy to be unique, so it becomes a unique resource\nlocator. This ensures that it is always deterministic to what data we relate\nto."}),"\n",(0,o.jsx)(t.h2,{id:"accounting-data--anchoring-data-to-account",children:"Accounting data / anchoring data to account"}),"\n",(0,o.jsxs)(t.p,{children:["The second step is that the data is attributed to a specific account. This is\nachieved by using cryptographic signatures known as ",(0,o.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Public-key_cryptography",children:"public/private key\nencryption"}),". The public\nkey acts as a unique account address. It is necessary that the accounts in use\nare globally unique, so there is no realistic probability of a name collision\nbetween accounts. This ensures that no data is attributed by mistake to two\naccounts or more."]}),"\n",(0,o.jsx)(t.h2,{id:"proof-of-existence--anchoring-data-to-time",children:"Proof of existence / anchoring data to time"}),"\n",(0,o.jsxs)(t.p,{children:["The last step to account data is the usage of a cryptographically secure clock,\nso we know which data were witnessed first. Data can be replicated, so the\nvalue lies within the social implications of the message within the published\ndata. This cryptographic timestamping allows us to determine the first account\nto witness the data. The most secure witness-networks which provide a service\nfor cryptographic witnessing of datasets are Bitcoin and Ethereum. The first\nknown examples of partial data accounting were done by ",(0,o.jsx)(t.a,{href:"https://www.vice.com/en/article/j5nzx4/what-was-the-first-blockchain",children:"Surety in\n1995"})," and\n",(0,o.jsx)(t.a,{href:"https://petertodd.org/2016/opentimestamps-announcement",children:"OpenTimestamps in\n2012"}),"."]}),"\n",(0,o.jsx)(t.h2,{id:"practical-accounting",children:"Practical accounting"}),"\n",(0,o.jsx)(t.p,{children:"The accounting book in the data accounting age is a 'data vault' which is\ncontrolled by one or multiple accounts. This allows both personal data vaults\nor organizational data vaults."}),"\n",(0,o.jsx)(t.p,{children:"A data vault is controlled by a cryptographic wallet. The vault has the\nobjective to govern the data for the account owner who is associated with the\nvault."}),"\n",(0,o.jsx)(t.p,{children:"The vault provides a capability to export and import data, so it can be\nexchanged between data vaults. This allows for collaboration at scale, and the\nusage of data as a means of exchange."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.em,{children:"Please contribute to this article (fixing errors) by exporting it and\nsending it back with your improvement to community[at]inblock[dot]io."})})]})}function l(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},8453:(e,t,a)=>{a.d(t,{R:()=>c,x:()=>s});var n=a(6540);const o={},i=n.createContext(o);function c(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);