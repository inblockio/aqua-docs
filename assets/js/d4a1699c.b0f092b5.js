"use strict";(self.webpackChunkaqua_docs_v_2=self.webpackChunkaqua_docs_v_2||[]).push([[3478],{8453:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>c});var i=s(6540);const r={},l=i.createContext(r);function d(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),i.createElement(l.Provider,{value:n},e.children)}},8727:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>t,contentTitle:()=>c,default:()=>h,frontMatter:()=>d,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"RestAPI","title":"Aqua Protocol Version 3","description":"REST API Specification for Aqua-Protocol (Version 3.2-1)","source":"@site/versioned_docs/version-1.3.2/RestAPI.md","sourceDirName":".","slug":"/RestAPI","permalink":"/docs/v3/RestAPI","draft":false,"unlisted":false,"editUrl":"https://github.com/inblockio/versioned_docs/version-1.3.2/RestAPI.md","tags":[],"version":"1.3.2","frontMatter":{"title":"Aqua Protocol Version 3","menu":{"main":{"weight":10}}},"sidebar":"tutorialSidebar","next":{"title":"Aqua Protocol Version 3","permalink":"/docs/v3/intro"}}');var r=s(4848),l=s(8453);const d={title:"Aqua Protocol Version 3",menu:{main:{weight:10}}},c=void 0,t={},o=[{value:"REST API Specification for Aqua-Protocol (Version 3.2-1)",id:"rest-api-specification-for-aqua-protocol-version-32-1",level:2},{value:"Base URL",id:"base-url",level:2},{value:"Authentication",id:"authentication",level:2},{value:"Endpoints",id:"endpoints",level:2},{value:"1. Get Aqua Tree Latest",id:"1-get-aqua-tree-latest",level:3},{value:"Authentication",id:"authentication-1",level:2},{value:"1. Get Aqua Tree Latest",id:"1-get-aqua-tree-latest-1",level:3},{value:"Get Aqua Tree Branch",id:"get-aqua-tree-branch",level:2},{value:"Get Aqua Tree Revision",id:"get-aqua-tree-revision",level:2},{value:"Post New Tree Revision",id:"post-new-tree-revision",level:2},{value:"Verify Aqua Tree",id:"verify-aqua-tree",level:2},{value:"Session Handling",id:"session-handling",level:2},{value:"Login",id:"login",level:3},{value:"Logout",id:"logout",level:3},{value:"Session Info",id:"session-info",level:3},{value:"Configuration (JSON)",id:"configuration-json",level:2},{value:"Error Handling Examples",id:"error-handling-examples",level:2},{value:"Minimal Mode",id:"minimal-mode",level:3},{value:"Verbose Mode",id:"verbose-mode",level:3},{value:"Get File Object",id:"get-file-object",level:2},{value:"Open Todos for the API",id:"open-todos-for-the-api",level:2}];function a(e){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"rest-api-specification-for-aqua-protocol-version-32-1",children:"REST API Specification for Aqua-Protocol (Version 3.2-1)"}),"\n",(0,r.jsx)(n.h2,{id:"base-url",children:"Base URL"}),"\n",(0,r.jsx)(n.p,{children:"/aqua/v3.2-1/"}),"\n",(0,r.jsx)(n.h2,{id:"authentication",children:"Authentication"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Requirement"}),": All endpoints except ",(0,r.jsx)(n.code,{children:"/session"})," (POST) require a ",(0,r.jsx)(n.code,{children:"Bearer"})," JWT in the ",(0,r.jsx)(n.code,{children:"Authorization"})," header."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"JWT Details"}),": Issued via SIWE-OIDC, tied to the user\u2019s Ethereum wallet address (secp256k1-derived), configurable lifespan (default: 1 hour)."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"endpoints",children:"Endpoints"}),"\n",(0,r.jsx)(n.h3,{id:"1-get-aqua-tree-latest",children:"1. Get Aqua Tree Latest"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Method"}),": ",(0,r.jsx)(n.code,{children:"GET"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Path"}),": ",(0,r.jsx)(n.code,{children:"/trees/{genesisHash}/latest"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": Retrieves all latest revision hashes across all branches of the tree starting from the genesis hash."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Query Params"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"includeMetadata"})," (boolean, default: ",(0,r.jsx)(n.code,{children:"false"}),"): Include full revision details."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Response"})," (minimal):"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:' {\r\n   "latest": [\r\n     "0x4d8f16e234aee6738325cb4e4bee0a4ae83e251614bbf1620961e3af9f702554",\r\n     "0xsomeotherhash..."\r\n   ]\r\n }\n'})}),"\n",(0,r.jsx)(n.h2,{id:"authentication-1",children:"Authentication"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Requirement"}),": All endpoints except ",(0,r.jsx)(n.code,{children:"/session"})," (POST) require a ",(0,r.jsx)(n.code,{children:"Bearer"})," JWT in the ",(0,r.jsx)(n.code,{children:"Authorization"})," header."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"JWT Details"}),": Issued via SIWE-OIDC, tied to the user\u2019s Ethereum wallet address (secp256k1-derived), configurable lifespan (default: 1 hour)."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"1-get-aqua-tree-latest-1",children:"1. Get Aqua Tree Latest"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Method"}),": ",(0,r.jsx)(n.code,{children:"GET"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Path"}),": ",(0,r.jsx)(n.code,{children:"/trees/:revisionHash/latest"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": Retrieves all latest revision hashes across all branches of the tree starting from the genesis hash."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Query Params"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"includeMetadata"})," (boolean, default: ",(0,r.jsx)(n.code,{children:"false"}),"): Include full revision details."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Response"})," (minimal):"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:' {\r\n   "latest": [\r\n     "0x4d8f16e234aee6738325cb4e4bee0a4ae83e251614bbf1620961e3af9f702554",\r\n     "0xsomeotherhash..."\r\n   ]\r\n }\n'})}),"\n",(0,r.jsx)(n.p,{children:"Response (with includeMetadata=true):"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n"latest": [\r\n  {\r\n    "verification_hash": "0x4d8f16e234aee6738325cb4e4bee0a4ae83e251614bbf1620961e3af9f702554",\r\n    "revision_type": "link",\r\n    "local_timestamp": "20250223204717",\r\n    "previous_verification_hash": "0xc828a5579c69923a66db6b06e6e47c31dc08ccc8f8340d8e2b190683dc76de21"\r\n  }\r\n]\r\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"Status Codes:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"200"}),": Success"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"404"}),": Genesis hash not found"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"401"}),": Unauthorized"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"get-aqua-tree-branch",children:"Get Aqua Tree Branch"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Method"}),": ",(0,r.jsx)(n.code,{children:"GET"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Path"}),": ",(0,r.jsx)(n.code,{children:"/trees/:revisionHash/branch"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": Retrieves the branch from the specified hash back to the genesis hash (backward traversal only)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Query Params"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"page"})," (int, optional, default: ",(0,r.jsx)(n.code,{children:"1"}),"): Pagination page."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"limit"})," (int, optional, default: ",(0,r.jsx)(n.code,{children:"100"}),"): Revisions per page."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Response"}),":","\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "branch": [\r\n    {\r\n      "verification_hash": "0x4d8f16e234aee6738325cb4e4bee0a4ae83e251614bbf1620961e3af9f702554",\r\n      "revision_type": "link",\r\n      "local_timestamp": "20250223204717",\r\n      "previous_verification_hash": "0xc828a5579c69923a66db6b06e6e47c31dc08ccc8f8340d8e2b190683dc76de21"\r\n    },\r\n    "..."\r\n  ],\r\n  "pagination": {\r\n    "page": 1,\r\n    "limit": 100,\r\n    "total": 4\r\n  }\r\n}\n'})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Notes"}),": ",(0,r.jsx)(n.code,{children:"pagination"})," omitted if not used (no ",(0,r.jsx)(n.code,{children:"page"})," or ",(0,r.jsx)(n.code,{children:"limit"})," provided)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Status Codes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"200"}),": Success"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"404"}),": Branch hash not found"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"401"}),": Unauthorized"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"get-aqua-tree-revision",children:"Get Aqua Tree Revision"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Method"}),": ",(0,r.jsx)(n.code,{children:"GET"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Path"}),": ",(0,r.jsx)(n.code,{children:"/trees/:revisionHash"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": Retrieves details of a specific revision."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Response"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "verification_hash": "0x97b36fbde14bfddaa639c7d3b8416d44781ccc1092e536e01c4a7dbd0c90eff9",\r\n  "previous_verification_hash": "",\r\n  "local_timestamp": "20250218190616",\r\n  "revision_type": "file",\r\n  "file_hash": "a7bf1f3efdfaad71b28125b91c1403cba0eaf6db2c8dff9a438d13754de5b468",\r\n  "file_nonce": "ztqu4gByEgd0WKGgakpwMoK2WhieZ-WE0ztzQhCWJ2Y"\r\n}\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Status Codes"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"200"}),": Success"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"404"}),": Revision not found"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"401"}),": Unauthorized"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"post-new-tree-revision",children:"Post New Tree Revision"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Method"}),": ",(0,r.jsx)(n.code,{children:"POST"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Path"}),": ",(0,r.jsx)(n.code,{children:"/trees"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": Creates a new revision, validated against ",(0,r.jsx)(n.code,{children:"aqua-verifier-js-lib"})," verifier."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Request Body"})," (example for ",(0,r.jsx)(n.code,{children:"signature"})," type):"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "previous_verification_hash": "0x6c64a40493862be542a0c6eb016df21d4c1c6c11208ecc0013d0c209679bc962",\r\n  "revision_type": "signature",\r\n  "signature": "0x6fbf1437d6532e97edc08b7b1e7c09ed21103abc1b6d324550585fbf85e8bfb858e570f4cc35432da45b76aec1d933c7a5870ecba3e06fa29cf510f2cfa0165f1c",\r\n  "signature_public_key": "0x0219b2dee3f0691f26ce35104b7411d379e15dc62ae8d3a0797b7257e87e7a5821",\r\n  "signature_wallet_address": "0x011d801fd833eb98109aaca1923f7652cf16db7f",\r\n  "signature_type": "ethereum:eip-191"\r\n}\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Response"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "verification_hash": "0xc828a5579c69923a66db6b06e6e47c31dc08ccc8f8340d8e2b190683dc76de21",\r\n  "local_timestamp": "20250223210000"\r\n}\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Validation"}),": Rejects if:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"previous_verification_hash"})," doesn\u2019t exist."]}),"\n",(0,r.jsxs)(n.li,{children:["Revision type or fields are invalid/malformed (per ",(0,r.jsx)(n.code,{children:"aqua-verifier-js-lib"}),")."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Status Codes"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"201"}),": Created"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"400"}),": Invalid/malformed revision (with error details if ",(0,r.jsx)(n.code,{children:"error_mode=verbose"}),")"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"404"}),": Previous hash not found"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"401"}),": Unauthorized"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"verify-aqua-tree",children:"Verify Aqua Tree"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Method"}),": ",(0,r.jsx)(n.code,{children:"POST"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Path"}),": ",(0,r.jsx)(n.code,{children:"/verify"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": Delegates verification to ",(0,r.jsx)(n.code,{children:"aqua-verifier-js-lib"}),", returns a detailed report."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Request Body"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "revisions": {\r\n    "0x97b36fbde14bfddaa639c7d3b8416d44781ccc1092e536e01c4a7dbd0c90eff9": {\r\n      "previous_verification_hash": "",\r\n      "local_timestamp": "20250218190616",\r\n      "revision_type": "file",\r\n      "file_hash": "a7bf1f3efdfaad71b28125b91c1403cba0eaf6db2c8dff9a438d13754de5b468",\r\n      "file_nonce": "ztqu4gByEgd0WKGgakpwMoK2WhieZ-WE0ztzQhCWJ2Y"\r\n    }\r\n  }\r\n}\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Response"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "report": {\r\n    "0x97b36fbde14bfddaa639c7d3b8416d44781ccc1092e536e01c4a7dbd0c90eff9": {\r\n      "status": "valid",\r\n      "details": "Verification passed per aqua-verifier-js-lib"\r\n    }\r\n  }\r\n}\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Status Codes"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"200"}),": Success"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"400"}),": Malformed input"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"401"}),": Unauthorized"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"session-handling",children:"Session Handling"}),"\n",(0,r.jsx)(n.h3,{id:"login",children:"Login"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Method"}),": ",(0,r.jsx)(n.code,{children:"POST"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Path"}),": ",(0,r.jsx)(n.code,{children:"/session"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Request Body"})," (SIWE-OIDC):"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "message": "example.com wants you to sign in with your Ethereum account...",\r\n  "signature": "0x..."\r\n}\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Response"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "token": "jwt...",\r\n  "expires_at": "20250223214400",\r\n  "wallet_address": "0x011d801fd833eb98109aaca1923f7652cf16db7f"\r\n}\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Status Codes"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"201"}),": Session created"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"400"}),": Invalid SIWE message/signature"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"logout",children:"Logout"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Method"}),": ",(0,r.jsx)(n.code,{children:"DELETE"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Path"}),": ",(0,r.jsx)(n.code,{children:"/session"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Response"}),": ",(0,r.jsx)(n.code,{children:"204 No Content"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Status Codes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"204"}),": Success"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"401"}),": Unauthorized"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"session-info",children:"Session Info"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Method"}),": ",(0,r.jsx)(n.code,{children:"GET"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Path"}),": ",(0,r.jsx)(n.code,{children:"/session"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Response"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "wallet_address": "0x011d801fd833eb98109aaca1923f7652cf16db7f",\r\n  "expires_at": "20250223214400"\r\n}\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Status Codes"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"200"}),": Success"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"401"}),": Unauthorized"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"configuration-json",children:"Configuration (JSON)"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "session": {\r\n    "jwt_lifespan": 3600\r\n  },\r\n  "rate_limit": {\r\n    "requests_per_minute": 600\r\n  },\r\n  "error_mode": "verbose",\r\n  "key_filter": {\r\n    "mode": "whitelist",\r\n    "keys": ["0x011d801fd833eb98109aaca1923f7652cf16db7f"]\r\n  }\r\n}\n'})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Notes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"error_mode"}),": ",(0,r.jsx)(n.code,{children:'"minimal"'})," (HTTP status only) or ",(0,r.jsx)(n.code,{children:'"verbose"'})," (detailed messages)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"key_filter"}),": ",(0,r.jsx)(n.code,{children:'"all"'}),", ",(0,r.jsx)(n.code,{children:'"blacklist"'}),", or ",(0,r.jsx)(n.code,{children:'"whitelist"'})," for Ethereum wallet addresses."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"error-handling-examples",children:"Error Handling Examples"}),"\n",(0,r.jsx)(n.h3,{id:"minimal-mode",children:"Minimal Mode"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"400 Bad Request"})," (no body)"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"verbose-mode",children:"Verbose Mode"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Invalid Revision"}),":","\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n  "error": "Invalid revision",\r\n  "details": "Missing \'signature\' field for revision_type \'signature\'"\r\n}\n'})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"get-file-object",children:"Get File Object"}),"\n",(0,r.jsx)(n.p,{children:"Scalability: Use HTTP range requests (via Range header) to support partial downloads, enabling clients to resume transfers or fetch chunks of large files.\r\nIntegrity: Return the file\u2019s hash in the response headers (e.g., Content-MD5 or a custom header like X-File-Hash) so clients can verify the file matches the requested hash.\r\nEfficiency: Stream the file content to handle large sizes without loading everything into memory."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Method"}),": ",(0,r.jsx)(n.code,{children:"GET"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Path"}),": ",(0,r.jsx)(n.code,{children:"/files/:fileHash"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": Retrieves the file object associated with the specified file hash. Supports large files via streaming and partial content delivery."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Query Params"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["None required; optional params like ",(0,r.jsx)(n.code,{children:"download"})," (boolean) could be added later for forcing downloads vs. inline display."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Headers"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Range"})," (optional): Specifies byte range (e.g., ",(0,r.jsx)(n.code,{children:"bytes=0-1048575"})," for first 1MB). Supports partial content retrieval per RFC 7233."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Response"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Status"}),": ",(0,r.jsx)(n.code,{children:"200 OK"})," (full file) or ",(0,r.jsx)(n.code,{children:"206 Partial Content"})," (range request)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Headers"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Content-Type"}),": MIME type of the file (e.g., ",(0,r.jsx)(n.code,{children:"application/octet-stream"})," if unknown)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Content-Length"}),": Size of the returned content in bytes."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"X-File-Hash"}),": The file\u2019s hash (e.g., ",(0,r.jsx)(n.code,{children:"a7bf1f3efdfaad71b28125b91c1403cba0eaf6db2c8dff9a438d13754de5b468"}),") for client-side verification."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Accept-Ranges"}),": ",(0,r.jsx)(n.code,{children:"bytes"})," (indicates range requests are supported)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Content-Range"})," (if ",(0,r.jsx)(n.code,{children:"206"}),"): Byte range delivered (e.g., ",(0,r.jsx)(n.code,{children:"bytes 0-1048575/5242880"}),")."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Body"}),": The file content, streamed as a binary response."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Example Response"})," (full file):","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Status"}),": ",(0,r.jsx)(n.code,{children:"200 OK"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Headers"}),":","\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Content-Type: application/pdf\r\nContent-Length: 5242880\r\nX-File-Hash: a7bf1f3efdfaad71b28125b91c1403cba0eaf6db2c8dff9a438d13754de5b468\r\nAccept-Ranges: bytes\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Body"}),": [binary file content]"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Example Response"})," (partial file):","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Request Header"}),": ",(0,r.jsx)(n.code,{children:"Range: bytes=0-1048575"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Status"}),": ",(0,r.jsx)(n.code,{children:"206 Partial Content"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Headers"}),":","\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Content-Type: application/pdf\r\nContent-Length: 1048576\r\nX-File-Hash: a7bf1f3efdfaad71b28125b91c1403cba0eaf6db2c8dff9a438d13754de5b468\r\nAccept-Ranges: bytes\r\nContent-Range: bytes 0-1048575/5242880\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Body"}),": [first 1MB of binary file content]"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Status Codes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"200"}),": Success (full file delivered)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"206"}),": Partial Content (range request fulfilled)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"404"}),": File hash not found"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"401"}),": Unauthorized"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"416"}),": Range Not Satisfiable (if requested range is invalid)"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Notes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Clients can verify integrity by comparing the ",(0,r.jsx)(n.code,{children:"X-File-Hash"})," with the requested ",(0,r.jsx)(n.code,{children:"fileHash"}),"."]}),"\n",(0,r.jsx)(n.li,{children:"Large files are streamed to avoid memory overload; range support enables resumable downloads."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Explanation"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Path"}),": /files/",":fileHash"," keeps it intuitive and consistent with /trees/",":revisionHash","."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Range Support"}),": Using the Range header and 206 Partial Content status allows clients to fetch large files in chunks, critical for scalability and reliability (e.g., resuming interrupted downloads)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Integrity"}),": The X-File-Hash header echoes the file\u2019s hash back, letting clients confirm the delivered content matches the request. This is lightweight and leverages standard HTTP practices."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Streaming"}),": The response body is streamed, ensuring the server can handle large files without buffering everything in memory."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"open-todos-for-the-api",children:"Open Todos for the API"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Add support for file deletion"}),"\n",(0,r.jsx)(n.li,{children:"add support for revision deletion"}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}}}]);