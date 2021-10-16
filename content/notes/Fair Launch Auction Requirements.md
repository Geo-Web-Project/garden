# Business Requirements - Fair Launch Auction

[![hackmd-github-sync-badge](https://hackmd.io/X7t_RoXxRMGfKJwYjE2TyQ/badge)](https://hackmd.io/X7t_RoXxRMGfKJwYjE2TyQ)

Date of Last Update :: 2021-10-15
Author:: [[@gravenp]]

Business requirements for implementation an auction claim mechanism for the fair launch of the Geo Web mainnet

## Background

The Geo Web project is a public good which attempts to establish legitimacy through fairness. Its partial common ownership system promotes ongoing healthy market dynamics (i.e. fairness), but as currently implemented it does not account for certain incentives created at market genesis. There are some famous/highly trafficked places which will draw immediate speculation. "First-come-first-serve" is not the optimal allocation mechanism for this scenario. While "revenue" maximization is not the goal of our fair launch, we believe that initial parcel claims going to those that currently value them the highest (and are willing to contribute to the public good treasury accordingly) is consistent with the long-term incentives/goals of the partial common ownership system.

## Overview

Implement a reverse Dutch auction for genesis land parcel claims in a new "Auction Claimer" contract

## Details

- At a specified datetime (or block height), start a fair launch auction for global parcel claims
  - Prior to this genesis point, the contract should not accept claims
-The auction should be implemented as a reverse Dutch auction
	- This type of auction starts at a high price and decreases to minimum price over time
	- We will use a two-part auction with two different bid reduction rates to help maximize the price discovery range and accessibility while limiting the technical sophistication a participant needs to place a successful bid near their desired valuation
- Auction proceeds are sent to the Geo Web treasury wallet and are considered separately from partial common ownership network fees
- Auction parameters
	- Auction Start Time - when the auction starts
	- Auction Slow Time - when the auction slows down its bid reduction rate
	- Auction End Time - when the required bid amount no longer decreases
	- Starting Bid - the high starting price of the auction
	- Ending Bid - the final/minimum required bid reached and maintained at the end of the auction (could be 0)
- The required auction bid for any parcel of land is a continuously calculated, global value
	- Example logic for 10 ETH starting bid, 2 week auction, 48 hour initial phase, 1 ETH to .01 ETH slow phase:
		- For simplicity, the time since the auction started (in seconds) is represented below by *t* = (block.timestamp - auctionStart) & bids are denominated in ETH rather than wei
		- If *t* =< 172,800 (48 hours in seconds)
			- reqBid = 10 - (9 * (*t* / 172,800)) [in 48 hrs the bid is 1 ETH]
		- If 172,800 < *t* < 1,209,600 (two weeks)
			- reqBid = (233/200) - (11/11520000) * *t* [solved for f(172800) = 1, f(1209600)=.01]
		- If  *t* >= 1,209,600
			- reqBid = .01 [the ongoing minimum claim value ]
- In the auction claim transaction, the claimant should set their self-assessed value for their parcel
	- All standard parcel (e.g. contiguous, non-overlapping) and license (e.g. fee payments, min/max expiration) requirements apply to auction claims
- To be valid, the total value of the prospective claimants' transaction must be equal to or greater than the required auction bid + the required network fees for the chosen self-assessed value
	- First apply the transaction value to covering the required bid
	- The remainder is applied as network fees
		- Note: If the transaction's value exceeds the required bid + 2 years of network fees, then excess funds are still accepted by the treasury, but are effectively forfeited

## Technical Spec
[[Draft Proposal - AuctionETHClaimer]] includes the permissions mapping and interactions with the other supporting core contracts.
  
### To Be Addressed Later
- We need to consider MEV and front-running scenarios where legitimate bids revealed create opportunities for bots/advanced participants
- Solutions?
    - Commit-reveal would be ideal
    - Could implement a multipart claim like ENS domains
    - On a L2 with a fair sequencer, do the same risks for front running exist?

### References
- https://github.com/ensdomains/ens-contracts/blob/master/contracts/ethregistrar/LinearPremiumPriceOracle.sol


     