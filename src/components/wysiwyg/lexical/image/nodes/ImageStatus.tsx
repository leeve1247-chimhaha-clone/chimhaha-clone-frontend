export const ImageStatus = { Local: "local", Uploading: "uploading", Uploaded: "uploaded", Error: "error" } as const;
export type ImageStatus = typeof ImageStatus[keyof typeof ImageStatus]