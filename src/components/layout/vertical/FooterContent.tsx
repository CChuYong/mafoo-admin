'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useVerticalNav()

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span>{`© ${new Date().getFullYear()}, Team SpinachPasta`}</span>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <Link
            href={`https://mafoo.kr`}
            target='_blank'
            className='text-primary'
          >
            Mafoo-Main
          </Link>
          <Link
            href={`https://github.com/CChuYong/mafoo-admin`}
            target='_blank'
            className='text-primary'
          >
            GitHub
          </Link>
        </div>
      )}
    </div>
  )
}

export default FooterContent
