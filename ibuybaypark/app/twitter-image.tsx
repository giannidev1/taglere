import { ImageResponse } from 'next/og'
import { OgCard, OG_SIZE } from '@/components/OgCard'

export const alt = 'I Buy Bay Park — cash offers on Bay Park, San Diego homes'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(<OgCard />, { ...size })
}
