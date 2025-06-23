// Auth exports
export { loginUser, registerUser, logoutUser, decodeUserIdFromToken, getStoredUser } from "./auth"

// Albums exports
export { addAlbum, updateAlbum, deleteAlbum, fetchAlbums, fetchAlbumById } from "./albums"

// Images exports
export {
  fetchAlbumImages,
  searchImages,
  saveImageMetadata,
  updateImageTags,
  deleteImage,
  analyzeImage,
  searchImagesByTag,
} from "./images"

// Upload exports
export { getUploadUrl } from "./upload"

// Users exports
export { getUsersList, getUserById } from "./users"

// Share exports
export {
  shareImageWithUsers,
  unshareImage,
  getMySharedImages,
  getImageShares,
} from "./share"

// API Client export
export { default as apiClient } from "./apiClient"

// Types exports
export * from "../types"

