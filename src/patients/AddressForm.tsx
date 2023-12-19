import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function AddressForm({ fetchedAddresses, onChangeAddressFields }: any) {
  const [addresses, setAddresses] = useState(fetchedAddresses);

  const [nextID, setNextID] = useState(addresses.length);
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   onSubmitExtraFields(extraFields)
  // }
  useEffect(() => {
    onChangeAddressFields(addresses);
  }, [addresses, onChangeAddressFields]);

  return (
    <Stack spacing={2}>
      {console.log('render!')}
      {addresses.map((address: any, index: number) => (
        <FormControl sx={{ flexGrow: 1 }} key={index}>
          <Stack spacing={1} useFlexGap>
            <Stack direction="row" spacing={2} useFlexGap>
              <FormLabel>{`Address ${index + 1}`}</FormLabel>
            </Stack>
            <Input
              size="sm"
              type="text"
              placeholder="Address Line 1"
              key={`${address.addressLine1}-${address.id}-al1`}
              defaultValue={address.addressLine1}
              sx={{ flexGrow: 1 }}
              onChange={(e) => {
                const curraddr = addresses.find((a: any) => a.id === address.id);
                curraddr.addressLine1 = e.target.value;
                onChangeAddressFields(addresses);
              }}
            />
            <Input
              size="sm"
              type="text"
              placeholder="Address Line 2"
              key={`${address.addressLine2}-${address.id}-al2`}
              defaultValue={address.addressLine2}
              sx={{ flexGrow: 1 }}
              onChange={(e) => {
                const curraddr = addresses.find((a: any) => a.id === address.id);
                curraddr.addressLine2 = e.target.value;
                onChangeAddressFields(addresses);
              }}
            />
            <Stack direction="row" spacing={2} useFlexGap>
              <Input
                size="sm"
                type="text"
                placeholder="City"
                key={`${address.city}-${address.id}-city`}
                defaultValue={address.city}
                sx={{ flexGrow: 1 }}
                onChange={(e) => {
                  const curraddr = addresses.find((a: any) => a.id === address.id);
                  curraddr.city = e.target.value;
                  onChangeAddressFields(addresses);
                }}
              />
              <Input
                size="sm"
                type="text"
                placeholder="State"
                key={`${address.state}-${address.id}-state`}
                defaultValue={address.state}
                sx={{ flexGrow: 1 }}
                onChange={(e) => {
                  const curraddr = addresses.find((a: any) => a.id === address.id);
                  curraddr.state = e.target.value;
                  onChangeAddressFields(addresses);
                }}
              />
              <Input
                size="sm"
                type="text"
                placeholder="Zip"
                key={`${address.zip}-${address.id}-zip`}
                defaultValue={address.zip}
                sx={{ flexGrow: 1 }}
                onChange={(e) => {
                  const curraddr = addresses.find((a: any) => a.id === address.id);
                  curraddr.zip = e.target.value;
                  onChangeAddressFields(addresses);
                }}
              />
            </Stack>
            {index > 0 ? (
              <Button
                onClick={() => {
                  setAddresses(addresses.filter((a: any) => a.id !== address.id));
                }}
                sx={{ alignSelf: 'flex-end' }}
                size="sm"
                variant="plain">
                Delete Address
              </Button>
            ) : null}
          </Stack>
        </FormControl>
      ))}
      <Button
        size="sm"
        variant="soft"
        onClick={() => {
          setAddresses([
            ...addresses,
            { id: nextID + 1, addressLine1: '', addressLine2: '', city: '', state: '', zip: '' }
          ]);
          setNextID(nextID + 1);
        }}>
        Add New Address
      </Button>
    </Stack>
  );
}
