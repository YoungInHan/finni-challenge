import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import { ColorPaletteProp } from '@mui/joy/styles';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import { and, collection, getDocs, or, query, where } from 'firebase/firestore';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { getComparator, stableSort } from '../utils/table';

interface RowMenuProps {
  rowid: string;
}
function RowMenu({ rowid }: RowMenuProps) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}>
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem component={'a'} href={`/patient/${rowid}`}>
          Edit
        </MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

type Order = 'asc' | 'desc';

export default function OrderTable() {
  const [order, setOrder] = useState<Order>('desc');
  const [orderKey, setOrderKey] = useState<string>('name');
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [refetch, setRefetch] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const queryConstraints = [];
      queryConstraints.push(where('userId', '==', auth?.currentUser?.uid));
      if (statusFilter) {
        queryConstraints.push(where('status', '==', statusFilter));
      }
      if (searchText) {
        const textarr = searchText.split(' ');
        queryConstraints.push(
          or(where('firstName', 'in', textarr), where('lastName', 'in', textarr))
        );
      }
      const q = query(collection(db, 'patients'), and(...queryConstraints));
      const querySnapshot = await getDocs(q);
      const newData: any[] = [];
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        newData.push({
          name: `${d.firstName} ${d.lastName}`,
          initials: `${d.firstName[0]}${d.lastName[0]}`,
          status: d.status,
          phoneNumber: d.phoneNumber,
          dateOfBirth: d.dateOfBirth
            .toDate()
            .toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' }),
          patientId: doc.id,
          updatedAt: d.updatedAt
            .toDate()
            .toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' }),
          updatedAtVal: d.updatedAt.toDate().getTime(),
          email: d.email,
          address:
            d.addresses && d.addresses.length > 0
              ? `${d.addresses[0].addressLine1}, ${d.addresses[0].city}, ${d.addresses[0].state},`
              : ''
        });
      });
      setData(newData);
      setRefetch(false);
    };
    fetchData();
  }, [statusFilter, refetch]);

  const handleStatusFilterChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setStatusFilter(newValue ? newValue : '');
  };

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          onChange={handleStatusFilterChange}>
          <Option value="Inquiry">Inquiry</Option>
          <Option value="Onboarding">Onboarding</Option>
          <Option value="Active">Active</Option>
          <Option value="Churned">Churned</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          my: 1,
          gap: 1
        }}>
        <Input
          size="sm"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          endDecorator={<Button>hi</Button>}
        />
        <IconButton size="sm" variant="outlined" color="neutral" onClick={() => setOpen(true)}>
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' }
          }
        }}>
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for Patient</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setRefetch(true);
                e.preventDefault();
              }
            }}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0
        }}>
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px'
          }}>
          <thead>
            <tr>
              <th style={{ width: 240, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => {
                    if (orderKey !== 'name') {
                      setOrderKey('name');
                    }
                    setOrder(order === 'asc' ? 'desc' : 'asc');
                  }}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform: order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)'
                    }
                  }}>
                  Patient
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => {
                    if (orderKey !== 'status') {
                      setOrderKey('status');
                    }
                    setOrder(order === 'asc' ? 'desc' : 'asc');
                  }}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform: order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)'
                    }
                  }}>
                  Status
                </Link>
              </th>
              <th style={{ width: 220, padding: '12px 6px' }}>Address</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Date of Birth</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Phone Number</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => {
                    if (orderKey !== 'updatedAtVal') {
                      setOrderKey('updatedAtVal');
                    }
                    setOrder(order === 'asc' ? 'desc' : 'asc');
                  }}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform: order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)'
                    }
                  }}>
                  Last Updated
                </Link>
              </th>
              <th style={{ width: 80, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {stableSort([...data], getComparator(order, orderKey)).map((row: any) => (
              <tr key={row.id}>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{row.initials}</Avatar>
                    <div>
                      <Typography level="body-xs">{row.name}</Typography>
                      <Typography level="body-xs">{row.email}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    color={
                      {
                        Active: 'success',
                        Inquiry: 'warning',
                        Onboarding: 'primary',
                        Churned: 'neutral'
                      }[row.status as string] as ColorPaletteProp
                    }>
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Typography level="body-xs">{row.address}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.dateOfBirth}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.phoneNumber}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.updatedAt}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <RowMenu rowid={row.patientId} />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex'
          }
        }}>
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}>
          Previous
        </Button>

        <Button
          sx={{ marginLeft: 'auto' }}
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}>
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
