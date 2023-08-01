import { FC } from 'react'

interface layoutProps {
  children: React.ReactNode
}

const layout: FC<layoutProps> = ({children}) => {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      {children}
    </div>
  );
}

export default layout