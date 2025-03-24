---
sidebar_position: 8
---

# AQUA CLI Tool

The AQUA CLI tool (`aqua-js-cli`) is a command-line interface for interacting with the AQUA protocol. It provides functionality for notarizing, signing, witnessing, and verifying files in the AQUA system.

## What is Notarization?

Notarization in AQUA is the process of creating an immutable record of a file or document on the blockchain. When you notarize a file:
- A unique hash of the file is generated
- The hash is recorded on the blockchain
- A proof of existence is created
- The file's integrity can be verified at any time

This process ensures that the document existed at a specific point in time and hasn't been modified since.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/inblockio/aqua-js-cli.git
cd aqua-js-cli
```

## Requirements

- Node.js 14.x+ (latest version recommended)
- npm (Node Package Manager)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

## Usage

### 1. Notarizing, Signing, and Witnessing

#### Basic Notarization
```bash
./notarize.js <FILE_PATH>
```

#### Signing Files
Sign files using different methods (cli, metamask, or did):
```bash
./notarize.js --sign [cli|metamask|did] <FILE_PATH>
```

#### Witnessing Files
Witness files using different methods (eth, nostr, or tsa):
```bash
./notarize.js [--witness eth|--witness nostr|--witness tsa] <FILE_PATH>
```

#### Multiple Chain Witnessing
Witness multiple AQUA chains:
```bash
./notarize.js FILE1,FILE2 --witness eth --vtree --type sepolia
```

Witness specific revisions:
```bash
./notarize.js FILE1@0x_revision_,FILE2@0x_revision_ --witness eth --type cli --vtree
```

### 2. Verification

#### Basic Verification
```bash
./verify.js <AQUA_CHAIN_FILE_PATH>
```

#### Verification Options

- Verbose output:
```bash
./verify.js <FILE_PATH>.aqua.json -v
```

- Skip merkle proof verification (faster):
```bash
./verify.js <FILE_PATH>.aqua.json --ignore-merkle-proof
```

### 3. Managing Revisions

#### Delete Last Revision
```bash
./notarize.js --remove <FILE_PATH>
```

#### Link AQUA Chains
Link one AQUA chain to another:
```bash
./notarize.js <FILE_PATH> --link <TARGET_FILE_PATH.aqua.json>
```

### 4. Content Management

#### Generate Content Revision
```bash
./notarize.js --content <FILE_PATH>
```

#### Generate Scalar Revision
```bash
./notarize.js --scalar <FILE_PATH>
```

### 5. Forms Management

#### Create Genesis Form
```bash
./notarize.js example-form.json --form example-form.json
```
Note: For genesis, the filename must match the form name.

#### Create Form Revision
```bash
./notarize.js <FILE_PATH> --form example-form.json
```

#### Update Forms

Delete a form entry:
```bash
./form_updater.js example-form.json.aqua.json@<revision> --delete <field>
```

Update/restore a form entry:
```bash
./form_updater.js example-form.json.aqua.json --update <form_field> <value>
```

Form operations include:
- File validation for .aqua.json files
- Form key detection (exact and partial matches)
- Handling deleted fields
- Non-destructive updates preserving original structure
