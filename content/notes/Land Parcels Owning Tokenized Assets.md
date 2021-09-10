# Composable Land Parcel NFTs & Real Estate Development Incentives
Date (Last Update) :: 2021-09-03
Author :: [[@gravenp]]

---
## Proposal
Implement mechanisms to incentivize private digital real estate development subject to partial common ownership on the Geo Web.

## Motivation
The Geo Web is an experimentation in mechanism design and property rights as much as it is an augmented reality platform. With partial common ownership as the foundational design for the digital land market, we have the opportunity—the responsibility—to explore uses of the resulting network fees in ways that benefit the public. At a high level, this can mean funding public (non-rivalrous and/or non-excludable) goods and private goods with positive externalities. This proposal explores an idea to encourage the latter type.

## Introduction
In the physical world, governments, corporations, NGOs, etc. often attempt to encourage private actions with positive externalities though economic incentives. An example is tax rebates for private individuals and corporations to pursue things like green energy investment or entrepreneurship in an under served area. With the right incentive structure, groups of people can harness the power of distributed decision making (i.e., markets) to achieve societal goals and coordination failures. 

The Geo Web can utilize its network fee treasury to fund conceptually similar incentives for digital land licensors to invest in their parcels. The incentives should directly benefit licensors through increased utility of their land and indirectly benefit the public through increased aggregate network utility and network fees via land appreciation. 

## Implementation Overview
 This proposal relies two foundational 
 
Provide "network fee rebates" that can only be used to purchase tokenized digital goods that are tied to land parcels through enforceable mechanisms:
- The rebate mechanism is implemented via a smart contract separate from but backed/funded by the network treasury
- The rebate currency (either the native treasury asset or a new ERC-20 token) accrues to the land parcel (not the licensor) over time
- The current land parcel licensor can direct funds on behalf of the parcel
- The funds must be spent on standardized tokenized assets (ERC-721, ERC-1155, etc.) which upon completion of the transaction are owned by the land parcel NFT
- Tokenized assets can be separated from their parcel, but are subsequently subject to partial common ownership rules

## Composability
Content on the Geo Web can be thought of as straddling two separate, but related planes—the content layer and the property rights layer.

The content layer consists of the protocols and networks (currently Ceramic, IPFS, & Filecoin) that enable the information sharing required to resolve content on the Geo Web. This layer creates utility from linked digital content and can enhance the impact of ownership through social norms.[^1]

Content linking does not, however, create technically enforceable property rights (i.e. anyone can link to any digital content, tokenized or not). The concept of digital ownership on the Geo Web relies on Ethereum smart contracts. 

As it stands, Geo Web land parcels are ERC-721 non-fungible tokens. To realize a vision for "digital real estate development," we need to implement an extension of the ERC-721 standard that allows the land parcels themselves to directly own other tokenized assets. 

This concept has been explored by numerous projects in the Ethereum ecosystem and is commonly referred to as [composable NFTs](https://medium.com/coinmonks/introducing-crypto-composables-ee5701fde217).

[ERC-998](https://github.com/mattlockyer/composables-998/) is a [draft EIP](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-998.md), which includes different approaches to attach ERC-721 and ERC-20 tokens to ERC-721 tokens, that may serve as the basis for a Geo Web implementation.

The Geo Web's digital real estate investment incentive system will require ERC-998 customization and/or supporting logic to enforce other aspects of the desired mechanism design.

Additional work will be required to enforce additional conditions of spending the rebate
license still subject to harberger taxes
deal with splits and mergers

## Investment Incentive


--- 
### Draft Notes
Implementation
- Geo Web land becomes enhanced ERC-721 or an ERC-998 token
	- Potentially creating a digital asset registry to complement the digital land registry
	- ERC-998 is still just a draft standard https://eips.ethereum.org/EIPS/eip-998
		- Top-down or bottom-up?
		- Land parcel splits and merges create potential complications
			- We want constant complexity functions rather than ones that grow linearly or exponentially
- Explore possible rebate tokenomics (GEO token or otherwise)
	- Fixed, linear, or quadratic rate of rebate per parcel
- Would need additional smart contracts or logic that enforces that any GEO spend results in a standard ERC token being owned by the parcel
- Another beneficiary of this rebate are the artists, developers, and digital architects that create content that Geo Web land licensors want
	- More content creators means better content on the Geo Web
- If using a GEO token, there would be rules to redeem GEO (which would be burned) for ETH from the treasury
	- Fixed or floating rate?
	- Semi-fungible token that has a different redemption value depending on which parcel it came from?
- Splitting an asset from the parcel
	- Licensor must set a self assessed value for the asset and pay network fees going forward
	- Continually expands the universe of the Geo Web public good

Explaining the incentives for the licensor
- No way around paying network fees because of the nature of partial common ownership
- Any increase in value of their land costs them more money
- Value/utility is mostly derived from the content layer
- A rational landowner would maximize their utility and value at the content layer while attempting to minimize their costs at the smart contract layer
- The network benefits if more value is captured in the smart contract layer
	- Higher basis for network fees
	- Creates more continuity (and utility) as land changes hands (real world example is like an empty plot of land vs. one with a house built on it)
- This proposal gives licensors "free money," but enforces the value accrual to happen at the smart contract layer
- If the licensor doesn't use the rebate, it could just continue to accrue and a future licensor would value it accordingly
- If the money is spent on something useful, the value of the parcel for the licensor goes up
	- Gain marginal utility on an ongoing basis
	- Gain equity value in any future sale of the parcel
- More utility per parcel will draw in more users and more users begets more value for land licensors (compounding network effects)

Long-term questions
- How to mitigate or manage gaming the system
	- Want to encourage use of funds that accrues value to land, but how is that enforced
	- Buying a blank NFT from yourself is clearly gaming the system, but how to prevent that plus the more subjective calls
	- Peer review type system
	- Potentially "outsource" curation of eligible content creators to marketplaces (who get a cut of all purchases from their platform)
		- Marketplaces could be subject to stake slashing-like incentives/penalties
	
---

### Footnotes
 [^1]: While anyone can technically duplicate and display the content of an NFT, there are social norms that limit the value gained by non-owners doing so. The Geo Web spatial browsers, reading from the content layer, can display content which is anchored to a parcel, but not owned by the land licensor in a way that highlights the discrepancy or not show it at all.