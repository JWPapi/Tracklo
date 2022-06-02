import Image from 'next/image'
import logo from '../public/images/logo.png'
import Link from 'next/link'

export const Footer = () => (
  <footer className="footer footer-center p-4 bg-base-300 text-base-content">
    <div>
      <p>Copyright © 2022 - All right reserved by Exalting GmbH</p>
      <p>Bockenheimer Landstr. 17, 60323 Frankfurt</p>
      <div className="flex">
        <Link href="/imprint">Imprint</Link>&nbsp;–&nbsp;<Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </div>
  </footer>
)

export const Header = ({ showCTA }) => (
  <div className="navbar bg-base-200 justify-between p-4 mb-8">
    <div className="block max-w-xs">
      <Link href="/" passHref>
        <Image alt="Logo" src={logo}/>
      </Link>
    </div>
    {showCTA && <CTAButton/>}
  </div>
)

export const CTAButton = () => (
  <Link href="/auth/signin" passHref>
    <button className="btn btn-accent text-black">Become a Beta Tester</button>
  </Link>
)
