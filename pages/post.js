import { auth, db } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore"
import { toast } from "react-toastify"

export default function Post() {
  const router = useRouter()
  // form state
  const [post, setPost] = useState({ description: "" })
  const [user, loading] = useAuthState(auth)

  // submit the post
  const submitPost = async (e) => {
    e.preventDefault()

    // Run Checks for description
    if (!post.description) {
      toast.error("Description Field is Required", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      })
      return
    }
    if (post.description.length > 300) {
      toast.error("Description Too Long", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      })
      return
    }

    // if post has id then it means we are editing the post
    if (post.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id)
      const updatedPost = { ...post, timestamp: serverTimestamp() }
      await updateDoc(docRef, updatedPost)
      return router.push("/home")
    } else {
      // make a new post if post doesn't have id
      const collectionRef = collection(db, "posts")
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      })
      setPost({ description: "" })
      toast.success("Post Created", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      })
      return router.push("/home")
    }
  }

  // check our user is logged in or not! if not then it then user can't go to /post page.
  const routeData = router.query

  const checkUser = async () => {
    if (loading) return
    if (!user) router.push("/auth/login")
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id })
    }
  }

  useEffect(() => {
    checkUser()
  }, [user, loading])

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg bg-white">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold text-[#CC6510]">
          {post.hasOwnProperty("id") ? "Edit Your Quote" : "Create New Quote"}
        </h1>
        <div>
          <h3 className="text-md font-medium py-4">
            {post.hasOwnProperty("id")
              ? "Type below to make changes in quote."
              : "Type the quote you want to post."}
          </h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm my-2"
          ></textarea>
          <p
            className={`text-[#CC6510] font-medium text-sm ${
              post.description.length > 300 ? "text-red-600" : null
            }`}
          >
            {post.description.length}/300
          </p>
          <button
            type="submit"
            className="w-full bg-[#CC6510] text-white font-medium p-2 my-2 rounded-lg text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
