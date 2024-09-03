'use client'
import { createTask } from '@/lib/firebase/taskManagment'
import { Plus } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'

interface ListHeaderProps {
	title: string
	quantity: number
	type: 'not-started' | 'in-progress' | 'completed'
}

const List = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
	({ children }, ref) => (
		<div
			className='flex flex-col items-center w-full h-full rounded-[32px] bg-brand-50 p-3'
			ref={ref}
		>
			{children}
		</div>
	),
)
List.displayName = 'List'

const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
	({ title, type, quantity, ...props }, ref) => (
		<div
			className={`flex items-center justify-between w-full h-12 text-white font-bold text-base 
        leading-[22px] py-2 pl-2 pr-3 rounded-full mb-4 ${type === 'in-progress' ? 'bg-in-progress' : type === 'completed' ? 'bg-done' : 'bg-not-started'}`}
			ref={ref}
			{...props}
		>
			<div className='flex items-center space-x-2'>
				<span
					className={`font-semibold text-sm bg-white rounded-full h-full px-3 
						py-1.5 ${
							type === 'in-progress'
								? 'text-in-progress'
								: type === 'completed'
									? 'text-done'
									: 'text-not-started'
						}
							`}
				>
					{quantity}
				</span>
				<h3>{title}</h3>
			</div>
			<Button
				variant='ghost'
				className='hover:bg-black/20 rounded-full'
				onClick={() => createTask()}
			>
				<Plus className='text-white size-6' />
			</Button>
		</div>
	),
)
ListHeader.displayName = 'ListHeader'

const ListItem = ({
	title,
	tag,
	content,
}: { title: string; tag: string; content: string }) => {
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

export { List, ListHeader, ListItem }
