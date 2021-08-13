# 2021-08-02 Week In Review  
#meeting 

**Date**::  2021-08-05  
**Attendees**:: [[@codynhat]], [[@gravenp]]

---

* Layer 2 
    * Prefer zkSync 2.0 if ready (long term winner due for scaling and "trust math")
    * Like the alignment on public goods with Optimism
    * In the short/medium term all three rollup solutions are conceptually "good enough" (pending actual testing) 
    * Mainnet launch WILL be on a ETH L2 rollup
        * Testnet launched before mainnet
* [[Geo Web Economy]]
    * Goal is to use treasury funds to reward those that bring value to the network
    * Want to find different credibily neutral ways to achieve that goal
    * Structure the smart contracts and governance for these mechanisms to be modular and evolve over time
        * ie the Controller and NFT License contracts don't need to know about the contracts that distribute treasury funds
    * Use ETH to collect fees, but leave open methods/asset to reward value
        * GEO
            * Will not have a token at launch
            * Explore different mechanics that support the project's economic development goals
                * "Local currency"
                * Semi-fungible tokens (different allocation vs redemption value)
                * Various schedules for allocation (fixed, linear, quadratic, etc)
    * Need a process in place by launch for the way to propose a use of funds
* Geo Web land owning NFTs
    * Driving rationale for this is to create a way for Geo Web land parcels to accrue value through acquiring assets (aka "durable goods" vs consumables like storage)
    * This functionality isn't required at launch as long as it can be added at a later time
        * [ERC-998][1]
        * ERC-721 `transferFrom` bytes field
        * [Charged Particles][2]
    * Explored ways to allocate treasury funds to land owners to be spent on assets that the land would own
        *  A "rational" landowner wouldn't choose to transfer ownership or spend their own money on assets which the land parcel owns because it would presumably raise their self-assessed value of the land and increase their network fees
        *  Treasury funds given to landowners for "free" with this caveat changes the economic equation (investment efficiency)
            *  Lots of complexity and challenges to enforcing "good purchases" (eg not buying a blank NFT from another one of their wallets for high prices)
    *  NFT ownership exists at a different layer than land parcels controlling a Ceramic Stream via NFT:DID
        *  Browsers and social norms will determine how to reconcile or communicate the differnce between the two layers
* Content Layer
    * Move foreward with the NFT:DID
    * Land parcels will each have their own IDX profile with records containing content links
        * Registry smart contract no longer needs to include a link to a Ceramic StreamID
    * Process for adding new content types is the same as adding new IDX definitions
    * Cadastre no longer needs 3IDs for authentication
    * No additional content types are required for mainnet launch, but would be nice to have if launch is delayed for an external reason
* [[Merging and Splitting Parcels Draft Spec]] 
    * Needs to be implemented before launch
    * There are considerations for content linking and asset ownership under the land NFT
        * Most important is addressing ownerhip of content when merging two parcels (one parcel is going away and don't want assets to be orphaned)
        * Open question on how Ceramic Stream control is changed
* Governance
    * Committed to a multi-sig at launch
        * Likely Gnosis Safe
        * Multi-sig would be set up on the same L2 network as the registry
        * Move existing assets to the wallet (ENS & tokens)
        * Controls network fee treasury
        * At least Cody & Graven as signers, but could be more
    * Integrate [OpenZeppelin Defender][3] (or equivalent) with the multi-sig to help manage smart contract upgrades
    * Want to progressively expand voting/voice to all stakeholder groups
        * [Boardroom][4]
        * [SafeSnap][5]
* [[Fair Launch Auction Draft Spec]]
    * Needed at launch
        * Marketing and education
    * MEV/frontrunning considerations are the biggest outstanding questions
* [[The Graph - Decentralized Network]]
    * Using the hosted service for launch
    * Closely monitor opportunity to move to decentralized network

---
## Product Roadmap Changes

The following are changes to the roadmap that came out of this week. This is not exhaustive and needs to be merged with other roadmap items. 

- Smart contracts
    - Test on available L2s
    - Deploy to L2 testnet
    - Remove `setContent` storage and methods
    - Merging and splitting
    - Deploy with OpenZeppelin and Multi-sig
    - Fair launch auction
    - Review if changes are needed for:
        - Modularity of funding proposals
        - Land parcels owning assets
        - Merging and splitting
- Subgraph
    - Remove root parcel content ID
- Content layer
    - Migrate existing schemas to IDX definitions
- Cadastre
    - Integrate NFT DID provider for authentication
    - Integrate NFT DID resolver for fetching content
    - Restrict storage providing to NFT DID only
    - Remove 3ID authentication
    - Fair launch auction UI
- Governance
    - Set up multi-sig and transfer assets
    - Publish a treasury funding proposal process
- Open
    - Ceramic infrastructure
    - IPFS infrastructure

[1]: http://erc998.org/
[2]: https://charged.fi
[3]: https://openzeppelin.com/defender/
[4]: https://boardroom.info/
[5]: https://blog.gnosis.pm/introducing-safesnap-the-first-in-a-decentralized-governance-tool-suite-for-the-gnosis-safe-ea67eb95c34f