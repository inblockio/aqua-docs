"use strict";(self.webpackChunkaqua_docs_v_2=self.webpackChunkaqua_docs_v_2||[]).push([[2132],{6148:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>c});const o=JSON.parse('{"id":"protocol/aqua_protocol_v1_2","title":"Aqua Protocol Version 1.2","description":"Specificaiton of Aqua Protocol with example implementaiton\\n","source":"@site/docs/protocol/aqua_protocol_v1_2.md","sourceDirName":"protocol","slug":"/protocol/aqua_protocol_v1_2","permalink":"/docs/protocol/aqua_protocol_v1_2","draft":false,"unlisted":false,"editUrl":"https://github.com/inblockio/docs/protocol/aqua_protocol_v1_2.md","tags":[],"version":"current","frontMatter":{"title":"Aqua Protocol Version 1.2","linkTitle":"Aqua Protocol Version 1.2","weight":1,"description":"Specificaiton of Aqua Protocol with example implementaiton\\n"},"sidebar":"tutorialSidebar","previous":{"title":"Aqua Protocol Version v1.3","permalink":"/docs/protocol/aqua-protocol-version_1.3"},"next":{"title":"Delegated Witnessing","permalink":"/docs/protocol/delegated-witnessing"}}');var t=i(4848),s=i(8453);const r={title:"Aqua Protocol Version 1.2",linkTitle:"Aqua Protocol Version 1.2",weight:1,description:"Specificaiton of Aqua Protocol with example implementaiton\n"},l=void 0,a={},c=[{value:"Introduction",id:"introduction",level:2},{value:"System Components",id:"system-components",level:2},{value:"Core Components",id:"core-components",level:3},{value:"Prototype Implementations",id:"prototype-implementations",level:3},{value:"CLI Tools (Aquafier + Verifier)",id:"cli-tools-aquafier--verifier",level:4},{value:"Chrome Extension (Name-Resolution v1.2)",id:"chrome-extension-name-resolution-v12",level:4},{value:"PKC (Personal Knowledge Container)",id:"pkc-personal-knowledge-container",level:4},{value:"Aqua-Container (Focused on Doku-Sign Use Case)",id:"aqua-container-focused-on-doku-sign-use-case",level:4},{value:"Guardian",id:"guardian",level:4},{value:"Version 1.2 Protocol Specification",id:"version-12-protocol-specification",level:2}];function d(e){const n={a:"a",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{}),(0,t.jsx)(n.th,{})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Current version:"}),(0,t.jsx)(n.td,{children:"Aqua Protocol v1.2 Specification"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Author:"}),(0,t.jsx)(n.td,{children:"Tim Bansemer, Publius Dirac"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Date:"}),(0,t.jsx)(n.td,{children:"26.11.2024"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Status:"}),(0,t.jsx)(n.td,{children:"DRAFT / Experimental"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Implementation:"}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.a,{href:"https://github.com/inblockio/micro-pkc",children:"https://github.com/inblockio/micro-pkc"})})]})]})]}),"\n",(0,t.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,t.jsx)(n.p,{children:"Please find version 1.1 here [LINK TBD]."}),"\n",(0,t.jsx)(n.p,{children:"Major changes to version 1.1:"}),"\n",(0,t.jsx)(n.p,{children:"Change the way how verification of siganture and witness events work. They are now part of the currently written revision and always force that a new revision which is created. Verification hashes for signatures and witness events are included into the new forced written revision. This was necessary to avoid unresolvable conflicts which could be created by divergant forks of an aqua-chain in two distinct containers after sharing the original chain."}),"\n",(0,t.jsx)(n.p,{children:"Version 1.2 was used to pilot and prototype the aqua-guardian. A security compontent being used to exchange data between two or more aqua-containers (Personal-knowledge-containers) by doing access control and policy enforcement for data acccess agreements."}),"\n",(0,t.jsx)(n.h2,{id:"system-components",children:"System Components"}),"\n",(0,t.jsx)(n.h3,{id:"core-components",children:"Core Components"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Aquafier"}),": A software component that enriches files with cryptographic metadata for verification according to the Aqua protocol."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Aqua Verifier"}),": An automatic verification tool to validate aqua-chains."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"prototype-implementations",children:"Prototype Implementations"}),"\n",(0,t.jsx)(n.h4,{id:"cli-tools-aquafier--verifier",children:"CLI Tools (Aquafier + Verifier)"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Languages"}),": JavaScript (v1.2, v1.3), Rust (v1.2)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Description"}),": A command-line tool allowing users to create and verify aqua-chains."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Status"}),": Active development, pilots completed, v1.3 ongoing development"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Links"}),":","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"#",children:"Rust Version"})," (TBD)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"#",children:"JavaScript/TypeScript Version"})," (TBD)"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"chrome-extension-name-resolution-v12",children:"Chrome Extension (Name-Resolution v1.2)"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Description"}),": A Chrome web extension that enables:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Automatic verification of pages on a visited PKC."}),"\n",(0,t.jsx)(n.li,{children:"Offline verification of aqua-chains stored in the extension."}),"\n",(0,t.jsx)(n.li,{children:"Resolution of wallet addresses to names."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Link"}),": ",(0,t.jsx)(n.a,{href:"#",children:"Chrome Extension"})," (TBD)"]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"pkc-personal-knowledge-container",children:"PKC (Personal Knowledge Container)"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Description"}),": A MediaWiki-enhanced version designed to turn pages into aqua-chains with full integration of core Aqua functionalities (hash-chains, signing, witnessing with aggregation function, and verifiable links)."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Status"}),": Pilot completed with local feature completeness."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Link"}),": ",(0,t.jsx)(n.a,{href:"#",children:"PKC"})," (TBD)"]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"aqua-container-focused-on-doku-sign-use-case",children:"Aqua-Container (Focused on Doku-Sign Use Case)"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Description"}),": A Rust implementation for creating, verifying, and managing aqua-files."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Link"}),":","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"#",children:"Rust Version"})," (TBD)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"#",children:"React, TypeScript/JavaScript"})," (TBD)"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"guardian",children:"Guardian"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Description"}),": A security enforcement point for verifying, transporting, and managing access for aqua-files."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Status"}),": Pilot completed with PKC serving as an aqua-file storage."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"version-12-protocol-specification",children:"Version 1.2 Protocol Specification"}),"\n",(0,t.jsx)(n.p,{children:"TBD"})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>l});var o=i(6540);const t={},s=o.createContext(t);function r(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);