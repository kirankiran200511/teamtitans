import '../index.css';
import '../titans.css';
import '../locations.css';
import '../becomehost.css';

import Preloader from '../components/Preloader';
import ScrollProgress from '../components/ScrollProgress';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import SocialProofToast from '../components/SocialProofToast';

export const metadata = {
  title: "Titans — The UK's #1 Property Networking Event",
  description: "Titans is the UK's #1 property networking event for serious dealmakers. 120+ investors, developers and property professionals in one room — expert speakers, hot buffet and connections that turn into real deals.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <ScrollProgress />
        <Header />
        <main>
          {children}
        </main>
        <StickyCta />
        <SocialProofToast />
        <Footer />
      </body>
    </html>
  );
}
