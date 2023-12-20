import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskAdapter = forwardRef<HTMLElement, CustomProps>(function TextMaskAdapter(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000 0000"
      definitions={{
        '#': /[1-9]/
      }}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default TextMaskAdapter;
