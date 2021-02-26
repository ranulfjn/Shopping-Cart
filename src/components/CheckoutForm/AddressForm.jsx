import React from 'react';
import {inputLabel ,Select ,MenueItem ,Button ,Grid ,Typography} from '@material-ui/core'
import {useForm , FormProvider} from 'react-hook-form'
import FormInput from "./FormInput"
const AddressForm = () => {
    const methods=useForm();
    return (
        <>
        <Typography varient="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit=''>
                <Grid container spacing={3}>
                    <FormInput required name='firstName' label= 'First Name'  />
                    <FormInput required name='lastName' label= 'Last Name'  />
                    <FormInput required name='address1' label= 'Address'  />
                    <FormInput required name='email' label= 'Email'  />
                    <FormInput required name='city' label= 'City'  />    
                    <FormInput required name='zip' label= 'ZIP / Poastal code'  />
                </Grid>

            </form>
        </FormProvider>
        </>
    )
}

export default AddressForm
