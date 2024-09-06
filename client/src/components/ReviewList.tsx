import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import ReviewItem from "./ReviewItem";
import { useQuery } from "@tanstack/react-query";
import ReviewSummary from "./ReviewSummary";

export type Review = {
	_id: number;
	body: string;
	completed: boolean; //TODO: remove
}

const ReviewList = () => {

	const {data:reviews, isLoading, isError, error}= useQuery<Review[]>({
		queryKey:["reviews"],

		queryFn: async() => {
			try {
				const res = await fetch("http://localhost:8080/api/v1/reviews")
				const data = await res.json()

				if(!res.ok){
					throw new Error(data.error || "failed to fetch reviews")
				}
				console.log(data) //TODO: remove
				return data || []
			} catch (error:any) {
				throw new Error(error.message);
			}
		}
	})

	return (
		<>
			{isLoading && (
				<Flex justifyContent={"center"} my={4}>
					<Spinner size={"xl"} />
				</Flex>
			)}
			{isError && (
				<Stack alignItems={"center"} gap='3'>
					<Text fontSize={"xl"} textAlign={"center"} color={"red.500"}>
						An error occurred: {error.message}
					</Text>
				</Stack>
			)}
			{(
				<ReviewSummary summary={"test test test test"} />
			)}
			{!isLoading && !isError && reviews?.length === 0 && (
				<Stack alignItems={"center"} gap='3'>
					<Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
						"This item has no reviews :("
					</Text>
					<img src='/sad-puppy.png' alt='Sad puppy' width={70} height={70} />
				</Stack>
			)}
			<Stack gap={3}>
				{reviews?.map((review) => (
					<ReviewItem key={review._id} review={review} />
				))}
			</Stack>
		</>
	);
};
export default ReviewList;