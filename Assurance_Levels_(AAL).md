How safe are the wallets to used? - Current PKC Pilot - relating to the
'Authentication assurance level's (AAL)' according to the World Bank
standards:

See short presentation [Aqua_PKC_-_Wallet-Security.pdf](https://github.com/inblockio/aqua-docs/files/7885411/Aqua_PKC_-_Wallet-Security.pdf)

### Level 1

The Metamask wallet alone has a low (level 1 ) level of assurance.
MetaMask is the most common browser blockchain wallet applications on
the web and their developer teams strive for increased security to keep
crypto-assets of their 10 Million+ Users safe.

### Level 2

Metamask offers integration with Hardware-Wallets which raises the level
of assurance by having at least 2 authentication factors (e.g., a token
with a password or PIN) to min. level 2. The Hardware-Tokens are build
to be temper proof.

### Level 3

-   It is possible to integrate the different layers of security at once

with Metamask (Password Protection) a hardware-token (temper proof) with
PIN a one-time-password generator based on your mobile-phone
(recommended is a hardened mobile phone which also uses biometrics for
highest security) requires implementation of one-time-password
authentication for logins after wallet-authentication see
<https://github.com/inblockio/micro-PKC/issues/37>

-   Other high security options allow multi-signature logins with
    smart-contracts requiring multiple parties to confirm the operation
    to be executed. This can be defined based on the smart contract to
    extreme security as each of the layers mentioned above can be added
    to each party being involved in the multi-signature event to open a
    PKC or to SIGN a verified page within the PKC or to witness a data
    set via a witness network.

-   The mentioned security model is not dependent on the security of
    Metamask. If Metamask is hacked it will not allow to compromise the
    model above as the security of the private key of the hardware token
    is preserved.
