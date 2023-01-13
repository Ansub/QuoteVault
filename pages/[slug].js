import React from "react"
import Message from "../components/message"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth, db } from "../utils/firebase"
import { toast } from "react-toastify"
import { useAuthState } from "react-firebase-hooks/auth"
import Image from "next/image"

import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore"

export default function PostDetails() {
  const router = useRouter()
  const routerData = router.query
  const [message, setMessage] = useState("")
  const [allMessages, setAllMessages] = useState([])
  const [user, loading] = useAuthState(auth)

  // submit a message
  const submitMessage = async () => {
    // check if the user is logged in
    if (!user) return router.push("/auth/login")
    if (!message) {
      return toast.error("Don't Leave An Empty Message", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      })
      return
    }
    const docRef = doc(db, "posts", routerData.id)
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: user.photoURL,
        name: user.displayName,
        timestamp: Timestamp.now(),
      }),
    })

    setMessage("")
  }

  //Get Comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routerData.id)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments)
    })
    return unsubscribe
  }

  useEffect(() => {
    if (!router.isReady) return
    getComments()
  }, [router.isReady])

  console.log("allMessages", allMessages)

  return (
    <div>
      <Message {...routerData}>
        <div className="my-4">
          <div className="flex flex-col">
            <div className="flex">
              <input
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                value={message}
                placeholder="send a message"
                className="bg-gray-800 w-full p-2 text-white text-sm"
              />
              <button
                onClick={submitMessage}
                className="bg-cyan-500 text-white py-2 px-4 text-sm"
              >
                Submit
              </button>
            </div>
            <div className="py-6">
              <h2 className="font-bold"> Comments</h2>
              {allMessages?.map((message) => (
                <div key={message.id} className="flex items-center gap-2 py-4">
                  <div>
                    <Image
                      width={40}
                      height={40}
                      src={message.avatar}
                      alt=""
                      className="rounded-full"
                    />
                    <h2>{message.userName}</h2>
                  </div>
                  <p>{message.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Message>
    </div>
  )
}
