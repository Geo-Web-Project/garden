# Updating Parcel Expiration Timestamp

How does the [[Parcel Expiration Timestamp]] update when some event occurs? Events include:
- Land value change
- Additional network fee payment

---

1. Calculate _existing_ [[Parcel Time Balance]]
	> $timeBalance_{existing} = expirationTimestamp - now()$
2. Calculate _existing _[[Parcel Network Fee Balance]]
	> $networkFeeBalance_{existing} = timeBalance_{existing} \times selfAssessedValue_{existing} \times perSecondFee$
3. Calculate _new_ [[Parcel Network Fee Balance]]
	- Changes when `additionalNetworkFeePayment > 0`
	> $networkFeeBalance_{new} = networkFeeBalance_{existing} + additionalNetworkFeePayment$
4. Calculate _new_ [[Parcel Time Balance]]
	- Changes on new `selfAssessedValue`
	> $timeBalance_{new} = \frac{networkFeeBalance_{new}}{selfAssessedValue_{new} \times perSecondFee}$
5. Calculate new `expirationTimestamp`
	> $expirationTimestamp_{new} = now() + timeBalance_{new}$