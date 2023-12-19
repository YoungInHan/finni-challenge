import { updateDoc } from '@firebase/firestore';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PhoneIcon from '@mui/icons-material/Phone';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { doc, getDoc } from 'firebase/firestore';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import AddressForm from './AddressForm';
import ExtraFields from './ExtraFields';
import Notes from './Notes';

export default function EditPatient() {
  const [patientData, setPatientData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    status: 'Inquiry',
    email: '',
    phoneNumber: '',
    dateOfBirth: ''
  });
  const [extraFields, setExtraFields] = useState<any[]>([]);
  const [addressArr, setAddressArr] = useState<any[]>([]);
  const [notesArr, setNotesArr] = useState<any[]>([]);

  const id = String(useParams().id);
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'patients', id);
      const data = await getDoc(docRef);
      console.log('here2', data.data());
      const d = data.data();
      if (!d) {
        return;
      }
      setPatientData({
        firstName: d.firstName,
        middleName: d.middleName,
        lastName: d.lastName,
        status: d.status,
        email: d.email,
        phoneNumber: d.phoneNumber,
        dateOfBirth: d.dateOfBirth.toDate().toISOString().slice(0, 10)
      });
      const addressParse = d.addresses ? d.addresses : [];
      const addressList = addressParse.map((address: any, i: any) => ({
        ...address,
        id: i
      }));
      setAddressArr(addressList);
      const extraobj = d.extraFields ? d.extraFields : {};
      const extraFieldsArr = Object.keys(extraobj).map((k, i) => ({
        key: k,
        value: extraobj[k as keyof typeof extraobj],
        id: i,
        type: 'text'
      }));
      setExtraFields(extraFieldsArr);

      const notesParse = d.notes ? d.notes : [];
      const notesList = notesParse.map((note: any, i: any) => ({
        date: note.date.toDate(),
        text: note.text
      }));
      setNotesArr(notesList);
    };
    fetchData();
  }, [id]);

  const updatePatient = async () => {
    const docRef = doc(db, 'patients', id);
    const currentDate = new Date();
    const data = {
      ...patientData,
      dateOfBirth: new Date(patientData.dateOfBirth),
      updatedAt: currentDate,
      addresses: addressArr.map((address) => ({ id, ...address }))
    };
    console.log(data);
    try {
      await updateDoc(docRef, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  };
  const onSubmitExtraFields = async (updatedFields: any) => {
    const updateObj = updatedFields.reduce(
      (obj: any, item: any) => ({ ...obj, [item.key]: item.value }),
      {}
    );
    const docRef = doc(db, 'patients', id);
    const currentDate = new Date();
    const data = {
      updatedAt: currentDate,
      extraFields: updateObj
    };
    try {
      await updateDoc(docRef, data);
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmitNotes = async (notes: any) => {
    console.log(notes);
    const docRef = doc(db, 'patients', id);
    const currentDate = new Date();
    const data = {
      updatedAt: currentDate,
      notes
    };
    try {
      await updateDoc(docRef, data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleStatusChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
    setPatientData({ ...patientData, status: newValue ? newValue : '' });
  };
  const onChangeAddressFields = (addresses: any) => {
    setAddressArr(addresses);
  };
  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: 'background.body',
          zIndex: 9995
        }}>
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="small" />}
            sx={{ pl: 0 }}>
            <Link underline="none" color="neutral" href="#some-link" aria-label="Home">
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              fontSize={12}
              fontWeight={500}>
              Patients
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              {`${patientData.firstName} ${patientData.lastName}`}
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Edit Patient
          </Typography>
        </Box>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 }
        }}>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Basic Info</Typography>
          </Box>
          <Divider />
          <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input
                    size="sm"
                    onChange={(e) => setPatientData({ ...patientData, firstName: e.target.value })}
                    placeholder="First name"
                    value={patientData.firstName}
                  />
                  <Input
                    size="sm"
                    onChange={(e) => setPatientData({ ...patientData, middleName: e.target.value })}
                    placeholder="Middle name"
                    value={patientData.middleName}
                  />
                  <Input
                    size="sm"
                    onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
                    placeholder="Last name"
                    sx={{ flexGrow: 1 }}
                    value={patientData.lastName}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select value={patientData.status} onChange={handleStatusChange}>
                    <Option value="Inquiry">Inquiry</Option>
                    <Option value="Onboarding">Onboarding</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Churned">Churned</Option>
                  </Select>
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="Email"
                    value={patientData.email}
                    sx={{ flexGrow: 1 }}
                    onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<PhoneIcon />}
                    placeholder="Phone"
                    value={patientData.phoneNumber}
                    sx={{ flexGrow: 1 }}
                    onChange={(e) =>
                      setPatientData({ ...patientData, phoneNumber: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <div>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    size="sm"
                    value={patientData.dateOfBirth}
                    onChange={(e) =>
                      setPatientData({ ...patientData, dateOfBirth: e.target.value })
                    }
                    type="date"></Input>
                </FormControl>
              </div>
              <div>
                <AddressForm
                  key={addressArr}
                  fetchedAddresses={addressArr}
                  onChangeAddressFields={onChangeAddressFields}
                />
              </div>
            </Stack>
          </Stack>

          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button onClick={updatePatient} size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        <ExtraFields
          key={extraFields}
          fetchedFields={extraFields}
          onSubmitExtraFields={onSubmitExtraFields}
        />
        <Notes key={notesArr} fetchedNotes={notesArr} onSubmitNotes={onSubmitNotes} />
      </Stack>
    </Box>
  );
}
