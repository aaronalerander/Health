interface Claim {
  claimID: string;
  memberID: string;
  providerID: string;
  serviceDate: string;
  amount: number;
  receivedAt: Date;
}

export { Claim };
