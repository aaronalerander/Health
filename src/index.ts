import { Claim } from "./types/claim";

let claims: Claim[] = [
  {
    claimID: "1",
    memberID: "A",
    providerID: "P1",
    serviceDate: "2024-01-01",
    amount: 100,
    receivedAt: new Date("2024-01-02T10:00:00Z"),
  },
  {
    claimID: "1",
    memberID: "A",
    providerID: "P1",
    serviceDate: "2024-01-01",
    amount: 100, // duplicate
    receivedAt: new Date("2024-01-03T09:00:00Z"),
  },
  {
    claimID: "2",
    memberID: "B",
    providerID: "P2",
    serviceDate: "2024-01-05",
    amount: 300,
    receivedAt: new Date("2024-01-06T12:00:00Z"),
  },
];

function deduplicateClaims(claimsData: Claim[]): Claim[] {
  let claimSet = new Map<string, Claim>();

  for (const claim of claimsData) {
    let claimID = JSON.stringify({
      claimID: claim.claimID,
      memberID: claim.memberID,
      serviceDate: claim.serviceDate,
      amount: claim.amount,
    });
    let currentClaim = claimSet.get(claimID);

    if (currentClaim === undefined) {
      claimSet.set(claimID, claim);
    } else {
      if (claim.receivedAt > currentClaim.receivedAt) {
        claimSet.set(claimID, claim);
      }
    }
  }

  return Array.from(claimSet.values());
}

function getClaimsForMemberID(id: string, claims: Claim[]): Claim[] {
  let dedupedClaims = deduplicateClaims(claims);
  let memberClaims = dedupedClaims.filter((claim) => claim.memberID === id);
  return memberClaims;
}

function numberOfUniqueClaims(claims: Claim[]): number {
  let dedeupedClaims = deduplicateClaims(claims);
  return dedeupedClaims.length;
}

function totalAmountAcrossClaims(claims: Claim[]): number {
  let deduped = deduplicateClaims(claims);
  let amount = 0;
  for (let claim of deduped) {
    amount += claim.amount;
  }
  return amount;
}

export {
  deduplicateClaims,
  getClaimsForMemberID,
  numberOfUniqueClaims,
  totalAmountAcrossClaims,
};
