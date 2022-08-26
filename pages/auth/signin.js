import { getProviders, useSession } from "next-auth/react";
import Head from 'next/head';
import Image from "next/image";

function Signin({ providers }) {
  const {data: session} = useSession();
  return (
    <div>
      <Head>
        <title>Login - Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="https://rb.gy/y9mwtb"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button 
            className="text-white py-4 px-6 rounded-full bg-[#1db954]
            transition duration-300 ease-out border border-transparent uppercase 
            font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
            onClick={() => signIn(provider.id)}>
              {provider.id} 으로 로그인
          </button>
        </div>
      ))}
    </div>
  )
}

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}