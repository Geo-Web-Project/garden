# Roadmap to Mainnet
Date (Last Update) :: 2021-09-20
Author :: [[@gravenp]]

---
## Summary
As we approach Ethereum L2 roll-up readiness, the biggest external gating item to launching the Geo Web mainnet will be removed. Launch readiness will become an internal project evaluation.

This assessment (**and all future design decisions**) should be made through the lens of the Geo Web as an open public good protocol, not a tightly integrated full-stack application. The Geo Web will realize its potential as others permissionlessly build on and use the network, not with a small group of contributors controlling and building every aspect of it.

This requires building stakeholder trust (limit breaking changes, having sound processes), maximizing developer/user choice (be unopinionated where possible), and creating the conditions for innovation (create incentives and foundations for others to build on rather than building "it" ourselves).

Prior to launch, we have more leeway to break things and make benevolent-dictator-like decisions that can be evaluated by stakeholders prior to making a financial/time commitment. Some decisions made (or not made) before launch will have irreversible impacts. We've worked to identify this category of design decision, but if we come across new ones or complications, we shouldn't hesitate to delay a planned launch to properly address them. Reversible decisions face lower scrutiny and, more often than not, can be delayed until after launch.

Because of these factors, the following roadmap to mainnet focuses on core protocol decisions over application and interface development. Other work may be completed prior to launch, bandwidth permitting, but never at the expense of these requirements. This roadmap is ordered according to the logical progression of work rather than as a ranking of importance:

 ### Required
- [ ] [[NFT DID Integration|NFT:DID]]
Integration of NFT:DID affects the core structure of the digital land registry and our overall content linking strategy. It is an important piece to our long-term strategy to support "digital real estate development" and uninterrupted content history. With NFT:DID, a Geo Web land parcel can own its linked content stream instead of the land licensor owning it. NFT:DID also allows us to utilize each [[Land Parcel IDX Index|land parcel's IDX index]] as the "root stream" rather than requiring an explicit data field in the digital land registry. Cody is already working on this initiative and is nearing completion.

- [ ] [[Fair Launch Auction Requirements]]
We are committed to a fair launch of the Geo Web and want to allocate early land claims consistent with the partial common ownership market's design goals. This naturally means that our initial allocation mechanism (a reverse Dutch auction) needs to be ready before launch. This will require smart contact and Cadastre UI updates.

- [ ] Research NFT Composability Standards for Land
[[Composable Land Parcel NFTs & Real Estate Development Incentives]] is a concept that can further the idea of "digital real estate development" and create interesting opportunities for usage of partial common ownership fees. This could require "breaking" deviation from the ERC-721 standard and will effect functions like merging/splitting, so we need to research the possible implementations prior to launch. If there are "good" options for implementation down the line, we don't have to add this advanced functionality prior to launch because the ecosystem won't be mature enough to utilize it.

- [ ] [[Merging and Splitting Parcels]]
The ability to merge and split land parcels is important for the evolution of Geo Web land market. Early land claims won't necessarily match the appropriate parcel boundaries of the future. This initiative will eventually require smart contract and Cadastre development, but only the implementation of smart contract functions is required before launch. It would be nice to have the corresponding UI functions.

- [ ] Land Grid Size
Changing the grid size of Geo Web land parcels would necessitate a registry reset or migration. So, one of the top motivations for waiting for an ETH L2 roll-up for launch was the ability to practically implement a smaller grid size. Geopositioning and augmented reality technologies will improve over time. We want the granularity of Geo Web land definition to have runway to support new use cases and technology precision. We'll need to experiment with the appropriate grid size given the chosen L2 network.

- [ ] L2 Testnet (Release Candidate)
Our current preference is to launch on ZkSync 2.0. Zero-knowledge style roll-ups, if implemented correctly, offer long-term, desirable technical attributes over optimistic roll-ups. ZkSync 2.0 is not yet in an open testnet, so significant timeline slippage is still possible and could cause us to reevaluate our path forward.

- [ ] Governance Processes & Tools
We're on a path to progressive decentralization for the sake of all network stakeholders and, honestly, for ourselves. We need to implement the initial supporting processes and tools prior launch to increase confidence of early adopters and avoid single points of failure. To start this means a Gnosis Safe multisig (or equivalent alternative) that manages treasury funds (partial common ownership fees), upgrades to the production smart contracts, and integrations like OpenZeppelin Defender that can help keep protect the network.

- [ ] Modular Treasury Proposal Dry Runs
All funds derived from the partial common ownership land market are intended to be reinvested back into the network, to fund public goods, and to fund private goods with positive externalities. We couldn't possibly figure out all the uses for funds pre-launch, but we want to insure that the treasury that holds the funds can interact with ongoing, modular use of funds. These uses may span in complexity from simple distributions to funding multiple interacting smart contracts. This initiative is dedicated to taking a few of our ideas to high-level specification and architecture simulate how things would work.

- [ ] Audit
Real money means real responsibility. We don't want to fail to deliver on the trust early adopters put into our work, so after the above initiatives that require smart contract functionality are complete, we'll begin the audit process. We'll do as much internal evaluation and preparation as we can, but obtaining professional outside review is also appropriate.

- [ ] Subgraph
For basic Cadastre and browsing functionality to work, we'll need a Geo Web subgraph on our chosen L2. We plan to utilize the hosted subgraph service to start, so this should be pretty straight forward.

- [ ] Complex Shape Parcel Claims 
The current registry smart contracts support land definition as a coordinate path. Paths can represent any contiguous shape, but currently users of the Cadastre are limited to rectangular parcel claims. The world doesn't conform to perfect rectangles (we're already sacrificing  fidelity with the grid system), so each parcel claim made without the ability to create it as a complex shape may potentially need to be "undone" through merges and splits. For transaction and market efficiency, its worth it for us to implement this functionality on the Cadastre from Day 1. 

- [ ] Code repository & licensing clean up
Make sure all of our repos have READMEs, licenses, and generally are approachable for interested stakeholders to dive deeper into.