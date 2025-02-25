---
title: Aqua Protocol Version 1.2
linkTitle: "Aqua Protocol Version 1.2"
weight: 1
description: >
  Specificaiton of Aqua Protocol with example implementaiton
---


|                  |                                            |
|------------------|--------------------------------------------|
| Current version: | Aqua Protocol v1.2 Specification           |
| Author:          | Tim Bansemer, Publius Dirac                |
| Date:            | 26.11.2024                                 |
| Status:          | DRAFT / Experimental                       |
| Implementation:  | [https://github.com/inblockio/micro-pkc](https://github.com/inblockio/micro-pkc)   |

## Introduction

Please find version 1.1 here [LINK TBD].

Major changes to version 1.1:

Change the way how verification of siganture and witness events work. They are now part of the currently written revision and always force that a new revision which is created. Verification hashes for signatures and witness events are included into the new forced written revision. This was necessary to avoid unresolvable conflicts which could be created by divergant forks of an aqua-chain in two distinct containers after sharing the original chain.

Version 1.2 was used to pilot and prototype the aqua-guardian. A security compontent being used to exchange data between two or more aqua-containers (Personal-knowledge-containers) by doing access control and policy enforcement for data acccess agreements.

## System Components

### Core Components

- **Aquafier**: A software component that enriches files with cryptographic metadata for verification according to the Aqua protocol.
- **Aqua Verifier**: An automatic verification tool to validate aqua-chains.

### Prototype Implementations

#### CLI Tools (Aquafier + Verifier)
- **Languages**: JavaScript (v1.2, v1.3), Rust (v1.2)
- **Description**: A command-line tool allowing users to create and verify aqua-chains.
- **Status**: Active development, pilots completed, v1.3 ongoing development
- **Links**:
  - [Rust Version](#) (TBD)
  - [JavaScript/TypeScript Version](#) (TBD)

#### Chrome Extension (Name-Resolution v1.2)
- **Description**: A Chrome web extension that enables:
  - Automatic verification of pages on a visited PKC.
  - Offline verification of aqua-chains stored in the extension.
  - Resolution of wallet addresses to names.
- **Link**: [Chrome Extension](#) (TBD)

#### PKC (Personal Knowledge Container)
- **Description**: A MediaWiki-enhanced version designed to turn pages into aqua-chains with full integration of core Aqua functionalities (hash-chains, signing, witnessing with aggregation function, and verifiable links).
- **Status**: Pilot completed with local feature completeness.
- **Link**: [PKC](#) (TBD)

#### Aqua-Container (Focused on Doku-Sign Use Case)
- **Description**: A Rust implementation for creating, verifying, and managing aqua-files.
- **Link**: 
  - [Rust Version](#) (TBD)
  - [React, TypeScript/JavaScript](#) (TBD)

#### Guardian
- **Description**: A security enforcement point for verifying, transporting, and managing access for aqua-files.
- **Status**: Pilot completed with PKC serving as an aqua-file storage.

## Version 1.2 Protocol Specification
TBD
