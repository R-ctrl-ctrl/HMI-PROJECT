import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import Formone from '../components/Formone'
import Formthree from '../components/Formthree'
import Formtwo from '../components/Formtwo'
import styles from '../styles/Home.module.css'

const createbusiness = () => {

  const [num, setnum] = useState(0)
  const[valid1,setvalid1] = useState(false)
  const[valid2,setvalid2] = useState(false)

  

  const getnumone = (n) => {
    setnum(n)
    setcirclebg1("green")
    settext1color("white")
    setlinebg1("green")
    setvalid1(true)
  }

  const getnumtwo = (n)=>{
    setnum(n)
    setcirclebg2("green")
    settext2color("white")
    setlinebg2("green")
    setvalid2(true)
  }

  const getnumthree = ()=>{
    setcirclebg3("green")
    settext3color("white")
  }

  const[circlebg1,setcirclebg1] = useState("gray.300")
  const[text1color,settext1color] = useState("black")
  const[linebg1,setlinebg1] = useState("white")

  const[circlebg2,setcirclebg2] = useState("gray.300")
  const[text2color,settext2color] = useState("black")
  const[linebg2,setlinebg2] = useState("white")

  const[circlebg3,setcirclebg3] = useState("gray.300")
  const[text3color,settext3color] = useState("black")







  return (
    <Box bg="blackAlpha.200" h="100vh" w="100vw" display={"flex"} justifyContent="center" alignItems={"center"}>
    <Box  display={"flex"} justifyContent="center" w="full" >
      <Box bg="white" boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} borderRadius="15px" w="60%" pt={5} pb={5} pl={10} pr={10} >
        <Box maxW="80%" margin={"auto"} justifyContent={"space-evenly"} alignItems="center" display={"flex"}>
          <Box w="8%" h="60px" bg={circlebg1} display={"flex"} borderRadius="50%" align="center" justify="center" ><Box fontSize={"22px"} textColor={text1color} margin={"auto"}>1</Box></Box>
          <Box  h="1vh" w="38%" ><Box h="full" className={valid1 ? styles.anime : ""} w="full"  ></Box></Box>
          <Box w="8%" h="60px" bg={circlebg2} display={"flex"} borderRadius="50%" align="center" justify="center" ><Box fontSize={"22px"} textColor={text2color} margin={"auto"}>2</Box></Box>
          <Box  h="1vh" w="38%" ><Box h="full" className={valid2 ? styles.anime : ""} w="full"  ></Box></Box>
          <Box w="8%" h="60px" bg={circlebg3} display={"flex"} borderRadius="50%" align="center" justify="center" ><Box fontSize={"22px"} textColor={text3color} margin={"auto"}>3</Box></Box>
        </Box>

        {(() => {
          if (num == 0) {
            return (
              <Formone getnumone={getnumone} />
            )
          }
          else if (num == 1) {
            return (
              <Formtwo getnumtwo={getnumtwo} />
            )
          }
          else {
            return (
              <Formthree getnumthree={getnumthree} />
            )
          }
        })()}
      </Box>
    </Box>
    </Box>
  )
}

export default createbusiness
