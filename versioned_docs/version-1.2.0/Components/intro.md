---
title: "Introduction"
sidebar_position: 1
---


### 1. Aqua cli
Aqua cli is a command line utility.That enables you to create aqua chains, verify aqua chains, witness and sign aqua chains.
There are two command line utilities.
<ul>
<li>A rust implmentation [here](https://github.com/inblockio/aqua-verifier-rs)</li>
<li>A javascript implmentation  [here](https://github.com/inblockio/aqua-verifier-js) </li>
</ul>

🤔 You would ask why have two : <br/> `Js enable us to quickly proto type our ideas.While the rust implmentation is stable.`

🚀 What does the aqua cli do ?  <br/>
The aqua cli enables your to generate, sign, witness  and verify aqua chains locally.

💡 aqua cli (rust) enable youto easily get started your interaction with the aqua-protocol.To get started visit the github page [here](https://github.com/inblockio/aqua-verifier-rs) to downlioad the latest release or build locally (check the readme file on how to build it.)


## Aqua container
This enable you to interact with the aqua protocol using a web browser, you can use the sand box setup  for you [here](https://aquafire.aqua-protocol.org/).

The container is built using the same libraries that are used to build the cli.This gives it all the capabilities of the cli but with a graphical interface.

check it over [here](https://github.com/inblockio/aqua-verifier-rs) 


## Aqua PKC



## Aqua guardian
A security gateway to exchange Aqua-Chains and enforce policies of Aqua-Contracts. It provides secure connectivity between Guardians and verifies the integrity of the Aqua storage containers.

to learn 
:::warning
The aqua guardian still uses aqua-protocol version 1 this makes it incompatible with Aqua container and Aqua cli
:::

## Aqua verifier (chrome-extension)
This is a chrome extension that can be used to verify aqua chain.[here](https://chromewebstore.google.com/detail/verifypage/gadnjidhhadchnegnpadkibmjlgihiaj)