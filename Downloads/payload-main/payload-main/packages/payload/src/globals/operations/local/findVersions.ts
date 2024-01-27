import type { GeneratedTypes, RequestContext } from '../../../'
import type { PaginatedDocs } from '../../../database/types'
import type { PayloadRequest } from '../../../express/types'
import type { Payload } from '../../../payload'
import type { Document, Where } from '../../../types'
import type { TypeWithVersion } from '../../../versions/types'

import { getDataLoader } from '../../../collections/dataloader'
import { APIError } from '../../../errors'
import { setRequestContext } from '../../../express/setRequestContext'
import { i18nInit } from '../../../translations/init'
import findVersions from '../findVersions'

export type Options<T extends keyof GeneratedTypes['globals']> = {
  context?: RequestContext
  depth?: number
  fallbackLocale?: string
  limit?: number
  locale?: string
  overrideAccess?: boolean
  page?: number
  req?: PayloadRequest
  showHiddenFields?: boolean
  slug: T
  sort?: string
  user?: Document
  where?: Where
}

export default async function findVersionsLocal<T extends keyof GeneratedTypes['globals']>(
  payload: Payload,
  options: Options<T>,
): Promise<PaginatedDocs<TypeWithVersion<GeneratedTypes['globals'][T]>>> {
  const {
    context,
    depth,
    fallbackLocale: fallbackLocaleArg = options?.req?.fallbackLocale,
    limit,
    locale = payload.config.localization ? payload.config.localization?.defaultLocale : null,
    overrideAccess = true,
    page,
    req: incomingReq,
    showHiddenFields,
    slug: globalSlug,
    sort,
    user,
    where,
  } = options

  const globalConfig = payload.globals.config.find((config) => config.slug === globalSlug)
  const localizationConfig = payload?.config?.localization
  const defaultLocale = payload?.config?.localization
    ? payload?.config?.localization?.defaultLocale
    : null
  const fallbackLocale = localizationConfig
    ? localizationConfig.locales.find(({ code }) => locale === code)?.fallbackLocale
    : null
  const i18n = i18nInit(payload.config.i18n)

  if (!globalConfig) {
    throw new APIError(`The global with slug ${String(globalSlug)} can't be found.`)
  }

  const req = {
    fallbackLocale:
      typeof fallbackLocaleArg !== 'undefined'
        ? fallbackLocaleArg
        : fallbackLocale || defaultLocale,
    i18n,
    locale,
    payload,
    payloadAPI: 'local',
    t: i18n.t,
    transactionID: incomingReq?.transactionID,
    user,
  } as PayloadRequest
  setRequestContext(req, context)

  if (!req.payloadDataLoader) req.payloadDataLoader = getDataLoader(req)

  return findVersions({
    depth,
    globalConfig,
    limit,
    overrideAccess,
    page,
    req,
    showHiddenFields,
    sort,
    where,
  })
}
