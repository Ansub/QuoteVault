import Link from "next/link"
import { auth } from "../utils/firebase"
import Image from "next/image"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
export default function Nav() {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)
  return (
    <nav className="flex justify-between items-center py-10">
      <Link href={"/"}>
        <Image
          src="/images/logo.svg"
          width={50}
          height={50}
          alt={"quote vault logo"}
        />
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link
            className="py-2 px-4 text-sm bg-[#CC6510] text-white rounded-lg font-medium ml-8"
            href={"/auth/login"}
          >
            Join Now
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-1">
            <Link
              className="py-2 text-sm bg-[#CC6510] text-white rounded px-6 transition-all fade-in-out duration-100 hover:bg-black"
              href={"/post"}
            >
              Posts
            </Link>
            <button
              className="my-6 text-white text-sm bg-[#CC6510] py-2 px-4 rounded"
              onClick={() => auth.signOut()}
            >
              Sign Out
            </button>
            <Link
              className="py-2 px-4 text-sm text-black rounded-lg font-medium"
              href={"/dashboard"}
            >
              <Image
                className="w-12 rounded-full cursor-pointer"
                width={100}
                height={100}
                alt="User Profile"
                src={user.photoURL}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  )
}
