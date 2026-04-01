import dynamic from 'next/dynamic';
import {FC, memo} from 'react';

import Page from '../components/Layout/Page';
import About from '../components/Sections/About';
import Contact from '../components/Sections/Contact';
import Resume from '../components/Sections/Experiences';
import Footer from '../components/Sections/Footer';
import HeroInteractive from '../components/Sections/HeroInteractive';
import Portfolio from '../components/Sections/Projects';
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
      <div className="relative text-white bg-[#0f0f0f]">
        {/* Header always on top */}
        <Header />

        {/* Main content */}
        <main>
          {/* Interactive particle hero */}
          <HeroInteractive />

          {/* Rest of content with smooth sections */}
          <div className="bg-[#0f0f0f]">
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
