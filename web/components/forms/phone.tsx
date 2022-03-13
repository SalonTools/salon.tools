import { forwardRef } from 'react';
import { Input } from 'rsuite';

export const Phone = forwardRef<HTMLInputElement>((props, ref) =>
   <Input {...props} type={'phone'} ref={ref}/>);
