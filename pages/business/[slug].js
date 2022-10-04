import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Heading, Image, Text, useDisclosure } from '@chakra-ui/react'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { Carousel } from 'react-responsive-carousel';
import { auth, db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'


const slug = () => {
    const sliderData = [
        "https://images.unsplash.com/photo-1608447714925-599deeb5a682?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixlib=rb-1.2.1&q=80&w=750",
        "https://images.unsplash.com/photo-1504610926078-a1611febcad3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixlib=rb-1.2.1&q=80&w=750",
        "https://images.unsplash.com/photo-1419225692236-28f3211d7038?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixlib=rb-1.2.1&q=80&w=750",
        "https://images.unsplash.com/photo-1515446870326-c532f9a8d954?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixlib=rb-1.2.1&q=80&w=750",
        "https://images.unsplash.com/photo-1545091741-2231068f3478?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixlib=rb-1.2.1&q=80&w=750",
    ];
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const { slug } = router.query
    const [data, setdata] = useState()
    const loaddata = async () => {
        try {
            const docRef = doc(db, "business", slug.toString());
            const docSnap = await getDoc(docRef);
            setdata(docSnap.data())

        } catch (err) {
            console.log(err.message)
        }

    }

    useEffect(() => {
        if (slug) {
            loaddata()
        }
    }, [slug])

    const handleBook = async()=>{
        const user = auth.currentUser
        if(!user){
            onOpen()
        }else{
            router.push(`/bookings/${slug}`)
        }
    }

    const handleaction = ()=>{
            router.push('/userenter')
    }

    return (
        <Box w="full" p={10} >
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>To book a hotel you need to register on our Website!</Text>
          </ModalBody>

          <ModalFooter>
            <Button  mr={3} colorScheme='gray' onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={handleaction} >Take me to register page</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            <Box h="100vh" >
                <Carousel>
                    {
                        data &&
                        data.b_images.map((img, key) => {
                           return(
                            <Box key="key" h="70vh">
                            <Image h="70vh" src= {img} />
                        </Box>
                           )
                        })
                    }

                </Carousel>

                <Box display={"flex"} h="23vh">
                    <Box w="49%" p={5} display="flex" flexDirection={"column"} align="center">
                        <Text fontWeight="semibold" fontSize={"22px"}>Name : {data && data.b_name}</Text>
                        <Text fontWeight="semibold" fontSize={"22px"}>Owner : {data && data.owner_name}</Text>
                        <Text fontWeight="semibold" fontSize={"22px"}>Address : {data && data.b_address}</Text>
                        <Text fontWeight="semibold" fontSize={"22px"}>Contact : {data && data.b_contact}</Text>
                        <Text fontWeight="semibold" fontSize={"22px"}>features : {data && data.b_features[0].f_id}</Text>
                    </Box>
                    <Box w="0.2%" bg="black"></Box>
                    <Box w="49%" p={5} >
                        <Heading>Features:</Heading>
                        {data && data.b_features.map((f, key) => {
                            return (
                                <Text marginTop={"1.5vh"} fontWeight="semibold" fontSize={"20px"} key={key} > <ArrowRightIcon />  {f.f_text}</Text>
                            )
                        })}
                    </Box>
                </Box>
                <Box w="full" textAlign={"center"} m={"6vh"}>
                <Button w="20%" onClick={handleBook}  colorScheme="blue">Book Now!</Button>
                </Box>

            </Box>

        </Box>
    )
}

export default slug
