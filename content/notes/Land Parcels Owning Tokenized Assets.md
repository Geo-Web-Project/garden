# (WIP DRAFT) Land Parcels Owning Tokenized Assets 
Date (Last Update) :: 2021-08-25
Author :: [[@gravenp]]

---
## Introduction
The Geo Web is an experimentation in property rights and mechanism design as much as it is an augmented reality platform. With partial common ownership as the foundational design for the digital land market, we have the opportunity—the responsibility—to explore uses of the resulting network fees in ways that benefit the public. At a high level, this means funding public goods (non-rivalrous and/or non-excludable) and private goods with positive externalities. This document explores one idea to encourage the latter type of good.

In the physical world, governments attempt to encourage private actions with positive externalities though economic incentives. This can come in the form of tax rebates for private individuals and corporations for things like green energy investment, entrepreneurship in an under served area, etc. With the right incentive structure, the government can harness the power of distributed decision making (i.e., markets) to achieve societal goals and overcome market failures. 

The Geo Web can utilize its treasury to fund conceptually similar incentives for Geo Web land licensors to invest in their land parcels. The incentives should directly benefit licensors through increased utility of their land and indirectly benefit the public through increased aggregate network utility and network fees via land appreciation. 

The linchpin to this initiative is implementing the mechanism(s) to internalize the value of "digital real estate development" for both the investor and the network. One way this could be achieved is through digital land parcels (NFTs) having the ability to directly own other tokenized assets.

## Concept Overview
Provide a "network fee rebate" that can only be used to purchase tokenized digital goods that are tied to their land parcel through enforceable mechanisms:
- The rebate currency (either the native treasury asset or a new ERC-20 token) accrues to the land parcel over time
- The current land parcel licensor can direct funds on behalf of the parcel
- The funds must be spent on standardized tokenized assets (ERC-721, ERC-1155, etc.) which upon completion of the transaction are owned by the land parcel NFT
- Tokenized assets can be separated from their parcel, but are subsequently subject to partial common ownership rules

## Details
Content on the Geo Web can be thought of as straddling two separate, but related planes—the content layer and the smart contract layer.

The content layer consists of the protocols and networks (currently Ceramic, IPFS, & Filecoin) that enable the information sharing required to resolve content on the Geo Web. This layer creates utility from digital content and can [enhance the impact of ownership][1]. 

It does not, however, create technically enforceable property rights (i.e. anyone can link to any digital content, tokenized or not). The concept of ownership is implemented via the smart contract layer, so that is where the investment incentive mechanisms must be implemented.

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
 [1]: While anyone can technically duplicate and display the content of an NFT, there are social norms that limit the value gained by non-owners doing so. The Geo Web spatial browsers, reading from the content layer, can display content which is anchored to a parcel, but not owned by the land licensor in a way that highlights the discrepancy or not show it at all.