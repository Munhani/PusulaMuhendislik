interface CacheEntry {
  timestamp: number;
  data: any;
}

class ModelCache {
  private static instance: ModelCache;
  private cache: Map<string, CacheEntry>;
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1 saat

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): ModelCache {
    if (!ModelCache.instance) {
      ModelCache.instance = new ModelCache();
    }
    return ModelCache.instance;
  }

  public set(key: string, data: any): void {
    this.cache.set(key, {
      timestamp: Date.now(),
      data
    });
  }

  public get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }

  public clear(): void {
    this.cache.clear();
  }

  public remove(key: string): void {
    this.cache.delete(key);
  }
}

export const modelCache = ModelCache.getInstance(); 