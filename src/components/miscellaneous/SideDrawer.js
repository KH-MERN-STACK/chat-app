import {
	Avatar,
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Input,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	Tooltip,
	useToast,
} from "@chakra-ui/react"
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { useDisclosure } from "@chakra-ui/hooks"
import React, { useState } from "react"
import { ChatState } from "../../context/ChatProvider"
import ShowProfile from "./ShowProfile"
import { useHistory } from "react-router-dom"
import axios from "axios"
import ChatLoading from "./ChatLoading"
import UserListItem from "../userAvater/UserListItem"
const SideDrawer = () => {
	const [search, setSearch] = useState("")
	const [searchResult, setSearchResult] = useState([])
	const [loading, setLoading] = useState(false)
	const [loadingChats, setLoadingChats] = useState()
	const { user } = ChatState()
	const history = useHistory()
	const toast = useToast()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const logoutHandler = () => {
		localStorage.removeItem("userInfo")
		history.push("/")
	}

	const searchHandler = async () => {
		if (!search) {
			toast({
				title: "Please Enter something in search",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "top-left",
			})
			return
		}
		setLoading(true)
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
			const { data } = await axios.get(`/api/user?search=${search}`, config)
			setSearchResult(data)
		} catch (err) {
			toast({
				title: "Error occurred !",
				description: "faild to load the search results",
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom-left",
			})
		}
		setLoading(false)
	}

	const accessChat = (userId) => {

	}
	return (
		<>
			<Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} bg="white" w="100%" p="5px 10px 5px 10px" borderWidth={"5px"}>
				<Tooltip label="search Users to chat" hasArrow placement="bottom-end">
					<Button variant={"ghost"} onClick={onOpen}>
						<i class="fa-solid fa-magnifying-glass"></i>
						{/* <i class="fa-solid fa-magnifying-glass fa-spin"></i> */}
						<Text display={{ base: "none", md: "flex" }} px="4">
							search User
						</Text>
					</Button>
				</Tooltip>
				<Text fontSize={"2xl"} fontFamily={"Work sans"}>
					Chat App
				</Text>
				<div>
					<Menu>
						<BellIcon fontSize={"2xl"} m="1" />
						{/* <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
							Actions
						</MenuButton>
						<MenuList>
							<MenuItem>Download</MenuItem>
							<MenuItem>Create a Copy</MenuItem>
							<MenuItem>Mark as Draft</MenuItem>
							<MenuItem>Delete</MenuItem>
							<MenuItem>Attend a Workshop</MenuItem>
						</MenuList> */}
					</Menu>
					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
							<Avatar size="sm" cursor={"pointer"} name={user.name} src={user.picture} />
						</MenuButton>
						<MenuList>
							<ShowProfile user={user}>
								<MenuItem>My Profile</MenuItem>
							</ShowProfile>

							<MenuDivider />
							<MenuItem onClick={logoutHandler}>Logout</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</Box>

			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />

				<DrawerContent>
					<DrawerHeader borderBottomWidth={"1px"}>Search User</DrawerHeader>

					<DrawerBody>
						<Box display={"flex"} pb={"2px"}>
							<Input placeholder="Search by name or email" mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
							<Button onClick={searchHandler}>Go</Button>
						</Box>
						{loading ? <ChatLoading /> : searchResult?.map((user) => <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default SideDrawer
