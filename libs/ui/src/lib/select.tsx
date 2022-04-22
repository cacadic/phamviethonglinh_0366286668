import { Select as AntdSelect, SelectProps, FormInstance } from 'antd';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { SafeAny } from '@sotatek/models';

export interface SelectControlProps extends SelectProps<SafeAny> {
  options?: SafeAny[];
  getOptionLabel?: (o: SafeAny) => string;
  getOptionValue?: (o: SafeAny) => string;
  optionRender?: (o: SafeAny) => ReactNode;
  form?: FormInstance;
  name?: string;
  disabledOptions?: SafeAny[];
  containerStyle?: SafeAny;
  containerClass?: string;
  highlightOptions?: SafeAny[];
}

const FormWrapper = styled.div``;

export function Select(props: SelectControlProps) {
  const {
    options,
    getOptionLabel,
    getOptionValue,
    optionRender,
    form,
    onChange,
    name,
    disabledOptions,
    containerClass,
    containerStyle,
    highlightOptions,
    ...rest
  } = props;
  const onValueChange = (val?: SafeAny, option?: SafeAny) => {
    onChange && onChange(val, option);
    form && name && form.setFieldsValue({ [name]: val });
  };
  return (
    <FormWrapper
      className={`relative w-full ${containerClass}`}
      style={containerStyle}
    >
      <AntdSelect
        {...rest}
        onChange={(val, option) => onValueChange(val, option)}
        getPopupContainer={(trigger) => trigger.parentNode}
      >
        {(options || [])
          .map((i) => ({
            label: getOptionLabel ? getOptionLabel(i) : i.label,
            value: getOptionValue ? getOptionValue(i) : i.value,
          }))
          .map((i, index) => (
            <AntdSelect.Option
              className={`${
                highlightOptions?.includes(i.value) ? 'highlight' : ''
              }`}
              title={i.label}
              key={index}
              value={i.value}
              disabled={disabledOptions && disabledOptions.includes(i.value)}
            >
              {optionRender ? optionRender(options?.[index]) : i.label}
            </AntdSelect.Option>
          ))}
      </AntdSelect>
    </FormWrapper>
  );
}

export const Option = AntdSelect.Option;
