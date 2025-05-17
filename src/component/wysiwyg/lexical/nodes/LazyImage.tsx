import { type JSX, useEffect, useState } from "react";
import {BrokenImage} from "./BrokenImage.tsx";


const imageCache = new Map<string, Promise<boolean> | boolean>();

function useSuspenseImage(src: string) {
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

function isSVG(src: string): boolean {
    return src.toLowerCase().endsWith('.svg');
}

export function LazyImage(
    {
        altText,
        className,
        imageRef,
        src,
        width,
        height,
        maxWidth,
        onError
    }: {
        altText: string;
        className: string | null;
        height: "inherit" | number;
        imageRef: { current: null | HTMLImageElement };
        maxWidth: number;
        src: string;
        width: "inherit" | number;
        onError: () => void;
    }): JSX.Element {
    const [dimensions] = useState<{
        width: number;
        height: number;
    } | null>(null);
    const isSVGImage = isSVG(src);

    const calculateDimensions = () => {
        if (!isSVGImage) {
            // console.log("not SVGImage... calculateDimensions", width, height, maxWidth);
            return {
                height,
                maxWidth,
                width,
            };
        }

        // Use natural dimensions if available, otherwise fallback to defaults
        const naturalWidth = dimensions?.width || 200;
        const naturalHeight = dimensions?.height || 200;

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
            maxWidth,
            width: finalWidth,
        };
    };

    const imageStyle = calculateDimensions();
    const hasError = useSuspenseImage(src);
    useEffect(() => {
        if (hasError) {
            onError();
        }
    }, [hasError, onError]);

    if (hasError) {
        return <BrokenImage/>;
    }

    return (
        <img
            className={className || undefined}
            src={src}
            alt={altText}
            ref={imageRef}
            style={imageStyle}
        />
    );
}
