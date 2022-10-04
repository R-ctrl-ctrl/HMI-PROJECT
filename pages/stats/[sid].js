import { useRouter } from 'next/router'
import React from 'react'
import { Chart } from 'chart.js/auto'
import { Bar, Line } from 'react-chartjs-2'
import { Box, Img, Text } from '@chakra-ui/react'
import { Pie } from "react-chartjs-2";
import styles from '../../styles/Customestyles.module.css'


const sid = () => {
  const router = useRouter()
  const { sid } = router.query
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: ["pink","blue","purple","brown","green","red","yellow"],
        borderColor: "rgb(0,0,255)",
        data: [20, 10, 10, 25, 20, 30, 45],
      },
    ],

  };

  const barlabels = ["January", "February", "March", "April", "May", "June"];
  const bardata = {
    labels: barlabels,
    datasets: [
      {
        label: "Customer in months",
        backgroundColor: ["purple","blue","pink","brown","green","red","yellow"],
        borderColor: "rgb(0,0,255)",
        data: [20, 10, 10, 25, 20, 30, 45],
      },
    ],

  };

  const linelabels = ["January", "February", "March", "April", "May", "June"];
  const linedata = {
    labels: barlabels,
    datasets: [
      {
        label: "Revenue in months",
        backgroundColor: ["purple","blue","pink","brown","green","red","yellow"],
        borderColor: "rgb(255,0,0)",
        data: [0, 10, 5, 25, 20, 30, 45],
      },
    ],

  };


  return (
    <Box p={10} w="100vw" h="100vh" bg="blue.100">
      <Box h="35%" w="full" display={"flex"} justifyContent="space-between">
        <Box boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} p={5} bg="white" w="30%" h="full">
          <Pie height={"50%"} options={{ maintainAspectRatio: false }} className={styles.pie} data={data} />
        </Box>
        <Box display={"flex"} justifyContent="space-around" w="65%" alignItems={"center"}>
          <Box  position={"relative"} display={"flex"} alignItems="center" backgroundSize={"cover"} backgroundRepeat="no-repeat" backgroundPosition="center" boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} w="30%" h="80%" >
            <Img opacity={0.9} h="full" w="full" src='https://media.istockphoto.com/vectors/data-analysis-graph-light-chart-line-on-blue-background-vector-or-vector-id1133992858?k=6&m=1133992858&s=170667a&w=0&h=6jcV0NgpXATzMoOQtYOK_geemUDCRFn8SdQDFJ231fQ=' />
            <Box position={"absolute"} top="0" h="full" w="full" textAlign={"center"} display="flex" flexDirection={'column'} justifyContent="center" >
              <Text fontWeight={"bold"} fontSize="32px" textColor={"white"}>230</Text>
              <Text letterSpacing={"3px"} fontWeight={"bold"} fontSize="27px" textColor={'white'}>Total Customers</Text>
            </Box>
          </Box>
          <Box  position={"relative"} display={"flex"} alignItems="center" backgroundSize={"cover"} backgroundRepeat="no-repeat" backgroundPosition="center" boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} w="30%" h="80%" >
            <Img opacity={0.9} h="full" w="full" src='https://scambrokersreviews.com/wp-content/uploads/2021/05/AZAForex-Reviews-768x512.jpg' />
            <Box position={"absolute"} top="0" h="full" w="full" textAlign={"center"} display="flex" flexDirection={'column'} justifyContent="center" >
              <Text fontWeight={"bold"} fontSize="32px" textColor={"white"}>12.6 Crores</Text>
              <Text letterSpacing={"3px"} fontWeight={"bold"} fontSize="27px" textColor={'white'}>Total Revenue</Text>
            </Box>
          </Box>
          <Box  position={"relative"} display={"flex"} alignItems="center" backgroundSize={"cover"} backgroundRepeat="no-repeat" backgroundPosition="center" boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} w="30%" h="80%" >
            <Img opacity={0.9} h="full" w="full" src='https://uploads-ssl.webflow.com/5e67ee99fac97d3551523a9c/5e9c6f94fb5d85586400d896_Probability%20and%20Statistics-p-500.jpeg' />
            <Box position={"absolute"} top="0" h="full" w="full" textAlign={"center"} display="flex" flexDirection={'column'} justifyContent="center" >
              <Text fontWeight={"bold"} fontSize="32px" textColor={"white"}>4.1</Text>
              <Text letterSpacing={"3px"} fontWeight={"bold"} fontSize="27px" textColor={'white'}>Overall Rating</Text>
            </Box>
          </Box>
          

        </Box>
      </Box>
      <Box h="60%" w="full" display={"flex"} mt="5vh" justifyContent="space-between">
        <Box boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} p={4} h="full" w="48%" bg="white">
          <Bar data={bardata} options={{ maintainAspectRatio: false }} />
        </Box>
        <Box boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} p={4} h="full" w="48%" bg="white">
          <Line data={linedata} options={{ maintainAspectRatio: false }} />
        </Box>
      </Box>
    </Box>
  )
}

export default sid
