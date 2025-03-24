"use strict";(self.webpackChunkaqua_docs_v_2=self.webpackChunkaqua_docs_v_2||[]).push([[6435],{8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>a});var i=s(6540);const t={},r=i.createContext(t);function l(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(r.Provider,{value:n},e.children)}},9765:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"sdk/api/witnessing","title":"Witnessing API Reference","description":"The Aqua Protocol SDK provides three distinct witnessing methods, each offering different trade-offs in terms of security, speed, and decentralization.","source":"@site/versioned_docs/version-1.3.2/sdk/api/witnessing.md","sourceDirName":"sdk/api","slug":"/sdk/api/witnessing","permalink":"/docs/v3/sdk/api/witnessing","draft":false,"unlisted":false,"editUrl":"https://github.com/inblockio/versioned_docs/version-1.3.2/sdk/api/witnessing.md","tags":[],"version":"1.3.2","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Verification","permalink":"/docs/v3/sdk/api/verification"},"next":{"title":"Aqua Identity","permalink":"/docs/v3/AquaIdentity"}}');var t=s(4848),r=s(8453);const l={},a="Witnessing API Reference",c={},o=[{value:"Witness Types",id:"witness-types",level:2},{value:"1. Ethereum Witnessing",id:"1-ethereum-witnessing",level:3},{value:"2. Nostr Witnessing",id:"2-nostr-witnessing",level:3},{value:"3. Time Stamp Authority (TSA)",id:"3-time-stamp-authority-tsa",level:3},{value:"Batch Witnessing",id:"batch-witnessing",level:2},{value:"Verification",id:"verification",level:2},{value:"Best Practices",id:"best-practices",level:2},{value:"Common Issues",id:"common-issues",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"witnessing-api-reference",children:"Witnessing API Reference"})}),"\n",(0,t.jsx)(n.p,{children:"The Aqua Protocol SDK provides three distinct witnessing methods, each offering different trade-offs in terms of security, speed, and decentralization."}),"\n",(0,t.jsx)(n.h2,{id:"witness-types",children:"Witness Types"}),"\n",(0,t.jsx)(n.h3,{id:"1-ethereum-witnessing",children:"1. Ethereum Witnessing"}),"\n",(0,t.jsx)(n.p,{children:"Uses Ethereum blockchain for secure, decentralized witnessing."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'// Using Chainable API\nawait aqua.witness(\n  "eth",           // witnessType\n  "sepolia",       // network\n  "metamask",      // platform\n  credentials      // credentials object\n);\n\n// Using Standard API\nawait aquafier.witnessAquaTree(\n  tree,\n  "eth",\n  "sepolia",\n  "metamask",\n  credentials\n);\n'})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Features:"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Browser and Node.js support"}),"\n",(0,t.jsx)(n.li,{children:"MetaMask integration"}),"\n",(0,t.jsx)(n.li,{children:"Automatic environment detection"}),"\n",(0,t.jsx)(n.li,{children:"Chain ID validation"}),"\n",(0,t.jsx)(n.li,{children:"Network switching"}),"\n",(0,t.jsx)(n.li,{children:"Transaction monitoring"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Configuration:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const credentials = {\n  alchemy_key: "your-alchemy-key",\n  witness_eth_network: "sepolia",\n  witness_method: "metamask"\n};\n'})}),"\n",(0,t.jsx)(n.h3,{id:"2-nostr-witnessing",children:"2. Nostr Witnessing"}),"\n",(0,t.jsx)(n.p,{children:"Uses the Nostr protocol for lightweight, fast witnessing."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'// Using Chainable API\nawait aqua.witness(\n  "nostr",         // witnessType\n  "default",       // network (unused for Nostr)\n  "api",           // platform\n  credentials      // credentials object\n);\n\n// Using Standard API\nawait aquafier.witnessAquaTree(\n  tree,\n  "nostr",\n  "default",\n  "api",\n  credentials\n);\n'})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Features:"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Event creation and signing"}),"\n",(0,t.jsx)(n.li,{children:"Relay communication (damus.io)"}),"\n",(0,t.jsx)(n.li,{children:"Event verification"}),"\n",(0,t.jsx)(n.li,{children:"Timestamp validation"}),"\n",(0,t.jsx)(n.li,{children:"WebSocket handling"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Configuration:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const credentials = {\n  nostr_sk: "your-nostr-secret-key"\n};\n'})}),"\n",(0,t.jsx)(n.h3,{id:"3-time-stamp-authority-tsa",children:"3. Time Stamp Authority (TSA)"}),"\n",(0,t.jsx)(n.p,{children:"Uses RFC 3161 Time-Stamp Protocol for official timestamping."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'// Using Chainable API\nawait aqua.witness(\n  "tsa",           // witnessType\n  "default",       // network (unused for TSA)\n  "api",           // platform\n  credentials      // credentials object\n);\n\n// Using Standard API\nawait aquafier.witnessAquaTree(\n  tree,\n  "tsa",\n  "default",\n  "api",\n  credentials\n);\n'})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Features:"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"RFC 3161 compliance"}),"\n",(0,t.jsx)(n.li,{children:"ASN.1 encoding/decoding"}),"\n",(0,t.jsx)(n.li,{children:"SHA-256 verification"}),"\n",(0,t.jsx)(n.li,{children:"Timestamp extraction"}),"\n",(0,t.jsx)(n.li,{children:"Base64 handling"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"batch-witnessing",children:"Batch Witnessing"}),"\n",(0,t.jsx)(n.p,{children:"For witnessing multiple trees at once:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'// Using Chainable API\nconst trees = [tree1, tree2, tree3].map(tree => \n  new AquafierChainable(tree)\n    .witness("eth", "sepolia", "metamask", credentials)\n);\n\n// Using Standard API\nconst result = await aquafier.witnessMultipleAquaTrees(\n  trees,\n  "eth",\n  "sepolia",\n  "metamask",\n  credentials\n);\n'})}),"\n",(0,t.jsx)(n.h2,{id:"verification",children:"Verification"}),"\n",(0,t.jsx)(n.p,{children:"After witnessing, you can verify the witness proofs:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'// Using Chainable API\nconst result = await aqua\n  .witness("eth", "sepolia", "metamask", credentials)\n  .verify();\n\n// Using Standard API\nconst verified = await aquafier.verifyAquaTree(\n  witnessedTree,\n  [fileObject]\n);\n'})}),"\n",(0,t.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Choose the Right Method:"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Use Ethereum for highest security and decentralization"}),"\n",(0,t.jsx)(n.li,{children:"Use Nostr for fast, lightweight witnessing"}),"\n",(0,t.jsx)(n.li,{children:"Use TSA for official timestamp requirements"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Error Handling:"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'try {\n  await aqua.witness("eth", "sepolia", "metamask", credentials);\n} catch (error) {\n  console.error("Witnessing failed:", error);\n  const logs = aqua.getLogs();\n  // Handle failure\n}\n'})}),"\n",(0,t.jsxs)(n.ol,{start:"3",children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Monitor Transaction Status"})," (Ethereum):"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const result = await aqua\n  .witness("eth", "sepolia", "metamask", credentials);\n\n// Check logs for transaction status\nconst logs = result.getLogs();\nconst txStatus = logs.find(log => \n  log.type === "transaction_status"\n);\n'})}),"\n",(0,t.jsxs)(n.ol,{start:"4",children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.strong,{children:"Verify After Witnessing:"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const result = await aqua\n  .witness("eth", "sepolia", "metamask", credentials)\n  .verify();\n\nif (result.getVerificationValue().isOk()) {\n  console.log("Witness verified successfully");\n}\n'})}),"\n",(0,t.jsxs)(n.ol,{start:"5",children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Network Selection"})," (Ethereum):"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Use testnets (sepolia, goerli) for development"}),"\n",(0,t.jsx)(n.li,{children:"Use mainnet for production"}),"\n",(0,t.jsx)(n.li,{children:"Always check gas costs"}),"\n",(0,t.jsx)(n.li,{children:"Monitor network status"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Credential Security:"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Never expose private keys"}),"\n",(0,t.jsx)(n.li,{children:"Use environment variables"}),"\n",(0,t.jsx)(n.li,{children:"Rotate keys regularly"}),"\n",(0,t.jsx)(n.li,{children:"Monitor for unauthorized use"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"common-issues",children:"Common Issues"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Ethereum Connection:"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Check MetaMask connection"}),"\n",(0,t.jsx)(n.li,{children:"Verify network selection"}),"\n",(0,t.jsx)(n.li,{children:"Ensure sufficient gas"}),"\n",(0,t.jsx)(n.li,{children:"Check Alchemy API key"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Nostr Relay:"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Check relay connection"}),"\n",(0,t.jsx)(n.li,{children:"Verify key format"}),"\n",(0,t.jsx)(n.li,{children:"Monitor event propagation"}),"\n",(0,t.jsx)(n.li,{children:"Handle timeout errors"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"TSA Service:"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Verify service availability"}),"\n",(0,t.jsx)(n.li,{children:"Check response format"}),"\n",(0,t.jsx)(n.li,{children:"Validate timestamps"}),"\n",(0,t.jsx)(n.li,{children:"Handle encoding errors"}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}}}]);