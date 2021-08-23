# Parcel Network Fee Balance

A land parcel's _network fee balance_ is the amount of outstanding network fees (ETH) that have been paid by the land owner but have yet to be accrued by the network.

It **is not a stored value**, but rather is inferred from [[Parcel Time Balance]], the self-assessed value, and network fee rates.

$$
networkFeeBalance = timeBalance \times selfAssessedValue \times perSecondFee
$$