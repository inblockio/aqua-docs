# A Payment Infrastructure Prototype

This prototype implements a paper-cheque equivalent using the **Aqua Protocol** for offline data verification, **WAVs** as a gateway for distributed computation and on-chain triggers, and a **smart contract** to manage funds securely. It enables a sender to issue a "cheque" and a receiver to cash it out via cryptographic signatures and verification.

- **GitHub**: [aqua-cheques](https://github.com/inblockio/aqua-cheque)
- **WAVs Gateway**: [wavs-demos](https://github.com/Lay3rLabs/wavs-demos)

---

## Core Workflow

The system mimics a traditional cheque:
1. Sender creates a cheque with payment details.
2. Sender signs it cryptographically.
3. Receiver updates the cheque with their address and signs it.
4. The signed cheque is verified offline via Aqua and executed on-chain via WAVs.

### Flow Diagram
![Escrow Gateway Aqua](/docs_pics/Escrow_Gateway_Aqua.png)

### Example cheque
![Paper cheque Example](https://mycurrencyexchange.com/wp-content/uploads/2020/06/parts-of-a-cheque-1024x516.jpg)

---

## Step-by-Step Process

### 1. Create the Initial Aqua Form (Sender)
The sender defines the payment in an Aqua JSON object:

```json
{
  "sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
  "receiver": "",
  "amount": "0.3",
  "currency": "ETH"
}
```

- **`sender`**: Ethereum address of the payer.
- **`receiver`**: Left blank initially (filled by the receiver later).
- **`amount`**: Payment amount in the specified currency.
- **`currency`**: Token or coin type (e.g., ETH).

### 2. Sender Signs the Form
The sender signs the JSON using an Ethereum EIP-191 signature. This is appended to the Aqua revision history (see "Aqua Revisions" below).

### 3. Receiver Updates the Form
The receiver adds their address to the JSON:

```json
{
  "sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
  "receiver": "0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",
  "amount": "0.3",
  "currency": "ETH"
}
```

### 4. Receiver Signs the Form
The receiver signs the updated JSON, also using EIP-191, completing the cheque.

### 5. Verification and Execution
- The signed JSON is uploaded to the WAVs gateway.
- WAVs runs the Aqua library (Rust API) to verify:
  - Sender and receiver signatures.
  - Consistency of fields (e.g., `amount` and `currency` match between revisions).
- If valid, WAVs triggers the on-chain smart contract to transfer funds from the sender to the receiver.

---

## Interface Design

The system assumes two user-facing views interacting with the WAVs gateway:

### View 1: cheque Registration
- **Purpose**: Sender uploads the initial signed JSON.
- **Requirements**:
  - Smart contract whitelists the sender’s address to accept the cheque.
  - Interface submits the JSON to the WAVs instance via an API call.

### View 2: cheque Cashout
- **Purpose**: Receiver uploads the fully signed JSON for verification and payout.
- **Requirements**:
  - Interface submits the updated JSON to WAVs.
  - WAVs verifies signatures and triggers the smart contract.

#### API Integration
- WAVs may provide a built-in interface (TBD—cheque [wavs-demos](https://github.com/Lay3rLabs/wavs-demos)).
- If not, your interface must:
  1. Package the JSON with signatures.
  2. Send it to the WAVs endpoint (e.g., `POST /verify`).
  3. Handle the response (success triggers payout; failure returns an error).

**Example API Call** (hypothetical):
###bash
curl -X POST https://wavs-instance.example.com/verify \
  -H "Content-Type: application/json" \
  -d '{"aqua_json": <signed_json>}'
###

---

## Aqua Revisions with Signatures

Aqua tracks changes and signatures in a revision tree. Below is an example of a fully signed cheque:

```json
{
  "revisions": {
    "0xd453ccae56945ce381f1adb57feef37ba77e215604fe078faa2d9527159c9c76": {
      "previous_verification_hash": "",
      "local_timestamp": "20250306172550",
      "revision_type": "form",
      "file_hash": "dd056a2c7c877716e2fd9f4f1aecfff05da6aae0158c0aa60775afa88cc1daf3",
      "forms_sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
      "forms_receiver": "",
      "forms_amount": "0.3",
      "forms_currency": "ETH",
      "version": "https://aqua-protocol.org/docs/v3/schema_2 | SHA256 | Method: tree"
    },
    "0x1ea148be50e98f45996353a8b2b1eb5b8e379c2bc02c18fe875e6c52bd1ccd08": {
      "previous_verification_hash": "0xd453ccae56945ce381f1adb57feef37ba77e215604fe078faa2d9527159c9c76",
      "revision_type": "signature",
      "signature": "0xd3984892d212c2613fbbea69ed669449e378f5d085326c6e2770f69e5420408515a1975a9308e058f8d33dee700b8018e372b622e8ea12934ebc0b1c1e9832f21b",
      "signature_wallet_address": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
      "signature_type": "ethereum:eip-191"
    },
    "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c": {
      "previous_verification_hash": "",
      "revision_type": "form",
      "file_hash": "00bf727b9503eeb95283eb315595a4340aae9db9abc15e77caab0a27ebb62f93",
      "forms_sender": "0xbdc64c49bf736cfe1b8233b083d3d632f26feb27",
      "forms_receiver": "0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",
      "forms_amount": "0.3",
      "forms_currency": "ETH"
    },
    "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86": {
      "previous_verification_hash": "0x6548c5d222c4c4382e430aff84432896ce64e5c1fb465c907a4a91a927ce4a9c",
      "revision_type": "signature",
      "signature": "0xabdacd337ae491914b6f2afb2e53249709983c3c98c54c66fcf07fed186a5fb751a6b29e1444bec134695ee01da8fc12b56d71b89df7801c49ce67f2068cc30d1b",
      "signature_wallet_address": "0x4a79b0d4b8feda7af5902da2d15d73a7e5fdefd4",
      "signature_type": "ethereum:eip-191"
    }
  },
  "tree": {
    "hash": "0x9c234109372fe09e1193f9637536eb555cfbe7803cdf17067dfad0d76fc52a86",
    "children": []
  }
}
```

### Verification Rules
- **`forms_sender`**, **`forms_amount`**, and **`forms_currency`** must match between revisions.
- Only **`forms_receiver`** can differ (updated by the receiver).
- Signatures must validate against the respective wallet addresses.

---

## Additional Milestones (Aqua-Dev-Team)

1. [ ] **Aqua Library**: Integrate the Rust-based Aqua API for offline verification (see [aqua-cheques](https://github.com/inblockio/aqua-cheques)).
2. [ ] **WAVs Setup**: Deploy a WAVs instance or use an existing one. Ensure it can:
   - Accept JSON submissions.
   - Run Aqua verification.
   - Trigger the smart contract.
3. [ ] **Smart Contract**: Deploy an escrow contract with:
   - Whitelisting for sender addresses.
   - Locking cheque amoung with revision hash and amount for possible revocation
   - A `cashout` function triggered by WAVs.
