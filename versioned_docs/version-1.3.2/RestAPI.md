---
title: "Rest API"
menu:
  main:
    weight: 10
---

## REST API Specification for Aqua-Protocol Version 3

REST APIs are used to interact with the Aqua-Protocol in Client-Server applications.
This includes data syncing and exchange operations between different aqua-services.
Early versions of this API where prototypes within the PKC-Guardian project.

## Base URL
/aqua/v3/


## Authentication
- **Requirement**: All endpoints except `/session` (POST) require a `Bearer` JWT in the `Authorization` header.
- **JWT Details**: Issued via SIWE-OIDC, tied to the user’s Ethereum wallet address (secp256k1-derived), configurable lifespan (default: 1 hour).

## Endpoints

### 1. Get Aqua Tree Latest
- **Method**: `GET`
- **Path**: `/trees/{genesisHash}/latest`
- **Description**: Retrieves all latest revision hashes across all branches of the tree starting from the genesis hash.
- **Query Params**:
  - `includeMetadata` (boolean, default: `false`): Include full revision details.
- **Response** (minimal):
 ```json
  {
    "latest": [
      "0x4d8f16e234aee6738325cb4e4bee0a4ae83e251614bbf1620961e3af9f702554",
      "0xsomeotherhash..."
    ]
  }
```

## Authentication
- **Requirement**: All endpoints except `/session` (POST) require a `Bearer` JWT in the `Authorization` header.
- **JWT Details**: Issued via SIWE-OIDC, tied to the user’s Ethereum wallet address (secp256k1-derived), configurable lifespan (default: 1 hour).

### 1. Get Aqua Tree Latest
- **Method**: `GET`
- **Path**: `/trees/:revisionHash/latest`
- **Description**: Retrieves all latest revision hashes across all branches of the tree starting from the genesis hash.
- **Query Params**:
  - `includeMetadata` (boolean, default: `false`): Include full revision details.
- **Response** (minimal):

 ```json
  {
    "latest": [
      "0x4d8f16e234aee6738325cb4e4bee0a4ae83e251614bbf1620961e3af9f702554",
      "0xsomeotherhash..."
    ]
  }
```
Response (with includeMetadata=true):
  ```json
{
  "latest": [
    {
      "verification_hash": "0x4d8f16e234aee6738325cb4e4bee0a4ae83e251614bbf1620961e3af9f702554",
      "revision_type": "link",
      "local_timestamp": "20250223204717",
      "previous_verification_hash": "0xc828a5579c69923a66db6b06e6e47c31dc08ccc8f8340d8e2b190683dc76de21"
    }
  ]
}
```
Status Codes:
- `200`: Success
- `404`: Genesis hash not found
- `401`: Unauthorized

## Get Aqua Tree Branch
- **Method**: `GET`
- **Path**: `/trees/:revisionHash/branch`
- **Description**: Retrieves the branch from the specified hash back to the genesis hash (backward traversal only).
- **Query Params**:
  - `page` (int, optional, default: `1`): Pagination page.
  - `limit` (int, optional, default: `100`): Revisions per page.
