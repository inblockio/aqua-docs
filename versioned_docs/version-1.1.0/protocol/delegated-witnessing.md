---
title: "Delegated Witnessing"
linkTitle: "Delegated Witnessing"
weight: 7
sidebar_position: 7
description: >
  Describes the process of sending domain snapshots to remote data vaults.
---

Describes the process of sending a domain snapshot to a remote data vault for
witnessing. The domain snapshot is then included in the witnessing event and
sent back to its original data vault. This makes the domain snapshot behave
like an ordinary portable hash chain that can be witnessed. The relative path
of the Merkle proof is used as a prefix for all other included portable hash
chains included in the domain snapshot.
