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
}: CustomSelectInputProps<T>) => {
  return (
    <Form.Item name={name as any} rules={rules} label={label} className={classNameForm}>
      <Select
        className={`h-[39px] ${classNameSelect} mb-10`}
        disabled={disabled}
        options={options}
        showSearch={showSearch}
        defaultValue={options && options[0] && options[0].value}
      />
    </Form.Item>
  );
};

export default CustomSelectInput;
