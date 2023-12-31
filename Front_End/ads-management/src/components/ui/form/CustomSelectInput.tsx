import { OptionItems } from '@/utils/types/option.type';
import { Form, Select } from 'antd';
import React from 'react';

export type CustomSelectInputProps<T> = {
  label?: React.ReactNode;
  name?: keyof T | (keyof T | number)[];
  rules?: Array<Record<string, any>>;
  labelCol?: number;
  wrapperCol?: number;
  disabled?: boolean;
  classNameSelect?: string;
  classNameForm?: string;
  options?: OptionItems;
  showSearch?: boolean;
  defaultValue?: any;
  onChange?: (value: any) => void;
};

const CustomSelectInput = <T extends object>({
  label,
  name,
  rules,
  disabled,
  classNameSelect,
  classNameForm,
  options,
  showSearch,
  defaultValue,
  onChange,
}: CustomSelectInputProps<T>) => {
  return (
    <Form.Item
      name={name as any}
      rules={rules}
      label={label}
      className={classNameForm}
      labelCol={{ span: 24 }}
    >
      <Select
        className={`h-[39px] ${classNameSelect}`}
        onChange={onChange}
        disabled={disabled}
        options={options}
        defaultValue={defaultValue}
        showSearch={showSearch}
      />
    </Form.Item>
  );
};

export default CustomSelectInput;
