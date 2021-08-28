# Layer 2 Strategy

How should Geo Web be launched on layer 2?

## Requirements
- Geo Web is entirely on one chain at launch, no bridging

## Criteria
- Timeline
- Security
- Network effects
	- Fiat on/off ramp
	- Bridges
	- Default wallet support

## Current Consensus
zkSync has the potential to be the better technology and decision in the long-term. The timeline, however, is uncertain relative to optimistic rollup solutions.

Based on our progress and zkSync's, we will decide between waiting for zkSync or launching on an optimistic rollup solution.

## Current Status
| Network  | Testnet?          | Mainnet?              | Technology         | Fiat on/off ramp | Wallets         | Bridge |  |
| -------- | ----------------- | -----------           | ------------------ | ---------------- | -------         | ------ |
| zkSync   | [Internal only][1] | 2021           | zkRollups          |                  |
| Optimism | Kovan             | [Restricted][2], Late 2021 | Optimistic rollups |                  | Metamask, Frame | Yes    |
| Arbitrum | Rinkeby           | [Arbitrum One][4], August 2021        | Optimistic rollups |                  |                 | Yes |

## Timeline
- Optimism recently delayed their mainnet launch until later in 2021
- zkSync is targeting August 2021 for zkSync 2.0 and full Zinc and Solidity support

## Existing Projects
- [Arbitrum][3]
- [Optimism][5]

## Ideas
- Develop Zinc smart contracts before May testnet
    - Deploy Zinc smart contracts to testnet
- Develop OVM smart contracts and launch locally
    - Wait for public testnet?
- Explore grid size across different solutions
- From [[20210802 Week In Review]]
	* Prefer zkSync 2.0 if ready (long term winner due for scaling and "trust math")
	* Like the alignment on public goods with Optimism
	* In the short/medium term all three rollup solutions are conceptually "good enough" (pending actual testing) 
	* Mainnet launch WILL be on a ETH L2 rollup
		* Testnet launched before mainnet


[1]: https://medium.com/matter-labs/zksync-2-0-hello-ethereum-ca48588de179?source=rss----bd3444e7f3b9---4
[2]: https://medium.com/ethereum-optimism/community-launch-7c9a2a9d3e84
[3]: https://portal.arbitrum.one
[4]: https://offchain.medium.com/a-is-for-arbitrum-a-is-for-august-71391582d95b
[5]: https://community.optimism.io/docs/users/apps.html