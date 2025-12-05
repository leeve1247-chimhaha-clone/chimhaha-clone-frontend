import {imageCache} from "./ImageCache.tsx";

export function useSuspenseImage(src: string) {
    let cached = imageCache.get(src);
    if (typeof cached === 'boolean') {
        return cached;
    } else if (!cached) {
        cached = new Promise<boolean>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(false);
            img.onerror = () => resolve(true);
        }).then((hasError) => {
            imageCache.set(src, hasError);
            return hasError;
        });
        imageCache.set(src, cached);
        throw cached;
    }
    throw cached;
}

export function calculateDimensions(isSVGImage: boolean, width: "inherit" | number,
                                    height: "inherit" | number,
                                    maxWidth: number) {
    if (!isSVGImage) {
        // console.log("not SVGImage... calculateDimensions", width, height, maxWidth);
        return {
            height,
            maxWidth,
            width,
        };
    }

    // Use natural dimensions if available, otherwise fallback to defaults
    const naturalWidth = width == "inherit" ? 200 : width;
    const naturalHeight = height == "inherit" ? 200 : height;

    let finalWidth = naturalWidth;
    let finalHeight = naturalHeight;

    // Scale down if width exceeds maxWidth while maintaining aspect ratio
    if (finalWidth > maxWidth) {
        const scale = maxWidth / finalWidth;
        finalWidth = maxWidth;
        finalHeight = Math.round(finalHeight * scale);
    }

    // Scale down if height exceeds maxHeight while maintaining aspect ratio
    const maxHeight = 500;
    if (finalHeight > maxHeight) {
        const scale = maxHeight / finalHeight;
        finalHeight = maxHeight;
        finalWidth = Math.round(finalWidth * scale);
    }

    // console.log("calculateDimensions", finalWidth, finalHeight, maxWidth);
    return {
        height: finalHeight,
        width: finalWidth,
        maxWidth,
    };
}