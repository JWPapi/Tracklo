import { Footer, Header } from '../layout/sections'

const PrivacyPolicy = () => (
  <>
    <Header/>
    <div className="h-screen flex justify-between flex-col">
      <div className="max-w-4xl mx-auto prose pb-96">

        <h1>Tracklo Privacy Policy</h1>

        <p>Tracklo "the App” provides "Tracking with Confidence" "the Service" to merchants who use Shopify to power
           their stores. This Privacy Policy describes how personal information is collected, used, and shared when you
           install or use the App in connection with your Shopify-supported store.
        </p>
        <h2>Personal Information the App Collects</h2>

        <p>When you install the App, we are automatically able to access certain types of information from your Shopify
           account:
        </p>

        <ul>
          <li>We can read your order data.</li>
          <li>We can’t read your customers.</li>
        </ul>

        <h2>How Do We Use Your Personal Information?</h2>

        <p>We use the personal information we collect from you and your customers in order to provide the Service and to
           operate the App. Additionally, we use this personal information to: Optimize or improve the App; and Provide
           you with information or advertising relating to our products or services.
        </p>

        <h2>Sharing Your Personal Information</h2>

        <p>We don’t share your personal information nor do we access it. It’s solely used to provide the service.</p>

        <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to
           respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise
           protect our rights.
        </p>

        <p>Your Rights If you are a European resident, you have the right to access personal information we hold about
           you and to ask that your personal information be corrected, updated, or deleted. If you would like to
           exercise this right, please contact us through the contact information below.
        </p>

        <p>Additionally, if you are a European resident we note that we are processing your information in order to
           fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to
           pursue our legitimate business interests listed above. Additionally, please note that your information will
           be transferred outside of Europe, including to Canada and the United States.
        </p>

        <p>The EU-U.S. and Swiss-U.S. Privacy Shield Frameworks were designed by the U.S. Department of Commerce and the
           European Commission and Swiss Administration to provide companies on both sides of the Atlantic with a
           mechanism to comply with data protection requirements when transferring personal data from the European Union
           and Switzerland to the United States in support of transatlantic commerce.
        </p>

        <p> Data Retention When you place an order through the Site, we will maintain your Order Information for our
            records unless and until you ask us to delete this information.
        </p>

        <p>Changes We may update this privacy policy from time to time in order to reflect, for example, changes to our
           practices or for other operational, legal or regulatory reasons.
        </p>

        <p>Contact Us For more information about our privacy practices, if you have questions, or if you would like to
           make a complaint, please contact us by e-mail at privacy@exalting.de or by mail using the details provided
           below:
        </p>

        <address>
          Exalting GmbH <br/> Bockenheimer Landstr. 17<br/> 60323 Frankfurt am Main<br/> HRB 262957<br/>kontakt@exalting.de
        </address>

        <p>Data Protection Officer Julian Tosun (julian@exalting.de)</p>

      </div>
      <Footer/>
    </div>
  </>
)
PrivacyPolicy.noDrawer = () => true
PrivacyPolicy.noLogin = () => true

export default PrivacyPolicy