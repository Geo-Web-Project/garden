# Extending the Geo Web

A design goal of the Geo Web is to be **extensible**.

The goal is **not** for early contributors to predict what the best decisions for the future will be today, but rather to be humble and realize that many (if not, most) decisions made today will one day been seen as the wrong decision. Thus, early contributors should be putting more energy into designing the system to be extensible over trying to come up with perfect decisions.

Designing the system to be _extensible_ means:
- Easy to add new features
- Easy to change existing features
- Easy to remove and replace features


## Notes
- Smart contracts are laws
	- [Introduction to Ethereum: The Internet's Government](https://karl.tech/intro-to-ethereum/)
	- RBAC allows new laws to be self-contained
	- Instead of needing to rewrite existing laws (proxy upgrade)
	- RBAC allows laws to stop being followed
- Role-based access control
- Proxy upgrade pattern is complex
	- https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/
- Constantly think about what should be easier to change
- Examples
	- Parcel
		- **Stores** which coordinates belong to which parcels
		- **Allows** modifying
			- Extended to mint, burn, merge, split, grow, renounce
	- License
		- **Stores** who owns which parcel
		- **Allows**
			- Transferring parcels
			- Minting/burning parcels
		- What if we need to add ERC998 later?
			- Proxy upgrade would allow ERC998 to be added
			- OR new ERC998 is created
				- Represents the collection of assets
				- Is both top-down (owns assets) and bottom-up (is owned by a parcel)
				- No changes needed to parcel
	- Adding merging after ERC998
		- Merger needs approval from current owner
		- Merger transfers assets from old parcel to new on merge
	- Adding ERC998 after merging
		- Assets not moved before merge would be lost
		- A _new_ merger is deployed that knows to approve/transfer assets
		- New merger would need to be granted necessary permission
		- Old merger has permissions revoked