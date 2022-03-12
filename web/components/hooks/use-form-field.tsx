import { ChangeEventHandler, useCallback, useState } from 'react';

function useFormField(initial = ''): [string, ChangeEventHandler<HTMLInputElement>] {
   const [value, setValue] = useState(initial);
   const setFormValue: ChangeEventHandler<HTMLInputElement> = useCallback((e) => setValue(e.currentTarget.value), [setValue]);

   return [
      value,
      setFormValue,
   ];
}
