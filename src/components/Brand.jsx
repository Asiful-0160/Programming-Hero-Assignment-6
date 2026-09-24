import Image from 'next/image'
import Link from 'next/link'

export default function Brand() {
  return (
    <Link href="/" className="brand" aria-label="FitLog home">
      <Image src="/images/logo.png" alt="" width={28} height={28} />
      <span>FITLOG</span>
    </Link>
  )
}
