import { auth, db } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  collection,
  onSnapshot,
  where,
  query,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore"
import Message from "../components/message"
import { BsTrash2Fill } from "react-icons/bs"
import { AiFillEdit } from "react-icons/ai"
import Link from "next/link"

export default function Dashboard() {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)
  const [posts, setPosts] = useState([])
  console.log(user, "user")

  // see if user is logged in
  const getData = async () => {
    if (loading) return
    if (!user) router.push("/auth/login")
    const collectionRef = collection(db, "posts")
    const q = query(
      collectionRef,
      where("user", "==", user.uid),
      orderBy("timestamp", "desc")
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    })
    return unsubscribe
  }

  // delete post
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    getData()
  }

  // get users data
  useEffect(() => {
    getData()
  }, [user, loading])

  return (
    <div>
      <div className="flex items-center gap-5">
        <h1 className="text-xl font-medium">Your Posts</h1>
        <button
          className="my-6 text-white text-sm bg-[#CC6510] py-2 px-4 rounded"
          onClick={() => auth.signOut()}
        >
          Sign Out
        </button>
      </div>
      {posts.map((post) => (
        <Message key={post.id} {...post}>
          <div className="flex gap-4">
            <Link href={{ pathname: "/post", query: post }}>
              <button className="text-teal-600 flex items-center justify-items-center gap-2 py-2 text-sm">
                <AiFillEdit className="text-2xl" />
                Edit
              </button>
            </Link>
            <button
              onClick={() => deletePost(post.id)}
              className="text-pink-600 flex items-center justify-items-center gap-2 py-2 text-sm"
            >
              <BsTrash2Fill className="text-xl" />
              Delete
            </button>
          </div>
        </Message>
      ))}
    </div>
  )
}
