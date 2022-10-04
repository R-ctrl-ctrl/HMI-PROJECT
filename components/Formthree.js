import { Box, Button, FormControl, FormLabel, Input, Text, useToast, VStack } from '@chakra-ui/react'
import { collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useRouter } from 'next/router'

const Formthree = ({ getnumthree }) => {
  const [loading, setloading] = useState(false)
  const [feature, setfeature] = useState("")
  const [showFeatures, setshowFeatures] = useState([])
  const toast = useToast()
  const router = useRouter()
  const [finishloading,setfinishloading] = useState(false)
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

  const getFeatures = async () => {
    const id = await getId()
    const docRef = doc(db, "business", id.toString());
    const docSnap = await getDoc(docRef);
    setshowFeatures(docSnap.data().b_features)
  }

  const addbtn = async () => {
    setloading(true)
    if (!feature) {
      toast({
        title: 'Error',
        description: "feature field is empty",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setloading(false)
      return
    }

    try {
      const id = await getId()
      const docRef = doc(db, "business", id.toString());
      const docSnap = await getDoc(docRef);
      let feature_array = docSnap.data().b_features
      feature_array.push({
        f_id: Math.floor(Math.random() * 10000),
        f_text: feature
      })

      await updateDoc(docRef, {
        b_features: feature_array
      })

      await getFeatures()
      setfeature("")

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

  const deletebtn = async (text_id)=>{
    const id = await getId()
    const docRef = doc(db, "business", id.toString());
    const docSnap = await getDoc(docRef);
    let feature_array = docSnap.data().b_features
    let  new_array = []
    for(let i=0;i<feature_array.length;i++){
      if(feature_array[i].f_id != text_id){
        new_array.push(feature_array[i])
      }
    }

    await updateDoc(docRef,{
      b_features : new_array
    })

    await getFeatures()
    
  }

  const handlenext = async () => {
    setfinishloading(true)
    getnumthree()
    setTimeout(()=>{
      setfinishloading(false)
      router.push('/')
    },2000)

  }
  return (
    <Box>
      <FormLabel>Add features on your business:</FormLabel>
      <Box display={'flex'} w="100%" justifyContent={"center"} >
        <Box w="full" display={"flex"} justifyContent="space-between">
          <Input value={feature} onChange={(e) => setfeature(e.target.value)} w="70%" placeholder='Add features...' />
          <Button isLoading={loading} onClick={addbtn} w="25%" bg="green" _hover={{ bg: "green" }} textColor={"white"}>Add</Button>
        </Box>
      </Box>
      <Box>
        {showFeatures && showFeatures.map((f, key) => {
          return (
            <Box alignItems={"center"} borderRadius={"14px"} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} pt={2} pb={2} pl={3} pr={3} bg="blackAlpha.400" key={key} display="flex" justifyContent={"space-between"} mt="2vh">
              <Text  fontSize={"20px"} maxW="80%">{f.f_text}</Text>
              <Button onClick={()=>deletebtn(f.f_id)}  bg="red" _hover={{bg:"red"}} textColor={"white"}>Delete</Button>
            </Box>
          )
        })}
      </Box>
      <Button isLoading={finishloading} onClick={handlenext}  display={"block"} mr="auto" _hover={{ bg: "green" }} ml={"auto"} w="20%" mt="2vh" bg="green" textColor={"white"}>Finish</Button>
    </Box>
  )
}

export default Formthree
