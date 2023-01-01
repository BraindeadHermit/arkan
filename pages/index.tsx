import type { NextPage } from 'next';
import Main from '../components/Main';
import PieChart from '../components/PieChart'
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Arkan</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/arkan-logo.png" />
      </Head>
      <PieChart size='lg'/>
    </div>
  );
};

export default Home;
