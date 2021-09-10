# NFT DID Integration
Date:: 2021-09-09
Author:: [[@codynhat]]

---

## Design
Each land parcel is an NFT. By using NFT DID, a land parcel can "own" Ceramic streams. The current owner of a land parcel license at a given time has the ability to make changes to the land parcel's IDX index and streams.

This will enable:
- Land parcels to [[Land Parcel IDX Index|have an IDX index]]
- Storage to be provisioned per parcel

## Implementation
- Cadastre
	- [ ] Reads `did:nft` IDX instead of root doc
	- [ ] Reads `did:nft` Geo Web Pinset
	- [ ] Writes all streams with `did:nft` as controller
	- [ ] User's DID must have a `CAIP10Link` and be owner of NFT when signing commits
		- See [Ceramic docs][1]
		- Using 3ID connect will work
- Smart contracts
	- [x] Remove content ID [#19](https://github.com/Geo-Web-Project/core-contracts/pull/19)
- Subgraph
	- [x] Remove content ID [#13](https://github.com/Geo-Web-Project/geo-web-subgraph/pull/13)
- Storage workers
	- [ ] Only provision storage for `did:nft` that is Geo Web land
- External
	- [ ] Ceramic ELP nodes deploy NFT DID resolver


---
[1]: https://developers.ceramic.network/authentication/nft-did/method/