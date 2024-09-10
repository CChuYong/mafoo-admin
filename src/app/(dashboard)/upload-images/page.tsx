"use client"

import {useState} from "react";


import Button from "@mui/material/Button";
import { Stack } from '@mui/system'

import Typography from '@mui/material/Typography'

import TextField from '@mui/material/TextField'

import {AxiosError} from "axios";

import FileField from '@components/FileField'
import instance from '@/utils/axios'


const FormLayouts = () => {

  // useEffect(() => {
  //  // const actualQuery = queryOptions
  //   const rawQueryOptions = ((queryOptions as unknown) as any).items as any[];
  //   const queryParam = rawQueryOptions ? ('&' + rawQueryOptions.map(item => `${item.field}=${item.value}`).join('&')) : '';
  //
  //   instance
  //     .get(`/v1/admin/albums?page=${paginationModel.page}&size=${paginationModel.pageSize}${queryParam}`)
  //     .then((res) => {
  //       const data = res.data
  //
  //       setData(data);
  //       apiRef.current.setRowCount(data.totalElement);
  //     });
  // }, [paginationModel.page, queryOptions]);



  const [memberId, setMemberId] = useState<string>('');
  const [albumName, setAlbumName] = useState<string>('');
  const [coverPhotos, setcoverPhotos] = useState<FileList | File[]>([]);

  const onUploadButtonPress = async () => {
    const formData = new FormData();

    formData.append('memberId', memberId);
    formData.append('albumName', albumName);

    for (let i = 0; i < coverPhotos.length; i++) {
      formData.append('files', coverPhotos[i]);
    }

    setMemberId('');
    setAlbumName('');
    setcoverPhotos([]);

    try {
      const result = await instance.post<any[]>('/admin/v1/users/upload-image-with-new-album', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(`총 ${result.data.length}개의 이미지가 업로드되었어요!`);
    } catch(e: any) {
      if(e instanceof AxiosError) {
        if(e.response?.data) {
          alert(e.response?.data.message);
        } else {
          alert(e.response?.data)
        }
      } else {
        alert('알 수 없는 오류가 발생했어요!');
      }
    }
  };

return (
    <Stack spacing={4} direction="column">
      <Typography variant='h3'>사용자 이미지 업로드</Typography>
      <Stack spacing={2}>
        <Stack spacing={4} direction="row">
          <TextField
            required
            id="outlined-required"
            label="사용자 아이디"
            defaultValue=""
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="생성할 앨범 이름"
            defaultValue=""
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
          />
        </Stack>

        <FileField
          textfieldProps={{ label: "업로드할 이미지 선택" }}
          autoCompleteProps={{ className: "my-5" }}
          files={coverPhotos}
          setFiles={setcoverPhotos}
          multiple={true}
        />
        <Button variant="contained" startIcon={<i className="ri-upload-2-line" />} onClick={onUploadButtonPress}>
        이미지 업로드하기
        </Button>
      </Stack>
    </Stack>

  )
}

export default FormLayouts
