import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import {auth} from '../firebase'
import {onAuthStateChanged} from 'firebase/auth'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [user,setUser] = useState()

  onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user)
      }else{
        setUser(null)
      }
  })

  return (
    <ChakraProvider>
      <>
      <Component {...pageProps} user={user}  />
      </>
    </ChakraProvider>
  )
}

export default MyApp
