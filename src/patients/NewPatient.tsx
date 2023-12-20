import { addDoc, collection } from '@firebase/firestore';
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
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextMaskAdapter from '../components/PhoneInputeMask';
import { auth, db } from '../config/firebase';
import AddressForm from './AddressForm';

export default function newPatient() {
  const [patientData, setPatientData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    status: 'Inquiry',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: []
  });
  const [addressArr, setAddressArr] = useState([]);
  const navigate = useNavigate();

  const patientCollectionRef = collection(db, 'patients');

  const createPatient = async () => {
    const currentDate = new Date();
    const data = {
      ...patientData,
      dateOfBirth: new Date(patientData.dateOfBirth),
      userId: auth?.currentUser?.uid,
      createdAt: currentDate,
      updatedAt: currentDate,
      addresses: addressArr
    };
    try {
      await addDoc(patientCollectionRef, data);
      navigate('/');
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
            <Link underline="hover" color="neutral" href="/" fontSize={12} fontWeight={500}>
              Patients
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              New Patient
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            New Patient
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
                  />
                  <Input
                    size="sm"
                    onChange={(e) => setPatientData({ ...patientData, middleName: e.target.value })}
                    placeholder="Middle name"
                  />
                  <Input
                    size="sm"
                    onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
                    placeholder="Last name"
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select defaultValue="Inquiry" onChange={handleStatusChange}>
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
                    defaultValue=""
                    sx={{ flexGrow: 1 }}
                    onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    size="sm"
                    placeholder="Phone"
                    startDecorator={<PhoneIcon />}
                    sx={{ flexGrow: 1 }}
                    onChange={(e) =>
                      setPatientData({ ...patientData, phoneNumber: e.target.value })
                    }
                    slotProps={{ input: { component: TextMaskAdapter } }}
                  />
                </FormControl>
              </Stack>
              <div>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    size="sm"
                    onChange={(e) =>
                      setPatientData({ ...patientData, dateOfBirth: e.target.value })
                    }
                    type="date"></Input>
                </FormControl>
              </div>
              <div>
                <AddressForm
                  fetchedAddresses={addressArr}
                  onChangeAddressFields={onChangeAddressFields}
                />
              </div>
            </Stack>
          </Stack>

          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button onClick={createPatient} size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
