---
title: "Identity Protocol"
linkTitle: "Identity Protocol"
weight: 2
description: >
  Shows how it is possible to build an identity protocol on top of Aqua using data vaults.
---

The Aqua Identity Protocol (AIP) is an experimental application protocol
under development for Self Sovereign Identity's (SSIs) on top of the
Aqua Protocol. This is an active field of research which is related to
the work of the Decentralized-Identity-Foundation (DIF)[^1] and the
World-Wide-Web-Consortium[^2]. As this is under active development,
anything you see is experimental and subject to change. The goal is to
provide a Self-Sovereign-Digital Identity Protocol to protect individual
rights, freedom and the opportunity for the individual to participate in
the digital economy.

We are building on the advancements and insights for rebooting the
web-of-trust initiative[^3] and the definition of a
Self-Sovereign-Identity provided by Christopher Allen in shortened form here.[^4]

### Self-Sovereign-Identity-Principles

1.  **Existence.** Users must have an independent existence. 
2.  **Control.** Users must control their identities.
3.  **Access.** Users must have access to their own data.
4.  **Transparency.** Systems and algorithms must be transparent.
5.  **Persistence.** Identities must be long-lived.
6.  **Portability.** Information and services about identity must be transportable.
7.  **Interoperability.** Identities should be as widely usable as possible.
8.  **Consent**. Users must agree to the use of their identity.
9.  **Minimalization.** Disclosure of claims must be minimized.
10. **Protection.** The rights of users must be protected.


Those 10 stated principles are implemented within the Aqua Protocol and
it's existing reference implementation in various degrees. They are also
represented in the [Design Principles](design-principles.md).


# Architecture

For the Aqua Identity Protocol to be implemented in accordance with the
above statements, SSI-Principles and critical component choices from
outside the protocol need to be made, and required tools need to be
provided. **Data Vault**'s will provide a space which is fully account
controlled. Other architectural decisions enabling SSI can be found in
the reference implementation PKC Architecture Documentation.

### Usage of **Data Vaults** to protect identity claims

Pages with the namespace <Account>: must be 'read and write able' by
<Account> only by default. This is to protect the personal-identifiable
data of the user. This data should be stored in a place where only the
account owner has access to. This can be achieved by having the data
stored locally on a machine the account owner has, or by using
cryptography which requires the accounts owner explicit interaction to
decrypt it. The content should not be decrypted on the server, but
within the web-browser or client-application to ensure that a
potentially compromised service-provider can't leak the sensitive
information.

-   Identity claims are **encrypted by default** and can only be
    decrypted by the account owner or other accounts explicitly given
    permission to do so.
-   Identity claims **must** be given access by the account owner to
    e.g. let somebody else sign them.

Note: There should be an extra effort by any **Data Vault**
implementation to protect identity claims. It is recommended to strongly
regulate and audit the emerging solutions to ensure a high level of
protection for citizens.

### Self Issued Identity Claims

are used to make statements about an account to form an identity. Those
claims can be partially revealed on demand to other parties. Those
claims can also be protected by advancements in privacy technologies
like Zero-Knowledge-Proofs and ongoing advancements in key management.

