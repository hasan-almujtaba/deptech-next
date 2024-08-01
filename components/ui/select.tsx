import dynamic from 'next/dynamic'
import { useId } from 'react'
import { Controller, get, useFormContext } from 'react-hook-form'
import { Path } from 'react-hook-form'
import { Props as ReactSelectProps } from 'react-select'
import { twMerge } from 'tailwind-merge'

export type TProps<TFormValues extends Record<string, unknown>> = {
  id?: string
  label?: string
  name: Path<TFormValues>
  options: any
  disabled?: boolean
  searchable?: boolean
  className?: string
  onChange?: (newValue: any) => void
  isMulti?: boolean
  defaultValue?: any
  scrollable?: boolean
  isRequired?: boolean
} & ReactSelectProps

const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
})

export const Select = <TFormValues extends Record<string, unknown>>(
  props: TProps<TFormValues>
) => {
  const {
    label,
    name,
    id,
    options,
    disabled,
    searchable = false,
    className,
    onChange,
    isMulti,
    defaultValue,
    scrollable = false,
    isRequired,
    ...rest
  } = props

  const generatedId = useId()

  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = get(errors, name)

  return (
    <div>
      {label && (
        <label
          htmlFor={id ?? generatedId}
          className="block text-sm font-bold"
        >
          {label}
          {isRequired && <sup className="text-[#DF0000]">*</sup>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactSelect
            instanceId={id ?? generatedId}
            id={id ?? generatedId}
            isMulti={isMulti}
            onChange={(newValue) => {
              if (onChange) {
                onChange(newValue)
                return
              }

              field.onChange(newValue)
            }}
            options={options}
            components={{
              IndicatorSeparator: undefined,
            }}
            isDisabled={disabled}
            isSearchable={searchable}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 20 }),
              valueContainer: (provided) =>
                scrollable
                  ? {
                      ...provided,
                      height: 'fit-content',
                      minHeight: '38px',
                      maxHeight: '80px',
                      overflowY: 'auto',
                    }
                  : {
                      ...provided,
                      height: '36px',
                    },
              control: (styles, { isDisabled }) => ({
                ...styles,
                backgroundColor: isDisabled ? '#F1F1F1' : '',
                color: isDisabled ? '#F1F1F1' : '#C1C1C1',
                borderColor: '#C1C1C1',
                fontSize: '14px',
                borderRadius: '6px',
              }),
              option: (styles) => ({
                ...styles,
                fontSize: '14px',
              }),
            }}
            className={twMerge('mb-1 h-fit', className)}
            value={field.value}
            defaultValue={defaultValue}
            {...rest}
          />
        )}
      />

      {error && (
        <p className="text-xs italic text-[#DF0000]">
          {error?.message?.toString()}
        </p>
      )}
    </div>
  )
}
