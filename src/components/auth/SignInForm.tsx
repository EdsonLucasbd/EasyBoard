'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
	email: z.string().min(1, { message: 'Email is required.' }).email({
		message: 'Username must be at least 2 characters.',
	}),
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters.',
	}),
})

export function SignInForm() {
	const { t } = useTranslation()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('auth-form:email')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('auth-form:email_placeholder')}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('auth-form:password')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('auth-form:password_placeholder')}
										{...field}
										type='password'
									/>
								</FormControl>
								<FormDescription className='text-end'>
									<Link href='#'>{t('auth-form:forgot_password')}</Link>
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='w-full h-[54px] bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/30 font-medium'
					>
						{t('auth-form:enter')}
					</Button>
				</form>
			</Form>

			<div className='flex flex-col w-full items-center gap-[33px] mt-[33px]'>
				<p>{t('auth-form:or')}</p>

				<div className='flex items-center justify-between w-full gap-5'>
					<Button
						variant='outline'
						className='bg-brand-100 text-brand-500 gap-5 w-full h-[55px] border-none'
					>
						<Image
							src='/login/google-icon.svg'
							width={20}
							height={20}
							alt=''
							aria-hidden
						/>
						{t('auth-form:with_google')}
					</Button>

					<div className='flex gap-[13px]'>
						<Button
							variant='outline'
							className='bg-brand-50 w-[60px] h-[55px] border-none ring-1 ring-inset ring-brand-border'
						>
							<Image
								src='/login/facebook-icon.svg'
								width={29}
								height={29}
								alt=''
								aria-hidden
							/>
						</Button>
						<Button
							variant='outline'
							className='bg-brand-50 w-[60px] h-[55px] border-none ring-1 ring-inset ring-brand-border'
						>
							<Image
								src='/login/apple-icon.svg'
								width={29}
								height={29}
								alt=''
								aria-hidden
							/>
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
