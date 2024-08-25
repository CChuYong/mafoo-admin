"use client"

import {useCallback, useEffect, useState} from "react";

import type {GridColDef, GridFilterModel, GridRowSelectionModel} from '@mui/x-data-grid';
import {DataGrid, useGridApiRef} from '@mui/x-data-grid';

import Button from "@mui/material/Button";
import {Stack} from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';

import instance from '@/utils/axios';

const FormLayouts = () => {
  const apiRef = useGridApiRef();

  const [data, setData] = useState({
    results: [],
    totalElement: 0
  });

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);


  const [queryOptions, setQueryOptions] = useState({});

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    // Here you save the data you need from the filter model
    setQueryOptions(filterModel);
  }, []);

  useEffect(() => {
   // const actualQuery = queryOptions
    const rawQueryOptions = ((queryOptions as unknown) as any).items as any[];
    const queryParam = rawQueryOptions ? ('&' + rawQueryOptions.map(item => `${item.field}=${item.value}`).join('&')) : '';

    instance
      .get(`/v1/admin/albums?page=${paginationModel.page}&size=${paginationModel.pageSize}${queryParam}`)
      .then((res) => {
        const data = res.data

        setData(data);
        apiRef.current.setRowCount(data.totalElement);
      });
  }, [paginationModel.page, queryOptions]);

  const columns: GridColDef<any>[] = [
    {field: 'albumId', headerName: '앨범 ID', width: 240},
    {
      field: 'name',
      headerName: '앨범 이름',
      width: 150,
      editable: true,
    },
    {
      field: 'type',
      headerName: '앨범 종류',
      width: 110,
      editable: true,
    },
    {
      field: 'ownerMemberId',
      headerName: '앨범 주인',
      sortable: false,
      width: 240,
    },
    {
      field: 'createdAt',
      headerName: '생성 일자',
      width: 240,
      editable: true,
      filterable: false
    },
  ];

  return (
    <Stack spacing={4} direction="column">
      <Stack direction="row-reverse" spacing={2}>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon fontSize="inherit" />} >
          일괄 삭제
        </Button>
        <Button variant="outlined" color="secondary" startIcon={<EditIcon fontSize="inherit" />}>일괄 속성 변경</Button>
        <Button variant="outlined" startIcon={<AddBoxIcon fontSize="inherit" />}>
          생성
        </Button>
      </Stack>

      <DataGrid
        apiRef={apiRef}
        rows={data.results}
        columns={columns}
        paginationModel={paginationModel}
        paginationMode={'server'}
        filterMode="server"
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5]}
        getRowId={(row) => row.albumId}
        onFilterModelChange={onFilterChange}
        filterDebounceMs={500}
        isCellEditable={() => false}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      />
    </Stack>

  )
}

export default FormLayouts
