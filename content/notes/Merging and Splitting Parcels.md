# Merging and Splitting Parcels Specification

# Introduction
Land licensors' ability to split and merge the parcels that they control is an important part of a functioning digital land market. Initial claim parcel areas cannot persist unchanged forever. Physical land ownership will evolve. The use cases of Geo Web land parcels will evolve. The Geo Web's digital land boundaries must adapt with these forces or utility of the network will suffer.

Beyond the spatial definition of parcel, we must address the impacts to content linking, network fee management, and [[Composable Land Parcel NFTs & Real Estate Development Incentives|nested asset ownership]] in this initiative.

This document outlines the smart contract, content layer, and user interface requirements to support the merging and splitting of Geo Web land parcels.

## Merging Parcels
### Parcel Definition
- Create a `mergeParcels` function 
	- An active (not expired) licensor of two or more contiguous land parcels can combine the parcels by submitting a new coordinate path
		- The new coordinate path must be continuous
		- It must not contain any coordinates not included in the pre-merge parcels
		- OPEN QUESTION: Can the licensor choose to "drop" coordinates from the pre-merge set and effectively return them to being unclaimed? Should this be its own "renounce" function?
	- The licensor must submit a self-assessed value for the merged parcel
	- The function should accept additional network fee payments
	- The contract should calculate a new expiration date of the parcel
		- Calculated based on the new value, any additional network fee payments, and the combined pre-merge parcels' fee balances (via their expiration dates)
		- The new expiration date should be subject to the exiting minimum and maximum values for existing parcels
	- The merged parcel's ID should be set to one of the pre-merge parcel IDs of the licensor's choice
### NFT Composability (Pending)
- The implementation of composable NFT land (i.e. [[Composable Land Parcel NFTs & Real Estate Development Incentives]]) is yet to be determined, but the guiding principle for merged parcels should be that the ownership record of any children assets should be updated to map to the  surviving parcel before the merged parcels are burned.
### Ceramic Streams
- Reconciliation of linked content streams from merged parcels depends on the nature of the content and how it is linked. Here are the three categories of content for merged parcels and the default action to be taken:
	- Parcel-anchored, rivalrous (e.g. parcel name)
		- When a parcel stream can structurally only have one unique value, use the surviving parcel ID's current value and deprecate the other streams.
	- Parcel-anchored, non-rivalrous (e.g. media gallery content)
		- When the content stream can have multiple, distinct values in it, append the merged parcel values into the surviving parcel ID's stream and deprecate the other streams.
	- Point-anchored (e.g. digital art on a wall)
		- When a piece of content is anchored to a specified point or area rather than the whole parcel, it inherently won't conflict with content anchored to another point/area. The content should be appended into a single stream or maintained as separate, complementary streams under the surviving parcel ID
-  OPEN QUESTION: In the IDX profile, could we add a stream that maintains a list of "parcel ancestors" to maintain a navigable historical tree?
	-  Cody: That history is on the blockchain and it has better guarantees 
### Cadastre
- A land parcel licensor should be able to initiate the `mergeParcels` function from within the parcel details of any of their parcels
	- Select one or more additional (contiguous) parcels that they control
		- The Cadastre should create an efficient coordinate path from the selection
	- Select the primary/surviving parcel (default to the parcel the process was initiated from)
		- Instructions should make clear that the surviving parcel ID will inherent the Ceramic streams and children assets of the merged parcels 
	- Set a new Self-Assessed Value
		- Suggest the sum of the individual parcel values
	- Enter Additional Network Fee Payments
	- Calculate and display the new expiration date
	- Trigger the transaction to be signed/paid for via their wallet
	
## Splitting Parcels
### Parcel Definition
- Create a `splitParcel` function 
	- An active (not expired) licensor of a land parcel can split it by submitting two or more valid coordinate paths
		- The new coordinate paths must each be continuous and unique
		- They must not contain any coordinates not included in the pre-split parcel
	- The licensor must submit a self-assessed value for each unique parcel
	- The function should accept additional network fee payments
	- The user should be able to "allocate" the original fee balance and additional payments across the post-split parcels (the total is less than or equal to the original implied fee balance + new payments)
	- The contract should calculate a new expiration date for each unique parcel
		- The new expiration dates should be subject to the exiting minimum and maximum values for existing parcels
	- The first post-split coordinate path listed should be set to inherit the pre-split parcel ID while subsequent coordinate paths receive new parcel IDs
### NFT Composability (Pending)
- The implementation of composable NFT land (i.e. [[Composable Land Parcel NFTs & Real Estate Development Incentives]]) is yet to be determined, but the guiding principle for split parcels should be that the ownership record of any children assets remains with the original parcel ID unless the licensor explicitly transfers ownership (possibly in a separate transaction).
### Ceramic Streams
- New parcels post-split will have new parcel IDs and subsequently separate IDX profiles
- Assignment of linked content streams to split parcels depends on the nature of the content and how it is linked. Here are two categories of content for split parcels and the default action to be taken:
	- Parcel-anchored (e.g. parcel name, media gallery)
		- Content linked at the parcel level should remain linked to the parcel continuing with the original parcel ID
		- The new parcel IDs will start with null values for these types of content, but can easily be updated in separate actions
	- Point-anchored (e.g. digital art on a wall)
		- When a piece of content is anchored to a specified point or area rather than the whole parcel, it inherently has a "right parcel" to be assigned to. If content anchoring is identified by/within a Geo Web coordinate, then if appropriate, the content should be migrated to the corresponding parcel and removed from the original parcel ID's profile
### Cadastre
- A land parcel licensor should be able to initiate the `splitParcel` function from within the parcel details of any of their parcels
	- Enter new split parcel shapes using the same UX as parcel claims (can initially limit this to two parcels for UX)
		- The Cadastre should create efficient coordinate paths from the selections
	- Select the parcel that will maintain the original parcel ID (default to the first new parcel defined)
		- Instructions should make clear that the parcel selected to continue with the original parcel ID will inherit the full Ceramic stream history and by default maintain ownership of any children assets
	- Set a new Self-Assessed Value for each parcel
	- Enter Additional Network Fee Payments
	- Allow the user to allocate the network fees/expiration date across the new parcels
		- UI can start with a proportional allocation of fees by self-assessed value (i.e. all expiration dates are equal)
	- Calculate and display the new expiration date for each parcel
		- The new expiration dates should be subject to the exiting minimum and maximum values for existing parcels
	- Trigger the transaction to be signed/paid for via their wallet
