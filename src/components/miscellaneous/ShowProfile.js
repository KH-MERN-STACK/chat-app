import { ViewIcon } from "@chakra-ui/icons"
import { Button, IconButton, Image, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import React from "react"

const ShowProfile = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			{children ? <span onClick={onOpen}>{children}</span> : <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />}

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent h= "410px">
					<ModalHeader fontSize={"40px"} fontFamily={"Work sans"} display={"flex"} justifyContent={"center"}>
						{user.name}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"space-between"}>
						<Image display={"flex"} justifyContent={"center"} borderRadius={"full"} boxSize={"150px"} src={user.picture} alt={user.name} />
						<Text fontSize={{ base: "28px", md: "30px" }} fontFamily={"Work sans"}>
							Email : {user.email}
						</Text>
					</ModalBody>

				</ModalContent>
			</Modal>
		</>
	)
}

export default ShowProfile
