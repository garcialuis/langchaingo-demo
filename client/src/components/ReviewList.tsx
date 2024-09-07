import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import ReviewItem from "./ReviewItem";
import { useQuery } from "@tanstack/react-query";
import ReviewSummary from "./ReviewSummary";
import ReviewForm from "./ReviewForm";
import { useState } from "react";

export type Review = {
	_id: number;
	body: string;
}

const ReviewList = () => {
	const [summary, setSummary] = useState<string>("");

	const {data:reviewMap, isLoading, isError, error}= useQuery<Object>({
		queryKey:["reviews"],

		queryFn: async() => {
			try {
				const res = await fetch("http://localhost:8080/api/v1/reviews")
				const data = await res.json()

				if(!res.ok){
					throw new Error(data.error || "failed to fetch reviews")
				}
				return data || new Object();
			} catch (error:any) {
				throw new Error(error.message);
			}
		}
	})

	return (
		<>
			<ReviewForm setSummary={setSummary} />
      		<ReviewSummary summary={summary} />
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

			{!isLoading && !isError && Object.keys(reviewMap || {}).length === 0 && (
				<Stack alignItems={"center"} gap='3'>
					<Text fontSize={"xl"} textAlign={"center"} color={"gray.400"}>
						"This item has no reviews :("
					</Text>
					<img src='/n_alone.jpg' alt='Sad puppy' width={200} height={200} />
				</Stack>
			)}
			<Stack gap={3}>
				{
					Object.entries(reviewMap || {}).map(([key, value]) => {
						return <ReviewItem key={key} review={value} />
					})
				}
			</Stack>
		</>
	);
};
export default ReviewList;