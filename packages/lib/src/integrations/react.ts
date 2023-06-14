import { TimescapeManager, $NOW, type DateType, type Options } from '..'
import {
  useEffect,
  useRef,
  useLayoutEffect,
  type MutableRefObject,
} from 'react'

export { $NOW, type DateType }

type TimescapeOptions = {
  date?: Date
  onChangeDate?: (nextDate: Date | undefined) => void
} & Options

export const useTimescape = ({
  date,
  minDate,
  maxDate,
  hour12 = false,
  wrapAround = false,
  digits = '2-digit',
  onChangeDate,
}: TimescapeOptions) => {
  const manager = useRef(new TimescapeManager(date))
  const timestamp = date?.getTime()
  const onChangeDateRef = useRef(onChangeDate)

  useEffect(() => {
    manager.current = new TimescapeManager(manager.current.date)

    return () => manager.current.remove()
  }, [])

  useLayoutEffect(() => {
    onChangeDateRef.current = onChangeDate
  }, [onChangeDate])

  useEffect(() => {
    manager.current.date = timestamp
  }, [timestamp])

  useEffect(() => {
    manager.current.subscribe((nextDate) => {
      onChangeDateRef.current?.(nextDate)
    })
  }, [])

  useEffect(() => {
    manager.current.minDate = minDate
    manager.current.maxDate = maxDate

    if (hour12 !== undefined) manager.current.hour12 = hour12
    if (wrapAround !== undefined) manager.current.wrapAround = wrapAround
    if (digits !== undefined) manager.current.digits = digits
  }, [minDate, maxDate, hour12, wrapAround, digits])

  return {
    getInputProps: (
      type: DateType,
      opts?: {
        ref?: MutableRefObject<HTMLInputElement | null>
        autofocus?: boolean
      },
    ) => ({
      ref: (element: HTMLInputElement | null) => {
        if (element) {
          manager.current.registerElement(element, type, opts?.autofocus)
          if (opts?.ref) opts.ref.current = element
        }
      },
    }),
    getRootProps: () => ({
      ref: (element: HTMLElement | null) =>
        element && manager.current.registerRoot(element),
    }),
  } as const
}
