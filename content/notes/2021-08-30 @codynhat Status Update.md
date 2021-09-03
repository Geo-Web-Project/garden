# 2021-08-30 @codynhat Status Update
#status  
Date:: 2021-08-30
Author:: [[@codynhat]]  

---

## Last Week
- [[2021-08-23 @codynhat Status Update]]

## This Week
- [x] Continue Troubleshoot [pinning issues](https://github.com/Geo-Web-Project/storage-workers/issues/3) (Merged)
	- [x] Add error message to allow user to reset pinset
	- [x] Reset pinset should have a loading state
- [x] Other Cadastre pinning issues [cadastre  - feature/preload](https://github.com/Geo-Web-Project/cadastre/tree/feature/preload) (Not Merged)
	- [x] Pin status does not update on gallery modal (requires closing + reopening)
	- [x] Add a serial queue for pinning
- [ ] Add Geo Web preload nodes for js-ipfs [ceramic-nodes - ipfs-preload](https://github.com/Geo-Web-Project/ceramic-nodes/tree/ipfs-preload) (Not Merged)
	- [x] Add NGINX proxy to open `/api/v0/refs`
	- [x] New droplet for IPFS + NGINX
	- [ ] Deploy HTTPS load balancer w/DNS
- [x] [[Deploying to Arbitrum Rinkeby]]
	- [x] Fork Cadastre
- [ ] [[Deploying to Optimistic Kovan]]
	- [ ] Deploy contracts
	- [ ] Deploy hosted subgraph
	- [ ] Fork Cadastre
- [ ] Deploy Cloudflare workers to prod w/HTTP metrics
- [ ] Update Cadastre to use prod workers
- [ ] Investigate what's needed to integrate NFT:DID 