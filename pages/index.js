import { Box, Button, Container, Heading, Input, Link, Progress, Select, Text, useToast } from '@chakra-ui/react'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import Navbar from '../components/Navbar'
import DisplayHotels from '../components/DisplayHotels'
import Typewriter from "typewriter-effect";
import { useState } from 'react'
import { ArrowForwardIcon } from '@chakra-ui/icons'



export default function Home({ user }) {
  const toast = useToast()
 


  const handleLogout = async () => {
    await signOut(auth)
  }

  
  return (
    <Box minH={"100vh"} bg="blackAlpha.200">
      <Navbar user={user} />
      <Box mb="2vh" display={"flex"} w="full" justifyContent={"center"} fontSize="30px" fontWeight={"semibold"}>
        <Typewriter
      
          onInit={(typewriter) => {
            typewriter
              .typeString("Balaji Tours and travels")
              .pauseFor(1000)
              .deleteAll()
              .typeString("Find best hotels in the country here...")
              .pauseFor(1000)
              .deleteAll()
              .typeString("List your business to link with customers")
              .pauseFor(1000)
              .deleteAll()
              .typeString("Start now")
              .start();
          }}
        />
      </Box>
      <Box display={"flex"} w="full" justifyContent={"center"}>
        <Input boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} borderRadius={10} fontSize={"18px"} placeholder='search hotels and places' type={"text"} w="60%" bg="white" p={7}></Input>
      </Box>

 
      <DisplayHotels />

      <Box w="full" display={"flex"} justifyContent="right" p={3} mb="2vh">
        <Link _hover={{textDecoration:"none",fontSize:"22px"}} href="/maps"  fontSize={"20px"} textColor="blue" cursor={"pointer"}>Show me maps <ArrowForwardIcon/></Link>
      </Box>
     
 

    </Box>
  )
}