Identity claims are sets of [Verified
Data](https://pkc.inblock.io/index.php/Verified_Data) which follow a
structured data convention to claim or attest attributes to an account.
For example, an attribute could be the year of birth of an account
owner, or the legal name of an account owner. Claims should always be
atomic to allow the account owner to disclose them selectivity.
Different claims can be combined to represent a citizen ID or a
drivers-license. Other claims can be educational certificates, like
school certificates.

Identity claims in the [Aqua Identity
Protocol](https://pkc.inblock.io/index.php/Aqua_Identity_Protocol) are
**always self issues**. This means that the first signature on the claim
needs to be from the private key which belongs to the account the claim
is issued for. This proves account ownership. This means:

-   All claims can only be issued from the account which they make a
    claim about. A claim belongs to it's origin account and can only be
    managed from it's address.
-   A claim can 'accumulate trust' by being signed by other accounts who
    support this claim.
-   Self-issuance protects accounts against spam, and the issuance of
    fraudulent claims to an account without the knowledge of the account
    owner.

##### **Claim Attestation**

Can be completed by a Trust Authority referring to the Identity Claim in
collaboration with the account owner, or a referencing statement.

It is possible **to attest to a claim** by referencing the claim's
unique revision_verification hash within the attestation. This means you
can make statements about an account or about a claim without involving
the account owner in that process. An attestation contains a statement
about the referenced data set, and is expected to be signed by the
account who makes the attestation. This ensures there is clear account
attribution. Attestations without signature should be disregarded, as
they have no account attribution.

<hr>

## <b>Specification for the Aqua Identity Protocol </b>

Policies for Self-Issued-Identity-Claims:

-   Syntax of Title: \<Account (e.g. Ethereum Wallet
    Address)>:\<Attribute (English Descriptive Title)>
-   Example:
    [0xa2026582b94feb9124231fbf7b052c39218954c2:Birthdate](https://pkc.inblock.io/index.php/0xa2026582b94feb9124231fbf7b052c39218954c2:Birthdate)

The title is not protected against changes but the content of the page
is protected.\***IMPORTANT:** Therefore we **must** compare the page
stored **<account>,<attribute>**. Then reassemble the title to check if
they are consistent before proceeding with further validation of the
identity claim.

Content of the page

-   **Account:** <account>
    -   Is repeated to reassemble the title to check it.
-   **Attribute:** <attribute_name>
    -   Is repeated to reassemble the title to check it.
-   **Value:** Is the value of the claim. E.g. '1889' for a year of
    birth.
    -   The first revision **must** be signed by the account owner to
        create a self-issued identity claim
    -   Values **must** not change within a hash-chain. If a value
        changes, the claim will be marked as invalid with the revision
        of the change. If a new attribute value needs to be defined for
        an account, this is done through a new claim.

<hr>

**Claim issuance Process**

1.  Claim is created (based on template)
2.  Claim is signed by issuer (first revision)
3.  Claim is registered by issuer (optional, done via Claim Registry)
4.  Claim is verified by authority to accumulate trust (this might
    include the requirement to hold a revocation authority on a claim
    registered via a Claim Registry)

Trust-Chains with Identity Claims

Will build a web of trust, which can be applicable not only for public
institutions, but also for commercial organizations and private
entities.

### A trust chain of identity claims for educational certificates (example)

1.  The certificate is issued as integrity verified data via the Aqua
    Protocol.
2.  The recipient of the certificate registers the certificate as an
    identity claim
3.  The certificate is signed after it was issued as an identity claim
    by a Trust Authority (e.g. the university professor) and the
    university directors office (director)
4.  The university professor holds trust claims from the university
    director
5.  The university director holds trust claims by the ministry of
    education
6.  The educational ministry of education holds trust claims by the
    minister president
7.  The minister president holds trust claims of a verified election

The chain of trust is supplied by the party signing the statement.

<i> IMPORTANT: **The authority who is given authority needs to prove
where their authority originated** **when they act in the function of
that authority.**</i>

1.  E.g. the professor needs to supply the claim of the university
    entitling him
2.  E.g. the university director needs to supply the claim of the
    educational ministry
3.  E.g. the educational ministry needs to supply the claim of the
    minister president.
4.  ... and so on.

# Verification Process

1.  Claim is presented
2.  Claim integrity is validated
    1.  How can you trust the content of a claim: Claim content needs to
        be static. E.g. a given-name claim 'Jarred Maxim' cannot change,
        even if there are many revisions to the page. If the static
        content HAS changed, the claim is INVALID or at least only valid
        until the point where it changed. In the case of such an
        information change, a new claim needs to be issued.
3.  Claim registry is validated (root trust)
4.  Claim signatures are validated
    1.  Comparison between signature time and validity of the signing
        authority. Is the account authority still valid?
    2.  lookup of authority claims from expected root trust?

### Trust in Signatures

If somebody signs an identity claim, we believe they do that to

1.  Vouch with their account for the integrity of the presented data.
    This can be supported via an Authoritative Claim and a comment which
    gets attached to the claim itself or is issued via an Attestation.
2.  To verify the signature, we use an automated verification process.
    This is done through implementations of an Aqua-Verifier like
    <https://github.com/inblockio/aqua-verifier-js> or
    [<https://github.com/inblockio/aqua-VerifyPage-chrome-extension>](https://github.com/inblockio/aqua-verifypage-chrome-extension)
    which also checks against the restrictions given by the Aqua
    Identity Protocol or/and additional defined policies.
3.  Add access rights to a claim by adding a Data Usage Agreement which
    is enforced by the Guardian. Access rights can be restricted:
    1.  to specific accounts
    2.  to specific domain id's representing an instance of a Data Vault
4.  Verification: The verification process considers which account it
    signed, and what was stated with the signature, or with the
    additional data added to the claim. To consider a claim valid, the
    relationship between the verifying party and the Trust Authority who
    signed it, is essential. Can the party be trusted? Why do I trust
    this party?
    1.  Claims can be either chained (cascaded into each other) and
        offline verified, and/or online verified against an existing
        Claim-Registry. In both cases a known trusted party account
        reference point is required for the verifying party to trust.

#### **Trust Authorities**

are accounts which have an elevated trusted position. They issue
[Authoritative Trust
Claims](https://pkc.inblock.io/index.php/Authoritative_Claim) to give
legitimacy to a self-issued identity claim.

Why do you trust a professor to issue an [Educational
Certificate](https://pkc.inblock.io/index.php/Educational_Certificate)?

Because the professor is able to provide a trust chain, represented by a
chained [Authoritative Trust
Claim](https://pkc.inblock.io/index.php/Authoritative_Claim), proving
that he has authority to attest an [Educational
Certificate](https://pkc.inblock.io/index.php/Educational_Certificate)
with his signature. With his signature, he is increasing the trust of
the self-issued [Identity
Claim](https://pkc.inblock.io/index.php/Identity_Claim) to allow it to
have practical utility.

### **Claim Registries**

A claim registry in the context of the Aqua Identity Protocol is a
global registry to allow for real-time global claim revocation and
re-instantiation of Identity Claim's. This solves the problems related
and known to certificate revocation. The Claim Registry acts like a
global Claim Revocation List (CRL)[^5].

E.g. a drivers license can be revoked by a Trust Authority and later be
re-instantiated after the 'Punishment for driving too fast' is over.
Identity claims are either valid or invalid. The Claim Registry is
managing who can revoke / re-instantiate a registered claim.

There is ongoing research and optimizations on privacy concerns to
reduce costs for on-chain Identity Claim.

Implementation in Ethereum with Smart-Contracts (Solidity). All claims
are account bound.

**Claim Registration Specification - Smart Contract Structure**

-   **<revision_verification_hash>** as root trust of the self-issued
    identity claim. A claim has to be a verified page, which is signed
    and timestamped. If all are present, the next page-verification hash
    entangles all of those properties and becomes the 'address' of the
    claim. In the receipt of the publish process for the claim, there is
    an attached receipt, and by writing the receipt into the claim,
    there is also a new revision generated. This creates the second
    revision of the claim, which entangles the signature and the witness
    event with the hash-chain to make them immutable.
-   **<status>** \[type:boolean\] of claim
    -   0 - valid
    -   1 - revoked

<!-- -->

-   **<valid until>** \[type: date DDMMYYYY\]: if current date past
    expiration date, the claim is considered expired and is not accepted
    anymore
-   **\< owner == sender address>** \[type:addess\] an account which
    updates the status of the claim e.g. revocation or suspension of an
    account
-   **\< additional revocation authority>** \[type:address\] list of
    accounts which are authorized to update status of the claim other
    than the owner. The owner has a special right to update the list of
    revocation authorities to hold new addresses.
    <hr>

    EXAMPLE: Claim Registration Data \[Receipt\]

The presence of Claim Registration Data \[Receipt\] means that the claim
address (verification hash) has been written to a Claim Registry on a
Witness Network.

Protocol: Aqua Identity Protocol Version 1.0

Registration Event: 1

-   Domain ID: e9ece84189
-   Claim address (verification hash of self-signed claim):
    1db331add502cf1b1712468d1c3e5d66a0016a6f04885c5533619ffbb43fffb6dfa452e119d4bee7628e9792af69089d38d860a5f8d0708184bbb74b8cabdaf7
-   <if bulk registration>
    -   Merkle Root:
        7e9782fb8a6e749ef2ba48f8cd410b05335ba48b20ba42508efeb76add38b0f39e717e91381c8de34641af4c477c39fc169eaa0908dba25e0a54e8de615fcd00
    -   Claim Snapshot Verification Hash:
        278f930a35d06d7b9d28aab37d402c147d1beffdbe53d212481c17ec686698e9469f9cf7d7d53b9a4435c4b99ca2e578b5dc5fec6c63cb802b540493fe927575
-   Witness Network: goerli
-   Claim Registry Smart Contract Address:
    0x45f59310ADD88E6d23ca58A0Fa7A55BEE6d2a611
-   Transaction Hash:
    0xa572e8d6ef8d4a1bb3b5087680817e70bb79a0376c3a9be9e2c6b4d92df228a1
    Sender Account Address: 0xa2026582b94feb9124231fbf7b052c39218954c2
    <hr>

#### <b>Claim Revocation </b>

**Traditional** **revocation:**

-   Traditional strategies for certificate revocation can be
    applied.[^6]
-   Most effective are short expiration dates where possible, due to the
    lack of effective revocation processes for certificates without
    global registries.

**Using Distributed Ledgers**

-   Done via [Claim
    Registry](https://pkc.inblock.io/index.php/Claim_Registry)
    (indicates the global status of an identity claim to be either valid
    or invalid)

**Process:**

-   Locally completed (within the Self-Issued Identity Claim) by
    changing the status to 'revoked' and signing by the issuer. This
    adds a receipt to the identity claim which is displayed when
    verifying the claim. This includes the revocation transaction for
    the revocation on the
    [Identity-Registry](https://pkc.inblock.io/index.php/Identity-Registry)
-   If there is a new claim which is succeeding the previous identity
    claim[Claim
    Registry](https://pkc.inblock.io/index.php/Claim_Registry), then
    this is also noticed within the revocation receipt under
    'Successor-Claim: <hash>.

<b>Bulk Claim Registration (Should be part of Claim Registry)</b>

-   To reduce costs during registration of the identity claims via a
    [Claim Registry](https://pkc.inblock.io/index.php/Claim_Registry)
    they can be clustered and registered together
-   We use the
    [SmartContract:Identity-Registry](https://pkc.inblock.io/index.php/SmartContract:Identity-Registry)
    for this. To scale our efforts we utilize a variant of the
    'Domain-Manifest-Generator / Publisher' which is very similar. The
    differences are in the selection of what can be published, and the
    data structure which is published to the Claim Registry instead of
    the witness smart contract.
-   The Claim Snapshot Generator can only include ID claims of your own
    <Account> namespace.
-   The Claim Snapshot Publisher is registering all selected claims
    (select them by page name (filter required) and will populate the
    target
    [SmartContract:Identity-Registry](https://pkc.inblock.io/index.php/SmartContract:Identity-Registry).
    Every claim will hold the relative merkle-proof to show the path for
    it's registration.

Examples for **Identity Claims with Aqua:**

-   [Example Identity Documents with PKC and Data
    Accounting](https://pkc.inblock.io/index.php/User:0xa2026582b94feb9124231fbf7b052c39218954c2)
-   Reference:Example Identity Documents (Research)

# FAQ

1.  How to find [Claim
    Registry](https://pkc.inblock.io/index.php/Claim_Registry)'s? By
    following the chain of trust of authoritative claims and validating
    them one by one.
2.  How to check if authority is still valid and how to find an
    authority registry? As before, by reading the chain of trust and
    looking up the status of the related identity claims.
3.  How to visually check authority dependencies? It is possible to
    visualize the links of links of links to represent the chain of
    trust.

Important References:

-   [Basic intro into
    DID](https://www.youtube.com/watch?v=gWfAIYXcyH4&ab_channel=Okta)
-   [Basic intro into
    DIDComm](https://www.youtube.com/watch?v=8c7yRTENqSc&ab_channel=DecentralizedIdentityFoundation)
-   [W3C Verified Data
    Model](https://www.w3.org/TR/vc-data-model/#claims)
-   [Revocation List 2020](https://w3c-ccg.github.io/vc-status-rl-2020/)
    A privacy-preserving mechanism for revoking Verifiable Credentials
-   [DIDCOMM implementations and
    use-cases](https://github.com/decentralized-identity/didcomm-messaging)
-   [DIDkit](https://github.com/spruceid/didkit)

Thought leader Christopher Allen:

-   [Self-Sovereign-Identity-Principles](https://github.com/WebOfTrustInfo/self-sovereign-identity/blob/master/self-sovereign-identity-principles.md)
-   [A bitcoin based SSI infrastructure
    prototype](https://github.com/BlockchainCommons/Gordian)

<references />

See Implementation Specific Aqua Identity Protocol Implementation in MW
e

[^1]: <https://identity.foundation/>

[^2]: <https://www.w3.org/>

[^3]: <https://www.weboftrust.info/>

[^4]: https://github.com/WebOfTrustInfo/self-sovereign-identity/blob/master/self-sovereign-identity-principles.md

[^5]: <https://www.securew2.com/blog/certificate-revocation-crl-explained>

[^6]: <https://social.technet.microsoft.com/wiki/contents/articles/34071.pki-certificate-revocation-process-explained.aspx>
