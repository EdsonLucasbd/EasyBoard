'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'

interface ListItemProps {
	title: string
	tag: string
	content: string
}
export const ListItem = ({ title, tag, content }: ListItemProps) => {
	return (
		<Card className='rounded-[24px] shadow-md'>
			<CardHeader>
				<CardDescription>{tag}</CardDescription>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>{content}</CardContent>
			<CardFooter></CardFooter>
		</Card>
	)
}
