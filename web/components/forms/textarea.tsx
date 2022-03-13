import { forwardRef } from 'react';
import { Input } from 'rsuite';

export const Textarea = forwardRef<HTMLTextAreaElement>((props, ref) => <Input {...props} as="textarea" ref={ref}/>);
