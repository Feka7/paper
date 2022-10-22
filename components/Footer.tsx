import Image from "next/image";

export function Footer () {
    return (
    <footer className="mt-auto flex place-items-center border-black border-t-[1px] w-full">
        <div className="p-8 bg-slate-100 min-w-full text-center">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className="">
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </div>
      </footer>
    );
}