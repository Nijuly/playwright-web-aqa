export default function ConvertLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="flex flex-col flex-grow items-center justify-center px-4">{children}</main>
}
