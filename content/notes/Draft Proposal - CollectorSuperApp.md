# Draft Proposal - CollectorSuperApp
#proposal

Date :: 2021-12-21
Author :: [[@codynhat]]

## Summary
A smart contract that is a Superfluid [Super App](https://docs.superfluid.finance/superfluid/protocol-tutorials/super-apps) and handles the flows used in the continuous auction of licenses.

## Parameters
| Name                          | Type      | Description                                            |
| ----------------------------- | --------- | ------------------------------------------------------ | 
| `receiver`                    | `address` | Receiver of contributions                              |     

## Storage
| Name                     | Type                                          | Description                                                                   |
| ------------------------ | --------------------------------------------- | ----------------------------------------------------------------------------- |
| `totalContributionRate`  | `mapping(address => uint256)`                 | Stores the total contribution rate of all licenses for a particular user      |
| `lockedContributionRate` | `mapping(address => uint256)`                 | Stores the locked contribution rate of all pending bids for a particular user |
| `registeredActions`      | `mapping(address => mapping(string => bool))` | Stores a registry of approved targets and actions                             | 

## Functions
### SuperApp Callbacks
#### afterAgreementCreated or afterAgreementUpdated
```solidity
function afterAgreementCreated(
	ISuperToken /*superToken*/,
	address /*agreementClass*/,
	bytes32 /*agreementId*/,
	bytes calldata /*agreementData*/,
	bytes calldata /*cbdata*/,
	bytes calldata /*ctx*/
)
	external
	virtual
	override
	returns (bytes memory /*newCtx*/)
```
```solidity
function afterAgreementUpdated(
	ISuperToken /*superToken*/,
	address /*agreementClass*/,
	bytes32 /*agreementId*/,
	bytes calldata /*agreementData*/,
	bytes calldata /*cbdata*/,
	bytes calldata /*ctx*/
)
	external
	virtual
	override
	returns (bytes memory /*newCtx*/)
```

Callbacks after an agreement is updated or created.

If a Constant Flow Agreement is updated or created, the app opens a flow in the opposite direction back to the user. The net flow should equal the `totalContributionRate` for that user.

- `Flow(user -> app) - Flow(app -> user) = totalContributionRate[user]`
	- `Flow(app -> user)` should equal `Flow(user -> app) - totalContributionRate[user]`
- `Flow(user -> app) >= totalContributionRate[user]`

This pattern allows a user to open a flow ahead of time, but only "start" the flow when they actually have a winning bid.

If the flow is changed to be `< totalContributionRate[user]`, the transaction should revert.

#### afterAgreementTerminated
```solidity
function afterAgreementTerminated(
	ISuperToken /*superToken*/,
	address /*agreementClass*/,
	bytes32 /*agreementId*/,
	bytes calldata /*agreementData*/,
	bytes calldata /*cbdata*/,
	bytes calldata /*ctx*/
)
	external
	virtual
	override
	returns (bytes memory /*newCtx*/)
```

Callback after a flow is terminated.

- `Flow(app -> user)` is terminated
- `Flow(app -> receiver) -= totalContributionRate[user]`
- `totalContributionRate[user]` is set to 0
- All of the user's licenses are up for auction

### Perform Action
Perform action from registry.
```solidity
function performAction(
	address target,
	string signature,
	bytes calldata callData,
	bytes calldata ctx
)
```

Can only be called by Superfluid host. Passes along `msgSender` as the first argument.

### Calculate Available Contribution
Calculate the available contribution for a user.

```solidity
function calculateAvailableContribution(
	address user
) public view
```

`Flow(user -> app) - totalContributionRate[user] - lockedContributionRate[user]`

### Lock Contribution Rate
Locks contribution without starting. Goes against available contribution.

```solidity
function lockContributionRate(
	address user, 
	uint256 amount
)
```

- Requirements
	- `msg.sender` has `MODIFY_CONTRIBUTION_ROLE`
	- `calculateAvailableContribution(user) >= amount`
- Actions
	- `lockedContributionRate[user] -= amount`

### Unlock Contribution Rate
Unlocks contribution that was previously locked.

```solidity
function unlockContributionRate(
	address user, 
	uint256 amount
)
```

- Requirements
	- `msg.sender` has `MODIFY_CONTRIBUTION_ROLE`
	- `lockedContributionRate[user] >= amount`
- Actions
	- `lockedContributionRate[user] -= amount`

### Increase Contribution Rate
```solidity
function increaseContributionRate(
	address user, 
	uint256 amount
)
```

- Requirements
	- `msg.sender` has `MODIFY_CONTRIBUTION_ROLE`
	- `calculateAvailableContribution(user) >= amount`
- Actions
	- `totalContributionRate[user] += amount`
	- `Flow(app -> user) -= amount`
	- `Flow(app -> receiver) += amount`

### Decrease Contribution Rate
```solidity
function decreaseContributionRate(
	address user, 
	uint256 amount
)
```

- Requirements
	- `msg.sender` has `MODIFY_CONTRIBUTION_ROLE`
	- `totalContributionRate[user] >= amount`
- Actions
	- `totalContributionRate[user] -= amount`
	- `Flow(app -> user) += amount`
	- `Flow(app -> receiver) -= amount`

### Pause
Pause and unpause for use in an emergency.

```solidity
function pause() public
```

```solidity
function unpause() public
```

`PAUSE_ROLE` is required.

### isValid
Conforms to [[Draft Proposal - License Validator]]. Checks if current license owner is `0x0` or not.

```solidity
function isValid(uint256 id) public view returns (bool)
```

## Batch Calls
Superfluid [Batch Calls](https://docs.superfluid.finance/superfluid/docs/batch-call) allow for multiple actions to be taken on a Super App in a single transaction.

### Claiming
1. Upgrade ETH to ETHx
2. Batch
	1. Create/update flow >= contribution rate
	2. Approve ETHx for deposit amount
	3. Call `claim()`

### Placing a bid
1. Upgrade ETH to ETHx
2. Batch
	1. Create/update flow >= contribution rate
	2. Approve ETHx for deposit amount
	3. Call `placeBid()`

### Reject a bid
1. Upgrade ETH to ETHx
2. Batch
	1. Update flow >= contribution rate
	2. Approve ETHx for penalty amount
	3. Call `rejectBid()`

## Roles
| Name         | Function Access    |
| ------------ | ------------------ |
| `PAUSE_ROLE` | `pause`, `unpause` |
| `MODIFY_CONTRIBUTION_ROLE` | `increaseContributionRate`, `decreaseContributionRate`, `lockContributionRate`, `unlockContributionRate` |

## Required Permissions
None.

## Diagram
```nomnoml
[ETHExpirationCollector | 
	[Storage |
		licenseExpirationTimestamps
	]
	[<table> Functions |
		makePayment() | public ||
		setContributionRate() | MODIFY_CONTRIBUTION_ROLE OR owner OR isApprovedForAll ||
		moveFunds() | MODIFY_FUNDS_ROLE ||
		migrateFunds() | MODIFY_FUNDS_ROLE ||
		pause() 
		unpause() | PAUSE_ROLE
	]
]

[<lollipop>MODIFY_CONTRIBUTION_ROLE]

[ETHExpirationCollector]-[MODIFY_CONTRIBUTION_ROLE]

[Accountant | 
	[Storage |
		contributionRates
	]
	[<table> Functions |
		setContributionRate() | MODIFY_CONTRIBUTION_ROLE
	]
]

[MODIFY_CONTRIBUTION_ROLE]-+[Accountant]
```