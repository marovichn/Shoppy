"use client"

import { Store } from '@prisma/client'
import { FC } from 'react'

interface SettingsFormProps {
  initialData: Store
}

const SettingsForm: FC<SettingsFormProps> = ({initialData}) => {
  return <div>Settings Form</div>
}

export default SettingsForm