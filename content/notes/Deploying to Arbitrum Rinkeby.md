# Deploying to Arbitrum Rinkeby

Date :: 2021-08-27
Author:: [[@codynhat]]

Notes on attempting to deploy to Arbitrum Rinkeby.

- Is Arbitrum using Kovan or Rinkeby?
- Very confusing, not having any luck bridging Rinkeby ETH to Arbitrum Rinkeby
- Bridge took awhile, but successfully deployed
- Deployed [subgraph](https://thegraph.com/legacy-explorer/subgraph/geo-web-project/geo-web-arbitrum-rinkeby)
	- Needed to use startBlock of `0`
	- Doesn't seem to be syncing on hosted service `Subgraph {} has not started syncing yet`
- [Forking Cadastre](https://github.com/Geo-Web-Project/cadastre/pull/70)
	- Frame wallet is not working
	- Metamask is working
	- Getting a JSON-RPC error when claiming land
	- Trying to reproduce via command line and a claim land script
	- Claiming land script doesn't seem to save state?
		- Transactions succeed, but future claims do not collide
	- Discovered an issue with not setting `GeoWebParcel` on deploy
	- Should try redeploying [latest contracts](https://github.com/Geo-Web-Project/core-contracts/tree/l2)
		- Getting `missing trie node` error when deploying contracts
		- Block explorer and RPC endpoint seem screwed up
		- Tried again later and it worked
	- Redeployed subgraph