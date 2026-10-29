import { memoryDb, drizzleDb, isLiveDatabase } from "@/db";
import { SEED_PACKAGES, SEED_HOTELS, type SeedPackage, type SeedHotel } from "@/db/seed-data";

export interface PackageFilters {
  city?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: string;
  flightsIncluded?: boolean;
  sortBy?: "price_asc" | "price_desc" | "duration" | "popular";
  featured?: boolean;
}

export interface PopulatedPackage extends SeedPackage {
  makkahHotel?: SeedHotel;
  madinahHotel?: SeedHotel;
}

export async function getPackages(filters: PackageFilters = {}): Promise<PopulatedPackage[]> {
  // Ensure any newly added seed packages are present in memoryDb
  const existingIds = new Set(memoryDb.packages.map((p) => p.id));
  for (const seedPkg of SEED_PACKAGES) {
    if (!existingIds.has(seedPkg.id)) {
      memoryDb.packages.push(seedPkg);
      existingIds.add(seedPkg.id);
    }
  }

  let list = [...memoryDb.packages];

  if (filters.featured !== undefined) {
    list = list.filter((p) => p.featured === filters.featured);
  }

  if (filters.city) {
    const qCity = filters.city.toLowerCase();
    list = list.filter((p) =>
      p.departureCities.some((c) => c.toLowerCase() === qCity || c.toLowerCase().includes(qCity))
    );
  }

  if (filters.category && filters.category !== "ALL") {
    list = list.filter((p) => p.category.toUpperCase() === filters.category?.toUpperCase());
  }

  if (filters.minPrice !== undefined) {
    list = list.filter((p) => p.basePriceInr >= (filters.minPrice || 0));
  }

  if (filters.maxPrice !== undefined) {
    list = list.filter((p) => p.basePriceInr <= (filters.maxPrice || Infinity));
  }

  if (filters.flightsIncluded !== undefined) {
    list = list.filter((p) => p.flightsIncluded === filters.flightsIncluded);
  }

  if (filters.duration) {
    if (filters.duration === "short") {
      list = list.filter((p) => p.durationDays <= 10);
    } else if (filters.duration === "classic") {
      list = list.filter((p) => p.durationDays > 10 && p.durationDays <= 15);
    } else if (filters.duration === "long") {
      list = list.filter((p) => p.durationDays > 15);
    }
  }

  // Sorting
  if (filters.sortBy === "price_asc") {
    list.sort((a, b) => a.basePriceInr - b.basePriceInr);
  } else if (filters.sortBy === "price_desc") {
    list.sort((a, b) => b.basePriceInr - a.basePriceInr);
  } else if (filters.sortBy === "duration") {
    list.sort((a, b) => a.durationDays - b.durationDays);
  } else {
    // default popular / rating
    list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  }

  return list.map((pkg) => populatePackage(pkg));
}

export async function getPackageBySlug(slug: string): Promise<PopulatedPackage | null> {
  const pkg = memoryDb.packages.find((p) => p.slug === slug);
  if (!pkg) return null;
  return populatePackage(pkg);
}

export async function getPackageById(id: string): Promise<PopulatedPackage | null> {
  const pkg = memoryDb.packages.find((p) => p.id === id);
  if (!pkg) return null;
  return populatePackage(pkg);
}

export function populatePackage(pkg: SeedPackage): PopulatedPackage {
  const makkahHotel = memoryDb.hotels.find((h) => h.id === pkg.makkahHotelId);
  const madinahHotel = memoryDb.hotels.find((h) => h.id === pkg.madinahHotelId);

  return {
    ...pkg,
    makkahHotel,
    madinahHotel,
  };
}

export async function createPackage(data: Omit<SeedPackage, "id">): Promise<SeedPackage> {
  const newPkg: SeedPackage = {
    ...data,
    id: `pkg-${Date.now()}`,
  };
  memoryDb.packages.unshift(newPkg);
  return newPkg;
}

export async function updatePackage(id: string, updates: Partial<SeedPackage>): Promise<SeedPackage | null> {
  const index = memoryDb.packages.findIndex((p) => p.id === id);
  if (index === -1) return null;
  memoryDb.packages[index] = { ...memoryDb.packages[index], ...updates };
  return memoryDb.packages[index];
}

export async function getHotels(): Promise<SeedHotel[]> {
  return memoryDb.hotels;
}
