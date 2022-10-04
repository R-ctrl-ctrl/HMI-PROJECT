import { Box, Button, GridItem, Heading, Img, Link, SimpleGrid, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useRouter } from 'next/router'

const business = () => {
  const [loading, setloading] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const user = auth.currentUser
  const [data, setdata] = useState([])

  const getId = async () => {
    try {
      const q = query(collection(db, "business"));
      const querySnapshot = await getDocs(q);
      let i = 1;
      querySnapshot.forEach((d) => {
        i++;
      })

      return i;
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (user) {
      loadbusiness()
    }
  }, [user])

  const loadbusiness = async () => {
    const currentuid = auth.currentUser.uid
    const docref = collection(db, "business");
    const q = query(docref, where("owner_uid", "==", currentuid));
    const docsnap = await getDocs(q)
    setdata([])
    docsnap.forEach(doc => {
      const obj = doc.data()
      obj["id"] = doc.id
      setdata((oldarr) => [...oldarr, obj])
    })


  }


  const handleclick = async () => {
    setloading(true)
    try {

      let id = await getId()
      const docRef = doc(db, 'business', id.toString());
      await setDoc(docRef, {
        owner_uid: auth.currentUser.uid,
        owner_name: auth.currentUser.displayName,
        b_name: "",
        b_address: "",
        b_contact: "",
        b_images: [],
        b_features: []
      }
      );
      setloading(false)
      router.push("/createbusiness")
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setloading(false)
    }

  }

  return (
    <Box bg="blackAlpha.200" minH={"100vh"}>
      <Navbar user={user} />
      {
        data.length != 0
          ?
          <Box minH={"100vh"} >
            <SimpleGrid columns={3} spacing={10}>
              <GridItem display={"flex"} justifyContent="center" colSpan={3}>

              </GridItem>

              {data &&
                data.map((d, key) => {
                  return (
                    <Link href={`/stats/${d.id}`} key={key} position={"relative"} transition="2s" _hover={{ top: "-20px" }} cursor={"pointer"} borderRadius={"8%"} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} ml="auto" mr="auto" w="70%" h={"40vh"}>
                      <Img borderTopRadius={"8%"} borderBottomRadius={"0%"} h="80%" w="full" src={d.b_images[0]} />
                      <Box h="20%" w="full" display={"flex"} alignItems="center" justifyContent={"center"} >
                        <Text fontSize={"22px"} fontWeight="semibold" textAlign={"center"}>{d.b_name}</Text>
                      </Box>
                    </Link>
                  )
                })}
            </SimpleGrid>
          </Box>
          :
          <Box w="full" h="60vh" display={"flex"} justifyContent="center" alignItems={"center"}>
            <Box display={"flex"} flexDirection="column" alignItems={"center"}>
              <Heading textDecoration={"underline"}>You Do Not have any business listed here!</Heading>
              <Button isLoading={loading} onClick={handleclick} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} textAlign={"center"} pt="1vh" pb="1vh" fontWeight={"semibold"} borderRadius={"15px"} background={"blue"} mt="2vh" fontSize={"20px"} _hover={{ bg: "blue" }} textColor="white" w="40%">Start One</Button>
            </Box>
          </Box>
      }

    </Box>
  )
}

export default business
