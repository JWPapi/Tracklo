import Image from 'next/image'
import mockup from '../public/images/mockup.png'
import { CTAButton, Footer, Header } from '../layout/sections'

const Index = () => (
  <>
    <Header showCTA={true}/>
    <div className="hero min-h-screen">
      <div className="hero-content flex-col  lg:flex-row-reverse">
        <div className="mockup-window border bg-base-300">
          <Image alt="mockup" src={mockup}/>
        </div>
        <IntroText/>

      </div>
    </div>
    <Footer/>
  </>
)
Index.noDrawer = () => true
Index.noLogin = () => true

const IntroText = () => (
  <article className="prose pr-4">
    <h1>Track with Confidence</h1>
    <p>
      Since iOS 15.4 tracking has been a nightmare for marketers. What if we tell you that you still can track every
      single contact point of each order with all your marketing&nbsp;channels?
    </p>
    <p>
      Tracklo connects your marketing platforms with your Shopify Shop and finally gives you the peace of mind to know
      which campaigns are working and which&nbsp;won’t.
    </p>
    <p>
      Do we really need to tell you how much 💵💵💵 this means?
    </p>
    <CTAButton/>
  </article>
)

export default Index


