// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import AuthContext from '@/context/auth_context'


export const metadata = {
  title: '마푸 어드민',
  description:
    '마푸 어드민 웹페이지.'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <AuthContext>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}

export default RootLayout
