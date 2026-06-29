import { mockTreatments, type MockTreatment } from "@/mock/treatments";

export function getTreatmentSlugs(): string[] {
  return mockTreatments.map((treatment) => treatment.id);
}

export function getTreatmentBySlug(slug: string): MockTreatment | null {
  return mockTreatments.find((treatment) => treatment.id === slug) ?? null;
}

export function getTreatmentsSorted(): MockTreatment[] {
  return [...mockTreatments].sort((a, b) => a.sort_order - b.sort_order);
}
