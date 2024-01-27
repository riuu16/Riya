/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    relation: Relation
    audio: Audio
    'gif-resize': GifResize
    'no-image-sizes': NoImageSize
    'crop-only': CropOnly
    'focal-only': FocalOnly
    media: Media
    enlarge: Enlarge
    reduce: Reduce
    'media-trim': MediaTrim
    'unstored-media': UnstoredMedia
    'externally-served-media': ExternallyServedMedia
    'uploads-1': Uploads1
    'uploads-2': Uploads2
    'admin-thumbnail': AdminThumbnail
    'optional-file': OptionalFile
    'required-file': RequiredFile
    users: User
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  globals: {}
}
export interface Relation {
  id: string
  image?: string | Media
  updatedAt: string
  createdAt: string
}
export interface Media {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  sizes?: {
    maintainedAspectRatio?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    differentFormatFromMainImage?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    maintainedImageSize?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    maintainedImageSizeWithNewFormat?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    accidentalSameSize?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    tablet?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    mobile?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    icon?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    focalTest?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    focalTest2?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    focalTest3?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    focalTest4?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    focalTest5?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    focalTest6?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    focalTest7?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
  }
}
export interface Audio {
  id: string
  audio?: string | Media
  updatedAt: string
  createdAt: string
}
export interface GifResize {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  sizes?: {
    small?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    large?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
  }
}
export interface NoImageSize {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface CropOnly {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  sizes?: {
    focalTest?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    focalTest2?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    focalTest3?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
  }
}
export interface FocalOnly {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  sizes?: {
    focalTest?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    focalTest2?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    focalTest3?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
  }
}
export interface Enlarge {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  sizes?: {
    accidentalSameSize?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    sameSizeWithNewFormat?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    resizedLarger?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    resizedSmaller?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    widthLowerHeightLarger?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
  }
}
export interface Reduce {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  sizes?: {
    accidentalSameSize?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    sameSizeWithNewFormat?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    resizedLarger?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    resizedSmaller?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
  }
}
export interface MediaTrim {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  sizes?: {
    trimNumber?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    trimString?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
    trimOptions?: {
      url?: string
      width?: number
      height?: number
      mimeType?: string
      filesize?: number
      filename?: string
    }
  }
}
export interface UnstoredMedia {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface ExternallyServedMedia {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface Uploads1 {
  id: string
  media?: string | Uploads2
  richText?: {
    [k: string]: unknown
  }[]
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface Uploads2 {
  id: string
  title?: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface AdminThumbnail {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface OptionalFile {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface RequiredFile {
  id: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface User {
  id: string
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string
  resetPasswordExpiration?: string
  salt?: string
  hash?: string
  loginAttempts?: number
  lockUntil?: string
  password: string
}
export interface PayloadPreference {
  id: string
  user: {
    relationTo: 'users'
    value: string | User
  }
  key?: string
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
export interface PayloadMigration {
  id: string
  name?: string
  batch?: number
  updatedAt: string
  createdAt: string
}

declare module 'payload' {
  export interface GeneratedTypes {
    collections: {
      relation: Relation
      audio: Audio
      'gif-resize': GifResize
      'no-image-sizes': NoImageSize
      'crop-only': CropOnly
      'focal-only': FocalOnly
      media: Media
      enlarge: Enlarge
      reduce: Reduce
      'media-trim': MediaTrim
      'unstored-media': UnstoredMedia
      'externally-served-media': ExternallyServedMedia
      'uploads-1': Uploads1
      'uploads-2': Uploads2
      'admin-thumbnail': AdminThumbnail
      'optional-file': OptionalFile
      'required-file': RequiredFile
      users: User
      'payload-preferences': PayloadPreference
      'payload-migrations': PayloadMigration
    }
  }
}