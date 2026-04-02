import dynamic from 'next/dynamic';
import {FC, memo} from 'react';

import Page from '../components/Layout/Page';
import About from '../components/Sections/About';
import Contact from '../components/Sections/Contact';
import Resume from '../components/Sections/Experiences';
import Footer from '../components/Sections/Footer';
import HeroInteractive from '../components/Sections/HeroInteractive';
import Portfolio from '../components/Sections/Projects';
import ScrollIndicator from '../components/Sections/ScrollIndicator';
import Testimonials from '../components/Sections/Skills';
import {homePageMeta} from '../data/data';

// Dynamically load Header without SSR for smoother hydration
// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});

interface HomeProps {}

// eslint-disable-next-line react-memo/require-memo
const HomeComponent: FC<HomeProps> = () => {
  const {title, description} = homePageMeta;

  return (
    <Page description={description} title={title}>
      <div className="relative w-full text-white bg-black">
        {/* Header always on top */}
        <Header />

        {/* Main content */}
        <main className="w-full">
          {/* Interactive particle hero */}
          <HeroInteractive />

          {/* Scroll indicator */}
          <ScrollIndicator />

          {/* Rest of content with smooth sections */}
          <div className="w-full bg-black">
            <About />
            <Resume />
            <Portfolio />
            <Testimonials />
            <Contact />
          </div>
        </main>

        <Footer />
      </div>
    </Page>
  );
};

const Home = memo(HomeComponent);
export default Home;
