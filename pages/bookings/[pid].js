import { Box, Button, Heading, Input, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker';
import styles from '../../styles/Customestyles.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { auth, db } from '../../firebase'
import { useRouter } from 'next/router';
import { addDoc, collection } from 'firebase/firestore';

const pid = () => {
    
    
    const [startDate, setStartDate] = useState(new Date());
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [endDate, setEndDate] = useState(tomorrow)
    const [adults, setadults] = useState()
    const [children, setchildren] = useState()
    const [rooms, setrooms] = useState()
    const toast = useToast()
    const router = useRouter()
    const[loading,setloading] = useState(false)
    const {pid} = router.query

    const handleClick = async () => {
        setloading(true)
        if(!adults || !children || !rooms){
            toast({
                title: 'Warning',
                description: "All Fields are Compulsory",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        const dbRef = collection(db, "bookings");
        const data = {
            adults,
            children,
            rooms,
            startDate,
            endDate,
            booker: auth.currentUser.uid,
            hotel : pid
        };
        
        addDoc(dbRef, data)
            .then(docRef => {
                    router.push('/')
                toast({
                    title: 'Success!',
                    description: "Your Booking is done , enjoy your trip!",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(error => {
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
            setloading(false)
    }
    return (
        <Box bg="blackAlpha.300" w="100vw" h="100vh" display={"flex"} justifyContent="center" alignItems={"center"}>
            <Box w="45%" bg="white" p={10} borderRadius="15px">
                <VStack spacing={"2vh"}>
                    <Box>
                        <Heading letterSpacing={"2px"}>Booking  Form</Heading>
                    </Box>
                    <FormControl>
                        <FormLabel>No of adults</FormLabel>
                        <Input onChange={(e)=>setadults(e.target.value)} placeholder='Enter no of adults' type='number' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>No of children </FormLabel>
                        <Input onChange={(e)=>setchildren(e.target.value)} placeholder='Enter no of children' type='number' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>No of rooms</FormLabel>
                        <Input onChange={(e)=>setrooms(e.target.value)} placeholder='Enter no of rooms' type='number' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Check-In date</FormLabel>
                        <DatePicker className={styles.datepicker} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" selected={startDate} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Check-Out date</FormLabel>
                        <DatePicker className={styles.datepicker} onChange={(date) => setEndDate(date)} dateFormat="dd/MM/yyyy" selected={endDate} />
                    </FormControl>
                    <Box w="full" textAlign={"center"}>
                        <Button isLoading={loading} onClick={handleClick} colorScheme={"blue"} w="70%">Confirm Booking</Button>
                    </Box>
                </VStack>
            </Box>
        </Box>
    )
}

export default pid
