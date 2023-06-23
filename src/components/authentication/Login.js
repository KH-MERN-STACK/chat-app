import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
const Login = () => {
	const [show, setShow] = useState(false)
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [loading, setLoading] = useState(false)

	const history = useHistory()

	const toast = useToast()

	const submitHandler = async () => {
		setLoading(true)
		if (!email || !password) {
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

		try {
			const res = await axios.post(
				"/api/user/login",
				{
					email,
					password,
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
				<FormLabel>Email</FormLabel>
				<Input placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
			</FormControl>

			<FormControl>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input type={show & 1 ? "text" : "password"} value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />

					<InputRightElement w="4.5rem">
						<Button size="sm" onClick={() => setShow(show ^ 1)}>
							{show & 1 ? "Show" : "Hide"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl>
				<Button colorScheme="blue" width={"100%"} style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>
					Login
				</Button>
				<Button
					variant="solid"
					colorScheme="red"
					w="100%"
					mt={"1em"}
					onClick={() => {
						setEmail("guest@example.com")
						setPassword("123456")
					}}>
					Get Guest User Credentials
				</Button>
			</FormControl>
		</VStack>
	)
}

export default Login
