# 2021-08-30 @codynhat Status Update
#status  
Date:: 2021-08-30
Author:: [[@codynhat]]  

---

## Last Week
- [[2021-08-23 @codynhat Status Update]]

## This Week
- [x] Continue Troubleshoot [pinning issues](https://github.com/Geo-Web-Project/storage-workers/issues/3)
	- DID latest CID is not loading (never pinned)
	- Storage Workers return success that means it was pinned
	- Cadastre checks CID before checking `/latest`
	- Should we have a way a user can "force refresh" their pinset?
	- Adding an error message to allow user to reset pinset
		- [x] Updates IDX record to point to empty pinset
		- Some issues with batch adding a lot of pins
	- [x] Reset pinset should have a loading state
	- Seems to be having issues resetting my pinset
- [x] [[Deploying to Arbitrum Rinkeby]]
	- [x] Fork Cadastre
- [ ] [[Deploying to Optimistic Kovan]]
	- [ ] Deploy contracts
	- [ ] Deploy hosted subgraph
	- [ ] Fork Cadastre
- [ ] Add Geo Web preload nodes for js-ipfs
	- Add `ipfs.geoweb.network` -> Load balancer
	- Add NGINX proxy to open `/api/v0/refs`
	- Infura has an IPFS API
		- Does not support  `/api/v0/refs`
	- [x] New droplet for IPFS + NGINX
		- NixOS image
	- [ ] Deploy HTTPS load balancer w/DNS
- [ ] Deploy Cloudflare workers to prod w/HTTP metrics
- [ ] Update Cadastre to use prod workers
- [ ] Investigate what's needed to integrate NFT:DID 