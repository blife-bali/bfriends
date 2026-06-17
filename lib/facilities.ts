import { mockFacilities, type MockFacility } from "@/mock/facilities";

export function getFacilitySlugs(): string[] {
  return mockFacilities.map((facility) => facility.id);
}

export function getFacilityBySlug(slug: string): MockFacility | null {
  return mockFacilities.find((facility) => facility.id === slug) ?? null;
}

export function getFacilitiesSorted(): MockFacility[] {
  return [...mockFacilities].sort((a, b) => a.sort_order - b.sort_order);
}
