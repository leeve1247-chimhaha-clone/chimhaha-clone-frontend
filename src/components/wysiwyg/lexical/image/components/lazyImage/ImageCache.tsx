class ImageCache {
    private cache = new Map<string, Promise<boolean> | boolean>();

    get(src: string) {
        return this.cache.get(src);
    }

    set(src: string, value: Promise<boolean> | boolean) {
        this.cache.set(src, value);
    }
}

export const imageCache = new ImageCache();