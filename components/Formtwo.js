import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {db, storage} from '../firebase'
import React, { useRef, useState } from 'react'
import { v4  } from 'uuid';
import { collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';


const Formtwo = ({ getnumtwo }) => {

  const[loading,setLoading] = useState(false)
  const[disablenext,setdisablenext] = useState(false)
  const hiddenFileInput = useRef(null);
  const toast = useToast()

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

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

  const handleChange = async (event) => {   
    const fileUploaded = event.target.files[0];
    setdisablenext(true)
    setLoading(true)
    try {
      const imgname = fileUploaded.name + v4()
      const imageref = ref(storage, `images/${imgname}`)
      await uploadBytes(imageref, fileUploaded)
      const link = await getDownloadURL(imageref)

      const id = await getId() 
      const docRef = doc(db, "business", id.toString());
      const docSnap = await getDoc(docRef);

      console.log(docSnap.data())
      let url_array = docSnap.data().b_images
      url_array.push(link)
      await updateDoc(docRef,{
        b_images : url_array
      })

      toast({
        title: 'Success',
        description: "file uploaded Successfully",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setdisablenext(false)
      
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setdisablenext(false)
    }
    setLoading(false)
  };


  const handlenext = () => {
    getnumtwo(2)
  }
  return (
    <Box w="full" >
      <Box display={"flex"} justifyContent="center">
        <Button _hover={{bg:"green"}} isLoading={loading} onClick={handleClick} bg="green" w="40%" mt="2vh" textColor={"white"} pt={2} pb={2} cursor="pointer" borderRadius={"10px"} fontSize={"22px"} textAlign={"center"} htmlFor='inp'>
          Upload Images
          <Input  onChange={handleChange} ref={hiddenFileInput} display={"none"} id="inp" type="file" />
        </Button>
      </Box>
      <Button isDisabled={disablenext} _hover={{ bg: "green" }} onClick={handlenext} fontSize={"20px"} display={"block"} bg="green" textColor={"white"} w="30%" marginLeft={"auto"} marginRight={"Auto"} marginTop={"3vh"}>Next</Button>
    </Box>
  )
}

export default Formtwo
