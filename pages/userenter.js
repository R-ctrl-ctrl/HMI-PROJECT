import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import LoginComponent from '../components/LoginComponent'
import RegisterComponent from '../components/RegisterComponent'

const userenter = () => {
    return (
        <Container minW={"full"} h="100vh"  display={"flex"} justifyContent="center" alignItems={"center"} bg="blackAlpha.200">
            <Box border={"1px"} p={5} w="50%" display={"flex"} justify="center" borderRadius={"15px"} bg="white">
            <Tabs w="full" variant='soft-rounded' colorScheme='green'>
                <TabList w="full" justifyContent="space-around">
                    <Tab _selected={{ color: 'white', bg: 'blue.600' }} w="40%">Login</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.600' }}  w="40%">Register</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel >
                        <LoginComponent/>
                    </TabPanel>
                    <TabPanel>
                        <RegisterComponent/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            </Box>
        </Container>
    )
}

export default userenter
