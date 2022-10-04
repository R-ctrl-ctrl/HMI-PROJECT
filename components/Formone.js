import { EmailIcon, InfoIcon, PhoneIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, VStack, useToast } from '@chakra-ui/react'
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'

const Formone = ({ getnumone }) => {

  const toast = useToast()
  const [name, setname] = useState("")
  const [address, setaddress] = useState("")
  const [contact, setcontact] = useState()
  const [loading, setloading] = useState(false)

  const getId = async () => {
    try {
      const q = query(collection(db, "business"));
      const querySnapshot = await getDocs(q);
      let i = 0;
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




  const handlenext = async () => {
    setloading(true)

    if (!name || !address || !contact) {
      toast({
        title: 'Error',
        description: "All fields are necessary!",
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
      setloading(false)
      return
    }

    try {
      let id = await getId()
      const docRef = doc(db, "business", id.toString());
      await updateDoc(docRef, {
        b_name: name,
        b_address: address,
        b_contact: contact
      })
      getnumone(1)
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
    }

    setloading(false)

  }


  return (

    <Box  mt={"2vh"}>
      <VStack rowGap={"2vh"}>
        <FormControl isRequired>
          <FormLabel>Business Name:</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<InfoIcon color='gray.600' />}
            />
            <Input type='tel' placeholder='Name' onChange={(e) => setname(e.target.value)} />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Address:</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<EmailIcon color='gray.600' />}
            />
            <Input type='tel' placeholder='Location' onChange={(e) => setaddress(e.target.value)} />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Contact No:</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<PhoneIcon color='gray.600' />}
            />
            <Input type='tel' placeholder='Phone number' onChange={(e) => setcontact(e.target.value)} />
          </InputGroup>
        </FormControl>
        <Button isLoading={loading} onClick={handlenext} _hover={{ bg: "green" }} w="45%" fontSize={"20px"} bg="green" textColor={"white"}>Next</Button>
      </VStack>
    </Box>
  )
}

export default Formone
