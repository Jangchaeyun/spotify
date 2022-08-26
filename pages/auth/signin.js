import Head from 'next/head';
import Image from "next/image";

function Signin() {
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
    </div>
  )
}

export default Signin
