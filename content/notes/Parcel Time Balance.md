# Parcel Time Balance

Each land parcel stores an [[Parcel Expiration Timestamp|expiration timestamp]] which is the timestamp at which that license will expire.

A _time balance_ is the duration of time between _now_ and that `expirationTimestamp`. In other words, it is the **remaining amount of time** left before a license expires.

It **is not a stored value**, but rather is inferred from [[Parcel Expiration Timestamp]].  

$$
expirationTimestamp - now()
$$