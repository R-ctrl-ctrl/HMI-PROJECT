import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react'
import {auth} from '../firebase'
import { createUserWithEmailAndPassword , updateProfile} from 'firebase/auth'
import {useRouter} from 'next/router'

const RegisterComponent = () => {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const toast = useToast()
    const router = useRouter()
    const [loading,setloading] = useState(false)

    const handleSubmit = async () => {
        setloading(true)
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Error!',
                description: "All fields are required",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            setloading(false)
            return
        }

        if(password != confirmPassword){
            toast({
                title: 'Error!',
                description: "Passwords are not same",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
            setloading(false)
            return
        }

        try{
            await createUserWithEmailAndPassword(auth,email,password)
            const user = auth.currentUser
            await updateProfile(user,{
                displayName:name
            })

            toast({
                title: 'Success',
                description: "Account created successfully",
                status: 'success',
                duration: 7000,
                isClosable: true,
            })
            router.push('/')

        }catch(err){
            toast({
                title: 'Error!',
                description: err.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }
        setloading(false)
    }

    return (
        <Box>
            <VStack w="full" rowGap={"2vh"}>
                <FormControl isRequired>
                    <FormLabel>Name:</FormLabel>
                    <Input onChange={(e)=>setname(e.target.value)} placeholder='Enter name here...' borderColor={"black"} border={"1px"} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email:</FormLabel>
                    <Input onChange={(e)=>setemail(e.target.value)} type={"email"} placeholder='Enter email here...' borderColor={"black"} border={"1px"} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password:</FormLabel>
                    <Input onChange={(e)=>setpassword(e.target.value)} placeholder='Enter password...' type={"password"} borderColor={"black"} border={"1px"} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Confirm Password:</FormLabel>
                    <Input onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Enter Password again...' type={"password"} borderColor={"black"} border={"1px"} />
                </FormControl>
                <FormControl >
                    <Button isLoading={loading} onClick={handleSubmit} bg={"blue.600"} fontSize="18px" fontWeight="bold" textColor="white" w="100%">Create User</Button>
                </FormControl>
            </VStack>
        </Box>
    )
}

export default RegisterComponent
