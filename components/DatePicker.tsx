import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { setDate } from '@/redux/slices/saleSlice';
import { forwardRef, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const AirDatepickerReact = forwardRef((props: any, ref: any) => {
  const $input: any = useRef();
  const dp: any = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dp.current = new AirDatepicker($input.current, {
      onSelect: ({ _, formattedDate, __ }: any) => {
        dispatch(setDate(formattedDate));
        if (props.onSelect) {
          props.onSelect({ date: formattedDate, formattedDate, datepicker: dp.current });
        }
      },
    });
  }, []);

  useEffect(() => {
    dp.current.update();
  }, []);

  return (
    <input
      id={props.id}
      className={props.className}
      type={props.type}
      ref={$input}
      placeholder={props.placeholder}
      value={props.valueDate}
      onChange={(ev) => dispatch(setDate(ev.target.value))}
    />
  );
});
AirDatepickerReact.displayName = 'AirDatepickerReact';
export default AirDatepickerReact;
