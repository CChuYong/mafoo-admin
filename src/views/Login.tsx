'use client'

// React Imports
import type { FormEvent } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Image from 'next/image'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Type Imports
import { signIn } from 'next-auth/react'

import type { Mode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'


// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const Login = ({ mode }: { mode: Mode }) => {
  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signIn('google', {callbackUrl: '/'});
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`마푸 어드민에 오신것을 환영해요!👋🏻`}</Typography>
              <Typography className='mbs-1'>관리자 구글 계정으로 로그인해주세요</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <Button fullWidth variant='outlined' type='submit' className='flex flex-row justify-center items-center'>
                <Image src={"/images/logos/g-logo.png"} width={24} height={24} alt={"google"}/>
                <Typography className='pl-2 font-bold'>Sign in with Google</Typography>
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>관리자가 아니신가요?</Typography>
                <Typography component={Link} href='https://mafoo.kr/' color='primary'>
                  마푸 서비스로 돌아가기
                </Typography>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default Login
