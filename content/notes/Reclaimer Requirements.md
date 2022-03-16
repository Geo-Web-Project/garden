# Business Requirements - Reclaimer
Date of Last Update :: 2022-03-16
Author:: [[@gravenp]]

Business requirements for implementation of a reclaim auction mechanism for parcel licenses that are no longer valid.

## Motivation
Land parcel licenses on the Geo Web are subject to partial common ownership rules. If a licensor stops paying their required network fees (i.e. they let their payment stream run dry), then the parcel needs to go into a foreclosure process that allows others to reclaim it. The goal of this process is to quickly return the parcel to productive usage by finding the market participant that values it at the next highest Self-Assessed Value/For Sale Price (presumably the former licensor valued it the highest before foreclosure or someone would have purchased it already). This can be done with a reverse Dutch auction. Any proceeds from the auction should be paid to the former licensor (penalizing them isn't the primary goal of this process, especially because mistakes will happen).

## Overview

Create a contract that implements a reverse Dutch auction for invalid parcel licenses. Each auction should start the bidding at the parcel's previous self-assessed value and decrease to zero over a two week period. Functionality will resemble that used for the Dutch auction in the `Fair Launch Claimer`, but will be administered per parcel rather than globally.

## Details

- When a network fee payment stream runs dry, the corresponding license(s) should be updated to an inactive state.
	- The SuperFluid protocol uses a buffer deposit to incentive bots to close out the stream. It is during this action that Geo Web land parcel license should be marked inactive.
- The datetime that a parcel license is marked inactive should serve as the Start Time of the Reclaimer Dutch auction.
- Each auction will run for two weeks.
- The required bid for the auction should start at the previous Self-Assessed Value and linearly decrease each second to zero over the course of the auction.
	- After completion of the auction, the parcel can be claimed for free.
- The auction bid proceeds should be paid directly to the former licensor's wallet.
- To be valid, a prospective claimants' bid value and payment must be equal to or greater than the required bid as calculated at the current blocktime
	- Because the required auction price is constantly decreasing, bids should be structured with a "max bid" value 
	- The difference between the user's max bid and the required bid calculated at block processing should not be collected (i.e. user only pays the required bid price)
- As part of the auction claim transaction, the claimant should set their self-assessed value for their parcel and start a valid corresponding network fee payment stream
- Bids and payments should be made in ETHx (ETH wrapped for streaming with SuperFluid), so as to stay consistent with the ongoing streaming payment currency.  
- Example logic for 10 ETHx starting bid (with standard 0 ETHx ending bid in a 2 week auction):
	- For simplicity, the time since the auction started (in seconds) is represented below by *t* = (block.timestamp - auctionStart) & bids are denominated in ETHx rather than wei
	- If 0 =< *t* =< 1,209,600 (two weeks in seconds)
		- reqBid = 10 - (10 * (*t*/1,209,600)) 
	- If  *t* >= 1,209,600
		- reqBid = 0


## Technical Spec
[[Draft Proposal - Reclaimer]] includes the permissions mapping and interactions with the other supporting core contracts.