import Image from "next/image"

export default function Message({ children, avatar, username, description }) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg mb-5">
      <div className="flex items-center gap-2">
        <Image
          className="w-10 rounded-full"
          width={100}
          height={100}
          src={avatar}
          alt="user"
        ></Image>
        <h2>{username}</h2>
      </div>
      <div className="py-4">
        <p className="font-light">{description}</p>
      </div>
      {children}
    </div>
  )
}
