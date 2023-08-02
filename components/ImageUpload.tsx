"use client"

import { FC } from 'react'

interface ImageUploadProps {
  disabled?:boolean,
  onChange: (value:string)=>void,
  onRemove: (value:string)=>void,
  value: string[],
}

const ImageUpload: FC<ImageUploadProps> = ({disabled,
  onChange,
  onRemove,
  value}) => {
  return <div>ImageUpload</div>
}

export default ImageUpload