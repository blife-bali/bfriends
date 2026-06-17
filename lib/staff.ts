import type { FacilityId } from "@/mock/facilities";
import { mockStaff, type MockStaffMember } from "@/mock/staff";

export function getStaffSorted(members: MockStaffMember[] = mockStaff): MockStaffMember[] {
  return [...members].sort((a, b) => a.sort_order - b.sort_order);
}

export function getStaffByFacility(facilityId: FacilityId): MockStaffMember[] {
  return getStaffSorted(mockStaff.filter((member) => member.facilities.includes(facilityId)));
}

export function getStaffByProgram(programSlug: string): MockStaffMember[] {
  const normalized = programSlug.trim().toLowerCase();
  return getStaffSorted(
    mockStaff.filter((member) =>
      member.programs.some((program) => program.toLowerCase() === normalized),
    ),
  );
}

export type StaffFilter =
  | { facilityId: FacilityId; programSlug?: never }
  | { programSlug: string; facilityId?: never }
  | { facilityId?: undefined; programSlug?: undefined };

export function getStaffForContext(filter: StaffFilter = {}): MockStaffMember[] {
  if (filter.facilityId) return getStaffByFacility(filter.facilityId);
  if (filter.programSlug) return getStaffByProgram(filter.programSlug);
  return getStaffSorted();
}
