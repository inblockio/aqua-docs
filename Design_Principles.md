# Design Principles of Aqua reference Implementation (PKC)

## Principle Private is Default

The principle default to private is that no data of the PKC [Data
vault](Aqua_Whitepaper.md#data-vault) is shared without it being explicitly
authorized by the associated account.

### Domain Access Levels

Levels of access are:

Private: Only the account owner has access to files and services
initialized by his account. Agreement / Permissioned access: The Account
owner grants other Account's access to files or services based on
verifiable contracts which are themselves written with the Aqua Protocol
to ensure they are forgery-proof and therefore safe. Public: Other
Account's have access to the file or service without agreements.

## Principle: Offline Capability

The PKC Data Vault follow's the principle of being able to run and be
functional without internet connection after setup or through
installation based on local installation files.

This allows PKC setups to be kept offline from any internet connectivity
while still functional. This can provide the required assurances for
very sensitive data.

## Principle: Separation of Account and Service

Concern: There is a trend in the DIF/WC3 Identity space that some
players like to accumulate personal identifiable data (PII) inside of
Wallets. We think this is a ill-fated direction and there should be
a clear separation between account and service. Wallets should not hold
personal identifiable data.

Benefits:

-   If the service gets hacked, no account related data is leaked if
    it's not stored.
-   Account is not compromised, as there is no password saved within the
    service with Password free login.

#### [Wallet](Aqua_Whitepaper.md#wallet)'s have one job. Keep private keys safe! (Account Management)

-   Should be stupid, simple, safe!
-   Allowed operations:
    -   Signing
    -   De- / Encrypt
    -   Publishing transactions to service (e.g. witness networks)
-   Ability to choose “high level of assurance” depending on the stakes
    associated with the account(s) managed by the wallet
-   Takes care of key recovery mechanisms

#### [Data Vault](Aqua_Whitepaper.md#data-vault) (Service)- Has one job: keep the data safe!

-   [Principle: Offline
    Capability](Principle:_Offline_Capability) so it can run
    offline; works offline on local machine
-   All significant actions authorized and managed though the wallet
-   Should offer good tooling for data storage and manipulation
-   Strong access control: By [Principle: Default is
    Private](Principle:_Default_is_Private) which means data
    is only accessible by the owner.
-   Data is well protected
    -   The Data Vault should apply additional security features to keep
        the data safe.
    -   e.g. Encryption of files / databases if service is not used.
    -   e.g. Encryption of pages with web-decryption (allowing for
        End-to-End Encryption).
-   Capabilities for sharing and publishing data
-   Offers full Backup and Recovery mechanisms to move data freely
    -   [Principle: Data
        Portability](Principle:_Data_Portability "wikilink")

## Principle: Signature Login

We do not use passwords for login but instead we use a signature of a
private key to authorize access to a service. This increases security
and does not require the user to remember a password, creating a better
user experience.

Pros:  
\* Account owner uses his wallet to complete a signature challenge for
login. With this challenge he proves that he owns the private key to a
public key. If the public key is registered as an account at the
service, the account is granted access.

-   The password can't be leaked as it does not exist.
-   Very high security

Contra:  
\* Requires access to the wallet which holds the private key to
authorize access

-   Not commonly understood by users as a way to login (new process)

## Principle: Data Portability

The Principle of Data Portability means that the
[Account](Aqua_Whitepaper.md#account) owner can instruct the Service to Export
all data associated with the [Account](Aqua_Whitepaper.md#account) and is free
to move this data to a new service which is capable of importing the
data.

### Implementation Specifics

In PKC's this is guaranteed by:  
\* providing a Backup and restore procedure which allows to move data
between PKC's and restore them in case of a required recovery.

-   providing a file import and export function
-   providing an import / export API

Furthermore we ensure with the development of the MediaWiki Data
Accounting Extension, that the data is still compatible with the legacy
import / export (which means only the text not the verification data is
imported / exported.
