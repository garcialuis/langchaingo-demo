import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { Review } from "./ReviewList";

const ReviewItem = ({ review }: { review: Review }) => {
	const queryClient = useQueryClient();

	const { mutate: deleteReview, isPending: isDeleting } = useMutation({
		mutationKey: ["deleteReview"],
		mutationFn: async() => {
			try {
				const res = await fetch("http://localhost:8080/api/v1/reviews/" + `${review._id}`, {
					method: "DELETE",
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Failed to delete review")
				}
				return data;
			} catch (error) {
				console.log(error)
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reviews"]});
		},
	});

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
				<Box color={"red.500"} cursor={"pointer"} onClick={() => deleteReview()} >
					{!isDeleting && <MdDelete size={25} />}
					{isDeleting && <Spinner size={"sm"} />}
				</Box>
			</Flex>
		</Flex>
	);
};
export default ReviewItem;