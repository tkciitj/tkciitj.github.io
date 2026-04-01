import dynamic from 'next/dynamic';
import { FC, memo } from 'react';

import Page from '../components/Layout/Page';
import HeroInteractive from '../components/Sections/HeroInteractive';
import About from '../components/Sections/About';
import Resume from '../components/Sections/Experiences';
import Portfolio from '../components/Sections/Projects';
import Testimonials from '../components/Sections/Skills';
import Contact from '../components/Sections/Contact';
import Footer from '../components/Sections/Footer';
import { homePageMeta } from '../data/data';

// Dynamically load Header without SSR for smoother hydration
const Header = dynamic(() => import('../components/Sections/Header'), { ssr: false });

const Home: FC = memo(() => {
  const { title, description } = homePageMeta;

  return (
    <Page title={title} description={description}>
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
});

export default Home;
