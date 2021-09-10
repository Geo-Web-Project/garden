# 2021-09-08 @codynhat Status Update
#status  
Date:: 2021-09-08
Author:: [[@codynhat]]  

---

## Last Week
- [[2021-08-30 @codynhat Status Update]]

## This Week
- [x] Add Geo Web preload nodes for js-ipfs [ceramic-nodes - ipfs-preload](https://github.com/Geo-Web-Project/ceramic-nodes/tree/ipfs-preload) (Merged)
	- [x] Deploy HTTPS load balancer w/DNS
	- [x] Point Cadastre to preload node [cadastre](https://github.com/Geo-Web-Project/cadastre/pull/74) (Merged)
- [x] Investigate what's needed to integrate NFT:DID 
	- [[NFT DID Integration]]
- [x] Deploy Cloudflare workers to prod w/HTTP metrics
- [x] Update Cadastre to use prod workers
- [x] Begin work to [[NFT DID Integration|integrate NFT DID]]
	- [x] Remove content ID from smart contracts [#19](https://github.com/Geo-Web-Project/core-contracts/pull/19)
	- [x] Remove content ID from subgraph [#13](https://github.com/Geo-Web-Project/geo-web-subgraph/pull/13)
	- [x] Create a Rinkeby fork