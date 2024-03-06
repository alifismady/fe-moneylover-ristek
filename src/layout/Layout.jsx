import Navbar from '../components/Navbar'

export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-grow">
        <Navbar />
        <main className="flex flex-grow">{children}</main>
      </div>
    </>
  )
}
