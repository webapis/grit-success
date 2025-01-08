export class BuildTimeCache {
    static slugCache = new Map();
    static pageDataCache = new Map();
    static fuseCache = new Map();
    
    static clear() {
        this.slugCache.clear();
        this.pageDataCache.clear();
        this.fuseCache.clear();
    }
} 