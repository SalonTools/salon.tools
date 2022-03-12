import { ReactNode, useEffect, useState } from 'react';
import { Input, InputGroup, Stack } from 'rsuite';

import { Admin } from '@rsuite/icons';

export function ClientListFilters ({onChange, title}: {title?: ReactNode, onChange?: (filter: string) => void}) {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');

   useEffect(() => onChange?.(new URLSearchParams({ email, name }).toString()), [email, name, onChange]);

   return <Stack justifyContent={'space-between'}>
      <h2>{title}</h2>
      <Stack>
         <InputGroup>
            <InputGroup.Addon>
               <Admin />
            </InputGroup.Addon>
            <Input placeholder={'Name'} value={name} onChange={setName} />
         </InputGroup>
         <InputGroup>
            <InputGroup.Addon>@</InputGroup.Addon>
            <Input placeholder={'Name'} value={email} onChange={setEmail} />
         </InputGroup>
      </Stack>
   </Stack>
}
