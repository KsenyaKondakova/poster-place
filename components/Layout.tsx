import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Nav from '@/components/Nav';
type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex bg-neutral-800 min-h-screen">
        <Nav />
        <div className="bg-yellow-100 flex-grow mt-2 mr-2 mb-2 rounded-xl p-4">
          {/* Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
          <br /> */}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-100 w-full h-screen flex items-center justify-center">
      <button
        onClick={() => signIn('yandex')}
        className="flex items-center justify-center gap-2 text-black transition duration-300 ease-in-out bg-white p-3 rounded-md border-none px-4 transform hover:bg-red-200 hover:scale-105">
        <Image src="/Yandex_znak.png" width={30} height={30} alt="Picture of the author" />
        <span>Войти с помощью Яндекс</span>
      </button>
    </div>
  );
}

export default Layout;
