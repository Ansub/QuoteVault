import { AiOutlineGoogle } from "react-icons/ai"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../../utils/firebase"
import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect } from "react"
import Image from "next/image"

export default function Login() {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)

  // sign in with Google
  const googleProvider = new GoogleAuthProvider()
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      route.push("/")
    } else {
      console.log("login please")
    }
  }, [user])

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/images/logo.svg"
        className="mt-32"
        width={100}
        height={100}
        alt={"Logo"}
      />
      <h1 className="text-4xl font-bold mt-3">Welcome To Quote Vault</h1>
      <p className="pt-4">Elevate your thoughts, Inspire the world.</p>

      <div className="py-5">
        <button
          onClick={GoogleLogin}
          className="text-white bg-[#CC6510] w-50 font-medium rounded-lg flex items-center align-middle p-4 gap-2"
        >
          <AiOutlineGoogle className="text-2xl" />
          Continue with Google
        </button>
      </div>
    </div>
  )
}
