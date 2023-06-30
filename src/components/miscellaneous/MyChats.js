import React, { useEffect, useState } from "react"
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react"
import { ChatState } from "../../context/ChatProvider"
import axios from "axios"
import { AddIcon } from "@chakra-ui/icons"
import ChatLoading from "./ChatLoading"
import { getSender } from "../../config/ChatLoggics"
const MyChats = () => {
	const { selectedChats, setselectedChats, user, chats, setChats } = ChatState()
	const [loggedUser, setLoggedUser] = useState()

	const toast = useToast()

	const fetchChats = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}

			const { data } = await axios.get("/api/chats", config)
			setChats(data)
			console.log(data, "qqqqqqqqqq")
			// if (chats.find((c) => c._id === data._id)) setChats([data, ...chats])
		} catch (err) {
			toast({
				title: "Error occured!",
				description: err.message,
				duration: 5000,
				isClosable: true,
				position: "bottom-left",
			})
		}
	}

	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
		fetchChats()
	}, [])

	return (
		<Box
			display={{ base: selectedChats ? "none" : "flex", md: "flex" }}
			flexDir={"column"}
			alignItems={"center"}
			p={3}
			bg={"white"}
			w={{ base: "100%", md: "31%" }}
			borderRadius={"lg"}
			borderWidth={"1px"}>
			<Box pb={3} px={3} fontSize={{ base: "28px", md: "30px" }} fontFamily={"Wrok sans"} display={"flex"} w="100%" justifyContent={"space-between"} alignItems={"center"}>
				My Chats
				<Button display={"flex"} fontSize={{ base: "17px", md: "10px", lg: "17px" }} rightIcon={<AddIcon />}>
					New Group Chat
				</Button>
			</Box>
			<Box display={"flex"} flexDir={"column"} p={3} bg={"#F8F8F8"} w="100%" h="100%" borderRadius={"lg"} overflow={"hidden"}>
				{chats ? (
					<Stack overflowY={"scroll"}>
						{chats.map((chat) => (
							<Box
								onClick={() => setselectedChats(chat)}
								cursor={"pointer"}
								bg={selectedChats === chat ? "#38B2AC" : "#E8E8E8"}
								color={selectedChats === chat ? "white" : "black"}
								px={3}
								py={2}
								borderRadius={"lg"}
								key={chat._id}>
								<Text>{!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}</Text>
							</Box>
						))}
					</Stack>
				) : (
					<ChatLoading />
				)}
			</Box>
		</Box>
	)
}

export default MyChats
