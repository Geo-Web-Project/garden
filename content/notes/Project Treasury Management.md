# Project Treasury Management
Last Update :: 2021-09-07

---

# Introduction
Currently, most Geo Web project funds are in wallet addresses controlled solely by Graven. These funds span ETH L1, ZkSync L2, and xDAI. There are additional project funds in an [xDAI-based Aargon DAO](https://aragon.1hive.org/#/geoweb/) of which Cody and Graven are the members.

Most of these funds have come from contributions via [Gitcoin](https://gitcoin.co/grants/1403/geo-web) (L1 & L2) and [Clr.fund](https://clr.fund/#/project/0xeae9349d669abad47bb3adff2cef492247ed50a3eedd6c1d3e5420f66fd53473) (xDAI). One-off hackathons, grants, and contests are occasionally additional sources of funds. These sources of funding may soon be augmented by mainnet network fees.

We need to mature our processes and systems to support project growth (both in the number of contributors and total funds managed). As we update our treasury management, we should focus on the following:
-   Security
	-   Avoid single points of failure and generally protect against possible loss of funds
-   Transparency
	-   Maintain proper levels of visibility (internally and externally) to validate/strengthen trust
-   Usability
	-   Ensure that the processes and tools easy to maintain and execute
-   Transaction fee efficiency
	-   Be mindful of transaction costs for individuals and the project
# Philosophy for Project Funds Usage
The Geo Web is a public good project and isn’t run for profit. The expectations of those providing funding to the project must be carefully considered in how those funds are allocated. We currently see three basic categories of incoming funds: contributor, project, & public.
### Contributor Funds
These are externally sourced funds earned through specific tasks completed by project contributors that are related to the Geo Web (e.g., dev grants & hack-a-thon submissions). The key attributes with this type of funds are defined scope, timeline, and participation. It should be straightforward to draw a line from the grant/hackathon/etc sponsor’s desired outcome to the contributor(s) that helped deliver the outcome. 

Contributors can allocate funds amongst themselves as they seem fit. The project needn’t hold this type of funds or subject payouts to additional governance oversight. In some cases, these funds may never even touch Geo Web accounts and may go straight to contributors’ personal accounts. 
### Project Funds
These are funds sourced for the general furtherance of the project. Examples are Gitcoin and Clr.fund donations + quadratic matching funds. Contributors are what make the project worth donating to, but allocating funds based on the weight of past/future contributions is a subjective exercise. Therefore, we believe that this type of funds should be subject to transparent, “fair” processes and governance.

These funds may be used to cover operational costs (hosting, smart contract deployment, etc.), but the majority should still flow to contributors. We currently use [SourceCred](https://geo-web-project.github.io/sourcecred-instance/#/explorer) (ongoing contributions) and open bounties (targeted work) as the main distribution mechanisms.
### Public Funds
As a public good, funds generated from the “operations'' of the network should be earmarked for the public. The most obvious example of these are the network fees derived from the partial common ownership land market. There may eventually be a category of derivative funds generated through network operations like Geo Web [Subgraph curation](https://thegraph.com/docs/curating) as well.

These funds should be subject to the most stringent governance and transparency. The long-term goal will be for these funds to be managed by the community. In the short-term, the early contributors must exercise careful judgment in the” interest of the public” and wherever possible utilize credibly neutral mechanisms to help grow the positive impact of the network.

## Wallet Management
[Gnosis Safe](https://gnosis-safe.io/) offers an industry standard multi-sig safe. It will launch [native L2 contracts on all the major networks](https://blog.gnosis.pm/gnosis-safes-multichain-future-b676b5b8f431). Even after our mainnet launch on L2, we’ll likely still maintain an L1 wallet. We don’t need to wait for mainnet to establish our Gnosis Safe and will do so during a low network usage time in the next several weeks.

Cody and Graven will be the two owners of the Safe to start. All transactions will require 2 of 2 signatures. Graven will maintain control of the original Geo Web wallet address and use that as “his” signing account. This project wallet will fund all on-chain transaction fees, so it will maintain an appropriate balance of project funds. 

A small balance of funds may be kept on their originating networks (i.e., Gitcoin payments on zkSync, Clr.fund on xDAI), but the vast majority of project funds will be kept in the Safe. The Aragon xDAI DAO will be retired after the Safe is set up.

Beyond multi-signature functionality/security, we can utilize the following Gnosis Safe integrations and tools:
-   Address Book - Up-to-date payment addresses for project contributors
-   [Multisafe](https://multisafe.finance/) - Treasury UI extension, easy mass payments (bi-weekly SourceCred)
-   [OpenZeppelin Defender](https://openzeppelin.com/defender/) - smart contract management and deployment
-   [SafeSnap](https://blog.gnosis.pm/introducing-safesnap-the-first-in-a-decentralized-governance-tool-suite-for-the-gnosis-safe-ea67eb95c34f) - Gasless voting and governance