- **Response**:
  ```json
  {
    "branch": [
      {
        "verification_hash": "0x4d8f16e234aee6738325cb4e4bee0a4ae83e251614bbf1620961e3af9f702554",
        "revision_type": "link",
        "local_timestamp": "20250223204717",
        "previous_verification_hash": "0xc828a5579c69923a66db6b06e6e47c31dc08ccc8f8340d8e2b190683dc76de21"
      },
      "..."
    ],
    "pagination": {
      "page": 1,
      "limit": 100,
      "total": 4
    }
  }
```
```

- **Notes**: `pagination` omitted if not used (no `page` or `limit` provided).
- **Status Codes**:
  - `200`: Success
  - `404`: Branch hash not found
  - `401`: Unauthorized

## Get Aqua Tree Revision
- **Method**: `GET`
- **Path**: `/trees/:revisionHash`
- **Description**: Retrieves details of a specific revision.
- **Response**:
  ```json
  {
    "verification_hash": "0x97b36fbde14bfddaa639c7d3b8416d44781ccc1092e536e01c4a7dbd0c90eff9",
    "previous_verification_hash": "",
    "local_timestamp": "20250218190616",
    "revision_type": "file",
    "file_hash": "a7bf1f3efdfaad71b28125b91c1403cba0eaf6db2c8dff9a438d13754de5b468",
    "file_nonce": "ztqu4gByEgd0WKGgakpwMoK2WhieZ-WE0ztzQhCWJ2Y"
  }
  ```
  
- **Status Codes**:
  - `200`: Success
  - `404`: Revision not found
  - `401`: Unauthorized

## Post New Tree Revision
- **Method**: `POST`
- **Path**: `/trees`
- **Description**: Creates a new revision, validated against `aqua-verifier-js-lib` verifier.
- **Request Body** (example for `signature` type):

  ```json
  {
    "previous_verification_hash": "0x6c64a40493862be542a0c6eb016df21d4c1c6c11208ecc0013d0c209679bc962",
    "revision_type": "signature",
    "signature": "0x6fbf1437d6532e97edc08b7b1e7c09ed21103abc1b6d324550585fbf85e8bfb858e570f4cc35432da45b76aec1d933c7a5870ecba3e06fa29cf510f2cfa0165f1c",
    "signature_public_key": "0x0219b2dee3f0691f26ce35104b7411d379e15dc62ae8d3a0797b7257e87e7a5821",
    "signature_wallet_address": "0x011d801fd833eb98109aaca1923f7652cf16db7f",
    "signature_type": "ethereum:eip-191"
  }
  ```
  
- **Response**:
  ```json
  {
    "verification_hash": "0xc828a5579c69923a66db6b06e6e47c31dc08ccc8f8340d8e2b190683dc76de21",
    "local_timestamp": "20250223210000"
  }
  ```

- **Validation**: Rejects if:
  - `previous_verification_hash` doesn’t exist.
  - Revision type or fields are invalid/malformed (per `aqua-verifier-js-lib`).
- **Status Codes**:
  - `201`: Created
  - `400`: Invalid/malformed revision (with error details if `error_mode=verbose`)
  - `404`: Previous hash not found
  - `401`: Unauthorized

## Verify Aqua Tree
- **Method**: `POST`
- **Path**: `/verify`
- **Description**: Delegates verification to `aqua-verifier-js-lib`, returns a detailed report.
- **Request Body**:
  ```json
  {
    "revisions": {
      "0x97b36fbde14bfddaa639c7d3b8416d44781ccc1092e536e01c4a7dbd0c90eff9": {
        "previous_verification_hash": "",
        "local_timestamp": "20250218190616",
        "revision_type": "file",
        "file_hash": "a7bf1f3efdfaad71b28125b91c1403cba0eaf6db2c8dff9a438d13754de5b468",
        "file_nonce": "ztqu4gByEgd0WKGgakpwMoK2WhieZ-WE0ztzQhCWJ2Y"
      }
    }
  }
  ```
  
- **Response**:
  ```json
  {
    "report": {
      "0x97b36fbde14bfddaa639c7d3b8416d44781ccc1092e536e01c4a7dbd0c90eff9": {
        "status": "valid",
        "details": "Verification passed per aqua-verifier-js-lib"
      }
    }
  }
  ```
  
- **Status Codes**:
  - `200`: Success
  - `400`: Malformed input
  - `401`: Unauthorized

## Session Handling

### Login
- **Method**: `POST`
- **Path**: `/session`
- **Request Body** (SIWE-OIDC):
  ```json
  {
    "message": "example.com wants you to sign in with your Ethereum account...",
    "signature": "0x..."
  }
  ```
  
- **Response**:
  ```json
  {
    "token": "jwt...",
    "expires_at": "20250223214400",
    "wallet_address": "0x011d801fd833eb98109aaca1923f7652cf16db7f"
  }
  ```
  
- **Status Codes**:
  - `201`: Session created
  - `400`: Invalid SIWE message/signature

### Logout
- **Method**: `DELETE`
- **Path**: `/session`
- **Response**: `204 No Content`
- **Status Codes**:
  - `204`: Success
  - `401`: Unauthorized

### Session Info
- **Method**: `GET`
- **Path**: `/session`
- **Response**:
  ```json
  {
    "wallet_address": "0x011d801fd833eb98109aaca1923f7652cf16db7f",
    "expires_at": "20250223214400"
  }
  ```
  
- **Status Codes**:
  - `200`: Success
  - `401`: Unauthorized

## Configuration (JSON)
```json
{
  "session": {
    "jwt_lifespan": 3600
  },
  "rate_limit": {
    "requests_per_minute": 600
  },
  "error_mode": "verbose",
  "key_filter": {
    "mode": "whitelist",
    "keys": ["0x011d801fd833eb98109aaca1923f7652cf16db7f"]
  }
}
```

- **Notes**:
  - `error_mode`: `"minimal"` (HTTP status only) or `"verbose"` (detailed messages).
  - `key_filter`: `"all"`, `"blacklist"`, or `"whitelist"` for Ethereum wallet addresses.

## Error Handling Examples

### Minimal Mode
- `400 Bad Request` (no body)

### Verbose Mode
- **Invalid Revision**:
  ```json
  {
    "error": "Invalid revision",
    "details": "Missing 'signature' field for revision_type 'signature'"
  }
  ```
  
## Get File Object
Scalability: Use HTTP range requests (via Range header) to support partial downloads, enabling clients to resume transfers or fetch chunks of large files.
Integrity: Return the file’s hash in the response headers (e.g., Content-MD5 or a custom header like X-File-Hash) so clients can verify the file matches the requested hash.
Efficiency: Stream the file content to handle large sizes without loading everything into memory.

- **Method**: `GET`
- **Path**: `/files/:fileHash`
- **Description**: Retrieves the file object associated with the specified file hash. Supports large files via streaming and partial content delivery.
- **Query Params**:
  - None required; optional params like `download` (boolean) could be added later for forcing downloads vs. inline display.
- **Headers**:
  - `Range` (optional): Specifies byte range (e.g., `bytes=0-1048575` for first 1MB). Supports partial content retrieval per RFC 7233.
- **Response**:
  - **Status**: `200 OK` (full file) or `206 Partial Content` (range request)
  - **Headers**:
    - `Content-Type`: MIME type of the file (e.g., `application/octet-stream` if unknown).
    - `Content-Length`: Size of the returned content in bytes.
    - `X-File-Hash`: The file’s hash (e.g., `a7bf1f3efdfaad71b28125b91c1403cba0eaf6db2c8dff9a438d13754de5b468`) for client-side verification.
    - `Accept-Ranges`: `bytes` (indicates range requests are supported).
    - `Content-Range` (if `206`): Byte range delivered (e.g., `bytes 0-1048575/5242880`).
  - **Body**: The file content, streamed as a binary response.
- **Example Response** (full file):
  - **Status**: `200 OK`
  - **Headers**:
    ```
    Content-Type: application/pdf
    Content-Length: 5242880
    X-File-Hash: a7bf1f3efdfaad71b28125b91c1403cba0eaf6db2c8dff9a438d13754de5b468
    Accept-Ranges: bytes
    ```
  - **Body**: [binary file content]
- **Example Response** (partial file):
  - **Request Header**: `Range: bytes=0-1048575`
  - **Status**: `206 Partial Content`
  - **Headers**:
    ```
    Content-Type: application/pdf
    Content-Length: 1048576
    X-File-Hash: a7bf1f3efdfaad71b28125b91c1403cba0eaf6db2c8dff9a438d13754de5b468
    Accept-Ranges: bytes
    Content-Range: bytes 0-1048575/5242880
    ```
  - **Body**: [first 1MB of binary file content]
- **Status Codes**:
  - `200`: Success (full file delivered)
  - `206`: Partial Content (range request fulfilled)
  - `404`: File hash not found
  - `401`: Unauthorized
  - `416`: Range Not Satisfiable (if requested range is invalid)
- **Notes**:
  - Clients can verify integrity by comparing the `X-File-Hash` with the requested `fileHash`.
  - Large files are streamed to avoid memory overload; range support enables resumable downloads.

Explanation
- **Path**: /files/:fileHash keeps it intuitive and consistent with /trees/:revisionHash.
- **Range Support**: Using the Range header and 206 Partial Content status allows clients to fetch large files in chunks, critical for scalability and reliability (e.g., resuming interrupted downloads).
- **Integrity**: The X-File-Hash header echoes the file’s hash back, letting clients confirm the delivered content matches the request. This is lightweight and leverages standard HTTP practices.
- **Streaming**: The response body is streamed, ensuring the server can handle large files without buffering everything in memory.


## Open Todos for the API
- Add support for file deletion
- add support for revision deletion
