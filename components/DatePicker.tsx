import AirDatepicker from 'air-datepicker';

import 'air-datepicker/air-datepicker.css';

import { forwardRef, useEffect, useRef, useState } from 'react';

interface AirDatepickerProps {
  id?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  valueDate?: string;
  setDate: (date: string) => void;
}
const AirDatepickerReact = forwardRef<HTMLInputElement, AirDatepickerProps>(
  (props, ref) => {
    const [dateValue, setDateValue] = useState('');

    const $input = useRef();
    const dp = useRef();

    useEffect(() => {
      if (props.valueDate) {
        setDateValue(props.valueDate);
      }
    }, [props.valueDate]);

    useEffect(() => {
      dp.current = new AirDatepicker($input.current, {
        onSelect: ({ formattedDate }) => {
          setDateValue(formattedDate);
          props.setDate(formattedDate);
        },
      });
    }, []);

    useEffect(() => {
      dp.current.update();
    }, [dateValue]);

    return (
      <input
        autoComplete="off"
        id={props.id}
        className={props.className}
        type={props.type}
        ref={ref || $input}
        placeholder={props.placeholder}
        value={props.valueDate ? props.valueDate : dateValue}
        onChange={(ev) => setDateValue(ev.target.value)}
      />
    );
  },
);

AirDatepickerReact.displayName = 'AirDatepickerReact';
export default AirDatepickerReact;
