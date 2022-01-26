# Business Requirements - Fair Launch Auction

[![hackmd-github-sync-badge](https://hackmd.io/X7t_RoXxRMGfKJwYjE2TyQ/badge)](https://hackmd.io/X7t_RoXxRMGfKJwYjE2TyQ)

Date of Last Update :: 2022-01-25
Author:: [[@gravenp]]

Business requirements for implementation an auction claim mechanism for the fair launch of the Geo Web mainnet

## Background

The Geo Web project is a public good which attempts to establish legitimacy through fairness (among other values). Its partial common ownership system promotes ongoing healthy market dynamics (i.e. fairness), but as currently implemented it does not account for certain incentives created at market genesis. There are some famous/highly trafficked places which could draw immediate speculation. "First-come-first-serve" is not the optimal allocation mechanism for this scenario. While "revenue" maximization is not the goal of our fair launch, we believe that initial parcel claims going to those that currently value them the highest (and are willing to contribute to the public good treasury accordingly) is consistent with the long-term incentives/goals of the partial common ownership system.

## Overview

Implement a reverse Dutch auction for genesis land parcel claims in a new "Auction Claimer" contract

## Details

- At a specified datetime (or block height), start a fair launch auction for global parcel claims
  - Prior to this genesis point, the contract should not accept claims
-The auction should be implemented as a reverse Dutch auction
	- This type of auction starts at a high price and decreases to minimum price over time
	- We will use a simple linearly decreasing auction price
- Auction price is paid for the right to claim a parcel 
	- Proceeds are sent to the Geo Web treasury wallet and are considered separate from partial common ownership network fees
- Auction parameters
	- Auction Start Time - when the auction starts
	- Auction End Time - when the required bid amount reaches its minimum value
	- Starting Bid - the high starting price of the auction
	- Ending Bid - the final/minimum required bid reached and maintained at the end of the auction (likely 0 in the case of the Geo Web)
- The required auction bid to claim any parcel of land is a continuously calculated, global value
	- Example logic for 10 ETH starting bid, 0 ETH ending bid, and 2 week auction:
		- For simplicity, the time since the auction started (in seconds) is represented below by *t* = (block.timestamp - auctionStart) & bids are denominated in ETH rather than wei
		- If *t* < 0 
			- Bid transactions fail
		- If 0 =< *t* =< 1,209,600 (two weeks in seconds)
			- reqBid = 10 - (10 * (*t*/1,209,600)) 
		- If  *t* >= 1,209,600
			- Bid transactions fail (user should be using the Simple Claimer)
- To be valid, a prospective claimants' value bid value and payment must be equal to or greater than the reqBid as calculated at the current blocktime
	- Because the required auction price is constantly decreasing, bids should be structured with a "max bid" value 
	- The difference between the user's max bid and the reqBid calculated at block processing should not be collected (i.e. user only pays the reqBid price)
- As part of the auction claim transaction, the claimant should set their self-assessed value for their parcel and start a valid corresponding network fee payment stream
	- All standard parcel (e.g. contiguous, non-overlapping) and license (e.g. fee payments, min/max expiration) requirements apply to auction claims


## Technical Spec
[[Draft Proposal - AuctionETHClaimer]] includes the permissions mapping and interactions with the other supporting core contracts.
  
### For Further Consideration
- We need to consider MEV and front-running scenarios where legitimate bids revealed create opportunities for bots/advanced participants
- Solutions?
    - Commit-reveal would be ideal
    - Could implement a multipart claim like ENS domains
    - On a L2 with a fair sequencer, do the same risks for front running exist?

### References
- https://github.com/ensdomains/ens-contracts/blob/master/contracts/ethregistrar/LinearPremiumPriceOracle.sol


     