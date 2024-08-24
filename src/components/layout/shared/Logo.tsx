'use client'

import Image from "next/image";


const Logo = () => {
  return (
    <div className='flex items-center min-bs-[24px]'>
      {/*<MaterioLogo className='text-[22px] text-primary' />*/}
      <Image src={"/images/logos/mafoo-logo.png"} alt={""} width={150} height={30}/>
      {/*<LogoText color={color}>{themeConfig.templateName}</LogoText>*/}
    </div>
  )
}

export default Logo
