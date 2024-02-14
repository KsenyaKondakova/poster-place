import AirDatepicker from 'air-datepicker';

import 'air-datepicker/air-datepicker.css';

import { forwardRef, useEffect, useRef } from 'react';

const AirDatepickerReact = forwardRef((props: any) => {
  const $input: any = useRef();
  const dp: any = useRef();

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
  }, []);

  return (
    <input
      autoComplete="off"
      id={props.id}
      className={props.className}
      type={props.type}
      ref={$input}
      placeholder={props.placeholder}
      value={props.valueDate}
      onChange={(ev) => props.setDate(ev.target.value)}
    />
  );
});
AirDatepickerReact.displayName = 'AirDatepickerReact';
export default AirDatepickerReact;
