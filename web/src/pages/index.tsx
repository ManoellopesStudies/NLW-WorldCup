import Image from "next/image"
import appPreviewImg from "../assets/app-nlw-worldcup-preview.png"
import iconCheck from "../assets/icon-check.svg"
import logoImg from "../assets/logo.svg"
import usersAvatarImg from "../assets/user-avatar-example.png"
import { api } from "../lib/axios"

interface HomeProps {
  poolCount: number
  guessCount: number
  userCount: number
}

export default function Home(props: HomeProps) {
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-24 items-center">
      <main>
        <Image src={logoImg} alt="NLW World Cup"/>

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Create your own world cup pool and share it with friends!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarImg} alt=""/>
          <strong className="text-gray-100 text-xl">
            <span className="text-[#129E57]">+{props.userCount}</span> people using it
          </strong>
        </div>

        <form className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 text-sm text-gray-400 border border-gray-600"
            type="text" 
            required 
            placeholder="What would be your pool name?"
          />
          <button 
            className="px-6 py-4 rounded bg-yellow-500 hover:bg-yellow-700 text-sm text-gray-900 uppercase font-bold"
            type="submit">Create Pool
          </button>
        </form>

        <p
          className="text-sm text-gray-300 leading-relaxed mt-4"
        >          
          After creating your pool, you will receive a 
          unique code that you can use to invite others ⚽
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Pools Created</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Guesses</span>
            </div>
          </div>
        </div>
      </main>
      
      <Image 
        src={appPreviewImg} 
        alt="Two smartphones showing up a preview of the NLW-Worldcup app" 
        quality={100}
      />
        
    </div>
  )
}


export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get("/pools/count"),
    api.get("/guesses/count"),
    api.get("/users/count")

  ])

  return{
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }
}