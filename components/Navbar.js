import { Box, Button, Img, Link, Text } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'

const Navbar = ({ user }) => {

    const logouthandler =async ()=>{
        await signOut(auth)
    }
    return (
        <Box>
            {
                user
                    ?
                    <Box w="full" display={"flex"} justifyContent="space-between" p={2} alignItems="center">
                        <Box w="30%" h="10vh" display={"flex"} justifyContent="center" >
                            <Box h="full" display={"flex"} alignItems="center" >
                                <Img marginRight={"2vh"} maxH="80%" alt='Image' src='https://webstockreview.net/images/traveling-clipart-travel-tourism-9.png' />
                                <Text textColor={"gray.900"} fontSize={"34px"} fontWeight="bold" textAlign={"center"}>Balaji Tours</Text>
                            </Box>
                        </Box>
                        <Box textColor={"gray.800"} w="40%" h="full" display={"flex"} justifyContent="space-around" alignItems="center">
                            <Link href='/business' cursor={"pointer"} fontSize={"22px"} px={2} py={1} borderRadius="13px" fontWeight={"semibold"} _hover={{ bg: "black", textColor: "white" }}>Business</Link>
                            <Text cursor={"pointer"} fontSize={"22px"} px={2} py={1} borderRadius="13px" fontWeight={"semibold"} _hover={{ bg: "black", textColor: "white" }}>Your Bookings</Text>
                            <Button textColor={"white"} bg="red" onClick={logouthandler}>Logout</Button>
                        </Box>
                    </Box>
                    :
                    <Box w="full" display={"flex"} justifyContent="space-between" p={2} alignItems="center">
                        <Box w="30%" h="10vh" display={"flex"} justifyContent="center" >
                            <Box h="full" display={"flex"} alignItems="center" >
                                <Img marginRight={"2vh"} maxH="80%" alt='Image' src='https://webstockreview.net/images/traveling-clipart-travel-tourism-9.png' />
                                <Text fontSize={"34px"} fontWeight="bold" textAlign={"center"}>Delphox Tours</Text>
                            </Box>
                        </Box>
                        <Box w="40%" h="full" display={"flex"} justifyContent="space-around" alignItems="center">
                            <Link href='/userenter' cursor={"pointer"} fontSize={"22px"} px={2} py={1} borderRadius="13px" fontWeight={"semibold"} _hover={{ bg: "black", textColor: "white" }}>Register</Link>
                            <Link  cursor={"pointer"} fontSize={"22px"} px={2} py={1} borderRadius="13px" fontWeight={"semibold"} _hover={{ bg: "black", textColor: "white" }}>About Us</Link>
                            <Link cursor={"pointer"} fontSize={"22px"} px={2} py={1} borderRadius="13px" fontWeight={"semibold"} _hover={{ bg: "black", textColor: "white" }}>Contact us</Link>
                        </Box>
                    </Box>
            }
        </Box>
    )
}

export default Navbar
