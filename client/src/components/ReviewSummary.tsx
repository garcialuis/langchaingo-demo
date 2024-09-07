import { Flex, Text } from "@chakra-ui/react";

const ReviewSummary = ({ summary }: { summary: any }) => {
	return (
		<Flex
			direction="column"
			border={"1px"}
			borderColor={"gray.600"}
			p={4}
			borderRadius={"lg"}
			bg="gray.700"
			my={4}
		>
			<Text fontSize="2xl" fontWeight="bold" mb={2}>
				Summary
			</Text>
			<Text mb={2}>
                {summary.body}
			</Text>
		</Flex>
	);
};

export default ReviewSummary;
