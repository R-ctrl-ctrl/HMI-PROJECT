import { Box, Button, FormControl, FormLabel, Input, VStack , useToast } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebase'
import { useRouter } from 'next/router'

const LoginComponent = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)
    const router = useRouter()
    const toast = useToast()

    const handleSubmit = async () => {
        setloading(true)
        if (!email || !password) {
            toast({
                title: 'Error!',
                description: "All fields are required",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
            setloading(false)
            return
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            router.push('/')
        } catch (err) {
            toast({
                title: 'Error!',
                description: err.message,
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }

        setloading(false)
    }
    return (
        <Box>
            <VStack w="full" rowGap={"2vh"}>
                <FormControl>
                    <FormLabel>Email:</FormLabel>
                    <Input onChange={(e) => setemail(e.target.value)} type={"email"} placeholder='Enter email here...' borderColor={"black"} border={"1px"} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password:</FormLabel>
                    <Input onChange={(e) => setpassword(e.target.value)} placeholder='Enter password here...' borderColor={"black"} border={"1px"} />
                </FormControl>
                <FormControl >
                    <Button isLoading={loading} onClick={handleSubmit} bg={"blue.600"} fontSize="18px" fontWeight="bold" textColor="white" w="100%">Login</Button>
                </FormControl>
            </VStack>
        </Box>
    )
}

export default LoginComponent
