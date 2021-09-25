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
	- [x] Writes to `did:nft` IDX index instead of root doc
		- Not supported by IDX/Glaze tooling
		- Could create records and index manually
	- [x] Reads `did:nft` IDX instead of root doc
	- [x] Reads `did:nft` Geo Web Pinset
	- [x] Writes all streams with `did:nft` as controller
	- [x] User's DID must have a `CAIP10Link` and be owner of NFT when signing commits
		- See [Ceramic docs][1]
		- Using 3ID connect will work
- Smart contracts
	- [x] Remove content ID [#19](https://github.com/Geo-Web-Project/core-contracts/pull/19)
- Subgraph
	- [x] Remove content ID [#13](https://github.com/Geo-Web-Project/geo-web-subgraph/pull/13)
- Storage workers
	- [x] Only provision storage for `did:nft` that is Geo Web land
- External
	- [ ] Ceramic ELP nodes deploy NFT DID resolver
	- [x] Verify our implementation is still IDX compliant (https://github.com/ceramicstudio/js-glaze/issues/68)


---
[1]: https://developers.ceramic.network/authentication/nft-did/method/