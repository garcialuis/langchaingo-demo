import { Box, Flex, Text } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

const ReviewItem = ({ review }: { review: any }) => {
	return (
		<Flex gap={2} alignItems={"center"}>
			<Flex
				flex={1}
				alignItems={"center"}
				border={"1px"}
				borderColor={"gray.600"}
				p={2}
				borderRadius={"lg"}
				justifyContent={"space-between"}
			>
				<Text
					color={ "yellow.100" }
				>
					{review.body}
				</Text>
			</Flex>
			<Flex gap={2} alignItems={"center"}>
				<Box color={"red.500"} cursor={"pointer"}>
					<MdDelete size={25} />
				</Box>
			</Flex>
		</Flex>
	);
};
export default ReviewItem;