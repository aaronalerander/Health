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

class ClaimProcessor {
  claims: Claim[];

  constructor(claims: Claim[]) {
    let dedeupedClaims = deduplicateClaims(claims);
    this.claims = dedeupedClaims;
  }

  getClaimsForMemberID(id: string): Claim[] {
    let claims = [...this.claims];
    let memberClaims = claims.filter((claim) => claim.memberID === id);
    return memberClaims;
  }

  numberOfUniqueClaims(): number {
    return this.claims.length;
  }

  totalAmountAcrossClaims(): number {
    let amount = 0;
    for (let claim of this.claims) {
      amount += claim.amount;
    }
    return amount;
  }
}

function deduplicateClaims(claimsData: Claim[]): Claim[] {
  let claimSet = new Map<string, Claim>();

  for (const claim of claimsData) {
    let claimID = JSON.stringify({
      claimID: claim.claimID,
      memberID: claim.memberID,
      providerID: claim.providerID,
      serviceDate: claim.serviceDate,
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

export { deduplicateClaims, ClaimProcessor };
