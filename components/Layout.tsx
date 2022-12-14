import Head from "next/head";
type LayoutProps = {
    children: React.ReactNode,
  };


 const Layout = ({ children }: LayoutProps) => {
    return (
      <>
        <div className="flex flex-col min-h-screen font-medium place-items-center max-h-min bg-sky-100" data-theme="corporate">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {children}
      </div>
      </>
    )
  }

  export default Layout;