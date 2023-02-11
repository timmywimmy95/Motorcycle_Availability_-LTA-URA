import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export default function Carparks({ carparksData }) {
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70 },
    // { field: 'lotType', headerName: 'Lot Type', width: 90 },
    { field: 'lotsAvail', headerName: 'Lots Avail', width: 90 },
    { field: 'carparkCode', headerName: 'Carpark Code', width: 110 },
    { field: 'agency', headerName: 'Agency', width: 90 },
    {
      field: 'address',
      headerName: 'Carpark Address',
      width: 350,
      renderCell: (params) => (
        <Link to={`http://maps.google.com/?q=${params.value}`} target='_blank'>
          {params.value}
        </Link>
      ),
    },
  ];

  const rows = carparksData.map((carpark, index) => {
    return {
      id: index + 1,
      agency: carpark.Agency,
      lotType: carpark.LotType,
      lotsAvail: carpark.AvailableLots,
      carparkCode: carpark.CarParkID,
      address: carpark.Development,
    };
  });

  return (
    <>
      <div>
        <Box
          id='carpark-wrapper'
          sx={{
            mx: 'auto',
            width: {
              sm: 580,
              md: 980,
              lg: 1320,
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            initialState={{
              sorting: {
                sortModel: [{ field: 'lotsAvail', sort: 'desc' }],
              },
            }}
            sx={{
              mx: 'auto',
              mt: { xs: 2 },
              width: {
                xs: 470,
                sm: 560,
                md: 700,
                lg: 1000,
              },
              height: {
                xs: 400,
                sm: 400,
                md: 400,
                lg: 500,
              },
            }}
          />
        </Box>
      </div>
      {/* <Footer /> */}
    </>
  );
}
