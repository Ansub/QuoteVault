import Nav from "./nav"

export default function Layout({ children }) {
  return (
    <div className="mx-6 md:max-w-2xl lg:max-w-5xl xl:max-w-6xl md:mx-auto font-sans">
      <Nav />
      {children}
    </div>
  )
}
