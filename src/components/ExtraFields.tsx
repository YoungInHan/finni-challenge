import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import ClearIcon from '@mui/icons-material/Clear';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import { useState } from 'react';
import { useEffect } from 'react';
import { query } from '@firebase/firestore';
import { collection, getDocs, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function ExtraFields({fetchedFields, onSubmitExtraFields}: any) {
    const [extraFields, setExtraFields] = useState(fetchedFields)
    const [nextID, setNextID] = useState(fetchedFields.length)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmitExtraFields(extraFields)
    }

    return (
      <form onSubmit={handleSubmit}>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Extra Fields</Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
              
        {extraFields.map(({id, key, value, type}: any) => (
            <FormControl  sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={2} useFlexGap>
            <Input
              size="sm"
              type='text'
              placeholder="Type"
              defaultValue={key}
              onChange={(e) => {
                const field = extraFields.find(
                  (a: any) => a.id === id
                );
                field.key = e.target.value;
              }}
            />
            <Input
              size="sm"
              fullWidth 
              type={type}
              placeholder="Value"
              defaultValue={value}
              onChange={(e) => {
                const field = extraFields.find(
                  (a: any) => a.id === id
                );
                field.value = e.target.value;
              }}
            />
            <Button size='sm' onClick={() => {
              setExtraFields(
                extraFields.filter((a: any) =>
                  a.id !== id
                )
              );
            }} variant="plain" ><ClearIcon /></Button>
            </Stack>
          </FormControl>
        ))}
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={ {pt: 2, alignSelf: 'flex-end'}}>
              <Button size="sm" color="neutral"
                onClick={() => {
                  setExtraFields([
                    ...extraFields,
                    { id: nextID + 1, key: "", value: "", type: 'text' }
                  ])
                  setNextID(nextID + 1)
                }}
                variant="soft">
               New Field
              </Button>
              <Button type='submit' size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        </form>
    )
}

