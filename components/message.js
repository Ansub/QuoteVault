import Image from "next/image"

export default function Message({ children, avatar, username, description }) {
  return (
    <div className="bg-white text-center p-8 border-b-2 rounded-lg mb-5">
      <div className="flex items-center gap-2"></div>
      <div className="py-4 mb-5">
        <p className="font-light font-serif">{description}</p>
      </div>
      <div className="flex flex-col items-center justify-between">
        <div className="flex mb-2">
          <Image
            className="w-5 mr-2 rounded-full"
            width={40}
            height={40}
            src={avatar}
            alt="user"
          ></Image>
          <h2 className="text-sm">{username}</h2>
        </div>
        <div className="w-1/2">{children}</div>
      </div>
    </div>
  )
}
