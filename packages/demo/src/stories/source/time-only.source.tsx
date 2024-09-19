import { useTimescape } from 'timescape/react'
import { root, input, separator, wrapper } from '../timescape.css'
import { SetOptions } from '../SetOptions'

const App = () => {
  const { getRootProps, getInputProps, options, update } = useTimescape({
    date: new Date(),
    hour12: false,
    digits: '2-digit',
    wrapAround: false,
    snapToStep: false,
    decimalPlaces: 2,
  })

  return (
    <div className={wrapper}>
      <div {...getRootProps()} className={root}>
        <input className={input} {...getInputProps('hours')} />
        <span className={separator}>:</span>
        <input className={input} {...getInputProps('minutes')} />
        <span className={separator}>:</span>
        <input className={input} {...getInputProps('seconds')} />
        <span className={separator}>.</span>
        <input className={input} {...getInputProps('decimal')} />
        {options.hour12 && (
          <input className={input} {...getInputProps('am/pm')} />
        )}
      </div>
      <SetOptions
        enabled={[
          'date',
          'snapToStep',
          'wrapAround',
          'hour12',
          'digits',
          'decimalPlaces',
        ]}
        options={options}
        updateFn={update}
      />
    </div>
  )
}

export default App
