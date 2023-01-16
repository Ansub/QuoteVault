import Image from "next/image"
import Link from "next/link"
import { BiLogInCircle } from "react-icons/bi"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { auth } from "../utils/firebase"

export default function Mainpage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/home")
    } else {
    }
  }, [user, loading])

  return (
    <div className="text-red flex flex-col md:flex-row items-center justify-between h-[calc(100vh-200px)] p-5">
      <div>
        <div className="font-serif font-bold text-5xl md:text-6xl mb-5 md:mb-10">
          Quote Vault
        </div>
        <div className="mb-5 md:mb-10 text-md w-full md:w-[500px]">
          {` A social media platform where users can share their favorite quotes and discover new ones. Whether you're looking for inspiration, motivation, or just something to brighten your day, Quote Vault has it all.`}
        </div>
        <Link href="/auth/login">
          <button className="flex items-center py-2 px-10 text-sm bg-[#CC6510] text-white rounded-lg font-medium transition-all ease-linear duration-300 hover:-translate-y-1 hover:shadow-xl">
            Join Now <BiLogInCircle className="text-xl ml-1" />
          </button>
        </Link>
      </div>
      <div>
        <Image
          width={500}
          height={500}
          src="/images/mainpage.svg"
          alt="homepage-svg"
        />
      </div>
    </div>
  )
}
