'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import qs from 'qs'

import { Post } from '../../../../payload-types'
import type { ArchiveBlockProps } from '../../../_blocks/ArchiveBlock/types'
import { Card } from '../../Card'
import { Gutter } from '../../Gutter'
import { PageRange } from '../../PageRange'
import { Pagination } from '../../Pagination'

import classes from './index.module.scss'
import { PAYLOAD_SERVER_URL } from '@/app/_api/serverURL'

type Result = {
  totalDocs: number
  docs: (Post | string)[]
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  nextPage: number
  prevPage: number
}

export type Props = Omit<ArchiveBlockProps, 'blockType'> & {
  className?: string
  showPageRange?: boolean
  onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
  sort?: string
}

export const CollectionArchiveByCollection: React.FC<Props> = (props) => {
  const {
    className,
    relationTo,
    showPageRange,
    onResultChange,
    sort = '-createdAt',
    limit = 10,
    populatedDocs,
    populatedDocsTotal,
    categories: catsFromProps,
  } = props

  const [results, setResults] = useState<Result>({
    totalDocs: typeof populatedDocsTotal === 'number' ? populatedDocsTotal : 0,
    docs: populatedDocs?.map((doc) => doc.value) || [],
    page: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 1,
    nextPage: 1,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasHydrated = useRef(false)
  const [page, setPage] = useState(1)

  const scrollToRef = useCallback(() => {
    const { current } = scrollRef
    if (current) {
      // current.scrollIntoView({
      //   behavior: 'smooth',
      // })
    }
  }, [])

  useEffect(() => {
    if (!isLoading && typeof results.page !== 'undefined') {
      // scrollToRef()
    }
  }, [isLoading, scrollToRef, results])

  useEffect(() => {
    let timer: NodeJS.Timeout

    // hydrate the block with fresh content after first render
    // don't show loader unless the request takes longer than x ms
    // and don't show it during initial hydration
    timer = setTimeout(() => {
      if (hasHydrated) {
        setIsLoading(true)
      }
    }, 500)

    const searchQuery = qs.stringify(
      {
        sort,
        where: {
          ...(catsFromProps && catsFromProps?.length > 0
            ? {
                categories: {
                  in:
                    typeof catsFromProps === 'string'
                      ? [catsFromProps]
                      : catsFromProps
                          .map((cat) => (typeof cat === 'object' && cat !== null ? cat.id : cat))
                          .join(','),
                },
              }
            : {}),
        },
        limit,
        page,
        depth: 1,
      },
      { encode: false },
    )

    const makeRequest = async () => {
      try {
        const req = await fetch(`${PAYLOAD_SERVER_URL}/api/${relationTo}?${searchQuery}`)
        const json = await req.json()
        clearTimeout(timer)
        hasHydrated.current = true

        const { docs } = json as { docs: Post[] }

        if (docs && Array.isArray(docs)) {
          setResults(json)
          setIsLoading(false)
          if (typeof onResultChange === 'function') {
            onResultChange(json)
          }
        }
      } catch (err) {
        console.warn(err) // eslint-disable-line no-console
        setIsLoading(false)
        setError(`Unable to load "${relationTo} archive" data at this time.`)
      }
    }

    makeRequest()

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [page, catsFromProps, relationTo, onResultChange, sort, limit])

  return (
    <div className={[classes.collectionArchive, className].filter(Boolean).join(' ')}>
      <div ref={scrollRef} className={classes.scrollRef} />
      {!isLoading && error && <Gutter>{error}</Gutter>}
      <Fragment>
        {showPageRange !== false && (
          <Gutter>
            <div className={classes.pageRange}>
              <PageRange
                totalDocs={results.totalDocs}
                currentPage={results.page}
                collection={relationTo}
                limit={limit}
              />
            </div>
          </Gutter>
        )}
        <Gutter>
          <div className={classes.grid}>
            {results.docs?.map((result, index) => {
              if (typeof result === 'string') {
                return null
              }

              return (
                <div key={index} className={classes.column}>
                  <Card relationTo="posts" doc={result} showCategories />
                </div>
              )
            })}
          </div>
          {results.totalPages > 1 && (
            <Pagination
              className={classes.pagination}
              page={results.page}
              totalPages={results.totalPages}
              onClick={setPage}
            />
          )}
        </Gutter>
      </Fragment>
    </div>
  )
}
