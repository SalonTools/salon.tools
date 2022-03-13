import { forwardRef, useEffect, useState } from 'react';
import { Button, Divider, Drawer, FlexboxGrid, Form, Stack } from 'rsuite';
import { SchemaModel, StringType } from 'schema-typed';

import { ClientPiece } from '../../types';
import { Textarea } from '../forms';

import styles from './client-detail.module.scss';

function formFieldId(id: string) {
   return `client-detail-${id}`;
}

const LABEL_WIDTH = 4;
const FIELD_WIDTH = 24 - LABEL_WIDTH;

const FORM_SCHEMA = SchemaModel({
   firstName: StringType().isRequired('First Name is a required field'),
   lastName: StringType().isRequired('Last Name is a required field'),
   email: StringType()
      .isRequired('Email is a required field')
      .isEmail('A valid format email address is required'),
   mobile: StringType()
      .pattern(/^0[0-9]{10,}/, 'Mobile is a required field')
   ,
})

const FormFieldRow = forwardRef<HTMLDivElement, { accepter?: any, error?: any, name: string, label: string, placeholder?: string }>((props, ref) => {
   const {
      accepter,
      error,
      label,
      name,
      placeholder = label,
      ...rest
   } = props;

   return <Form.Group ref={ref} controlId={formFieldId(name)}>
      <FlexboxGrid align={'middle'}>
         <FlexboxGrid.Item colspan={LABEL_WIDTH}>
            <Form.ControlLabel>{label}</Form.ControlLabel>
         </FlexboxGrid.Item>
         <FlexboxGrid.Item colspan={FIELD_WIDTH}>
            <Form.Control name={name} accepter={accepter} placeholder={placeholder}
                          className={error && styles.hasError || ''}
                          errorPlacement={'rightStart'}/>
         </FlexboxGrid.Item>
      </FlexboxGrid>
   </Form.Group>
});


export function ClientDetail({client, close}: { client?: ClientPiece, close(): void }) {
   const [formValue, setFormValue] = useState<Partial<ClientPiece>>(client);
   const [formError, setFormError] = useState<Record<string, any>>({});
   useEffect(() => setFormValue(client && {...client} || {}), [client]);

   if (!client) {
      return null;
   }

   function onCheck(checked: Record<string, string>) {
      setFormError(checked);
   }

   return <Drawer open={true} onClose={close} size={'md'}>
      <Drawer.Header>
         <Drawer.Title>{client.firstName}{' '}{client.lastName}</Drawer.Title>
         <Drawer.Actions>
            <Button onClick={close}>Close</Button>
            <Button onClick={close} appearance="primary">Save</Button>
         </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body className={styles.body}>
         <Form
            layout={'vertical'}
            formValue={formValue}
            model={FORM_SCHEMA}
            onChange={setFormValue}
            onCheck={onCheck}
         >
            <Form.Group controlId={formFieldId('name')}>
               <FlexboxGrid align={'middle'}>
                  <FlexboxGrid.Item colspan={LABEL_WIDTH}>
                     <Form.ControlLabel>Name</Form.ControlLabel>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item colspan={FIELD_WIDTH}>
                     <Stack direction={'row'} spacing={4}>
                        <Form.Control name="firstName"/>
                        <Form.Control name="lastName"/>
                     </Stack>
                  </FlexboxGrid.Item>
               </FlexboxGrid>
            </Form.Group>
            <FormFieldRow name={'email'} label={'Email'} error={formError.email}/>
            <FormFieldRow name={'mobile'} label={'Mobile'}/>
            <Divider/>
            <FormFieldRow name={'notes'} label={'Notes'} accepter={Textarea}/>
         </Form>
      </Drawer.Body>
   </Drawer>
}
