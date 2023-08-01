import prismadb from '@/lib/prismadb'
import { FC } from 'react'

interface pageProps {
  params:{storeId: string}
}

const DashboardPage: FC<pageProps> =async ({params}) => {
const store = await prismadb.store.findFirst({
  where:{
    id: params.storeId
  }
})

  return <div>active store : {store?.name}</div>
}

export default DashboardPage