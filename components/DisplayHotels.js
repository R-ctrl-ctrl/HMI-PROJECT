import { Box, Button, GridItem, Heading, Img, Link, Progress, Select, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'




const DisplayHotels = () => {
    const [data, setdata] = useState([])
    const [progressVisibility, setProgressVisibility] = useState("none")
    const [city, setcity] = useState()
    const [price, setprice] = useState()
    const [stars, setstars] = useState()
    const [disp, setdisp] = useState("null")

    const loadData = async () => {
        setdisp("block")
        const q = query(collection(db, "business"));
        const querySnapshot = await getDocs(q);
        setdata([])
        querySnapshot.forEach((d) => {
            const obj = d.data()
            obj["id"] = d.id
            setdata((oldarr) => [...oldarr, obj])
        })
        setdisp("none")

    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        if (city != undefined || price != undefined || stars != undefined) {
            fireme()
        }
    }, [city, price, stars])


    const fireme = async () => {

        setProgressVisibility("block")
        setdisp("block")
        let first, second, third;

        const docref = collection(db, "business");
        let wh1, wh2, wh3

        if (city != "" && city != undefined) {
            wh1 = where("city", "==", city)
            first = "yess"
        }
        else {
            first = "no"
        }

        if (price != "" && price != undefined) {
            wh2 = where("price", "<", parseInt(price))
            second = "yess"
        } else {
            second = "no"
        }

        if (stars != "" && stars != undefined) {
            wh3 = where("star", "==", parseInt(stars))
            third = "yess"
        }
        else {
            third = "no"
        }

        let q;

        if (first == "yess" && second == "no" && third == "no") {
            q = query(docref, wh1);
            console.log("yess")
        }


        else if (first == "no" && second == "yess" && third == "no") {
            q = query(docref, wh2);
        }


        else if (first == "no" && second == "no" && third == "yess") {
            q = query(docref, wh3);
        }


        else if (first == "yess" && second == "yess" && third == "no") {
            q = query(docref, wh1, wh2);
        }


        else if (first == "yess" && second == "no" && third == "yess") {
            q = query(docref, wh1, wh3);

        }


        else if (first == "no" && second == "yess" && third == "yess") {
            q = query(docref, wh2, wh3);
        }


        else if (first == "yess" && second == "yess" && third == "yess") {
            q = query(docref, wh1, wh2, wh3);
        }

        else {
            q = query(docref)
        }

        const querySnapshot = await getDocs(q);
        setdata([])
        querySnapshot.forEach((d) => {
            const obj = d.data()
            obj["id"] = d.id
            setdata((oldarr) => [...oldarr, obj])
        })
        setProgressVisibility("none")
        setdisp("none")

    }



    return (
        <Box w="full" p={10}>
            
            <Box mb="4vh" display={"flex"} mt="3vh" justifyContent={"space-evenly"}>
                <Select boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} onChange={(e) => setcity(e.target.value)} cursor={"pointer"} letterSpacing={"2px"} placeholder='City' w={"15%"} bg="purple.800" color={"white"} textColor={"white"} fontSize="18px" fontWeight={"bold"}>
                    <option style={{ color: "black" }} value='Mumbai'>Mumbai</option>
                    <option style={{ color: "black" }} value='Delhi'>Delhi</option>
                    <option style={{ color: "black" }} value='Kolkata'>Kolkata</option>
                    <option style={{ color: "black" }} value='Chennai'>Chennai</option>
                    <option style={{ color: "black" }} value='Bengluru'>Bengluru</option>
                    <option style={{ color: "black" }} value='Hyderabad'>Hyderabad</option>
                    <option style={{ color: "black" }} value='Punjab'>Punjab</option>
                    <option style={{ color: "black" }} value='Rajasthan'>Rajasthan</option>
                </Select>
                <Select onChange={(e) => setprice(e.target.value)} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} cursor={"pointer"} letterSpacing={"2px"} placeholder='Price' color={"white"} w={"20%"} bg="purple.800" textColor={"white"} fontSize="18px" fontWeight={"bold"}>
                    <option style={{ color: "black" }} value='5000'>Below 5000/-</option>
                    <option style={{ color: "black" }} value='10000'>Below 10000/-</option>
                    <option style={{ color: "black" }} value='15000'>Below 15000/-</option>
                    <option style={{ color: "black" }} value='25000'>Below 25000/-</option>
                </Select>
                <Select onChange={(e) => setstars(e.target.value)} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} cursor={"pointer"} letterSpacing={"2px"} color={"white"} placeholder='stars' w={"15%"} bg="purple.800" textColor={"white"} fontSize="18px" fontWeight={"bold"}>
                    <option value='1'>⭐</option>
                    <option value='2'>⭐⭐</option>
                    <option value='3'>⭐⭐⭐</option>
                    <option value='4'>⭐⭐⭐⭐</option>
                    <option value='5'>⭐⭐⭐⭐⭐</option>
                </Select>
            </Box>



            <SimpleGrid columns={3} spacing={10}>

                <GridItem colSpan={3}><Heading ml={"5%"}>Trending Hotels :</Heading></GridItem>


                <GridItem display={"flex"} justifyContent="center" colSpan={3}>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                        display={disp}
                    />
                </GridItem>

                {data &&
                    data.map((d, key) => {
                        return (
                            <Link href={`/business/${d.id}`} key={key} position={"relative"} transition="2s" _hover={{ top: "-20px" }} cursor={"pointer"} borderRadius={"8%"} boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"} ml="auto" mr="auto" w="70%" h={"40vh"}>
                                <Img borderTopRadius={"8%"} borderBottomRadius={"0%"} h="80%" w="full" src={d.b_images[0]} />
                                <Box h="20%" w="full" display={"flex"} alignItems="center" justifyContent={"center"} >
                                    <Text fontSize={"22px"} fontWeight="semibold" textAlign={"center"}>{d.b_name}</Text>
                                </Box>
                            </Link>
                        )
                    })}
            </SimpleGrid>
        </Box>
    )

}

export default DisplayHotels
