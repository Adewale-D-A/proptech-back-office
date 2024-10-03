export type apartmentLists = {
  id: string;
  image: string;
  name: string;
  location: string;
  noOfGuests: number;
  category: string;
  characteristics: string;
  units: number;
  availabilityStatus: "Available" | "Not Available";
}[];

export type apartmentById = {
  id: string;
  name: string;
  roomOption: string;
  images: { url: string }[];
  amount: string;
  location: string;
  aboutLocation: string;
  noBeds: string;
  noBaths: string;
  whatToExpect: string;
  pointOfInterest: string;
  safetyAndSecurity: string[];
  availabilityStatus: string;
  rules: string[];
  cancellationPolicies: string[];
};
