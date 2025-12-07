import { ClaimProcessor, deduplicateClaims } from ".";
import { Claim } from "./types/claim";

function testDeduplicateClaims(): void {
  console.log("testing testDeDuplicateClaims");
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
  console.log("testData before", claims);

  let cleanedData = deduplicateClaims(claims);

  console.log("cleanedClaims", cleanedData);
}

function testGetClaimsForMemberID(): void {
  console.log("testing testGetClaimsForMemberID");
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

  console.log("claims", claims);
  let claimProcessor = new ClaimProcessor(claims);
  let claimsForMemberIDA = claimProcessor.getClaimsForMemberID("A");
  console.log("claims for member A", claimsForMemberIDA);
}
function testNumberOfUniqueClaims() {
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

  console.log("testing number of unique claims");
  console.log("claims", claims);
  let claimProcessor = new ClaimProcessor(claims);
  let uniqueClaims = claimProcessor.numberOfUniqueClaims();
  console.log(uniqueClaims);
}

function testTotalAmountAcrossClaims() {
  console.log("testing totalAmountAccrossClaims");
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
  console.log("claims", claims);
  let claimProcessor = new ClaimProcessor(claims);
  let totalAmount = claimProcessor.totalAmountAcrossClaims();
  console.log("total amount", totalAmount);
}

function testingAmountPerProvider() {
  console.log("testing totalAmountAccrossClaims");
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
  console.log("claims", claims);
  let claimProcessor = new ClaimProcessor(claims);
  let amountPerProviderMap = claimProcessor.amountsPerProvider();
  console.log("amount per provider", amountPerProviderMap);
}

function runTestSuite(): void {
  testDeduplicateClaims();
  testGetClaimsForMemberID();
  testNumberOfUniqueClaims();
  testTotalAmountAcrossClaims();
  testingAmountPerProvider();
}

runTestSuite();
