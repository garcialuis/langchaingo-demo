import { Box, Flex, Text, Container } from "@chakra-ui/react";

export default function Navbar() {
	return (
		<Container maxW={"900px"}>
			<Box bg={"gray.700"} px={4} my={4} borderRadius={"5"}>
				<Flex h={16} alignItems={"center"} justifyContent={"center"}>
					<Flex
						justifyContent={"center"}
						alignItems={"center"}
						gap={3}
						display={{ base: "none", sm: "flex" }}
					>
						<Text
                            fontSize={"4xl"}
                            textTransform={"uppercase"}
                            fontWeight={"bold"}
                            textAlign={"center"}
                            my={2}
                            bgGradient='linear(to-l, #ffbc0a, #ff9000)'
                            bgClip='text'
                        >
				            Product Reviews
		                </Text>
					</Flex>
				</Flex>
			</Box>
		</Container>
	);
}