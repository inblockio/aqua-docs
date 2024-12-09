---
title: "Data Accounting"
linkTitle: "Data Accounting"
weight: 5
description: >
  Introduces the concept of Data Accounting
---

We first exchanged goods, then we used means to exchange goods, such as
shells and coins. Today we use money. We have transitioned to a world where
we present and exchange data to receive goods and services.

The system for accounting provided by Luca Pacioli, the double-entry
accounting is the foundation of our work. We present a modern
way to do double-entry bookkeeping for data.

Data accounting is the process of metering data in a standardized unit
of exchange, and converting it into a form which can be exchanged to
provide data symmetry between accounts.

The unit of exchange is not measured in a numeric value as found in cash
systems. Data have multi-dimensional value, which means they depends on your
perspective and your relationship to data. This determines how much this
data-set is worth to the individual.

The standard measure of exchange is a hash, representing the state of the
data. A SHA3-512 hash always has 128 characters, regardless of the size
of the data it is representing.

## Metering data / anchoring data in space

To meter data, we can refer to them using a digital fingerprint, i.e. their
hash. This allows us to refer to the data in a consistent form. The hash has
captured sufficient entropy to be unique, so it becomes a unique resource
locator. This ensures that it is always deterministic to what data we relate
to.

## Accounting data / anchoring data to account

The second step is that the data is attributed to a specific account. This is
achieved by using cryptographic signatures known as [public/private key
encryption](https://en.wikipedia.org/wiki/Public-key_cryptography). The public
key acts as a unique account address. It is necessary that the accounts in use
are globally unique, so there is no realistic probability of a name collision
between accounts. This ensures that no data is attributed by mistake to two
accounts or more.

## Proof of existence / anchoring data to time

The last step to account data is the usage of a cryptographically secure clock,
so we know which data were witnessed first. Data can be replicated, so the
value lies within the social implications of the message within the published
data. This cryptographic timestamping allows us to determine the first account
to witness the data. The most secure witness-networks which provide a service
for cryptographic witnessing of datasets are Bitcoin and Ethereum. The first
known examples of partial data accounting were done by [Surety in
1995](https://www.vice.com/en/article/j5nzx4/what-was-the-first-blockchain) and
[OpenTimestamps in
2012](https://petertodd.org/2016/opentimestamps-announcement).

## Practical accounting

The accounting book in the data accounting age is a 'data vault' which is
controlled by one or multiple accounts. This allows both personal data vaults
or organizational data vaults.

A data vault is controlled by a cryptographic wallet. The vault has the
objective to govern the data for the account owner who is associated with the
vault.

The vault provides a capability to export and import data, so it can be
exchanged between data vaults. This allows for collaboration at scale, and the
usage of data as a means of exchange.

*Please contribute to this article (fixing errors) by exporting it and
sending it back with your improvement to community\[at\]inblock\[dot\]io.*
