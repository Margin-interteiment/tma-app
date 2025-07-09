declare module 'react-mobile-datepicker' {
  import * as React from 'react';

  interface DatePickerProps {
    date: Date;
    isOpen: boolean;
    onSelect: (date: Date) => void;
    onCancel: () => void;
    min?: Date;
    max?: Date;
    theme?: 'default' | 'android' | 'ios';
    dateFormat?: string[]; 
    showFormat?: string;
  }

  const DatePicker: React.FC<DatePickerProps>;

  export default DatePicker;
}
