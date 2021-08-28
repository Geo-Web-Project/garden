# Deploying to Optimistic Kovan

Date :: 2021-08-27
Author:: [[@codynhat]]

Notes on attempting to deploy to Optimistic Kovan.

- [Bridge](https://gateway.optimism.io/) worked great
- Requires certain [Solidity versions](https://github.com/ethereum-optimism/solc-bin/tree/gh-pages/bin)
- OpenZeppelin dependencies are failing to compile
	- `OVM: SELFBALANCE is not implemented in the OVM. (We have no native ETH -- use deposited WETH instead!)`
	- `_isApprovedOrOwner` override still needed?
	- Does this also mean we can't use native ETH? Or will Optimism handle this?