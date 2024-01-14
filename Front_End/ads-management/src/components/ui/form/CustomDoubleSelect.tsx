import { OptionItems } from '@/utils/types/option.type';
import { Form, Select } from 'antd';
import React from 'react';

export type CustomDualSelectInputProps<T> = {
  label?: React.ReactNode;
  name1?: keyof T | (keyof T | number)[];
  name2?: keyof T | (keyof T | number)[];
  rules?: Array<Record<string, any>>;
  labelCol?: number;
  wrapperCol?: number;
  disabled?: boolean;
  classNameSelect?: string;
  classNameForm?: string;
  options1?: OptionItems;
  options2?: OptionItems;
  showSearch?: boolean;
  defaultValue1?: any;
  defaultValue2?: any;
  value1?: any;
  value2?: any;
  onChange1?: (value: any) => void;
  onChange2?: (value: any) => void;
};

const CustomDualSelectInput = <T extends object>({
  label,
  name1,
  name2,
  rules,
  disabled,
  classNameSelect,
  classNameForm,
  options1,
  options2,
  showSearch = true,
  labelCol = 24,
  defaultValue1,
  defaultValue2,
  value1,
  value2,
  onChange1,
  onChange2,
}: CustomDualSelectInputProps<T>) => {
  return (
    <Form.Item label={label} className={classNameForm} labelCol={{ span: labelCol }}>
      <Select
        className={`h-[39px] ${classNameSelect}`}
        onChange={onChange1}
        disabled={disabled}
        options={options1}
        defaultValue={defaultValue1}
        showSearch={showSearch}
        value={value1}
      />
      <Select
        className={`h-[39px] ${classNameSelect}`}
        onChange={onChange2}
        disabled={disabled}
        options={options2}
        defaultValue={defaultValue2}
        showSearch={showSearch}
        value={value2}
      />
    </Form.Item>
  );
};

export default CustomDualSelectInput;
