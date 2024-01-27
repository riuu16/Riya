import { useWindowInfo } from '@faceless-ui/window-info'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import type { Props } from './types'

import useIntersect from '../../../hooks/useIntersect'
import { PopupTrigger } from './PopupTrigger'
import './index.scss'

const baseClass = 'popup'

const Popup: React.FC<Props> = (props) => {
  const {
    boundingRef,
    button,
    buttonClassName,
    buttonType = 'default',
    caret = true,
    children,
    className,
    forceOpen,
    horizontalAlign: horizontalAlignFromProps = 'left',
    initActive = false,
    onToggleOpen,
    render,
    showOnHover = false,
    showScrollbar = false,
    size = 'medium',
    verticalAlign: verticalAlignFromProps = 'top',
  } = props

  const { height: windowHeight, width: windowWidth } = useWindowInfo()
  const [intersectionRef, intersectionEntry] = useIntersect({
    root: boundingRef?.current || null,
    rootMargin: '-100px 0px 0px 0px',
    threshold: 1,
  })

  const contentRef = useRef(null)
  const [active, setActive] = useState(initActive)
  const [verticalAlign, setVerticalAlign] = useState(verticalAlignFromProps)
  const [horizontalAlign, setHorizontalAlign] = useState(horizontalAlignFromProps)

  const setPosition = useCallback(
    ({ horizontal = false, vertical = false }) => {
      if (contentRef.current) {
        const bounds = contentRef.current.getBoundingClientRect()

        const {
          bottom: contentBottomPos,
          left: contentLeftPos,
          right: contentRightPos,
          top: contentTopPos,
        } = bounds

        let boundingTopPos = 100
        let boundingRightPos = document.documentElement.clientWidth
        let boundingBottomPos = document.documentElement.clientHeight
        let boundingLeftPos = 0

        if (boundingRef?.current) {
          ;({
            bottom: boundingBottomPos,
            left: boundingLeftPos,
            right: boundingRightPos,
            top: boundingTopPos,
          } = boundingRef.current.getBoundingClientRect())
        }

        if (horizontal) {
          if (contentRightPos > boundingRightPos && contentLeftPos > boundingLeftPos) {
            setHorizontalAlign('right')
          } else if (contentLeftPos < boundingLeftPos && contentRightPos < boundingRightPos) {
            setHorizontalAlign('left')
          }
        }

        if (vertical) {
          if (contentTopPos < boundingTopPos && contentBottomPos < boundingBottomPos) {
            setVerticalAlign('bottom')
          } else if (contentBottomPos > boundingBottomPos && contentTopPos > boundingTopPos) {
            setVerticalAlign('top')
          }
        }
      }
    },
    [boundingRef],
  )

  const handleClickOutside = useCallback(
    (e) => {
      if (contentRef.current.contains(e.target)) {
        return
      }

      setActive(false)
    },
    [contentRef],
  )

  useEffect(() => {
    setPosition({ horizontal: true })
  }, [intersectionEntry, setPosition, windowWidth])

  useEffect(() => {
    setPosition({ vertical: true })
  }, [intersectionEntry, setPosition, windowHeight])

  useEffect(() => {
    if (typeof onToggleOpen === 'function') onToggleOpen(active)

    if (active) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [active, handleClickOutside, onToggleOpen])

  useEffect(() => {
    setActive(forceOpen)
  }, [forceOpen])

  const classes = [
    baseClass,
    className,
    `${baseClass}--size-${size}`,
    `${baseClass}--v-align-${verticalAlign}`,
    `${baseClass}--h-align-${horizontalAlign}`,
    active && `${baseClass}--active`,
    showScrollbar && `${baseClass}--show-scrollbar`,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <div className={`${baseClass}__trigger-wrap`}>
        {showOnHover ? (
          <div
            className={`${baseClass}__on-hover-watch`}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
          >
            <PopupTrigger
              {...{ active, button, buttonType, className: buttonClassName, setActive }}
            />
          </div>
        ) : (
          <PopupTrigger
            {...{ active, button, buttonType, className: buttonClassName, setActive }}
          />
        )}
      </div>

      <div className={`${baseClass}__content`} ref={contentRef}>
        <div className={`${baseClass}__hide-scrollbar`} ref={intersectionRef}>
          <div className={`${baseClass}__scroll-container`}>
            <div className={`${baseClass}__scroll-content`}>
              {render && render({ close: () => setActive(false) })}
              {children && children}
            </div>
          </div>
        </div>

        {caret && <div className={`${baseClass}__caret`} />}
      </div>
    </div>
  )
}

export default Popup
