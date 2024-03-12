import NavLogo  from './components/NavLogo';

export default function Example() {
  return (
    <nav className="w-full h-14 bg-white top-0 fixed">
      <div className="relative mx-10 h-full bg-white flex justify-between items-center">
        <span>
          <NavLogo />
        </span>
        <span>
          <a href="/login" className='uppercase bg-custom-green px-10 text-white rounded-full font-semibold py-2'>Login</a>
        </span>
      </div>
    </nav>
  )
}
