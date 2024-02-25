import AirDatepicker from 'air-datepicker';

import 'air-datepicker/air-datepicker.css';

import { forwardRef, useEffect, useRef, useState } from 'react';

const AirDatepickerReact = forwardRef((props: any) => {
  const $input: any = useRef();
  const dp: any = useRef();
  const [dateValue, setDateValue] = useState<string>(props.valueDate);
  useEffect(() => {
    dp.current = new AirDatepicker($input.current, {
      onSelect: ({ formattedDate }: any) => {
        props.setDate(formattedDate);
        if (props.onSelect) {
          props.onSelect({
            date: formattedDate,
            formattedDate,
            datepicker: dp.current,
          });
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dp.current.update();
  }, [dateValue]);

  useEffect(() => {
    setDateValue(props.valueDate);
  }, [props.valueDate]);
  return (
    <input
      autoComplete="off"
      id={props.id}
      className={props.className}
      type={props.type}
      ref={$input}
      placeholder={props.placeholder}
      value={dateValue}
      onChange={(ev) => props.setDate(ev.target.value)}
    />
  );
});
AirDatepickerReact.displayName = 'AirDatepickerReact';
export default AirDatepickerReact;
