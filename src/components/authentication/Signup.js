import { Button, useToast, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
const Signup = () => {
	const [show, setShow] = useState(false)
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [confirmPassword, setConfirmPassword] = useState()
	const [pic, setPic] = useState()
	const [loading, setLoading] = useState(false)

	const history = useHistory()

	const toast = useToast()

	const postDetails = async (pics) => {
		setLoading(true)
		if (!pics) {
			toast({
				title: "Please select an image!",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			})
			return
		}
		if (pics.type === "image/jpeg" || pics.type === "image/png") {
			const data = new FormData()
			data.append("file", pics)
			data.append("upload_preset", "chat-app")
			data.append("cloud_name", "dnq17j1cj")
			try {
				const res = await axios.post(process.env.REACT_APP_CLOUD_URL, data)
				setPic(res.data.url.toString())
				console.log(res.data)
			} catch (err) {
				console.log(err)
			}
			setLoading(false)
		} else {
			toast({
				title: "Please select an image!",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			})
			setLoading(false)
		}
	}

	const submitHandler = async () => {
		setLoading(true)
		if (!name || !email || !password || !confirmPassword || !pic) {
			toast({
				title: "Please fill up feilds!",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			})
			setLoading(false)
			return
		}
		if (password !== confirmPassword) {
			toast({
				title: "passwords does not match!",
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			})
			setLoading(false)
			return
		}
		try {
			const res = await axios.post(
				"/api/user",
				{
					name,
					email,
					password,
					pic,
				},
				{
					headers: {
						"Content-type": "application/json",
					},
				}
			)
			console.log(res)
			toast({
				title: "Registeration Sucessful",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			})
			localStorage.setItem("userInfo", JSON.stringify(res.data))
			history.push("/chats")
		} catch (err) {
			toast({
				title: "Errr occurred",
				description: err.response.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			})
		}
		setLoading(false)
	}

	return (
		<VStack spacing={"5px"}>
			<FormControl>
				<FormLabel>Name</FormLabel>
				<Input placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
			</FormControl>

			<FormControl>
				<FormLabel>Email</FormLabel>
				<Input placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
			</FormControl>

			<FormControl>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input type={show & 1 ? "text" : "password"} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />

					<InputRightElement w="4.5rem">
						<Button size="sm" onClick={() => setShow(show ^ 1)}>
							{show & 1 ? "Show" : "Hide"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup>
					<Input type={show & 2 ? "text" : "password"} placeholder="Enter your password" onChange={(e) => setConfirmPassword(e.target.value)} />

					<InputRightElement w="4.5rem">
						<Button size="sm" onClick={() => setShow(show ^ 2)}>
							{show & 2 ? "Show" : "Hide"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl id="pic">
				<FormLabel>Upload your Picture</FormLabel>
				<Input type="file" p={1.5} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
			</FormControl>

			<FormControl>
				<Button colorScheme="blue" width={"100%"} style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>
					Sing Up
				</Button>
			</FormControl>
		</VStack>
	)
}

export default Signup
